import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import BarChart from "@/components/BarChart";
import DossierForm from "@/components/DossierForm";
import { ExampleBadge } from "@/components/ExampleBadge";
import Reveal from "@/components/Reveal";
import { Eyebrow, PageHero } from "@/components/ui";
import { chiffres, pageContent } from "@/lib/content";

const { trading } = pageContent;

export const metadata: Metadata = {
  title: "Académie de trading",
  description: trading.academie.objectifTexte,
  alternates: { canonical: "/trading/academie" },
};

export default function AcademiePage() {
  return (
    <>
      <PageHero
        eyebrow="Trading · Académie"
        title={trading.academie.titre}
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

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal from="left">
          <Eyebrow>Ce que vous allez apprendre</Eyebrow>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {trading.academie.apprentissage.map((a, i) => (
              <li key={a} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-sun-line">
                <span className="font-display text-sm font-bold text-sun-orange-text">0{i + 1}</span>
                <span className="text-sm leading-relaxed text-sun-navy">{a}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-sun-navy p-6 text-white">
            <Target className="mt-0.5 h-5 w-5 shrink-0 text-sun-orange" aria-hidden />
            <div>
              <h2 className="font-display font-semibold">{trading.academie.objectifTitre}</h2>
              <p className="mt-1 text-sm leading-relaxed text-sun-on-navy">{trading.academie.objectifTexte}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-sun-line">
            <ExampleBadge show={chiffres.exemple} className="mb-4" />
            <BarChart title={chiffres.academie.titre} unite={chiffres.academie.unite} data={chiffres.academie.periodes} />
          </div>
        </Reveal>

        <Reveal delay={0.1} from="right">
          <DossierForm
            dossierType="FORMATION_TRADING"
            title="Rejoindre l'académie"
            fields={[
              { name: "contactNom", label: "Nom complet", required: true },
              { name: "contactEmail", label: "E-mail", type: "email", required: true },
              { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
              { name: "message", label: "Votre niveau / vos attentes", type: "textarea" },
            ]}
          />
        </Reveal>
      </div>
    </>
  );
}
