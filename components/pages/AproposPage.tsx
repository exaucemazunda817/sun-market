// À propos — reproduit design/design_handoff_sun_market/« 08 A propos.dc.html »
// (cahier des charges §11). Le texte de « Notre histoire » reprend la
// présentation fournie par SUN Capital (dossier de structuration) à la place
// de la note provisoire de la maquette ; année de création et fondateurs restent à fournir.
import Link from "next/link";
import { s } from "@/lib/css";
import { legal } from "@/lib/content";
import { ADDRESS_EN, ADDRESS_FR, href, type Lang } from "@/lib/routes";
import PageHero from "@/components/sun/PageHero";
import SiteShell from "@/components/sun/SiteShell";
import { Eyebrow } from "@/components/sun/ui";

const T = {
  fr: {
    crumbs: ["Accueil", "À propos"],
    title: "Une équipe de Kinshasa au service des entreprises et des investisseurs",
    lead: "SUN Market est la plateforme de SUN Capital SARL. Notre mission : rapprocher les entreprises qui cherchent des capitaux et les investisseurs qui cherchent des opportunités qualifiées, dans un cadre structuré et accompagné.",
    story: "Notre histoire", storyTitle: "Née d'un constat simple.",
    storyP: [
      "Chez SUN Market, nous considérons que l'accès à la finance ne doit pas être réservé à une minorité. Nous construisons des solutions qui permettent à chacun de mieux comprendre, gérer et mobiliser ses ressources financières, tout en offrant aux entreprises des moyens supplémentaires de se développer.",
      "Notre mission : rendre les services financiers et fiscaux plus accessibles, structurés et compréhensibles. Notre vision : devenir une référence africaine dans l'accès aux services financiers et à l'accompagnement fiscal.",
    ],
    values: "Nos valeurs", valuesTitle: "Cinq engagements, tenus au quotidien.",
    valueList: [
      ["Sécurité financière", "Des contrats écrits, des procédures claires, des fonds suivis."],
      ["Transparence", "Les risques, les frais et les conditions sont dits avant tout engagement."],
      ["Rigueur", "Chaque dossier est analysé avec méthode avant d’être présenté."],
      ["Accompagnement", "Un interlocuteur joignable, de la première question à la transaction."],
      ["Confiance", "Elle se construit dans la durée, par la constance de nos actes."],
    ],
    team: "L'équipe", teamTitle: "Les personnes qui suivent vos dossiers.", teamNote: "Photos et noms publiés uniquement avec l'accord de chaque membre de l'équipe.",
    roles: ["[Fonction · Direction générale]", "[Fonction · Analyse financière]", "[Fonction · Conseil fiscal]", "[Fonction · Formation trading]"], name: "[Prénom Nom]", photo: "photo · portrait au bureau",
    company: "Une société enregistrée, une adresse physique.",
    dl: ["Forme", "RCCM", "Id. Nat.", "NIF", "Siège"], forme: legal.forme, tbd: "[à fournir]", address: ADDRESS_FR,
    meet: "Venez nous rencontrer à Gombe", contact: "Nous contacter",
  },
  en: {
    crumbs: ["Home", "About"],
    title: "A Kinshasa team serving companies and investors",
    lead: "SUN Market is the platform of SUN Capital SARL. Our mission: bring together companies seeking capital and investors seeking qualified opportunities, within a structured and supported framework.",
    story: "Our story", storyTitle: "Born from a simple observation.",
    storyP: [
      "At SUN Market, we believe access to finance should not be reserved for a few. We build solutions that help everyone better understand, manage and mobilise their financial resources, while giving companies more ways to grow.",
      "Our mission: make financial and tax services more accessible, structured and understandable. Our vision: become an African reference for access to financial services and tax support.",
    ],
    values: "Our values", valuesTitle: "Five commitments, kept every day.",
    valueList: [
      ["Financial security", "Written contracts, clear procedures, funds that are tracked."],
      ["Transparency", "Risks, fees and terms are stated before any commitment."],
      ["Rigour", "Every application is reviewed methodically before it is presented."],
      ["Support", "A reachable contact, from the first question to the transaction."],
      ["Trust", "It is built over time, through consistent action."],
    ],
    team: "The team", teamTitle: "The people who follow your applications.", teamNote: "Photos and names are published only with each team member's consent.",
    roles: ["[Role · Management]", "[Role · Financial analysis]", "[Role · Tax advisory]", "[Role · Trading training]"], name: "[First name Last name]", photo: "photo · office portrait",
    company: "A registered company, a physical address.",
    dl: ["Legal form", "RCCM", "Nat. ID", "Tax no.", "Head office"], forme: "Limited liability company (SARL)", tbd: "[to be provided]", address: ADDRESS_EN,
    meet: "Come and meet us in Gombe", contact: "Contact us",
  },
};

