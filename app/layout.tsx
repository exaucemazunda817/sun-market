import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { company, pageContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

// Remplacement temporaire de Gotham/Neco (charte graphique) : aucun fichier de
// police fourni, et Gotham nécessite une licence web payante (Hoefler & Co.).
// Inter/Space Grotesk sont visuellement proches, gratuites et libres d'usage
// commercial — à remplacer si Mazunda fournit les vraies polices sous licence.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.nomCommercial} — ${company.tagline}`,
    template: `%s — ${company.nomCommercial}`,
  },
  description: pageContent.accueil.heroSubtitle,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: company.nomCommercial,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun-orange focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
