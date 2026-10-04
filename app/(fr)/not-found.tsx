import Link from "next/link";
import { s } from "@/lib/css";
import SiteShell from "@/components/sun/SiteShell";

export default function NotFound() {
  return (
    <SiteShell lang="fr" page="home" mobileCta={{ label: "Déposer un dossier", to: "/marche-financier#depot" }}>
      <section style={s(`padding:clamp(80px,12vw,160px) clamp(20px,4vw,48px);max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:20px;align-items:flex-start`)}>
        <h1 style={s(`margin:0;font:700 clamp(34px,5vw,60px)/1.06 'Montserrat';letter-spacing:-.028em;color:#261A66`)}>Page introuvable<span style={s(`color:#EF5F18`)}>.</span></h1>
        <p style={s(`margin:0;font:400 19px/1.55 'Source Sans 3';color:#5C5873`)}>Cette adresse n'existe pas ou a changé.</p>
        <Link href="/" className="hv-btn-orange" style={s(`height:56px;padding:0 26px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center`)}>Revenir à l'accueil</Link>
      </section>
    </SiteShell>
  );
}
