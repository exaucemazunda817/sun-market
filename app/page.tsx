import Link from "next/link";
import { company, services } from "@/lib/content";
import { GridPattern } from "@/components/GridPattern";
import Reveal from "@/components/Reveal";

const avantages = [
  "Un accès simplifié au financement pour les entreprises éligibles",
  "Des opportunités d'investissement encadrées contractuellement",
  "Une gestion sous mandat avec clause de garantie partielle du capital",
  "Un accompagnement fiscal pensé pour les petits opérateurs économiques",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-sun-navy text-white">
        <GridPattern className="text-white/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
              {company.nomCommercial} · {company.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              {company.credo}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              {company.raisonSociale} met en relation les entreprises en recherche de financement et
              les investisseurs, tout en proposant du trading sous mandat et un accompagnement fiscal
              aux petits opérateurs économiques.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/marche-financier"
                className="rounded-full bg-sun-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:bg-sun-orange-dark active:scale-[0.97]"
              >
                Découvrir le marché financier
              </Link>
              <Link
                href="/a-propos"
                className="rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:bg-white hover:text-sun-navy active:scale-[0.97]"
              >
                Qui sommes-nous ?
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qui sommes-nous / Que proposons-nous / À qui */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <Reveal>
            <p className="font-display text-lg font-semibold text-sun-navy">Qui sommes-nous ?</p>
            <p className="mt-2 text-sm text-foreground/70">
              {company.raisonSociale} est une plateforme financière basée à Kinshasa, qui simplifie
              l&apos;accès à certains services financiers pour les entreprises, les investisseurs et
              les petits opérateurs économiques.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-lg font-semibold text-sun-navy">Que proposons-nous ?</p>
            <p className="mt-2 text-sm text-foreground/70">
              Trois services complémentaires : un marché financier simplifié, du trading avec
              formation, et un accompagnement fiscal et administratif par abonnement.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-display text-lg font-semibold text-sun-navy">À qui s&apos;adressent nos services ?</p>
            <p className="mt-2 text-sm text-foreground/70">
              Entreprises technologiques en recherche de financement, investisseurs particuliers ou
              institutionnels, et petits opérateurs économiques (boutiques, commerces, comptoirs...).
            </p>
          </Reveal>
        </div>
      </section>

      {/* Les 3 services */}
      <section className="bg-sun-gray py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-sun-navy sm:text-3xl">Nos services</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {Object.entries(services).map(([key, service], i) => (
              <Reveal key={key} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
                  <h3 className="font-display text-lg font-semibold text-sun-navy">{service.titre}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{service.resume}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-sun-navy sm:text-3xl">Nos avantages</h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {avantages.map((a, i) => (
            <Reveal key={a} delay={i * 0.08}>
              <li className="flex items-start gap-3 rounded-xl border border-sun-navy/10 p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sun-orange" />
                <span className="text-sm text-foreground/80">{a}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="bg-sun-navy py-16 text-white">
        <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Une question, un projet ?</h2>
          <p className="mt-3 text-white/80">
            {company.telephone} · {company.email}
          </p>
          <p className="mt-1 text-sm text-white/60">{company.adresse}</p>
        </Reveal>
      </section>
    </div>
  );
}
