import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/content";

const liens = [
  { href: "/marche-financier", label: "Marché financier" },
  { href: "/trading", label: "Trading" },
  { href: "/conseil-fiscal", label: "Conseil fiscal" },
  { href: "/a-propos", label: "À propos" },
];

export default function Footer() {
  return (
    <footer className="bg-sun-navy-dark text-sun-on-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <p className="font-display text-xl font-bold text-white">{company.nomCommercial}</p>
          <p className="mt-1 text-sm">{company.raisonSociale}</p>
          <p className="mt-4 font-display text-base font-medium text-sun-orange">{company.credo}</p>
        </div>
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white">Navigation</p>
          <ul className="mt-4 space-y-1 text-sm">
            {liens.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sun-orange" aria-hidden />
              {company.adresse}
            </li>
            <li>
              <a href={`tel:${company.telephone.replace(/\s+/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-sun-orange" aria-hidden />
                {company.telephone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-sun-orange" aria-hidden />
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-sun-on-navy/70">
        © {new Date().getFullYear()} {company.raisonSociale}. Tous droits réservés.
      </div>
    </footer>
  );
}
