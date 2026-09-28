import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { EspaceCta, Reassurance } from "@/components/marche";
import { CheckList, Eyebrow, PageHero, Steps } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { financementInvestisseurs: investisseurs, marcheArticle: article } = pageContent;

export const metadata: Metadata = {
  title: "Espace Investisseurs",
  description: investisseurs.sousTitre,
  alternates: { canonical: "/marche-financier/investisseurs" },
};

export default function EspaceInvestisseursPage() {
  return (
    <>
      <PageHero
        eyebrow="Marché financier · Espace Investisseurs"
        title={investisseurs.titre}
        subtitle={investisseurs.sousTitre}
        image={{
          src: "/images/accueil.jpg",
          alt: "Pièces de monnaie et courbe de marché en hausse sur fond sombre.",
          position: "70% 50%",
        }}
      >
        <Link
          href="/marche-financier"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sun-on-navy transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Le marché financier expliqué
        </Link>
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-10">
          <Reveal from="left">
            <Eyebrow>Pourquoi SUN Market</Eyebrow>
            <CheckList items={investisseurs.pourquoi} className="mt-5" />
          </Reveal>

          <Reveal>
            <h2 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-sun-navy/70">
              Comment ça marche
            </h2>
            <Steps items={investisseurs.etapes} />
          </Reveal>

          <Reveal>
            <Reassurance items={investisseurs.reassurance} />
          </Reveal>
        </div>

        <Reveal from="right" delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <DossierForm
            dossierType="INVESTISSEUR"
            title="Faire part de mon intérêt"
            fields={[
              { name: "contactNom", label: "Nom complet", required: true },
              { name: "contactEmail", label: "E-mail", type: "email", required: true },
              { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
              { name: "entrepriseNom", label: "Entreprise (si applicable)" },
              { name: "message", label: "Votre projet d'investissement", type: "textarea" },
            ]}
          />
        </Reveal>
      </div>

      <section className="bg-sun-surface">
        <Reveal className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EspaceCta espace="entreprises" {...article.ctaEntreprises} dark />
        </Reveal>
      </section>
    </>
  );
}
