import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { reason } = await request.json();

  const dossier = await prisma.dossier.update({
    where: { id },
    data: { status: "REJECTED", rejectedAt: new Date(), rejectReason: reason || null },
  });

  return NextResponse.json({ ok: true, dossier });
}
