import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { trading } = pageContent;

export const metadata: Metadata = {
  title: "Trading",
  description: trading.sousTitre,
  alternates: { canonical: "/trading" },
};

const choix = [
  { Icon: BriefcaseBusiness, href: "/trading/gestion" },
  { Icon: GraduationCap, href: "/trading/academie" },
] as const;

// Page d'entrée de la rubrique : la photo du bandeau reste seule sur sa
// ligne, les deux cartes viennent en dessous (avant : elles chevauchaient le
// bandeau avec un `-mt-10`). Gestion et Académie ont chacune leur page —
// l'académie ne s'ouvre qu'au clic, jamais visible en bas de cette page.
export default function TradingPage() {
  return (
    <>
      <PageHero
        eyebrow="Trading"
        title={trading.titre}
        subtitle={trading.sousTitre}
        image={{ src: "/images/trading.jpg", alt: "Graphique de cours boursiers en chandeliers, en bleu sur fond sombre." }}
      />

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
        {trading.deuxFacons.map((f, i) => {
          const { Icon, href } = choix[i];
          return (
            <Reveal key={f.question} delay={i * 0.08} from={i === 0 ? "left" : "right"}>
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-sun-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sun-orange text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold leading-snug text-sun-navy">{f.question}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-sun-muted">{f.reponse}</span>
                  <ArrowRight className="mt-3 h-4 w-4 text-sun-orange-text transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <section className="bg-sun-surface px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-sun-orange" aria-hidden />
            <blockquote className="mt-4 text-balance font-display text-2xl font-medium leading-snug text-sun-navy sm:text-3xl">
              {trading.cloture}
            </blockquote>
          </figure>
        </Reveal>
      </section>
    </>
  );
}
