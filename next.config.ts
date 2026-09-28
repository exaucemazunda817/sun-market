import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Un package-lock.json parasite existe dans le home directory (hors de ce
  // projet) — Turbopack le détecte et devine mal la racine sans cette option.
  turbopack: {
    root: path.join(__dirname),
  },
  // En-têtes de sécurité (audit du 28/09/2026). Pas de Content-Security-Policy
  // complète (elle casserait l'envoi de documents vers Vercel Blob sans réglage
  // précis) : seule la règle anti-« clickjacking » frame-ancestors est posée.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
