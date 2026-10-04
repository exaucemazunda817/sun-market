// Gabarit commun des pages publiques (cahier §5) : lien d'évitement,
// en-tête, contenu, pied de page, barre d'action mobile, moteur d'animation.
import type { ReactNode } from "react";
import { s } from "@/lib/css";
import type { Lang, PageKey } from "@/lib/routes";
import Footer from "./Footer";
import Header from "./Header";
import MobileBar from "./MobileBar";
import Motion from "./Motion";

export default function SiteShell({
  lang, page, active = null, fixedHeader = false, ctaLabel, ctaHref, mobileCta, children,
}: {
  lang: Lang;
  page: PageKey;
  active?: PageKey | null;
  fixedHeader?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  mobileCta: { label: string; to: string };
  children: ReactNode;
}) {
  return (
    <div style={s(`position:relative;overflow-x:clip`)}>
      <a href="#contenu" className="skip-link">{lang === "en" ? "Skip to content" : "Aller au contenu"}</a>
      <Motion lang={lang} />
      <Header lang={lang} page={page} active={active} fixed={fixedHeader} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      <main id="contenu" tabIndex={-1} style={s(`outline:none`)}>{children}</main>
      <Footer lang={lang} />
      <MobileBar lang={lang} label={mobileCta.label} to={mobileCta.to} />
    </div>
  );
}
