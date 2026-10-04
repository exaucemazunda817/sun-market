import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/pages/ActusPage";
import { getArticle, getArticles } from "@/lib/articles";
import { articleHref } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles("fr").filter((a) => a.published).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle("fr", (await params).slug);
  if (!a) return {};
  return {
    title: a.title, description: a.summary,
    alternates: { canonical: articleHref(a.slug, "fr"), languages: { fr: articleHref(a.slug, "fr"), en: articleHref(a.slug, "en") } },
    openGraph: { type: "article", title: a.title, description: a.summary, ...(a.image ? { images: [a.image] } : {}) },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle("fr", (await params).slug);
  if (!a) notFound();
  return <ArticleView lang="fr" a={a} />;
}
