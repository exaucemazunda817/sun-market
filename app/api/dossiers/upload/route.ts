import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_BYTES } from "@/lib/blob";

const MAX_UPLOADS = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 heure

// Upload direct navigateur → Vercel Blob, en accès PRIVÉ (documents financiers des dossiers
// publics : entreprises, investisseurs, conseil fiscal). Les URLs générées ne
// sont jamais affichées publiquement — voir app/api/secretariat/.../document
// pour la seule route qui les sert, protégée par la session Secrétariat.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(`dossier-upload:${ip}`, MAX_UPLOADS, WINDOW_MS);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Trop d'uploads. Réessayez plus tard." }, { status: 429 });
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Pas de onUploadCompleted : il ne faisait rien, et obligeait Vercel à
  // rappeler cette route après chaque envoi (depuis ses propres serveurs, donc
  // soumis à la limite par adresse IP). Le lien du document est rattaché au
  // dossier par l'appel suivant à POST /api/dossiers.
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...ALLOWED_DOCUMENT_TYPES],
        maximumSizeInBytes: MAX_DOCUMENT_BYTES,
        addRandomSuffix: true,
      }),
    });

    return NextResponse.json(jsonResponse);
  } catch {
    // Pas de détail technique renvoyé au visiteur.
    return NextResponse.json({ error: "Échec de l'envoi du document." }, { status: 400 });
  }
}
