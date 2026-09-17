import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DossierType } from "@prisma/client";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const VALID_TYPES = Object.values(DossierType);
const MAX_SUBMISSIONS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 heure

// Un document sera plus tard récupéré côté serveur par le Secrétariat
// (fetch(document.blobUrl) dans la route de téléchargement protégée) : sans
// cette validation, un client malveillant pourrait soumettre une URL interne
// arbitraire et déclencher une requête SSRF au moment où le Secrétariat ouvre
// le dossier. On n'accepte que de vraies URLs Vercel Blob.
function isValidBlobUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
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

  const body = await request.json();

  const { type, contactNom, contactEmail, contactTelephone, entrepriseNom, message, documents } = body;

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Type de dossier invalide." }, { status: 400 });
  }
  if (!contactNom || !contactEmail || !contactTelephone) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }
  if (Array.isArray(documents) && documents.some((doc) => !isValidBlobUrl(doc?.blobUrl))) {
    return NextResponse.json({ error: "Document invalide." }, { status: 400 });
  }

  const dossier = await prisma.dossier.create({
    data: {
      type,
      contactNom,
      contactEmail,
      contactTelephone,
      entrepriseNom: entrepriseNom || null,
      message: message || null,
      documents: {
        create: Array.isArray(documents)
          ? documents.map((doc: { blobUrl: string; filename: string; mimeType: string; size: number }) => ({
              blobUrl: doc.blobUrl,
              filename: doc.filename,
              mimeType: doc.mimeType,
              size: doc.size,
            }))
          : [],
      },
    },
  });

  return NextResponse.json({ id: dossier.id }, { status: 201 });
}
