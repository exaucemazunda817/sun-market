// Reproduit design/design_handoff_sun_market/SUN Footer.dc.html (cahier §5).
import Link from "next/link";
import { s } from "@/lib/css";
import { href, type Lang, PHONE, PHONE_TEL, ADDRESS_FR, ADDRESS_EN } from "@/lib/routes";
import { legal } from "@/lib/content";

export default function Footer({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const L = (label: string, to: string) => ({ label, to });
  const cols = en
    ? [
        { title: "Services", links: [L("Capital market", href("marche", lang)), L("Trading", href("trading", lang)), L("Tax advisory", href("fiscal", lang))] },
        { title: "SUN Market", links: [L("About", href("apropos", lang)), L("News", href("actus", lang)), L("Contact", href("contact", lang)), L("Staff area", "/secretariat")] },
        { title: "Legal", links: [L("Framework & transparency", href("cadre", lang)), L("Risk warnings", href("cadre", lang, "#risques")), L("Data protection", href("cadre", lang, "#donnees"))] },
      ]
    : [
        { title: "Services", links: [L("Marché financier", href("marche", lang)), L("Trading", href("trading", lang)), L("Conseil fiscal", href("fiscal", lang))] },
        { title: "SUN Market", links: [L("À propos", href("apropos", lang)), L("Actualités", href("actus", lang)), L("Contact", href("contact", lang)), L("Espace Secrétariat", "/secretariat")] },
        { title: "Cadre", links: [L("Cadre et transparence", href("cadre", lang)), L("Avertissements sur les risques", href("cadre", lang, "#risques")), L("Protection des données", href("cadre", lang, "#donnees"))] },
      ];
  const about = en ? `The platform of SUN Capital SARL. ${ADDRESS_EN}.` : `Plateforme de SUN Capital SARL. ${ADDRESS_FR}.`;
  const tbd = en ? "to be provided" : "à fournir";
  const v = (x: string | null) => x ?? `[${tbd}]`;

  return (
    <>
      <footer style={s(`background:#170F45;color:#C9C3F0;padding:clamp(48px,6vw,72px) clamp(20px,4vw,48px) 40px;font-family:'Source Sans 3',sans-serif`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:40px`)}>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:32px`)}>
            <div style={s(`display:flex;flex-direction:column;gap:14px;min-width:220px`)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-blanc.webp" alt="SUN Market" width={92} height={52} loading="lazy" style={s(`height:52px;width:auto;align-self:flex-start`)} />
              <span style={s(`font:400 15px/1.55 'Source Sans 3'`)}>{about}</span>
            </div>
            {cols.map((c) => (
              <div key={c.title} style={s(`display:flex;flex-direction:column;gap:8px`)}>
                <strong style={s(`font:700 13px/1 'Montserrat';letter-spacing:.12em;text-transform:uppercase;color:#fff;margin-bottom:8px`)}>{c.title}</strong>
                {c.links.map((l) => (
                  <Link key={l.to} href={l.to} className="hv-link-orange" style={s(`color:#C9C3F0;text-decoration:none;font:400 16px/1.4 'Source Sans 3';padding:4px 0`)}>{l.label}</Link>
                ))}
              </div>
            ))}
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;padding-top:24px;box-shadow:inset 0 1px 0 rgba(201,195,240,.18);font:400 14px/1.5 'Source Sans 3'`)}>
            <span>© 2026 SUN Capital SARL · RCCM {v(legal.rccm)} · Id. Nat. {v(legal.idNat)} · NIF {v(legal.nif)}</span>
            <a href={PHONE_TEL} style={s(`color:#C9C3F0`)}>{PHONE}</a>
          </div>
        </div>
      </footer>
      {/* Le pied de page reçoit 72 px de violet en plus sous 760 px pour ne pas être masqué par la barre d'action. */}
      <div className="sun-footer-spacer" style={s(`height:72px;background:#170F45`)} />
    </>
  );
}
