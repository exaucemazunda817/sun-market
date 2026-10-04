import type { Metadata } from "next";
import { ROUTES, type PageKey } from "./routes";

// Adresse publique du site (variable de type « Configuration » sur Vercel,
// jamais « Sensible » : elle est lue au moment de la construction).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Image d'aperçu (WhatsApp, Facebook, LinkedIn) : déclarée sur chaque page, car une
 *  page qui définit son propre openGraph remplace entièrement celui du site. */
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "SUN Market, equity & investment marketplace, Kinshasa" };

/** Métadonnées d'une page : titre, description et hreflang réciproques (cahier §16). */
export function pageMeta(page: PageKey, lang: "fr" | "en", title: string | null, description: string): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: ROUTES[page][lang],
      languages: { fr: ROUTES[page].fr, en: ROUTES[page].en, "x-default": ROUTES[page].fr },
    },
    openGraph: {
      type: "website",
      siteName: "SUN Market",
      locale: lang === "en" ? "en_US" : "fr_FR",
      url: ROUTES[page][lang],
      ...(title ? { title } : {}),
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", ...(title ? { title } : {}), description, images: [OG_IMAGE.url] },
  };
}
