import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";
import Reveal from "@/components/Reveal";
import { EspaceCta, espaces } from "@/components/marche";
import { btn, Eyebrow, PageHero } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { marcheArticle: article } = pageContent;

export const metadata: Metadata = {
  title: "Marché financier",
  description: article.chapo,
  alternates: { canonical: "/marche-financier" },
};

// Page d'entrée de la rubrique : un article qui explique le marché et oriente
// vers l'Espace Entreprises ou l'Espace Investisseurs (informations détaillées
// et formulaires).
export default function MarcheFinancierPage() {
  const [intro, titres, cadre] = article.sections;

  return (
    <>
      <PageHero
        eyebrow="Marché financier"
        title={article.titre}
        subtitle={article.chapo}
        image={{ src: "/images/financement.jpg", alt: "Une personne tend un dossier de documents au-dessus d'un bureau." }}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={espaces.entreprises.href} className={btn.primary}>
            {espaces.entreprises.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link href={espaces.investisseurs.href} className={btn.outlineLight}>
            {espaces.investisseurs.label}
          </Link>
        </div>
      </PageHero>

      <article>
        {[intro, titres].map((s, i) => (
          <Reveal key={s.titre} className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-20">
            {i === 0 && <Eyebrow>L&apos;essentiel</Eyebrow>}
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-sun-navy">{s.titre}</h2>
            {s.paragraphes.map((p) => (
              <p key={p} className="mt-5 text-pretty text-lg leading-relaxed text-sun-muted">
                {p}
              </p>
            ))}
          </Reveal>
        ))}

        {/* Les deux portes d'entrée, au moment où le lecteur a compris le principe */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <Reveal from="left">
            <EspaceCta espace="entreprises" {...article.ctaEntreprises} dark />
          </Reveal>
          <Reveal from="right" delay={0.08}>
            <EspaceCta espace="investisseurs" {...article.ctaInvestisseurs} />
          </Reveal>
        </div>

        <Reveal className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-sun-navy">{cadre.titre}</h2>
          {cadre.paragraphes.map((p) => (
            <p key={p} className="mt-5 text-pretty text-lg leading-relaxed text-sun-muted">
              {p}
            </p>
          ))}
          <p className="mt-8 flex items-start gap-3 rounded-2xl bg-sun-surface p-5 text-sm leading-relaxed text-sun-muted ring-1 ring-sun-line">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-sun-orange-text" aria-hidden />
            {article.avertissement}
          </p>
        </Reveal>
      </article>

      {/* Relance finale */}
      <section className="bg-sun-navy text-white">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
          <p className="max-w-xl text-balance font-display text-2xl font-bold sm:text-3xl">
            {article.ctaEntreprises.question} {article.ctaInvestisseurs.question}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={espaces.entreprises.href} className={btn.primary}>
              {espaces.entreprises.label}
            </Link>
            <Link href={espaces.investisseurs.href} className={btn.outlineLight}>
              {espaces.investisseurs.label}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
