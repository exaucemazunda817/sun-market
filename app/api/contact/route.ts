import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { clean, normalizeDrcPhone } from "@/lib/validate";

// Formulaire de la page Contact. Le message est enregistré et consulté dans
// l'espace Secrétariat. Toutes les règles sont revérifiées ici.
const TOPICS = ["Financement", "Trading", "Conseil fiscal", "Autre"];

export async function POST(request: Request) {
  const rl = await checkRateLimit(`contact:${getClientIp(request)}`, 5, 60 * 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ error: "Trop de messages envoyés. Réessayez plus tard." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }

  const sujet = clean(body.sujet, 40);
  const nom = clean(body.nom, 120);
  const telephone = normalizeDrcPhone(clean(body.telephone, 24));
  const message = clean(body.message, 4000);
  if (!TOPICS.includes(sujet) || nom.length < 2 || message.length < 2) return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  if (!telephone) return NextResponse.json({ error: "Numéro incomplet : 9 chiffres après +243." }, { status: 400 });

  await prisma.contactMessage.create({ data: { sujet, nom, telephone, message } });
  return NextResponse.json({ ok: true }, { status: 201 });
}
