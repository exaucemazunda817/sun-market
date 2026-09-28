import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAllowedDocumentType, isOwnPrivateBlobUrl } from "@/lib/blob";

// Route protégée par proxy.ts (matcher /api/secretariat/:path*). Le document
// est lu côté serveur dans le Blob store PRIVÉ (jeton BLOB_READ_WRITE_TOKEN) puis
// transmis : son lien n'est jamais exposé, et il ne serait de toute façon pas
// lisible sans jeton.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const { id, docId } = await params;

  const document = await prisma.document.findFirst({
    where: { id: docId, dossierId: id },
  });

  if (!document || !isOwnPrivateBlobUrl(document.blobUrl)) {
    return NextResponse.json({ error: "Document introuvable." }, { status: 404 });
  }

  const blob = await get(document.blobUrl, { access: "private" }).catch(() => null);
  if (!blob || blob.statusCode !== 200) {
    return NextResponse.json({ error: "Impossible de récupérer le document." }, { status: 502 });
  }

  // Type de fichier : uniquement parmi les types autorisés (jamais celui que le
  // visiteur a déclaré tel quel), et nosniff pour que le navigateur ne le
  // réinterprète pas.
  const contentType = isAllowedDocumentType(document.mimeType) ? document.mimeType : "application/octet-stream";
  const asciiName = document.filename.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");

  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(document.filename)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
