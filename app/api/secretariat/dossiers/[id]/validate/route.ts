import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const existing = await prisma.dossier.findUnique({ where: { id }, select: { type: true, dureeMois: true } });
  if (!existing) return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });

  // Abonnement conseil fiscal : la période couverte démarre à la validation.
  const now = new Date();
  const fin = existing.type === "CONSEIL_FISCAL" && existing.dureeMois
    ? new Date(new Date(now).setMonth(now.getMonth() + existing.dureeMois))
    : null;

  const dossier = await prisma.dossier.update({
    where: { id },
    data: {
      status: "VALIDATED", validatedAt: now, rejectReason: null, rejectedAt: null,
      ...(fin ? { abonnementDebut: now, abonnementFin: fin } : {}),
    },
  });

  return NextResponse.json({ ok: true, dossier });
}
