import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChartLine, FileSignature } from "lucide-react";
import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import RevealFormButton from "@/components/RevealFormButton";
import { btn, CheckList, Eyebrow, PageHero } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { trading } = pageContent;

export const metadata: Metadata = {
  title: "Gestion sous mandat",
  description: trading.gestion.texte,
  alternates: { canonical: "/trading/gestion" },
};

export default function GestionPage() {
  return (
    <>
      <PageHero
        eyebrow="Trading · Gestion sous mandat"
        title={trading.gestion.titre}
        subtitle={trading.gestion.texte}
        image={{ src: "/images/trading.jpg", alt: "Graphique de cours boursiers en chandeliers, en bleu sur fond sombre." }}
      >
        <Link
          href="/trading"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sun-on-navy transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Les deux façons de trader
        </Link>
      </PageHero>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <Eyebrow>Un contrat qui vous protège</Eyebrow>
          <div className="mt-4 rounded-2xl bg-sun-navy-50 p-6">
            <p className="flex items-start gap-3 font-display font-semibold leading-snug text-sun-navy">
              <FileSignature className="mt-0.5 h-5 w-5 shrink-0 text-sun-orange" aria-hidden />
              {trading.gestion.contratTitre}
            </p>
            <CheckList items={trading.gestion.contratPoints} small className="mt-4" />
          </div>

          <div className="mt-6 flex items-start gap-3">
            <ChartLine className="mt-0.5 h-5 w-5 shrink-0 text-sun-orange" aria-hidden />
            <div>
              <h2 className="font-display font-semibold text-sun-navy">{trading.gestion.suiviTitre}</h2>
              <p className="mt-1 text-sm leading-relaxed text-sun-muted">{trading.gestion.suiviTexte}</p>
            </div>
          </div>

          <a href="/documents/contrat-gestion-sous-mandat.pdf" className={`${btn.outlineNavy} mt-8`}>
            Télécharger le modèle de contrat
          </a>
          <p className="mt-2 text-xs text-sun-muted">
            [À COMPLÉTER — le PDF du modèle de contrat doit être déposé dans public/documents/]
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 text-center">
          <RevealFormButton label="Simuler ma capital">
            <DossierForm
              dossierType="FORMATION_TRADING"
              title="Simuler ma gestion de capital"
              fields={[
                { name: "contactNom", label: "Nom complet", required: true },
                { name: "contactEmail", label: "E-mail", type: "email", required: true },
                { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
                { name: "message", label: "Capital envisagé / vos questions", type: "textarea" },
              ]}
            />
          </RevealFormButton>
        </Reveal>
      </div>
    </>
  );
}
