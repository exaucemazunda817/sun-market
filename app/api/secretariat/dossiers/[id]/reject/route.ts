import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { clean } from "@/lib/validate";

// Protégée par proxy.ts (session Secrétariat obligatoire).
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  try {
    const dossier = await prisma.dossier.update({
      where: { id },
      data: { status: "REJECTED", rejectedAt: new Date(), rejectReason: clean(body.reason, 1000) || null },
    });
    return NextResponse.json({ ok: true, dossier });
  } catch {
    return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });
  }
}
