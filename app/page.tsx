import Link from "next/link";
import { company, pageContent } from "@/lib/content";
import { GridPattern } from "@/components/GridPattern";
import Reveal from "@/components/Reveal";

const { accueil } = pageContent;

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
              {accueil.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/80">{accueil.heroSubtitle}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-full bg-sun-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:bg-sun-orange-dark active:scale-[0.97]"
              >
                {accueil.heroCta}
              </a>
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

      {/* Nos trois services */}
      <section id="services" className="scroll-mt-20 bg-sun-gray py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-sun-navy sm:text-3xl">Nos trois services</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {accueil.services.map((s, i) => (
              <Reveal key={s.titre} delay={i * 0.1}>
                <Link
                  href={s.href}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-semibold text-sun-navy">{s.titre}</h3>
                  <p className="mt-2 text-sm font-semibold italic text-foreground/80">{s.accroche}</p>
                  <p className="mt-2 flex-1 text-sm text-foreground/70">{s.texte}</p>
                  <span className="mt-4 text-sm font-semibold text-sun-orange">{s.cta} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sun Market en un coup d'œil */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-sun-navy sm:text-3xl">
            Sun Market en un coup d&apos;œil
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {accueil.coupDoeil.map((c, i) => (
            <Reveal key={c.qui} delay={i * 0.08}>
              <li>
                <p className="font-display font-semibold text-sun-navy">{c.qui}</p>
                <p className="mt-1 text-sm text-foreground/70">
                  {c.besoin}
                  {c.texte ? ` : ${c.texte}` : ""}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Réassurance */}
      <section className="bg-sun-gray py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-3">
            {accueil.reassurance.map((r, i) => (
              <Reveal key={r} delay={i * 0.08}>
                <li className="flex items-start gap-3 rounded-xl bg-white p-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sun-orange" />
                  <span className="text-sm text-foreground/80">{r}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Bloc de clôture */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <p className="font-display text-xl italic text-sun-navy sm:text-2xl">{accueil.cloture}</p>
        </Reveal>
      </section>

      {/* Bandeau final / Contact CTA */}
      <section className="bg-sun-navy py-16 text-white">
        <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{accueil.bandeauFinalTitre}</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${company.email}`}
              className="rounded-full bg-sun-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:bg-sun-orange-dark active:scale-[0.97]"
            >
              Nous contacter
            </a>
            <a
              href={`tel:${company.telephone.replace(/\s+/g, "")}`}
              className="rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:bg-white hover:text-sun-navy active:scale-[0.97]"
            >
              {company.telephone}
            </a>
          </div>
          <p className="mt-4 text-sm text-white/60">{company.adresse}</p>
        </Reveal>
      </section>
    </div>
  );
}
