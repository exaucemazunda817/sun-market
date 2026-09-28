import type { Metadata } from "next";
import { company } from "@/lib/content";

// Adresse publique du site, pour les liens absolus (partage, sitemap).
// NEXT_PUBLIC_SITE_URL (type « Configuration » sur Vercel, jamais « Sensible »)
// dès que le domaine sun-capitalsarl.com sera pointé ; en attendant, l'adresse
// de production fournie automatiquement par Vercel.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const publicPaths = [
  "/",
  "/marche-financier",
  "/marche-financier/entreprises",
  "/marche-financier/investisseurs",
  "/trading",
  "/conseil-fiscal",
  "/a-propos",
] as const;

// Pages protégées du Secrétariat : titre fixe, jamais indexées.
export const secretariatMetadata: Metadata = {
  title: { absolute: `Secrétariat — ${company.nomCommercial}` },
  robots: { index: false, follow: false },
};
