import Image from "next/image";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { GridPattern } from "@/components/GridPattern";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

// Primitives visuelles partagées par toutes les pages publiques (passe design
// du 27/09/2026) : une seule façon d'écrire un bouton, un titre de section,
// une liste, une suite d'étapes.

const btnBase =
  "group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold transition-all duration-200 ease-[var(--ease-out-soft)] active:scale-[0.97]";

export const btn = {
  primary: cn(btnBase, "bg-sun-orange text-white shadow-[0_8px_20px_-8px_var(--sun-orange)] hover:-translate-y-0.5 hover:bg-sun-orange-dark"),
  outlineLight: cn(btnBase, "border-2 border-white/35 text-white hover:border-white hover:bg-white hover:text-sun-navy"),
  outlineNavy: cn(btnBase, "border-2 border-sun-navy text-sun-navy hover:bg-sun-navy hover:text-white"),
};

export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-xs font-semibold uppercase tracking-[0.22em]",
        dark ? "text-sun-orange" : "text-sun-orange-text",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-sun-navy"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-pretty text-base leading-relaxed", dark ? "text-sun-on-navy" : "text-sun-muted")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}

export function CheckList({ items, small = false, className }: { items: readonly string[]; small?: boolean; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-start gap-3 text-sun-muted", small ? "text-sm" : "text-[15px]")}>
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sun-orange-100 text-sun-orange-text">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Frise d'étapes animée : composant client dans Steps.tsx.
export { default as Steps } from "@/components/Steps";

// Motif de marque : un soleil levant (anneaux concentriques + rayons fins),
// en rappel du nom SUN. Décoratif, sans texte.
export function SunRings({ className, core = true }: { className?: string; core?: boolean }) {
  const rays = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <g className="sun-spin">
        {rays.map((deg) => (
          <line
            key={deg}
            x1="200"
            y1="36"
            x2="200"
            y2="58"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${deg} 200 200)`}
          />
        ))}
      </g>
      {[150, 118, 86].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity={0.14 + i * 0.08} strokeWidth="1.5" />
      ))}
      {core && <circle cx="200" cy="200" r="56" fill="var(--sun-orange)" />}
    </svg>
  );
}

export type HeroImage = { src: string; alt: string; position?: string };

// Photo de fond plein écran d'un bandeau (demande de Mazunda, 28/09/2026 : comme
// sur ses autres sites). Voile marine en dégradé — plus dense côté texte, plus
// léger à droite pour laisser voir la photo — et zoom très lent (coupé avec
// « Réduire les animations »). Les photos fournies font 600 à 740 px de large :
// le voile et le mouvement atténuent le léger flou dû à l'agrandissement.
export function HeroBackdrop({ image }: { image: HeroImage }) {
  return (
    <div className="absolute inset-0">
      {/* Le décalage du parallaxe (0,2 × défilement) reste toujours inférieur
          à la distance défilée : aucun vide ne peut apparaître en haut. */}
      <Parallax className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="sun-kenburns object-cover"
          style={{ objectPosition: image.position ?? "50% 50%" }}
        />
      </Parallax>
      <div className="absolute inset-0 bg-sun-navy/75 lg:bg-transparent lg:bg-[linear-gradient(90deg,var(--sun-navy)_0%,rgb(38_26_102/0.9)_38%,rgb(38_26_102/0.55)_68%,rgb(38_26_102/0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(24_15_66/0.35)_0%,transparent_30%,transparent_70%,rgb(24_15_66/0.55)_100%)]" />
    </div>
  );
}

// Bandeau d'en-tête commun aux pages intérieures.
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: HeroImage;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-sun-navy text-white">
      {image && <HeroBackdrop image={image} />}
      <GridPattern className="text-white/[0.07]" />
      <SunRings core={!image} className="absolute -right-32 -top-20 hidden h-[440px] w-[440px] text-sun-on-navy lg:block xl:-right-10" />
      <div className={cn("relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20", image && "lg:pb-28 lg:pt-28")}>
        <Reveal>
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-hero font-bold tracking-tight [text-shadow:0_2px_24px_rgb(24_15_66/0.5)]">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-sun-on-navy">{subtitle}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </div>
    </section>
  );
}
