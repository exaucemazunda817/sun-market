import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { EspaceCta, Reassurance } from "@/components/marche";
import { CheckList, Eyebrow, PageHero, Steps } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { financementEntreprises: entreprises, marcheArticle: article } = pageContent;

export const metadata: Metadata = {
  title: "Espace Entreprises",
  description: entreprises.sousTitre,
  alternates: { canonical: "/marche-financier/entreprises" },
};

export default function EspaceEntreprisesPage() {
  return (
    <>
      <PageHero
        eyebrow="Marché financier · Espace Entreprises"
        title={entreprises.titre}
        subtitle={entreprises.sousTitre}
        image={{ src: "/images/financement.jpg", alt: "Une personne tend un dossier de documents au-dessus d'un bureau." }}
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
            <CheckList items={entreprises.pourquoi} className="mt-5" />
          </Reveal>

          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {entreprises.titresProposables.map((t) => (
                <div key={t.titre} className="rounded-2xl bg-sun-surface p-5 ring-1 ring-sun-line">
                  <h2 className="font-display text-base font-bold text-sun-navy">{t.titre}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-sun-muted">{t.texte}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-sun-navy/70">
              Comment ça marche
            </h2>
            <Steps items={entreprises.etapes} />
          </Reveal>

          <Reveal>
            <Reassurance items={entreprises.reassurance} />
          </Reveal>
        </div>

        <Reveal from="right" delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <DossierForm
            dossierType="ENTREPRISE_EMISSION"
            title="Présenter mon projet"
            withDocuments
            fields={[
              { name: "entrepriseNom", label: "Nom de l'entreprise", required: true },
              { name: "contactNom", label: "Nom du contact", required: true },
              { name: "contactEmail", label: "E-mail", type: "email", required: true },
              { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
              { name: "message", label: "Description du projet / besoin de financement", type: "textarea" },
            ]}
          />
        </Reveal>
      </div>

      <section className="bg-sun-surface">
        <Reveal className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EspaceCta espace="investisseurs" {...article.ctaInvestisseurs} />
        </Reveal>
      </section>
    </>
  );
}
