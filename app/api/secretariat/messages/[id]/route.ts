import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Protégée par proxy.ts (session Secrétariat obligatoire).
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  try {
    await prisma.contactMessage.update({ where: { id }, data: { traite: body.traite === true } });
  } catch {
    return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
