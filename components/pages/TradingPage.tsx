// Trading — reproduit design/design_handoff_sun_market/« 07 Trading.dc.html »
// (cahier des charges §10). Bandeau de risque immédiatement sous le hero,
// avant toute offre.
import { s } from "@/lib/css";
import { academy } from "@/lib/content";
import { href, type Lang, PHONE, PHONE_TEL, WHATSAPP } from "@/lib/routes";
import AcademyTabs from "@/components/pages/AcademyTabs";
import PageHero from "@/components/sun/PageHero";
import SiteShell from "@/components/sun/SiteShell";
import { ArrowRight, Icon } from "@/components/sun/icons";
import { Eyebrow, RiskBanner } from "@/components/sun/ui";

const ICONS = [
  ["M7 3h7l4 4v14H7z", "M14 3v4h4", "M10 16c1.5-2 2.5 1 4-1"],
  ["M12 3l9.5 17h-19z", "M12 10v4", "M12 17.5v.01"],
  ["M12 4v12", "M7 11l5 5 5-5", "M4 20h16"],
  ["M4 20h16", "M6 16V10", "M10 16V7", "M14 16v-4", "M18 16V9"],
];

const T = {
  fr: {
    crumbs: ["Accueil", "Trading"],
    title: "Confier votre capital ou apprendre à le gérer, en connaissant les risques",
    lead: "Deux services distincts : une gestion de capital encadrée par contrat notarié, et une académie pour comprendre les marchés à votre rythme.",
    b1: "Gestion sous mandat", b2: "Académie de trading",
    riskTitle: "Le trading comporte un risque élevé de perte",
    riskText: "Les marchés financiers sont volatils : vous pouvez perdre une partie ou la totalité du capital confié. N'engagez que des sommes dont vous n'avez pas besoin à court terme. Les résultats passés ne préjugent pas des résultats futurs et SUN Market ne garantit aucun gain.",
    riskLink: "Cadre et transparence",
    mandate: "Gestion sous mandat", mandateTitle: "Un contrat notarié, des règles écrites avant de commencer.",
    mandateText: "Vous confiez un capital à SUN Capital SARL pour qu'il soit géré sur les marchés. Tout est fixé dans un contrat signé devant notaire : montant, durée, risques, frais et conditions de retrait.",
    cards: [
      ["Contrat notarié", "Signé devant notaire, il fixe les droits et obligations de chaque partie."],
      ["Risques expliqués", "Le niveau de risque et le scénario de perte sont présentés par écrit avant signature."],
      ["Conditions de retrait", "Délais de préavis et modalités de retrait du capital définis dans le contrat."],
      ["Compte rendu régulier", "Un relevé périodique de la situation du capital, gains comme pertes."],
    ],
    before: "Avant de signer, vous recevez :", beforeText: "Un délai de réflexion pour relire le contrat, seul ou avec un conseil de votre choix.",
    docs: ["Le projet de contrat complet", "La fiche d’information sur les risques", "Le détail des frais de gestion", "Les conditions et délais de retrait"],
    academy: "Académie de trading", academyTitle: "Comprendre les marchés avant d'y engager de l'argent.",
    formats: [{ label: "En présentiel", lieu: "Gombe, Kinshasa" }, { label: "En ligne", lieu: "Visio + replays" }],
    weeks: (n: number | null) => `${n ?? "[n]"} semaines`, price: (p: number | null) => `${p ?? "[prix]"} USD`, pay: "Mobile Money, virement ou carte",
    durationWord: "durée", placeWord: "lieu", tablist: "Format",
    modules: [
      ["Les bases des marchés", "Actions, devises, matières premières : comment se forment les prix."],
      ["Lire un graphique", "Tendances, supports, résistances et volumes, sans jargon inutile."],
      ["Gérer le risque", "Taille de position, ordres de protection, et limites de perte acceptables."],
      ["Discipline et méthode", "Tenir un journal, évaluer ses décisions, éviter les erreurs fréquentes."],
    ] as [string, string][],
    enrol: "S'inscrire à la prochaine session",
    rdvTitle: "Un premier rendez-vous, sans engagement", rdvText: "Nous faisons le point sur votre situation et vos objectifs. Si la gestion sous mandat ne vous convient pas, nous vous le dirons.",
    risk: "Risque de perte en capital", wa: "Prendre rendez-vous sur WhatsApp", call: `Appeler le ${PHONE}`, mobileCta: "Prendre rendez-vous",
  },
  en: {
    crumbs: ["Home", "Trading"],
    title: "Entrust your capital or learn to manage it, knowing the risks",
    lead: "Two separate services: capital management governed by a notarised contract, and an academy to understand markets at your own pace.",
    b1: "Managed mandate", b2: "Trading academy",
    riskTitle: "Trading carries a high risk of loss",
    riskText: "Financial markets are volatile: you can lose part or all of the capital entrusted. Only commit money you do not need in the short term. Past results are not a guide to future results and SUN Market guarantees no gain.",
    riskLink: "Framework & transparency",
    mandate: "Managed mandate", mandateTitle: "A notarised contract, written rules before you start.",
    mandateText: "You entrust capital to SUN Capital SARL to be managed on the markets. Everything is set in a contract signed before a notary: amount, duration, risks, fees and withdrawal terms.",
    cards: [
      ["Notarised contract", "Signed before a notary, it sets out each party's rights and obligations."],
      ["Risks explained", "The risk level and the loss scenario are presented in writing before signing."],
      ["Withdrawal terms", "Notice periods and capital withdrawal terms defined in the contract."],
      ["Regular reporting", "A periodic statement of the capital's position, gains and losses alike."],
    ],
    before: "Before signing, you receive:", beforeText: "Time to reread the contract, on your own or with an adviser of your choice.",
    docs: ["The full draft contract", "The risk information sheet", "The breakdown of management fees", "The withdrawal terms and notice periods"],
    academy: "Trading academy", academyTitle: "Understand the markets before committing money.",
    formats: [{ label: "In person", lieu: "Gombe, Kinshasa" }, { label: "Online", lieu: "Video + replays" }],
    weeks: (n: number | null) => `${n ?? "[n]"} weeks`, price: (p: number | null) => `${p ?? "[price]"} USD`, pay: "Mobile Money, transfer or card",
    durationWord: "duration", placeWord: "location", tablist: "Format",
    modules: [
      ["Market basics", "Shares, currencies, commodities: how prices are formed."],
      ["Reading a chart", "Trends, support, resistance and volumes, without needless jargon."],
      ["Managing risk", "Position size, protective orders and acceptable loss limits."],
      ["Discipline and method", "Keeping a journal, assessing your decisions, avoiding common mistakes."],
    ] as [string, string][],
    enrol: "Enrol in the next session",
    rdvTitle: "A first meeting, with no commitment", rdvText: "We review your situation and your goals. If a managed mandate is not right for you, we will tell you.",
    risk: "Risk of capital loss", wa: "Book a meeting on WhatsApp", call: `Call ${PHONE}`, mobileCta: "Book a meeting",
  },
};

