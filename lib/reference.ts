import { prisma } from "./db";

/** Prochaine référence de dossier, format SM-AAAA-NNNN (cahier §8). */
export async function nextReference(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `SM-${year}-`;
  const last = await prisma.dossier.findFirst({
    where: { reference: { startsWith: prefix } },
    orderBy: { reference: "desc" },
    select: { reference: true },
  });
  const n = last?.reference ? Number(last.reference.slice(prefix.length)) + 1 : 1;
  return `${prefix}${String(n).padStart(4, "0")}`;
}