export default function AproposPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const dd = [t.forme, legal.rccm ?? t.tbd, legal.idNat ?? t.tbd, legal.nif ?? t.tbd, t.address];
  return (
    <SiteShell lang={lang} page="apropos" active="apropos" mobileCta={{ label: lang === "en" ? "Submit an application" : "Déposer un dossier", to: href("marche", lang, "#depot") }}>
      <PageHero img="apropos" pos="60% 30%" curve="M-40 540 C 380 520, 620 280, 960 240 S 1360 120, 1520 40"
        crumbs={[{ label: t.crumbs[0], href: href("home", lang) }, { label: t.crumbs[1] }]} title={t.title} lead={t.lead} buttons={[]} />

      <section style={s(`padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(32px,5vw,80px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px`)}>
            <Eyebrow>{t.story}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66;text-wrap:balance`)}>{t.storyTitle}</h2>
          </div>
          <div data-reveal="" data-delay="80" style={s(`display:flex;flex-direction:column;gap:18px;font:400 18px/1.65 'Source Sans 3'`)}>
            <p style={s(`margin:0;text-wrap:pretty`)}>{t.storyP[0]}</p>
            <p style={s(`margin:0;text-wrap:pretty;color:#5C5873`)}>{t.storyP[1]}</p>
          </div>
        </div>
      </section>

      <section style={s(`background:#EEEBFB;padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(36px,5vw,56px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px;max-width:720px`)}>
            <Eyebrow>{t.values}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>{t.valuesTitle}</h2>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:16px`)}>
            {t.valueList.map(([title, d], i) => (
              <div key={title} data-reveal="" data-delay={String(i * 60)} style={s(`background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:12px`)}>
                <span style={s(`font:700 28px/1 'Montserrat';letter-spacing:-.03em;color:#261A66`)}>{i + 1}<span style={s(`color:#EF5F18`)}>.</span></span>
                <h3 style={s(`margin:0;font:600 18px/1.3 'Montserrat';color:#261A66`)}>{title}</h3>
                <span style={s(`font:400 15px/1.5 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={s(`padding:clamp(64px,9vw,120px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(36px,5vw,56px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px;max-width:720px`)}>
            <Eyebrow>{t.team}</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>{t.teamTitle}</h2>
            <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#5C5873`)}>{t.teamNote}</p>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:24px`)}>
            {t.roles.map((r, i) => (
              <div key={r} data-reveal="" data-delay={String(i * 60)} style={s(`display:flex;flex-direction:column;gap:14px`)}>
                <div aria-hidden="true" style={s(`aspect-ratio:4/5;border-radius:16px;background:#E6E6E6;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:16px`)}>
                  <div style={s(`position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent 0 14px,rgba(38,26,102,.05) 14px 15px)`)} />
                  <span style={s(`position:relative;font:600 12px/1.3 ui-monospace,Menlo,monospace;color:#5C5873`)}>{t.photo}</span>
                </div>
                <div style={s(`display:flex;flex-direction:column;gap:4px`)}>
                  <strong style={s(`font:600 18px/1.3 'Montserrat';color:#261A66`)}>{t.name}</strong>
                  <span style={s(`font:400 15px/1.4 'Source Sans 3';color:#5C5873`)}>{r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={s(`background:#261A66;color:#fff;padding:clamp(56px,8vw,96px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:40px;align-items:center`)}>
          <div style={s(`display:flex;flex-direction:column;gap:14px`)}>
            <Eyebrow onViolet>SUN Capital SARL</Eyebrow>
            <h2 style={s(`margin:0;font:700 clamp(26px,3vw,36px)/1.15 'Montserrat';letter-spacing:-.02em`)}>{t.company}</h2>
          </div>
          <dl style={s(`margin:0;display:grid;grid-template-columns:minmax(110px,auto) minmax(0,1fr);gap:12px 24px;font:400 17px/1.45 'Source Sans 3'`)}>
            {t.dl.map((k, i) => (
              <div key={k} style={s(`display:contents`)}>
                <dt style={s(`font:700 14px/1.6 'Montserrat';color:#C9C3F0`)}>{k}</dt>
                <dd style={s(`margin:0`)}>{dd[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section style={s(`padding:clamp(56px,8vw,96px) clamp(20px,4vw,48px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px`)}>
          <h2 style={s(`margin:0;font:700 clamp(26px,3.4vw,40px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66;max-width:640px`)}>{t.meet}<span style={s(`color:#EF5F18`)}>.</span></h2>
          <Link href={href("contact", lang)} className="hv-btn-orange" style={s(`height:56px;padding:0 26px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;transition:background 180ms`)}>{t.contact}</Link>
        </div>
      </section>
    </SiteShell>
  );
}
