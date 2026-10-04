import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { DOC_MAX_BYTES, DOC_MIME_TYPES, isValidBlobUrl } from "@/lib/blob";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { nextReference } from "@/lib/reference";
import { clean, normalizeDrcPhone } from "@/lib/validate";

// Demande d'émission (formulaire en 3 étapes de la page Marché financier).
// Toutes les règles sont revérifiées ici : le navigateur n'est jamais cru sur parole.
const SECTORS = ["Technologie", "Commerce", "Industrie", "Services", "Autre"];
const AGES = ["Moins de 2 ans", "Plus de 2 ans", "Plus de 5 ans"];
const DOC_LABELS = ["Statuts", "Bilans des deux derniers exercices", "RCCM, Id. Nat. et NIF", "Présentation du projet"];

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = await checkRateLimit(`dossier-submit:${ip}`, 10, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Trop de demandes envoyées. Réessayez plus tard." }, { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const raison = clean(body.raison, 160);
  const telephone = normalizeDrcPhone(clean(body.telephone, 24));
  const secteur = clean(body.secteur, 40);
  const anciennete = clean(body.anciennete, 40);
  const typeTitre = body.typeTitre === "Obligations" ? "OBLIGATIONS" : body.typeTitre === "Actions" ? "ACTIONS" : null;
  const montant = clean(body.montant, 20).replace(/\D/g, "");

  if (raison.length < 2 || !telephone) return NextResponse.json({ error: "Raison sociale et téléphone du dirigeant obligatoires." }, { status: 400 });
  if (!SECTORS.includes(secteur) || !AGES.includes(anciennete) || !typeTitre) return NextResponse.json({ error: "Réponses invalides." }, { status: 400 });
  if (body.certify !== true) return NextResponse.json({ error: "La certification des informations est obligatoire." }, { status: 400 });

  const docsIn = Array.isArray(body.documents) ? body.documents.slice(0, 4) : [];
  const docs: { slot: number; blobUrl: string; filename: string; mimeType: string; size: number }[] = [];
  for (const d of docsIn as Record<string, unknown>[]) {
    const slot = Number(d?.slot);
    if (!Number.isInteger(slot) || slot < 0 || slot > 3 || docs.some((x) => x.slot === slot)) return NextResponse.json({ error: "Document invalide." }, { status: 400 });
    if (!isValidBlobUrl(d.blobUrl) || !DOC_MIME_TYPES.includes(String(d.mimeType)) || !(Number(d.size) > 0 && Number(d.size) <= DOC_MAX_BYTES)) {
      return NextResponse.json({ error: "Document invalide." }, { status: 400 });
    }
    docs.push({ slot, blobUrl: d.blobUrl, filename: `${DOC_LABELS[slot]} — ${clean(d.filename, 160)}`, mimeType: String(d.mimeType), size: Number(d.size) });
  }
  if ([0, 1, 2].some((i) => !docs.some((d) => d.slot === i))) {
    return NextResponse.json({ error: "Les trois documents obligatoires sont manquants." }, { status: 400 });
  }

  // Deux dépôts simultanés peuvent viser la même référence : on réessaie.
  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = await nextReference();
    try {
      await prisma.dossier.create({
        data: {
          type: "ENTREPRISE_EMISSION",
          reference,
          contactNom: raison,
          contactTelephone: telephone,
          entrepriseNom: raison,
          rccm: clean(body.rccm, 80) || null,
          secteur,
          anciennete,
          typeTitre,
          montantRecherche: montant ? `${Number(montant).toLocaleString("fr-FR")} USD` : null,
          usageFonds: clean(body.usage, 2000) || null,
          documents: { create: docs.map(({ slot: _slot, ...d }) => d) },
        },
      });
      return NextResponse.json({ reference }, { status: 201 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      throw e;
    }
  }
  return NextResponse.json({ error: "Veuillez réessayer dans un instant." }, { status: 503 });
}
