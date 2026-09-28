import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let reason: unknown;
  try {
    ({ reason } = await request.json());
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  const motif = typeof reason === "string" ? reason.trim().slice(0, 1000) : "";

  const dossier = await prisma.dossier
    .update({
      where: { id },
      data: { status: "REJECTED", rejectedAt: new Date(), rejectReason: motif || null },
    })
    // Dossier inexistant : 404 propre plutôt qu'une erreur serveur.
    .catch(() => null);
  if (!dossier) return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });

  return NextResponse.json({ ok: true, dossier });
}
