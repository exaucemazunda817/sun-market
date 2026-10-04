// Actualités : un fichier Markdown par article et par langue dans
// content/actualites (voir le README de ce dossier). Lu côté serveur uniquement.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Category = "education" | "fiscalite" | "trading" | "sunmarket";
export type Article = {
  slug: string; lang: "fr" | "en"; category: Category; featured: boolean; risk: boolean;
  readMinutes: string; date: string; order: number; image: string; imageNote: string; title: string; summary: string;
  body: string;
  /** Cliquable seulement si l'article est daté et rédigé. */
  published: boolean;
};

const DIR = path.join(process.cwd(), "content", "actualites");

function parse(file: string): Article | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m[2].trim();
  const date = meta.date ?? "";
  return {
    slug: meta.slug, lang: meta.lang === "en" ? "en" : "fr", category: (meta.category as Category) || "education",
    featured: meta.featured === "true", risk: meta.risk === "true", readMinutes: meta.readMinutes ?? "", order: Number(meta.order ?? 99),
    date, image: meta.image ?? "", imageNote: meta.imageNote ?? "", title: meta.title ?? "", summary: meta.summary ?? "",
    body, published: !!date && !!body,
  };
}

export function getArticles(lang: "fr" | "en"): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.startsWith(`${lang}-`) && f.endsWith(".md"))
    .map(parse)
    .filter((a): a is Article => !!a && !!a.slug)
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.order - b.order);
}

export function getArticle(lang: "fr" | "en", slug: string): Article | null {
  return getArticles(lang).find((a) => a.slug === slug && a.published) ?? null;
}

export const renderMarkdown = (md: string) => marked.parse(md, { async: false }) as string;

export function formatDate(date: string, lang: "fr" | "en") {
  if (!date) return "[date]";
  const d = new Date(`${date}T12:00:00Z`);
  return d.toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Kinshasa" });
}
