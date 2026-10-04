// Cadre et transparence — reproduit design/design_handoff_sun_market/
// « 09 Cadre et transparence.dc.html » (cahier §12). Ancres utilisées par le
// pied de page : #risques, #donnees. Textes juridiques à valider par le conseil de SUN.
import Link from "next/link";
import { s } from "@/lib/css";
import { legal, legalUpdatedAt } from "@/lib/content";
import { ADDRESS_EN, ADDRESS_FR, href, type Lang, PHONE, PHONE_TEL } from "@/lib/routes";
import CadreToc from "@/components/pages/CadreToc";
import SiteShell from "@/components/sun/SiteShell";

const T = {
  fr: {
    crumbs: ["Accueil", "Cadre et transparence"], title: "Cadre et transparence",
    lead: (d: string) => `Ce que nous sommes, ce que nous faisons, ce que nous ne promettons pas. Mis à jour le ${d}.`, date: "[date]",
    toc: "Sommaire",
    secs: [["statut", "Statut juridique"], ["contrats", "Contrats"], ["risques", "Avertissements sur les risques"], ["engagements", "Ce que nous ne faisons pas"], ["donnees", "Protection des données"]] as [string, string][],
    statut: "SUN Market est une plateforme exploitée par SUN Capital SARL, société à responsabilité limitée de droit congolais.",
    dl: ["RCCM", "Id. Nat.", "NIF", "Siège", "Contact"], tbd: "[à fournir]", address: ADDRESS_FR,
    contractsIntro: "Chaque service repose sur un contrat écrit remis avant tout engagement.",
    contracts: [
      ["Convention de mise en relation", "Entre SUN Market et l’entreprise émettrice : rôle de chacun, frais, confidentialité."],
      ["Contrat de gestion sous mandat (notarié)", "Montant, durée, risques, frais de gestion, compte rendu, conditions de retrait."],
      ["Abonnement conseil fiscal", "Services inclus, tarif mensuel, résiliation sans engagement."],
    ],
    riskHead: "À lire avant d'investir",
    risks: [
      "Tout investissement comporte un risque de perte partielle ou totale du capital.",
      "Les titres d’entreprises non cotées peuvent être difficiles à revendre (risque de liquidité).",
      "Le trading expose à une forte volatilité : les pertes peuvent être rapides.",
      "Les performances passées ne préjugent pas des performances futures.",
      "Diversifiez vos placements et n’investissez que ce que vous pouvez vous permettre de perdre.",
    ],
    nevers: ["Nous ne promettons aucun rendement ni aucun gain.", "Nous ne recevons pas de fonds sans contrat écrit signé.", "Nous ne présentons pas d’entreprise sans analyse de ses documents.", "Nous ne publions aucun témoignage ou chiffre qui ne soit réel et daté."],
    data1: "Les informations transmises (formulaires, documents de dossier, coordonnées) servent uniquement à traiter votre demande et à exécuter nos contrats. Elles ne sont ni vendues ni cédées à des tiers.",
    data2a: "Vous pouvez demander à consulter, corriger ou supprimer vos données en écrivant à ", data2b: " ou à nos bureaux. Les documents de dossier sont conservés pendant la durée légale applicable, puis détruits.",
    note: "Texte indicatif, à valider par le conseil juridique de SUN Capital SARL.",
  },
  en: {
    crumbs: ["Home", "Framework & transparency"], title: "Framework & transparency",
    lead: (d: string) => `What we are, what we do, what we do not promise. Updated on ${d}.`, date: "[date]",
    toc: "Contents",
    secs: [["statut", "Legal status"], ["contrats", "Contracts"], ["risques", "Risk warnings"], ["engagements", "What we do not do"], ["donnees", "Data protection"]] as [string, string][],
    statut: "SUN Market is a platform operated by SUN Capital SARL, a limited liability company under Congolese law.",
    dl: ["RCCM", "Nat. ID", "Tax no.", "Head office", "Contact"], tbd: "[to be provided]", address: ADDRESS_EN,
    contractsIntro: "Each service rests on a written contract provided before any commitment.",
    contracts: [
      ["Introduction agreement", "Between SUN Market and the issuing company: each party's role, fees, confidentiality."],
      ["Managed mandate contract (notarised)", "Amount, duration, risks, management fees, reporting, withdrawal terms."],
      ["Tax advisory subscription", "Services included, monthly fee, cancellation with no commitment."],
    ],
    riskHead: "Read before investing",
    risks: [
      "All investment carries a risk of partial or total loss of capital.",
      "Shares in unlisted companies can be hard to resell (liquidity risk).",
      "Trading involves high volatility: losses can be quick.",
      "Past performance is not a guide to future performance.",
      "Diversify your investments and only invest what you can afford to lose.",
    ],
    nevers: ["We promise no return and no gain.", "We accept no funds without a signed written contract.", "We present no company without reviewing its documents.", "We publish no testimonial or figure that is not real and dated."],
    data1: "The information you send (forms, application documents, contact details) is used only to process your request and perform our contracts. It is never sold or passed on to third parties.",
    data2a: "You can ask to access, correct or delete your data by writing to ", data2b: " or at our offices. Application documents are kept for the applicable legal period, then destroyed.",
    note: "Indicative text, to be validated by SUN Capital SARL's legal counsel.",
  },
};

const h2 = `margin:0;font:700 clamp(26px,3vw,34px)/1.15 'Montserrat';letter-spacing:-.02em;color:#261A66`;
const sec = `display:flex;flex-direction:column;gap:18px;scroll-margin-top:100px`;

