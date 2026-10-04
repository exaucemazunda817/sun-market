import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS, verifySessionToken } from "@/lib/session";

// Protège à la fois les pages ET les routes API du Secrétariat (leçon retenue
// d'un bug historique sur abg-rdc où seules les pages étaient protégées).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/secretariat") || pathname.startsWith("/api/secretariat")) {
    if (pathname === "/secretariat/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const authenticated = await verifySessionToken(token);

    if (!authenticated) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/secretariat/login", request.url));
    }

    // Session glissante : chaque page ou action repousse l'expiration de 30 min.
    const response = NextResponse.next();
    response.cookies.set(SESSION_COOKIE_NAME, await createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/secretariat/:path*", "/api/secretariat/:path*"],
};
