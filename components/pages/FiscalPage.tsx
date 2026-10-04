// Conseil fiscal — reproduit design/design_handoff_sun_market/
// « 05 Conseil fiscal.dc.html » (cahier des charges §9).
import { s } from "@/lib/css";
import { href, type Lang, WHATSAPP } from "@/lib/routes";
import SubscribeCard from "@/components/forms/SubscribeCard";
import Accordion from "@/components/sun/Accordion";
import PageHero from "@/components/sun/PageHero";
import SiteShell from "@/components/sun/SiteShell";
import { Icon, WhatsAppIcon } from "@/components/sun/icons";
import { Eyebrow } from "@/components/sun/ui";

const ICONS = [
  ["M4 9l1.5-5h13L20 9", "M4 9v11h16V9", "M4 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3", "M10 20v-5h4v5"],
  ["M9 3h6v4H9z", "M8 7h8l1 4v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z", "M7 13h10"],
  ["M3 10h18", "M5 10v10", "M19 10v10", "M3 20h18", "M7 10V6a5 5 0 0 1 10 0v4"],
];

const T = {
  fr: {
    crumbs: ["Accueil", "Conseil fiscal"],
    title: "Votre commerce en règle, chaque mois, sans y passer vos journées",
    lead: "Un abonnement mensuel d'accompagnement administratif et fiscal pour les boutiques, commerces de cosmétiques et comptoirs de Kinshasa.",
    see: "Voir l'abonnement", ask: "Poser une question",
    who: "Pour qui", whoTitle: "Vous tenez votre commerce. Les formalités vous prennent du temps.",
    whoText: "Déclarations à date fixe, documents à conserver, contrôles à préparer : pour un petit opérateur économique, ces obligations sont lourdes à suivre seul. Un retard peut entraîner des pénalités.",
    audiences: [["Boutiques", "Vêtements, électronique, articles du quotidien."], ["Commerces de cosmétiques", "Points de vente et distributeurs de produits de beauté."], ["Comptoirs", "Comptoirs de vente et petits négoces."]],
    sub: "L'abonnement", subTitle: "Ce que comprend l'abonnement mensuel.",
    includes: [
      ["Un conseiller dédié", "Une seule personne qui connaît votre commerce, joignable par WhatsApp."],
      ["Déclarations fiscales préparées", "Préparation et dépôt de vos déclarations dans les délais."],
      ["Calendrier des échéances", "Un rappel avant chaque date importante, pour éviter les pénalités."],
      ["Classement de vos documents", "Factures, reçus et justificatifs organisés et conservés."],
      ["Démarches administratives", "Aide pour vos formalités d’immatriculation et de mise à jour."],
      ["Accompagnement en cas de contrôle", "Préparation des documents et présence à vos côtés si nécessaire."],
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      ["Je ne connais pas bien mes obligations fiscales. Est-ce un problème ?", "Non. Au premier rendez-vous, votre conseiller fait le point sur votre situation et vous explique, simplement, ce qui s’applique à votre activité."],
      ["Dois-je venir à vos bureaux chaque mois ?", "Non. La plupart des échanges se font par téléphone ou WhatsApp. Vous pouvez aussi passer à nos bureaux de Gombe si vous le préférez."],
      ["Comment résilier ?", "L’abonnement est sans engagement. Prévenez votre conseiller avant la date de renouvellement, par WhatsApp ou à nos bureaux."],
      ["Puis-je payer en francs congolais ?", "Oui, par Mobile Money, au taux du jour indiqué au moment du paiement."],
    ] as [string, string][],
    mobileCta: "S'abonner",
  },
  en: {
    crumbs: ["Home", "Tax advisory"],
    title: "Your business compliant every month, without spending your days on it",
    lead: "A monthly administrative and tax support subscription for shops, cosmetics retailers and trading counters in Kinshasa.",
    see: "See the subscription", ask: "Ask a question",
    who: "Who it is for", whoTitle: "You run your business. Paperwork takes up your time.",
    whoText: "Filings on fixed dates, documents to keep, inspections to prepare: for a small business, these obligations are hard to follow alone. A delay can lead to penalties.",
    audiences: [["Shops", "Clothing, electronics, everyday items."], ["Cosmetics retailers", "Beauty product outlets and distributors."], ["Trading counters", "Sales counters and small trading businesses."]],
    sub: "The subscription", subTitle: "What the monthly subscription includes.",
    includes: [
      ["A dedicated advisor", "One person who knows your business, reachable on WhatsApp."],
      ["Tax returns prepared", "Your returns prepared and filed on time."],
      ["Deadline calendar", "A reminder before each key date, to avoid penalties."],
      ["Your documents filed", "Invoices, receipts and supporting documents organised and kept."],
      ["Administrative formalities", "Help with registration and update formalities."],
      ["Support during inspections", "Documents prepared and someone by your side if needed."],
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      ["I don't know my tax obligations well. Is that a problem?", "No. At the first meeting, your advisor reviews your situation and explains, simply, what applies to your business."],
      ["Do I need to come to your offices every month?", "No. Most exchanges happen by phone or WhatsApp. You can also visit our offices in Gombe if you prefer."],
      ["How do I cancel?", "The subscription has no commitment. Let your advisor know before the renewal date, via WhatsApp or at our offices."],
      ["Can I pay in Congolese francs?", "Yes, by Mobile Money, at the day's rate shown at the time of payment."],
    ] as [string, string][],
    mobileCta: "Subscribe",
  },
};

