import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { articleHref, ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(ROUTES).map((r) => ({
    url: SITE_URL + r.fr,
    alternates: { languages: { fr: SITE_URL + r.fr, en: SITE_URL + r.en } },
  }));
  const articles = getArticles("fr").filter((a) => a.published).map((a) => ({
    url: SITE_URL + articleHref(a.slug, "fr"),
    lastModified: a.date,
    alternates: { languages: { fr: SITE_URL + articleHref(a.slug, "fr"), en: SITE_URL + articleHref(a.slug, "en") } },
  }));
  return [...pages, ...articles];
}
