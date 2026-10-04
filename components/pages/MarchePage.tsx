// Marché financier — reproduit design/design_handoff_sun_market/
// « 04 Marché financier.dc.html » (cahier des charges §8).
import Link from "next/link";
import { s } from "@/lib/css";
import { href, type Lang, WHATSAPP } from "@/lib/routes";
import DepotForm from "@/components/forms/DepotForm";
import PageHero from "@/components/sun/PageHero";
import SiteShell from "@/components/sun/SiteShell";
import { WhatsAppIcon } from "@/components/sun/icons";
import { Eyebrow, H2, RiskBanner } from "@/components/sun/ui";

const T = {
  fr: {
    crumbs: ["Accueil", "Marché financier"],
    title: "Financer une entreprise, investir dans un cadre clair",
    lead: "SUN Market met en relation des entreprises qui émettent des actions ou des obligations avec des investisseurs inscrits. Chaque dossier est analysé avant d'être présenté.",
    company: "Je suis une entreprise", investor: "Je suis investisseur",
    issuers: "Entreprises émettrices", who: "Qui peut déposer un dossier ?",
    criteria: ["Entreprise du secteur technologique, en priorité", "Plus de deux ans d’existence", "Bilans des deux derniers exercices disponibles", "Immatriculation à jour (RCCM, Id. Nat., NIF)"],
    investors: "Investisseurs", invTitle: "Des opportunités présentées clairement.",
    invText: "Investisseurs professionnels, particuliers et cadres d'entreprise : vous recevez un dossier synthétique (activité, comptes, besoin, conditions) et vous décidez librement d'y souscrire ou non.",
    risk: "Risque de perte en capital", register: "M'inscrire comme investisseur",
    process: "Le parcours", processTitle: "De la demande d'émission à la transaction.",
    steps: [
      ["Demande d’émission", "L’entreprise dépose son dossier en ligne ou à nos bureaux de Gombe.", "Jour 1"],
      ["Analyse des documents", "Nos analystes examinent bilans, statuts et situation fiscale, et peuvent demander des compléments.", "2 à 4 semaines"],
      ["Présentation de l’opportunité", "Un dossier synthétique est rédigé avec l’entreprise : activité, besoin, conditions, risques.", "1 à 2 semaines"],
      ["Investisseurs", "L’opportunité est présentée aux investisseurs inscrits, qui posent leurs questions.", "Selon l’opération"],
      ["Souscription", "Chaque investisseur décide librement de souscrire et du montant engagé.", "Période définie"],
      ["Transaction", "Fonds et titres sont échangés sous contrat, avec suivi par SUN Market.", "Clôture"],
    ],
    depot: "Dépôt de dossier", depotTitle: "Déposez votre demande d'émission en 3 étapes.",
    depotLead: "Environ 10 minutes. Vos réponses sont enregistrées sur cet appareil : vous pouvez reprendre plus tard, même après une coupure de connexion.",
    bullets: ["Documents en PDF ou photo, 10 Mo max chacun", "Réponse d'un analyste sous 5 jours ouvrés", "Données traitées de façon confidentielle"],
    wa: "Une question ? WhatsApp",
    riskTitle: "Avertissement sur les risques",
    riskText: "Investir dans une entreprise, en actions comme en obligations, comporte un risque de perte partielle ou totale du capital, ainsi qu'un risque de liquidité. SUN Market analyse les dossiers mais ne garantit ni la réussite des entreprises ni aucun rendement.",
    riskLink: "Cadre et transparence", mobileCta: "Déposer un dossier",
  },
  en: {
    crumbs: ["Home", "Capital market"],
    title: "Finance a company, invest within a clear framework",
    lead: "SUN Market connects companies issuing shares or bonds with registered investors. Every application is reviewed before it is presented.",
    company: "I am a company", investor: "I am an investor",
    issuers: "Issuing companies", who: "Who can submit an application?",
    criteria: ["Technology companies, as a priority", "More than two years in business", "Financial statements for the last two years available", "Up-to-date registration (RCCM, Nat. ID, tax number)"],
    investors: "Investors", invTitle: "Opportunities presented clearly.",
    invText: "Professional and individual investors, and company executives: you receive a concise file (activity, accounts, need, terms) and decide freely whether or not to subscribe.",
    risk: "Risk of capital loss", register: "Register as an investor",
    process: "The process", processTitle: "From issuance request to transaction.",
    steps: [
      ["Issuance request", "The company submits its application online or at our offices in Gombe.", "Day 1"],
      ["Document review", "Our analysts review financial statements, articles and tax status, and may ask for more information.", "2 to 4 weeks"],
      ["Opportunity presentation", "A concise file is written with the company: activity, need, terms, risks.", "1 to 2 weeks"],
      ["Investors", "The opportunity is presented to registered investors, who ask their questions.", "Depends on the deal"],
      ["Subscription", "Each investor freely decides whether to subscribe and how much to commit.", "Set period"],
      ["Transaction", "Funds and securities are exchanged under contract, followed by SUN Market.", "Closing"],
    ],
    depot: "Application", depotTitle: "Submit your issuance request in 3 steps.",
    depotLead: "About 10 minutes. Your answers are saved on this device: you can come back later, even after losing your connection.",
    bullets: ["Documents as PDF or photo, 10 MB max each", "Answer from an analyst within 5 working days", "Data handled confidentially"],
    wa: "A question? WhatsApp",
    riskTitle: "Risk warning",
    riskText: "Investing in a company, through shares or bonds, carries a risk of partial or total loss of capital, as well as a liquidity risk. SUN Market reviews applications but guarantees neither the success of companies nor any return.",
    riskLink: "Framework & transparency", mobileCta: "Submit an application",
  },
};

