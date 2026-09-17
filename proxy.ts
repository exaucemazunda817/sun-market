import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

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
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/secretariat/:path*", "/api/secretariat/:path*"],
};
