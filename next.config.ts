import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Un package-lock.json parasite existe dans le home directory (hors de ce
  // projet) — Turbopack le détecte et devine mal la racine sans cette option.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
