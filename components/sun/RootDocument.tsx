// Squelette HTML commun aux trois gabarits racine (FR, EN, Secrétariat).
// Polices : Montserrat 600/700 + Source Sans 3 400/600/700, sous-ensemble
// latin, font-display: swap, préchargées (cahier §3 et §17).
import { Montserrat, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { MOTION_HEAD_SCRIPT } from "@/lib/motion-script";
import "../../app/globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"], display: "swap", variable: "--font-montserrat" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap", variable: "--font-source-sans" });

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
