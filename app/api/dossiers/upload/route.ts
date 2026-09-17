import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const MAX_UPLOADS = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 heure

// Upload direct navigateur → Vercel Blob (documents financiers des dossiers
// publics : entreprises, investisseurs, conseil fiscal). Les URLs générées ne
// sont jamais affichées publiquement — voir app/api/secretariat/.../document
// pour la seule route qui les sert, protégée par la session Secrétariat.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(`dossier-upload:${ip}`, MAX_UPLOADS, WINDOW_MS);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Trop d'uploads. Réessayez plus tard." }, { status: 429 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        void clientPayload;
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Rien à faire ici : le lien Blob est associé au Dossier côté client,
        // via l'appel suivant à POST /api/dossiers.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Échec de l'upload." },
      { status: 400 }
    );
  }
}