export default function FiscalPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <SiteShell lang={lang} page="fiscal" active="fiscal" mobileCta={{ label: t.mobileCta, to: "#abonnement" }}>
      <PageHero img="fiscal" pos="70% 50%" filter="saturate(.8)" curve="M-40 80 C 380 60, 600 420, 980 440 S 1360 360, 1520 260"
        crumbs={[{ label: t.crumbs[0], href: href("home", lang) }, { label: t.crumbs[1] }]} title={t.title} lead={t.lead}
        buttons={[{ label: t.see, href: "#abonnement", primary: true }, { label: t.ask, href: WHATSAPP, external: true, icon: <WhatsAppIcon /> }]} />

      <section style={s(`padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(36px,5vw,56px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px;max-width:760px`)}>
            <Eyebrow>{t.who}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66;text-wrap:balance`)}>{t.whoTitle}</h2>
            <p style={s(`margin:0;font:400 18px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{t.whoText}</p>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px`)}>
            {t.audiences.map(([title, text], i) => (
              <div key={title} data-reveal="" data-delay={String(i * 80)} data-tilt="" style={s(`background:#fff;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:14px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06)`)}>
                <span style={s(`position:relative;width:52px;height:52px;border-radius:14px;background:#EEEBFB;display:flex;align-items:center;justify-content:center`)}>
                  <Icon size={26} color="#261A66" d={ICONS[i]} />
                  <span style={s(`position:absolute;right:9px;top:9px;width:6px;height:6px;border-radius:50%;background:#EF5F18`)} />
                </span>
                <h3 style={s(`margin:0;font:600 20px/1.3 'Montserrat';color:#261A66`)}>{title}</h3>
                <span style={s(`font:400 16px/1.55 'Source Sans 3';color:#5C5873`)}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="abonnement" style={s(`background:#EEEBFB;padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px);scroll-margin-top:64px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr));gap:clamp(32px,5vw,64px);align-items:start`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:22px`)}>
            <Eyebrow>{t.sub}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66;text-wrap:balance`)}>{t.subTitle}</h2>
            <ul style={s(`margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px`)}>
              {t.includes.map(([title, d], i) => (
                <li key={title} data-reveal="" data-delay={String(i * 60)} style={s(`display:grid;grid-template-columns:28px minmax(0,1fr);gap:14px;padding:14px 0;box-shadow:inset 0 -1px 0 rgba(38,26,102,.1)`)}>
                  <span style={s(`width:24px;height:24px;border-radius:50%;background:#261A66;display:flex;align-items:center;justify-content:center;margin-top:1px`)}>
                    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div style={s(`display:flex;flex-direction:column;gap:2px`)}>
                    <strong style={s(`font:600 17px/1.35 'Montserrat';color:#261A66`)}>{title}</strong>
                    <span style={s(`font:400 16px/1.5 'Source Sans 3';color:#5C5873`)}>{d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <SubscribeCard lang={lang} />
        </div>
      </section>

      <section style={s(`padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:880px;margin:0 auto;display:flex;flex-direction:column;gap:28px`)}>
          <h2 data-reveal="" style={s(`margin:0;font:700 clamp(28px,3.6vw,40px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>{t.faqTitle}</h2>
          <Accordion items={t.faq} />
        </div>
      </section>
    </SiteShell>
  );
}
