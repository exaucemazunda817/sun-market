import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DossierType } from "@prisma/client";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isAllowedDocumentType, isOwnPrivateBlobUrl, MAX_DOCUMENT_BYTES, MAX_DOCUMENTS } from "@/lib/blob";

const VALID_TYPES = Object.values(DossierType);
const MAX_SUBMISSIONS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 heure
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Texte saisi par le visiteur : undefined si vide, null si ce n'est pas du
// texte ou s'il dépasse la longueur maximale, sinon la valeur sans espaces
// autour. Chaque appelant décide si « undefined » est acceptable.
function text(value: unknown, max: number): string | null | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return undefined;
  return v.length <= max ? v : null;
}

type DocInput = { blobUrl: string; filename: string; mimeType: string; size: number };

// Un document n'est accepté que s'il vient du store PRIVÉ du site (voir
// lib/blob.ts : avant, un lien vers le store d'un tiers passait), avec un type
// de fichier et une taille autorisés.
function parseDocuments(raw: unknown): DocInput[] | null {
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.length > MAX_DOCUMENTS) return null;
  const docs: DocInput[] = [];
  for (const d of raw) {
    if (!d || typeof d !== "object") return null;
    const { blobUrl, filename, mimeType, size } = d as Record<string, unknown>;
    const name = text(filename, 200);
    if (
      !isOwnPrivateBlobUrl(blobUrl) ||
      !name ||
      !isAllowedDocumentType(mimeType) ||
      typeof size !== "number" ||
      !Number.isFinite(size) ||
      size < 0 ||
      size > MAX_DOCUMENT_BYTES
    ) {
      return null;
    }
    docs.push({ blobUrl, filename: name, mimeType, size: Math.round(size) });
  }
  return docs;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(`dossier-submit:${ip}`, MAX_SUBMISSIONS, WINDOW_MS);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de demandes envoyées. Réessayez plus tard." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object") throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const type = body.type;
  if (typeof type !== "string" || !(VALID_TYPES as string[]).includes(type)) {
    return NextResponse.json({ error: "Type de dossier invalide." }, { status: 400 });
  }

  const contactNom = text(body.contactNom, 120);
  const contactEmail = text(body.contactEmail, 254);
  const contactTelephone = text(body.contactTelephone, 40);
  const entrepriseNom = text(body.entrepriseNom, 160);
  const message = text(body.message, 5000);
  if (!contactNom || !contactEmail || !contactTelephone || !EMAIL_RE.test(contactEmail)) {
    return NextResponse.json({ error: "Champs obligatoires manquants ou invalides." }, { status: 400 });
  }
  if (entrepriseNom === null || message === null) {
    return NextResponse.json({ error: "Champ trop long ou invalide." }, { status: 400 });
  }

  const documents = parseDocuments(body.documents);
  if (!documents) {
    return NextResponse.json({ error: "Document invalide." }, { status: 400 });
  }

  const dossier = await prisma.dossier.create({
    data: {
      type: type as DossierType,
      contactNom,
      contactEmail,
      contactTelephone,
      entrepriseNom: entrepriseNom ?? null,
      message: message ?? null,
      documents: { create: documents },
    },
  });

  return NextResponse.json({ id: dossier.id }, { status: 201 });
}
