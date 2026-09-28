import Link from "next/link";
import { ArrowRight, Calculator, ChartLine, Eye, Landmark, Target } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { company, aPropos } from "@/lib/content";

const activiteIcons = [Landmark, ChartLine, Calculator];
const activiteLiens = ["/marche-financier", "/trading", "/conseil-fiscal"];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={company.raisonSociale}
        subtitle={company.credo}
        image={{
          src: "/images/a-propos.jpg",
          alt: "Une équipe souriante en réunion autour d'une table, devant un tableau montrant une courbe de croissance.",
          ratio: "aspect-[4/3]",
          position: "50% 30%",
        }}
      />

      {/* Présentation */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Eyebrow>Présentation</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-sun-navy sm:text-4xl">
            {aPropos.presentationSubtitle}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="space-y-4 text-pretty text-lg leading-relaxed text-sun-muted">
          {aPropos.presentationIntro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </section>

      {/* Trois services */}
      <section className="bg-sun-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading eyebrow="Nos activités" title={aPropos.activitesIntro} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {aPropos.activites.map((a, i) => {
              const Icon = activiteIcons[i];
              return (
                <Reveal key={a.titre} delay={i * 0.08}>
                  <Link
                    href={activiteLiens[i]}
                    className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-sun-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sun-navy text-white transition-colors group-hover:bg-sun-orange">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold text-sun-navy">{a.titre}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-sun-muted">{a.texte}</p>
                    <ArrowRight className="mt-5 h-4 w-4 text-sun-orange-text transition-transform group-hover:translate-x-1" aria-label={`Voir ${a.titre}`} />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
        {[
          { Icon: Target, titre: "Mission", texte: aPropos.mission },
          { Icon: Eye, titre: "Vision", texte: aPropos.vision },
        ].map(({ Icon, titre, texte }, i) => (
          <Reveal key={titre} delay={i * 0.08}>
            <div className={`h-full rounded-2xl p-8 ${i === 0 ? "bg-sun-navy text-white" : "bg-sun-orange-50 text-sun-navy"}`}>
              <Icon className="h-7 w-7 text-sun-orange" aria-hidden />
              <h2 className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.2em]">{titre}</h2>
              <p className="mt-3 text-balance font-display text-2xl font-medium leading-snug">{texte}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Notre approche */}
      <section className="bg-sun-navy-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Notre approche" title={aPropos.approcheIntro[0]} />
          <Reveal delay={0.08}>
            {aPropos.approcheIntro.slice(1).map((p) => (
              <p key={p} className="text-pretty text-lg leading-relaxed text-sun-muted">
                {p}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-3">
              {aPropos.approchePrincipes.map((principe) => (
                <span
                  key={principe}
                  className="rounded-full bg-white px-5 py-2 font-display text-sm font-semibold text-sun-navy ring-1 ring-sun-navy-100"
                >
                  {principe}
                </span>
              ))}
            </div>
            <p className="mt-6 text-pretty leading-relaxed text-sun-muted">{aPropos.approcheConclusion}</p>
          </Reveal>
        </div>
      </section>

      {/* Contenu restant à fournir */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-sun-navy">Équipe</h2>
          <p className="placeholder-note mt-3 rounded-xl px-4 py-3 text-sm">{aPropos.equipePlaceholder}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-sun-navy">Positionnement dans le secteur financier</h2>
          <p className="placeholder-note mt-3 rounded-xl px-4 py-3 text-sm">{aPropos.positionnementPlaceholder}</p>
        </div>
      </section>
    </>
  );
}
