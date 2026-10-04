import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { isPrivateBlobUrl, isValidBlobUrl } from "@/lib/blob";
import { prisma } from "@/lib/db";

// Route protégée par proxy.ts (matcher /api/secretariat/:path*). Le lien Vercel
// Blob n'est jamais renvoyé au navigateur : le fichier est récupéré côté
// serveur puis streamé, pour qu'un document confidentiel (bilan, état
// financier...) ne fuite jamais dans le HTML public.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const { id, docId } = await params;

  const document = await prisma.document.findFirst({
    where: { id: docId, dossierId: id },
  });

  // Revérifié ici aussi (défense en profondeur contre une URL interne en base).
  if (!document || !isValidBlobUrl(document.blobUrl)) {
    return NextResponse.json({ error: "Document introuvable." }, { status: 404 });
  }

  // Stockage privé : lecture avec la clé du projet (BLOB_READ_WRITE_TOKEN).
  let body: ReadableStream<Uint8Array> | null = null;
  try {
    if (isPrivateBlobUrl(document.blobUrl)) {
      const blob = await get(document.blobUrl, { access: "private" });
      body = blob && blob.statusCode === 200 ? blob.stream : null;
    } else {
      const res = await fetch(document.blobUrl);
      body = res.ok ? res.body : null;
    }
  } catch {
    body = null;
  }
  if (!body) {
    return NextResponse.json({ error: "Impossible de récupérer le document." }, { status: 502 });
  }

  return new NextResponse(body, {
    headers: {
      "Content-Type": document.mimeType,
      "Content-Disposition": `attachment; filename="document"; filename*=UTF-8''${encodeURIComponent(document.filename)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
