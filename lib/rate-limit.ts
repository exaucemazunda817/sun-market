import { prisma } from "./db";

// Limite le nombre de tentatives d'une action (connexion Secrétariat, soumission
// de dossier...) par clé (IP...) sur une fenêtre de temps glissante, en
// s'appuyant sur la base de données — fonctionne correctement même en
// environnement serverless (contrairement à un simple compteur en mémoire).
// Repris du pattern e-classe-rdc (lib/rate-limit.ts).
export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const windowStart = new Date(Date.now() - windowMs);

  const recentAttempts = await prisma.rateLimitAttempt.count({
    where: { key, createdAt: { gte: windowStart } },
  });

  if (recentAttempts >= maxAttempts) {
    const oldest = await prisma.rateLimitAttempt.findFirst({
      where: { key, createdAt: { gte: windowStart } },
      orderBy: { createdAt: "asc" },
    });
    const retryAfterMs = oldest
      ? oldest.createdAt.getTime() + windowMs - Date.now()
      : windowMs;
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }

  await prisma.rateLimitAttempt.create({ data: { key } });

  // Nettoyage best-effort des vieilles entrées pour ne pas faire grossir la table indéfiniment.
  prisma.rateLimitAttempt
    .deleteMany({ where: { createdAt: { lt: new Date(Date.now() - windowMs * 10) } } })
    .catch(() => {});

  return { allowed: true };
}

// Récupère l'IP du client derrière le proxy Vercel.
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