export default function MarchePage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <SiteShell lang={lang} page="marche" active="marche" mobileCta={{ label: t.mobileCta, to: "#depot" }}>
      <PageHero img="finance" pos="65% 40%" crumbs={[{ label: t.crumbs[0], href: href("home", lang) }, { label: t.crumbs[1] }]} title={t.title} lead={t.lead}
        buttons={[{ label: t.company, href: "#depot", primary: true }, { label: t.investor, href: "#investisseurs" }]} />

      <section id="eligibilite" style={s(`padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px);scroll-margin-top:64px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:24px`)}>
          <div data-reveal="" style={s(`background:#fff;border-radius:16px;padding:clamp(28px,3vw,40px);display:flex;flex-direction:column;gap:18px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06)`)}>
            <Eyebrow>{t.issuers}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(24px,2.6vw,32px)/1.15 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>{t.who}</h2>
            <ul style={s(`margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px;font:400 17px/1.5 'Source Sans 3'`)}>
              {t.criteria.map((c) => (
                <li key={c} style={s(`display:flex;gap:12px`)}>
                  <span style={s(`flex:none;width:22px;height:22px;border-radius:50%;background:#EEEBFB;display:flex;align-items:center;justify-content:center;margin-top:1px`)}>
                    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="#261A66" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>{c}
                </li>
              ))}
            </ul>
          </div>
          <div id="investisseurs" data-reveal="" data-delay="80" style={s(`background:#EEEBFB;border-radius:16px;padding:clamp(28px,3vw,40px);display:flex;flex-direction:column;gap:18px;scroll-margin-top:96px`)}>
            <Eyebrow>{t.investors}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(24px,2.6vw,32px)/1.15 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>{t.invTitle}</h2>
            <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#261A66`)}>{t.invText}</p>
            <span style={s(`align-self:flex-start;display:flex;align-items:center;gap:8px;background:#FFF4EC;color:#8A3A0F;font:600 15px/1.3 'Source Sans 3';padding:10px 14px;border-radius:6px`)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4" /><path d="M12 17.5v.01" /></svg>{t.risk}
            </span>
            <Link href={href("contact", lang, "?sujet=financement#formulaire")} className="hv-btn-violet" style={s(`margin-top:auto;height:52px;padding:0 22px;border-radius:10px;background:#261A66;color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;align-self:flex-start;transition:background 180ms`)}>{t.register}</Link>
          </div>
        </div>
      </section>

      <section style={s(`padding:0 clamp(20px,4vw,48px) clamp(64px,9vw,120px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(40px,5vw,64px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px;max-width:720px`)}>
            <Eyebrow>{t.process}</Eyebrow>
            <H2>{t.processTitle}</H2>
          </div>
          <div className="sun-cards-3" style={s(`position:relative`)}>
            {t.steps.map(([title, text, delay], i) => (
              <div key={title} style={s(`position:relative;display:flex;flex-direction:column;gap:14px;padding:24px;border-radius:16px;background:#fff;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`)}>
                <div style={s(`display:flex;align-items:center;justify-content:space-between`)}>
                  <span style={s(`font:700 40px/1 'Montserrat';letter-spacing:-.03em;color:#261A66`)}>{String(i + 1).padStart(2, "0")}</span>
                  <span data-pop="" data-pop-delay={String((i % 3) * 120)} style={s(`width:14px;height:14px;border-radius:50%;background:#EF5F18;transition:transform 420ms cubic-bezier(.34,1.56,.64,1)`)} />
                </div>
                <strong style={s(`font:600 19px/1.3 'Montserrat';color:#261A66`)}>{title}</strong>
                <span style={s(`font:400 16px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{text}</span>
                <span style={s(`font:600 14px/1.3 'Source Sans 3';color:#261A66;display:flex;gap:8px;align-items:center`)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{delay}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depot" style={s(`background:#fff;padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px);scroll-margin-top:64px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(32px,5vw,72px);align-items:start`)}>
          <div className="sun-sticky-900" style={s(`display:flex;flex-direction:column;gap:20px`)}>
            <Eyebrow>{t.depot}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.1 'Montserrat';letter-spacing:-.02em;color:#261A66;text-wrap:balance`)}>{t.depotTitle}</h2>
            <p style={s(`margin:0;font:400 18px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{t.depotLead}</p>
            <div style={s(`display:flex;flex-direction:column;gap:10px;font:400 16px/1.5 'Source Sans 3';color:#1A1730`)}>
              {t.bullets.map((b) => <span key={b} style={s(`display:flex;gap:10px;align-items:center`)}><span style={s(`width:7px;height:7px;border-radius:50%;background:#EF5F18;flex:none`)} />{b}</span>)}
            </div>
            <a href={WHATSAPP} className="hv-tile" style={s(`align-self:flex-start;height:48px;padding:0 18px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #C9C3F0;color:#261A66;text-decoration:none;font:600 15px/1 'Montserrat';display:flex;align-items:center;gap:10px`)}><WhatsAppIcon />{t.wa}</a>
          </div>
          <DepotForm lang={lang} />
        </div>
      </section>

      <section style={s(`padding:clamp(48px,6vw,80px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto`)}>
          <RiskBanner title={t.riskTitle} linkLabel={t.riskLink} linkHref={href("cadre", lang, "#risques")}>{t.riskText}</RiskBanner>
        </div>
      </section>
    </SiteShell>
  );
}
