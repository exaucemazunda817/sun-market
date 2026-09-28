import Image from "next/image";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { GridPattern } from "@/components/GridPattern";
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

// Frise verticale numérotée : une ligne relie les pastilles, pour lire les
// étapes comme un parcours plutôt qu'une simple liste.
export function Steps({ items }: { items: readonly { titre: string; texte?: string }[] }) {
  return (
    <ol className="relative">
      {items.map((step, i) => (
        <li key={step.titre} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden className="absolute left-[15px] top-9 bottom-1 w-px bg-sun-navy-100" />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-navy font-display text-sm font-bold text-white">
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="font-display text-[15px] font-semibold leading-snug text-sun-navy">{step.titre}</p>
            {step.texte && <p className="mt-1 text-sm leading-relaxed text-sun-muted">{step.texte}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

// Motif de marque : un soleil levant (anneaux concentriques + rayons fins),
// en rappel du nom SUN. Décoratif, sans texte.
export function SunRings({ className }: { className?: string }) {
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
      <circle cx="200" cy="200" r="56" fill="var(--sun-orange)" />
    </svg>
  );
}

// Photo encadrée (bandeaux de page, accueil). Les photos fournies font
// 600 à 740 px de large : on les affiche près de leur taille réelle, dans un
// cadre, plutôt qu'étirées en fond plein écran où elles seraient floues.
export type HeroImage = { src: string; alt: string; ratio?: string; position?: string };

export function FramedPhoto({ image, priority = false, className }: { image: HeroImage; priority?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl bg-sun-navy-dark shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] ring-1 ring-white/15",
        image.ratio ?? "aspect-[4/3]",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 92vw, 480px"
        className="object-cover"
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
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
      <GridPattern className="text-white/[0.07]" />
      {!image && (
        <SunRings className="absolute -right-32 -top-20 hidden h-[440px] w-[440px] text-sun-on-navy lg:block xl:-right-10" />
      )}
      <div
        className={cn(
          "relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20",
          image && "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
        )}
      >
        <div>
          <Reveal>
            <Eyebrow dark>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-hero font-bold tracking-tight">{title}</h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-sun-on-navy">{subtitle}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.24}>{children}</Reveal>}
        </div>
        {image && (
          <Reveal delay={0.16} className="relative">
            <SunRings className="absolute -right-16 -top-16 hidden h-48 w-48 text-sun-on-navy lg:block" />
            <FramedPhoto image={image} priority className="relative" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
