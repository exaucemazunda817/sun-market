import Link from "next/link";
import { company } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-sun-black text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">{company.nomCommercial}</p>
          <p className="mt-1 text-sm">{company.raisonSociale}</p>
          <p className="mt-3 text-sm italic text-sun-orange">{company.credo}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Navigation</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/marche-financier" className="hover:text-white">Marché financier</Link></li>
            <li><Link href="/trading" className="hover:text-white">Trading</Link></li>
            <li><Link href="/conseil-fiscal" className="hover:text-white">Conseil fiscal</Link></li>
            <li><Link href="/a-propos" className="hover:text-white">À propos</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{company.adresse}</li>
            <li>{company.telephone}</li>
            <li>{company.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {company.raisonSociale}. Tous droits réservés.
      </div>
    </footer>
  );
}