export default function TradingPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <SiteShell lang={lang} page="trading" active="trading" mobileCta={{ label: t.mobileCta, to: "#rdv" }}>
      <PageHero img="trading" pos="50% 50%" filter="grayscale(1) contrast(1.1)" curve="M-40 520 C 340 500, 600 300, 920 260 S 1340 140, 1520 60"
        overlayExtra={<div style={s(`position:absolute;inset:0;background:#261A66;mix-blend-mode:multiply;opacity:.85`)} />}
        crumbs={[{ label: t.crumbs[0], href: href("home", lang) }, { label: t.crumbs[1] }]} title={t.title} lead={t.lead}
        buttons={[{ label: t.b1, href: "#mandat", primary: true }, { label: t.b2, href: "#academie" }]} />

      <section style={s(`padding:clamp(32px,4vw,48px) clamp(20px,4vw,48px) 0`)}>
        <div style={s(`max-width:1224px;margin:0 auto`)}>
          <RiskBanner title={t.riskTitle} linkLabel={t.riskLink} linkHref={href("cadre", lang, "#risques")}>{t.riskText}</RiskBanner>
        </div>
      </section>

      <section id="mandat" style={s(`padding:clamp(64px,9vw,112px) clamp(20px,4vw,48px);scroll-margin-top:64px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(36px,5vw,56px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px;max-width:760px`)}>
            <Eyebrow>{t.mandate}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66;text-wrap:balance`)}>{t.mandateTitle}</h2>
            <p style={s(`margin:0;font:400 18px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{t.mandateText}</p>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px`)}>
            {t.cards.map(([title, d], i) => (
              <div key={title} data-reveal="" data-delay={String(i * 80)} style={s(`background:#fff;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:14px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`)}>
                <span style={s(`position:relative;width:52px;height:52px;border-radius:14px;background:#EEEBFB;display:flex;align-items:center;justify-content:center`)}>
                  <Icon size={26} color="#261A66" d={ICONS[i]} />
                  <span style={s(`position:absolute;right:9px;top:9px;width:6px;height:6px;border-radius:50%;background:#EF5F18`)} />
                </span>
                <h3 style={s(`margin:0;font:600 19px/1.3 'Montserrat';color:#261A66`)}>{title}</h3>
                <span style={s(`font:400 16px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{d}</span>
              </div>
            ))}
          </div>
          <div data-reveal="" style={s(`background:#261A66;color:#fff;border-radius:16px;padding:clamp(28px,4vw,48px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:32px;align-items:center`)}>
            <div style={s(`display:flex;flex-direction:column;gap:12px`)}>
              <strong style={s(`font:700 clamp(22px,2.4vw,28px)/1.2 'Montserrat'`)}>{t.before}</strong>
              <span style={s(`font:400 16px/1.55 'Source Sans 3';color:#E4E0F7`)}>{t.beforeText}</span>
            </div>
            <ul style={s(`margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px;font:400 17px/1.45 'Source Sans 3'`)}>
              {t.docs.map((d) => <li key={d} style={s(`display:flex;gap:12px;align-items:flex-start`)}><span style={s(`flex:none;width:8px;height:8px;border-radius:50%;background:#EF5F18;margin-top:8px`)} />{d}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="academie" style={s(`background:#EEEBFB;padding:clamp(64px,9vw,112px) clamp(20px,4vw,48px);scroll-margin-top:64px`)}>
        <AcademyTabs title={t.academyTitle} eyebrow={<Eyebrow>{t.academy}</Eyebrow>} tablistLabel={t.tablist}
          formats={t.formats.map((f) => ({ ...f, duree: t.weeks(academy.weeks) }))} modules={t.modules}
          priceLabel={t.price(academy.priceUsd)} payWord={t.pay} durationWord={t.durationWord} placeWord={t.placeWord} cta={t.enrol} ctaHref="#rdv" />
      </section>

      <section id="rdv" style={s(`padding:clamp(64px,9vw,112px) clamp(20px,4vw,48px);scroll-margin-top:64px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,72px);align-items:end`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:18px`)}>
            <h2 style={s(`margin:0;font:700 clamp(32px,4.4vw,56px)/1.06 'Montserrat';letter-spacing:-.028em;color:#261A66;text-wrap:balance`)}>{t.rdvTitle}<span style={s(`color:#EF5F18`)}>.</span></h2>
            <p style={s(`margin:0;font:400 19px/1.55 'Source Sans 3';color:#5C5873;max-width:520px`)}>{t.rdvText}</p>
          </div>
          <div style={s(`display:flex;flex-direction:column;gap:12px`)}>
            <span style={s(`display:flex;align-items:center;gap:8px;background:#FFF4EC;color:#8A3A0F;font:600 15px/1.3 'Source Sans 3';padding:10px 14px;border-radius:6px;align-self:flex-start`)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4" /><path d="M12 17.5v.01" /></svg>{t.risk}
            </span>
            <a href={WHATSAPP} className="hv-btn-orange" style={s(`height:60px;padding:0 28px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 17px/1 'Montserrat';display:flex;align-items:center;justify-content:space-between;transition:background 180ms;gap:12px`)}>{t.wa}<ArrowRight size={20} /></a>
            <a href={PHONE_TEL} className="hv-tile" style={s(`height:56px;padding:0 20px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1.5px #C9C3F0;color:#261A66;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;gap:10px`)}>{t.call}</a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
