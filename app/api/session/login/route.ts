import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  secretariatIdentifiant,
  secretariatPassword,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/session";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Comparaison à durée constante : les deux valeurs sont d'abord hachées, pour
// ne révéler ni le contenu ni la longueur du secret attendu.
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let mismatch = 0;
  for (let i = 0; i < x.length; i++) mismatch |= x[i] ^ y[i];
  return mismatch === 0;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(`secretariat-login:${ip}`, MAX_ATTEMPTS, WINDOW_MS);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  const { identifiant, password } = await request.json().catch(() => ({}));

  const expectedUser = secretariatIdentifiant();
  const expected = secretariatPassword();
  // Les deux comparaisons sont toujours faites, et un seul message d'erreur :
  // on ne révèle jamais lequel des deux est faux.
  const userOk = !!expectedUser && typeof identifiant === "string" && (await timingSafeEqual(identifiant.trim(), expectedUser));
  const passOk = !!expected && typeof password === "string" && (await timingSafeEqual(password, expected));
  if (!userOk || !passOk) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
