import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/pages/ActusPage";
import { getArticle, getArticles } from "@/lib/articles";
import { articleHref } from "@/lib/routes";
import { OG_IMAGE } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles("en").filter((a) => a.published).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle("en", (await params).slug);
  if (!a) return {};
  return {
    title: a.title, description: a.summary,
    alternates: { canonical: articleHref(a.slug, "en"), languages: { fr: articleHref(a.slug, "fr"), en: articleHref(a.slug, "en") } },
    openGraph: { type: "article", title: a.title, description: a.summary, images: [a.image ? { url: a.image } : OG_IMAGE] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle("en", (await params).slug);
  if (!a) notFound();
  return <ArticleView lang="en" a={a} />;
}