export default function CadrePage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const dd = [legal.rccm ?? t.tbd, legal.idNat ?? t.tbd, legal.nif ?? t.tbd, t.address];
  return (
    <SiteShell lang={lang} page="cadre" mobileCta={{ label: lang === "en" ? "Submit an application" : "Déposer un dossier", to: href("marche", lang, "#depot") }}>
      <section style={s(`background:#261A66;color:#fff;padding:clamp(48px,7vw,96px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:20px`)}>
          <nav aria-label={lang === "en" ? "Breadcrumb" : "Fil d'Ariane"} style={s(`font:400 14px/1 'Source Sans 3';color:#C9C3F0;display:flex;gap:8px`)}>
            <Link href={href("home", lang)} style={s(`color:#C9C3F0`)}>{t.crumbs[0]}</Link><span aria-hidden="true">/</span><span aria-current="page" style={s(`color:#fff`)}>{t.crumbs[1]}</span>
          </nav>
          <h1 style={s(`margin:0;font:700 clamp(34px,5vw,60px)/1.06 'Montserrat';letter-spacing:-.028em;max-width:820px;text-wrap:balance`)}>{t.title}<span style={s(`color:#EF5F18`)}>.</span></h1>
          <p style={s(`margin:0;font:400 clamp(18px,1.6vw,20px)/1.55 'Source Sans 3';color:#E4E0F7;max-width:640px`)}>{t.lead(legalUpdatedAt ?? t.date)}</p>
        </div>
      </section>

      <div className="sun-cadre-grid" style={s(`max-width:1224px;margin:0 auto;padding:clamp(48px,7vw,88px) clamp(20px,4vw,48px) clamp(64px,9vw,120px);display:grid;gap:clamp(32px,5vw,72px);align-items:start`)}>
        <CadreToc items={t.secs} label={t.toc} />
        <div style={s(`display:flex;flex-direction:column;gap:clamp(56px,7vw,88px);max-width:760px;font:400 18px/1.65 'Source Sans 3'`)}>
          <section id="statut" style={s(sec)}>
            <h2 style={s(h2)}>{t.secs[0][1]}</h2>
            <p style={s(`margin:0`)}>{t.statut}</p>
            <dl data-reveal="" style={s(`margin:0;display:grid;grid-template-columns:minmax(110px,auto) minmax(0,1fr);gap:10px 24px;background:#fff;border-radius:16px;padding:24px 28px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05);font:400 17px/1.45 'Source Sans 3'`)}>
              {t.dl.map((k, i) => (
                <div key={k} style={s(`display:contents`)}>
                  <dt style={s(`font:700 14px/1.6 'Montserrat';color:#5C5873`)}>{k}</dt>
                  <dd style={s(`margin:0`)}>{i < 4 ? dd[i] : <a href={PHONE_TEL}>{PHONE}</a>}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="contrats" style={s(sec)}>
            <h2 style={s(h2)}>{t.secs[1][1]}</h2>
            <p style={s(`margin:0`)}>{t.contractsIntro}</p>
            <div style={s(`display:flex;flex-direction:column;gap:12px`)}>
              {t.contracts.map(([title, d], i) => (
                <div key={title} data-reveal="" data-delay={String(i * 70)} style={s(`display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;background:#fff;border-radius:10px;padding:18px 20px;box-shadow:0 1px 2px rgba(38,26,102,.06)`)}>
                  <span style={s(`width:44px;height:44px;border-radius:10px;background:#EEEBFB;display:flex;align-items:center;justify-content:center`)}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#261A66" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M10 16c1.5-2 2.5 1 4-1" /></svg>
                  </span>
                  <div style={s(`display:flex;flex-direction:column;gap:2px`)}>
                    <h3 style={s(`margin:0;font:600 17px/1.3 'Montserrat';color:#261A66`)}>{title}</h3>
                    <span style={s(`font:400 16px/1.5 'Source Sans 3';color:#5C5873`)}>{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="risques" style={s(sec)}>
            <h2 style={s(h2)}>{t.secs[2][1]}</h2>
            <div role="note" data-reveal="" style={s(`background:#FFF4EC;border-radius:10px;padding:24px 28px;display:flex;flex-direction:column;gap:14px;color:#8A3A0F`)}>
              <strong style={s(`font:700 18px/1.3 'Montserrat';display:flex;gap:10px;align-items:center`)}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4" /><path d="M12 17.5v.01" /></svg>{t.riskHead}
              </strong>
              <ul style={s(`margin:0;padding:0 0 0 4px;list-style:none;display:flex;flex-direction:column;gap:10px;font:400 17px/1.55 'Source Sans 3'`)}>
                {t.risks.map((r) => <li key={r} style={s(`display:flex;gap:12px`)}><span style={s(`flex:none;width:7px;height:7px;border-radius:50%;background:#B8460E;margin-top:10px`)} />{r}</li>)}
              </ul>
            </div>
          </section>

          <section id="engagements" style={s(sec)}>
            <h2 style={s(h2)}>{t.secs[3][1]}</h2>
            <ul style={s(`margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px`)}>
              {t.nevers.map((n, i) => (
                <li key={n} data-reveal="" data-delay={String(i * 70)} style={s(`display:flex;gap:14px;align-items:flex-start`)}>
                  <span style={s(`flex:none;width:24px;height:24px;border-radius:50%;background:#261A66;display:flex;align-items:center;justify-content:center;margin-top:2px`)}>
                    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </span>{n}
                </li>
              ))}
            </ul>
          </section>

          <section id="donnees" style={s(sec)}>
            <h2 style={s(h2)}>{t.secs[4][1]}</h2>
            <p style={s(`margin:0`)}>{t.data1}</p>
            <p style={s(`margin:0`)}>{t.data2a}<a href={`mailto:${legal.email}`}>{legal.email}</a>{t.data2b}</p>
            <p style={s(`margin:0;font:400 15px/1.5 'Source Sans 3';color:#5C5873`)}>{t.note}</p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
