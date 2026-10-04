// Squelette HTML commun aux trois gabarits racine (FR, EN, Secrétariat).
// Polices : Montserrat 600/700 + Source Sans 3 400/600/700, sous-ensemble
// latin, font-display: swap, préchargées (cahier §3 et §17).
// Hébergées dans le site (app/fonts, licence SIL OFL) et non chargées depuis
// Google au moment de la construction : next/font/google fait échouer la
// construction dès que le téléchargement échoue (bug Next 16, vu le 04/10/2026
// sur Vercel et sur gestion-scolaire).
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { MOTION_HEAD_SCRIPT } from "@/lib/motion-script";
import "../../app/globals.css";

const montserrat = localFont({ src: "../../app/fonts/montserrat-latin.woff2", weight: "600 700", display: "swap", variable: "--font-montserrat", fallback: ["system-ui", "sans-serif"] });
const sourceSans = localFont({ src: "../../app/fonts/source-sans-3-latin.woff2", weight: "400 700", display: "swap", variable: "--font-source-sans", fallback: ["system-ui", "sans-serif"] });

export default function RootDocument({ lang, children }: { lang: "fr" | "en"; children: ReactNode }) {
  return (
    <html lang={lang} className={`${montserrat.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_HEAD_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
