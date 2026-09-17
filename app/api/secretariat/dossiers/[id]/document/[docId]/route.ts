import { NextResponse } from "next/server";
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

  if (!document) {
    return NextResponse.json({ error: "Document introuvable." }, { status: 404 });
  }

  const blobResponse = await fetch(document.blobUrl);
  if (!blobResponse.ok || !blobResponse.body) {
    return NextResponse.json({ error: "Impossible de récupérer le document." }, { status: 502 });
  }

  return new NextResponse(blobResponse.body, {
    headers: {
      "Content-Type": document.mimeType,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(document.filename)}"`,
    },
  });
}
