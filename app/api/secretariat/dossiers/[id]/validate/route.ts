import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const dossier = await prisma.dossier.update({
    where: { id },
    data: { status: "VALIDATED", validatedAt: new Date(), rejectReason: null, rejectedAt: null },
  });

  return NextResponse.json({ ok: true, dossier });
}
