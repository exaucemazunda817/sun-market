// Routes FR / EN (cahier des charges §2). Chaque page connaît son équivalent
// dans l'autre langue pour le sélecteur FR/EN et les balises hreflang.
export type Lang = "fr" | "en";

export type PageKey =
  | "home"
  | "marche"
  | "fiscal"
  | "trading"
  | "apropos"
  | "cadre"
  | "actus"
  | "contact";

export const ROUTES: Record<PageKey, { fr: string; en: string }> = {
  home: { fr: "/", en: "/en" },
  marche: { fr: "/marche-financier", en: "/en/capital-market" },
  fiscal: { fr: "/conseil-fiscal", en: "/en/tax-advisory" },
  trading: { fr: "/trading", en: "/en/trading" },
  apropos: { fr: "/a-propos", en: "/en/about" },
  cadre: { fr: "/cadre-et-transparence", en: "/en/legal" },
  actus: { fr: "/actualites", en: "/en/news" },
  contact: { fr: "/contact", en: "/en/contact" },
};

export const articleHref = (slug: string, lang: Lang) => `${ROUTES.actus[lang]}/${slug}`;

export const href = (key: PageKey, lang: Lang, hash = "") => ROUTES[key][lang] + hash;

export const PHONE = "+243 840 922 275";
export const PHONE_TEL = "tel:+243840922275";
export const WHATSAPP = "https://wa.me/243840922275";
export const ADDRESS_FR = "5ème niveau, immeuble 130B, avenue Kwango, Kinshasa/Gombe, RDC";
export const ADDRESS_EN = "5th floor, building 130B, avenue Kwango, Kinshasa/Gombe, DRC";
