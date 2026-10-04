import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Un package-lock.json parasite existe dans le home directory (hors de ce
  // projet) — Turbopack le détecte et devine mal la racine sans cette option.
  turbopack: {
    root: path.join(__dirname),
  },
  poweredByHeader: false,
  // En-têtes de sécurité : pas d'intégration du site dans un cadre étranger
  // (anti-clickjacking, important pour l'espace Secrétariat), pas de devinette
  // de type de fichier, référent limité.
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
        ],
      },
    ];
  },
};

export default nextConfig;
