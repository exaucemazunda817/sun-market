import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, ChartLine, FileSignature, GraduationCap, Quote, Target } from "lucide-react";
import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { btn, CheckList, Eyebrow, PageHero } from "@/components/ui";
import { chiffres, pageContent } from "@/lib/content";
import BarChart from "@/components/BarChart";
import { ExampleBadge } from "@/components/ExampleBadge";

const { trading } = pageContent;

export const metadata: Metadata = {
  title: "Trading",
  description: trading.sousTitre,
  alternates: { canonical: "/trading" },
};
const choixIcons = [BriefcaseBusiness, GraduationCap];
const choixAncres = ["#gestion", "#academie"];

export default function TradingPage() {
  return (
    <>
      <PageHero
        eyebrow="Trading"
        title={trading.titre}
        subtitle={trading.sousTitre}
        image={{ src: "/images/trading.jpg", alt: "Graphique de cours boursiers en chandeliers, en bleu sur fond sombre." }}
      />

      {/* Deux façons : cartes qui chevauchent le bandeau et mènent à chaque volet */}
      <div className="relative z-10 mx-auto -mt-10 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-2">
        {trading.deuxFacons.map((f, i) => {
          const Icon = choixIcons[i];
          return (
            <Reveal key={f.question} delay={i * 0.08}>
              <a
                href={choixAncres[i]}
                className="group flex h-full items-start gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-card-hover)] ring-1 ring-sun-line transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sun-orange text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold leading-snug text-sun-navy">{f.question}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-sun-muted">{f.reponse}</span>
                  <ArrowRight className="mt-3 h-4 w-4 text-sun-orange-text transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>

      {/* Gestion de capital */}
      <section id="gestion" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal from="left">
          <Eyebrow>Gestion sous mandat</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-sun-navy sm:text-4xl">
            {trading.gestion.titre}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-sun-muted">{trading.gestion.texte}</p>

          <div className="mt-8 rounded-2xl bg-sun-navy-50 p-6">
            <p className="flex items-start gap-3 font-display font-semibold leading-snug text-sun-navy">
              <FileSignature className="mt-0.5 h-5 w-5 shrink-0 text-sun-orange" aria-hidden />
              {trading.gestion.contratTitre}
            </p>
            <CheckList items={trading.gestion.contratPoints} small className="mt-4" />
          </div>

          <div className="mt-6 flex items-start gap-3">
            <ChartLine className="mt-0.5 h-5 w-5 shrink-0 text-sun-orange" aria-hidden />
            <div>
              <h3 className="font-display font-semibold text-sun-navy">{trading.gestion.suiviTitre}</h3>
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

        <Reveal delay={0.1} from="right">
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
        </Reveal>
      </section>

      {/* Académie de trading */}
      <section id="academie" className="bg-sun-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal from="left">
            <Eyebrow>Académie de trading</Eyebrow>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-sun-navy sm:text-4xl">
              {trading.academie.titre}
            </h2>

            <h3 className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.2em] text-sun-navy/70">
              Ce que vous allez apprendre
            </h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
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
                <h3 className="font-display font-semibold">{trading.academie.objectifTitre}</h3>
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
      </section>

      <section className="px-4 py-20 sm:px-6">
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
