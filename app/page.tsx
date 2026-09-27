import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calculator,
  ChartLine,
  FileSignature,
  Handshake,
  Landmark,
  MapPin,
  Quote,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { company, pageContent } from "@/lib/content";
import { GridPattern } from "@/components/GridPattern";
import Reveal from "@/components/Reveal";
import { btn, Eyebrow, SectionHeading, SunRings } from "@/components/ui";

const { accueil } = pageContent;

const serviceIcons = [Landmark, ChartLine, Calculator];
const reassuranceIcons = [ShieldCheck, Handshake, FileSignature];

// « deux besoins » mis en couleur dans le titre, s'il y figure.
function HeroTitle({ text }: { text: string }) {
  const key = "deux besoins";
  const i = text.indexOf(key);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-sun-orange">{key}</span>
      {text.slice(i + key.length)}
    </>
  );
}

export default function Home() {
  const [entreprises, investisseurs, plateforme] = accueil.coupDoeil;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-sun-navy text-white">
        <GridPattern className="text-white/[0.07]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Reveal>
              <Eyebrow dark>
                {company.nomCommercial} · {company.tagline}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 max-w-2xl text-balance font-display text-display font-bold tracking-tight">
                <HeroTitle text={accueil.heroTitle} />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sun-on-navy">{accueil.heroSubtitle}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#services" className={btn.primary}>
                  {accueil.heroCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
                <Link href="/a-propos" className={btn.outlineLight}>
                  Qui sommes-nous ?
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Soleil levant + les trois services autour */}
          <Reveal delay={0.2} className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block">
            <SunRings className="absolute inset-0 h-full w-full text-sun-on-navy" />
            {accueil.services.map((s, i) => {
              const Icon = serviceIcons[i];
              const pos = ["left-0 top-[14%]", "right-[-6%] top-[44%]", "left-[6%] bottom-[8%]"][i];
              return (
                <Link
                  key={s.titre}
                  href={s.href}
                  className={`absolute ${pos} flex items-center gap-2.5 rounded-full bg-white/10 py-2 pl-2 pr-4 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-sun-navy`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sun-orange text-white">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {s.titre}
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Nos trois services */}
      <section id="services" className="bg-sun-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Ce que nous faisons" title="Nos trois services" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {accueil.services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={s.titre} delay={i * 0.08}>
                  <Link
                    href={s.href}
                    className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-sun-line transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sun-navy text-white transition-colors group-hover:bg-sun-orange">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="font-display text-sm font-semibold text-sun-navy/30">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-sun-navy">{s.titre}</h3>
                    <p className="mt-2 font-medium leading-snug text-sun-navy/85">{s.accroche}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-sun-muted">{s.texte}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sun-orange-text">
                      {s.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* En un coup d'œil : les deux besoins, et la plateforme entre les deux */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Le principe" title="Sun Market en un coup d'œil" center />
          <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-0">
            {[
              { item: entreprises, Icon: Building2 },
              null,
              { item: plateforme, Icon: null },
              null,
              { item: investisseurs, Icon: Wallet },
            ].map((cell, i) => {
              if (!cell) {
                return (
                  <div key={i} aria-hidden className="flex items-center justify-center py-1 text-sun-orange lg:px-4">
                    <span className="flex h-9 w-9 rotate-90 items-center justify-center rounded-full bg-sun-orange-50 lg:rotate-0">
                      <ArrowRight className={`h-4 w-4 ${i === 1 ? "" : "rotate-180"}`} />
                    </span>
                  </div>
                );
              }
              const { item, Icon } = cell;
              const center = !Icon;
              return (
                <Reveal key={item.qui} delay={i * 0.06} className="h-full">
                  <div
                    className={
                      center
                        ? "relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-sun-navy p-7 text-center text-white"
                        : "flex h-full flex-col items-center rounded-2xl bg-sun-surface p-7 text-center ring-1 ring-sun-line"
                    }
                  >
                    {center ? (
                      <SunRings className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 text-sun-on-navy" />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sun-navy shadow-[var(--shadow-card)]">
                        {Icon && <Icon className="h-6 w-6" aria-hidden />}
                      </span>
                    )}
                    <p className={`relative font-display text-lg font-bold ${center ? "" : "mt-4 text-sun-navy"}`}>{item.qui}</p>
                    <p className={`relative mt-1 text-sm font-semibold ${center ? "text-sun-orange" : "text-sun-orange-text"}`}>
                      {item.besoin}
                    </p>
                    {item.texte && <p className="mt-2 text-sm leading-relaxed text-sun-muted">{item.texte}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Réassurance + phrase de clôture */}
      <section className="bg-sun-navy-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-6 sm:grid-cols-3">
            {accueil.reassurance.map((r, i) => {
              const Icon = reassuranceIcons[i];
              return (
                <Reveal key={r} delay={i * 0.08}>
                  <li className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-sun-line">
                    <Icon className="h-7 w-7 text-sun-orange" aria-hidden />
                    <span className="font-medium leading-snug text-sun-navy">{r}</span>
                  </li>
                </Reveal>
              );
            })}
          </ul>
          <Reveal>
            <figure className="mx-auto mt-16 max-w-3xl text-center">
              <Quote className="mx-auto h-8 w-8 text-sun-orange" aria-hidden />
              <blockquote className="mt-4 text-balance font-display text-2xl font-medium leading-snug text-sun-navy sm:text-3xl">
                {accueil.cloture}
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Bandeau final / Contact */}
      <section className="relative overflow-hidden bg-sun-navy text-white">
        <SunRings className="absolute -bottom-40 -right-24 hidden h-[420px] w-[420px] text-sun-on-navy md:block" />
        <Reveal className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{accueil.bandeauFinalTitre}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${company.email}`} className={btn.primary}>
                Nous contacter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a href={`tel:${company.telephone.replace(/\s+/g, "")}`} className={btn.outlineLight}>
                {company.telephone}
              </a>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-sun-on-navy">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sun-orange" aria-hidden />
              {company.adresse}
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
