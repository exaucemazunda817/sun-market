import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { nextReference } from "@/lib/reference";
import { normalizeDrcPhone } from "@/lib/validate";

// Demande d'abonnement conseil fiscal (carte d'abonnement, page Conseil fiscal).
// Aucun paiement n'est encaissé ici : le Secrétariat rappelle le client.
const MONTHS = [1, 3, 12];
const METHODS = ["M-Pesa", "Orange Money", "Airtel Money", "Virement", "Carte bancaire"];

export async function POST(request: Request) {
  const rl = await checkRateLimit(`abonnement:${getClientIp(request)}`, 6, 60 * 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }

  const months = Number(body.months);
  const method = String(body.method ?? "");
  const telephone = normalizeDrcPhone(String(body.telephone ?? "").slice(0, 24));
  if (!MONTHS.includes(months) || !METHODS.includes(method)) return NextResponse.json({ error: "Réponses invalides." }, { status: 400 });
  if (!telephone) return NextResponse.json({ error: "Numéro incomplet : 9 chiffres après +243." }, { status: 400 });

  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = await nextReference();
    try {
      await prisma.dossier.create({
        data: { type: "CONSEIL_FISCAL", reference, contactNom: "Abonnement conseil fiscal (à rappeler)", contactTelephone: telephone, dureeMois: months, moyenPaiement: method },
      });
      return NextResponse.json({ reference }, { status: 201 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      throw e;
    }
  }
  return NextResponse.json({ error: "Veuillez réessayer dans un instant." }, { status: 503 });
}
