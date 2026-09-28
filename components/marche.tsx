import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

// Éléments partagés de la rubrique Marché financier (article d'entrée +
// Espace Entreprises + Espace Investisseurs).

export const espaces = {
  entreprises: { href: "/marche-financier/entreprises", Icon: Building2, label: "Espace Entreprises" },
  investisseurs: { href: "/marche-financier/investisseurs", Icon: Wallet, label: "Espace Investisseurs" },
} as const;

export function Reassurance({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5 rounded-2xl bg-sun-navy-50 p-5">
      {items.map((r) => (
        <li key={r} className="flex items-start gap-2.5 text-sm text-sun-navy">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sun-orange" aria-hidden />
          {r}
        </li>
      ))}
    </ul>
  );
}

// Carte d'appel vers un espace : toute la carte est cliquable.
export function EspaceCta({
  espace,
  question,
  texte,
  bouton,
  dark = false,
}: {
  espace: keyof typeof espaces;
  question: string;
  texte: string;
  bouton: string;
  dark?: boolean;
}) {
  const { href, Icon } = espaces[espace];
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8",
        dark
          ? "bg-sun-navy text-white shadow-[var(--shadow-card-hover)]"
          : "bg-white text-sun-navy shadow-[var(--shadow-card)] ring-1 ring-sun-line hover:shadow-[var(--shadow-card-hover)]"
      )}
    >
      <span className={cn("flex h-12 w-12 items-center justify-center rounded-xl", dark ? "bg-sun-orange" : "bg-sun-navy")}>
        <Icon className="h-6 w-6 text-white" aria-hidden />
      </span>
      <span className="mt-6 block font-display text-2xl font-bold leading-snug">{question}</span>
      <span className={cn("mt-3 block flex-1 leading-relaxed", dark ? "text-sun-on-navy" : "text-sun-muted")}>{texte}</span>
      <span
        className={cn(
          "mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
          dark ? "bg-sun-orange text-white group-hover:bg-sun-orange-dark" : "bg-sun-navy text-white group-hover:bg-sun-navy-dark"
        )}
      >
        {bouton}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
