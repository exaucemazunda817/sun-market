"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/content";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/marche-financier", label: "Marché financier" },
  { href: "/trading", label: "Trading" },
  { href: "/conseil-fiscal", label: "Conseil fiscal" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-sun-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/sun-market-logo.jpg"
            alt={`Logo ${company.nomCommercial}`}
            width={140}
            height={105}
            className="h-10 w-auto rounded object-contain"
            priority
          />
        </Link>
        <nav className="hidden shrink-0 gap-1 text-sm font-medium lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-center transition-colors ${
                  isActive ? "bg-sun-orange text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/secretariat/login"
          className="hidden whitespace-nowrap rounded-full border-2 border-white/40 px-4 py-[7px] text-center text-sm font-semibold text-white transition-colors hover:bg-white hover:text-sun-navy lg:inline-block"
        >
          Espace Secrétariat
        </Link>
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-2.5 text-sm font-medium lg:hidden">
        {navLinks.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-full px-3 py-1.5 transition-colors ${
                isActive ? "bg-sun-orange text-white" : "bg-white/10 text-white/80"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
