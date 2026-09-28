import type { Metadata } from "next";
import { CalendarRange, Handshake, Landmark, Quote } from "lucide-react";
import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { btn, PageHero, SectionHeading, Steps } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { conseilFiscal } = pageContent;

export const metadata: Metadata = {
  title: "Conseil fiscal",
  description: conseilFiscal.positionnement,
  alternates: { canonical: "/conseil-fiscal" },
};

export default function ConseilFiscalPage() {
  return (
    <>
      <PageHero
        eyebrow="Conseil fiscal"
        title={conseilFiscal.accroche}
        subtitle={conseilFiscal.intro}
        image={{ src: "/images/conseil-fiscal.jpg", alt: "Calculatrice et stylo posés sur des états financiers." }}
      >
        <div className="mt-8">
          <a href="#abonnement" className={btn.primary}>
            Choisir mon abonnement
          </a>
        </div>
      </PageHero>

      {/* Positionnement */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-2xl bg-sun-orange-50 p-7 sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sun-orange text-white">
              <Handshake className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-pretty font-display text-lg font-medium leading-snug text-sun-navy">
              {conseilFiscal.positionnement}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Accompagnement + niveaux */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading eyebrow="Notre méthode" title="Notre accompagnement fiscal" />
          <Reveal className="mt-8">
            <Steps items={conseilFiscal.etapes} />
          </Reveal>
        </div>
        <Reveal from="right" className="self-start rounded-2xl bg-sun-navy p-7 text-white sm:p-8">
          <Landmark className="h-7 w-7 text-sun-orange" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-bold">Un accompagnement à tous les niveaux</h2>
          <p className="mt-3 leading-relaxed text-sun-on-navy">{conseilFiscal.niveaux}</p>
        </Reveal>
      </section>

      {/* Formules + formulaire */}
      <section id="abonnement" className="bg-sun-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading eyebrow="Abonnement" title="Choisissez votre formule d'abonnement" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {conseilFiscal.formules.map((f, i) => (
              <Reveal key={f.nom} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-sun-line">
                  <CalendarRange className="h-6 w-6 text-sun-orange" aria-hidden />
                  <p className="mt-4 font-display text-xl font-bold text-sun-navy">{f.nom}</p>
                  <p className="mt-2 text-sm leading-relaxed text-sun-muted">{f.pourQui}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <figure>
                <Quote className="h-8 w-8 text-sun-orange" aria-hidden />
                <blockquote className="mt-4 text-balance font-display text-2xl font-medium leading-snug text-sun-navy sm:text-3xl">
                  {conseilFiscal.cloture}
                </blockquote>
              </figure>
            </Reveal>
            <DossierForm
              dossierType="CONSEIL_FISCAL"
              title="Choisir mon abonnement"
              fields={[
                { name: "entrepriseNom", label: "Nom du commerce / de l'activité", required: true },
                { name: "contactNom", label: "Nom complet", required: true },
                { name: "contactEmail", label: "E-mail", type: "email", required: true },
                { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
                {
                  name: "message",
                  label: "Décrivez votre activité, vos besoins et la formule souhaitée (trimestrielle, semestrielle ou annuelle)",
                  type: "textarea",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
