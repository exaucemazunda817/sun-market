// Accueil FR / EN — reproduit design/design_handoff_sun_market/
// « 03 Accueil.dc.html » et « 03 Home EN.dc.html » (cahier des charges §7).
import Link from "next/link";
import { s } from "@/lib/css";
import { impact, impactDate } from "@/lib/content";
import { href, type Lang, ADDRESS_EN, ADDRESS_FR, PHONE, PHONE_TEL, WHATSAPP } from "@/lib/routes";
import GridPattern from "@/components/sun/GridPattern";
import IntroLogo from "@/components/sun/IntroLogo";
import SiteShell from "@/components/sun/SiteShell";
import { ArrowRight, Icon, PhoneIcon, WhatsAppIcon } from "@/components/sun/icons";
import { Eyebrow, H2, RiskBanner, RiskTag } from "@/components/sun/ui";

const T = {
  fr: {
    eyebrow: "Equity & investment marketplace · Kinshasa",
    words: ["Relier", "les", "entreprises", "et", "les", "investisseurs,", "dans", "un", "cadre", "structuré."],
    lead: "SUN Market accompagne les entreprises qui cherchent des capitaux et les investisseurs qui cherchent des opportunités qualifiées : analyse des dossiers, mise en relation et suivi jusqu'à la transaction.",
    cta: "Déposer un dossier",
    invest: "Je souhaite investir",
    bullets: ["Dossiers analysés", "Contrats notariés", "Accompagnement à chaque étape"],
    glanceEyebrow: "Sun Market en un coup d'œil",
    glanceTitle: "Une plateforme qui relie deux besoins.",
    nodes: [
      { title: "Les entreprises", text: "Elles déposent un dossier : activité, bilans, besoin de financement." },
      { title: "La plateforme", text: "Nous analysons les documents et présentons l’opportunité de façon claire." },
      { title: "Les investisseurs", text: "Ils étudient l’opportunité et décident librement d’y souscrire." },
    ],
    servicesEyebrow: "Nos services",
    servicesTitle: "Trois services, un même accompagnement.",
    servicesLead: "Que vous cherchiez à financer votre entreprise, à confier ou apprendre à gérer un capital, ou à être en règle chaque mois.",
    services: [
      { kicker: "Financement", title: "Lever des fonds ou investir dans des entreprises analysées", text: "Mise en relation entre entreprises et investisseurs, en actions ou en obligations, de l’analyse du dossier jusqu’à la souscription.", cta: "Découvrir le marché financier", alt: "Remise d’un dossier de financement" },
      { kicker: "Trading", title: "Gestion de capital sous mandat et académie de trading", text: "Une gestion encadrée par contrat notarié, des conditions de retrait écrites, et une formation pour comprendre les marchés à votre rythme.", cta: "Découvrir le trading", alt: "Graphique de marché à l’écran" },
      { kicker: "Conseil fiscal", title: "Un abonnement mensuel pour être en règle", text: "Pour les boutiques, commerces de cosmétiques et comptoirs : déclarations, obligations administratives et conseils, chaque mois.", cta: "Voir l’abonnement", alt: "Calculatrice et documents comptables" },
    ],
    risk: "Risque de perte en capital",
    stepsEyebrow: "Marché financier · Le parcours",
    stepsTitle: "Six étapes, de la demande d'émission à la transaction.",
    steps: [
      { title: "Demande d’émission", text: "L’entreprise présente son projet et son besoin de financement." },
      { title: "Analyse des documents", text: "Bilans, statuts et situation fiscale sont examinés par notre équipe." },
      { title: "Présentation de l’opportunité", text: "Un dossier clair est préparé pour les investisseurs." },
      { title: "Investisseurs", text: "Les investisseurs inscrits étudient l’opportunité et posent leurs questions." },
      { title: "Souscription", text: "Chaque investisseur décide librement du montant qu’il engage." },
      { title: "Transaction", text: "Fonds et titres sont échangés dans un cadre contractuel." },
    ],
    stepsCta: "Déposer un dossier d'émission",
    eligibility: "Conditions d'éligibilité",
    activityEyebrow: "Notre activité",
    activityTitle: "Ce que nous avons accompagné.",
    counters: ["Dossiers étudiés", "Entreprises accompagnées", "Investisseurs inscrits", "Personnes formées"],
    figuresNote: (d: string | null) => `Chiffres arrêtés au ${d ?? "[date à fournir]"}.${impact.isSample ? " Valeurs affichées à titre d'exemple, à remplacer par les données réelles de SUN Capital SARL." : ""}`,
    principleEyebrow: "Notre principe",
    principle: ["Votre capital peut être géré.", "Vos compétences peuvent être développées.", "Votre décision d'investir vous appartient."],
    riskTitle: "Avertissement sur les risques",
    riskText: "Tout investissement et toute activité de trading comportent des risques, dont la perte partielle ou totale du capital investi. Les performances passées ne préjugent pas des performances futures. SUN Market ne garantit aucun rendement.",
    riskLink: "Lire le cadre et la transparence",
    talk: "Parlons de votre projet",
    talkLead: "Une question sur le financement, le trading ou le conseil fiscal ? Notre équipe vous répond du lundi au vendredi, de 8 h 30 à 17 h 00.",
    address: ADDRESS_FR,
  },
  en: {
    eyebrow: "Equity & investment marketplace · Kinshasa",
    words: ["Connecting", "companies", "and", "investors", "within", "a", "structured", "framework."],
    lead: "SUN Market supports companies seeking capital and investors seeking qualified opportunities: application review, introductions and follow-up through to the transaction.",
    cta: "Submit an application",
    invest: "I want to invest",
    bullets: ["Applications reviewed", "Notarised contracts", "Support at every step"],
    glanceEyebrow: "Sun Market at a glance",
    glanceTitle: "One platform connecting two needs.",
    nodes: [
      { title: "Companies", text: "They submit an application: activity, financial statements, funding need." },
      { title: "The platform", text: "We review the documents and present the opportunity clearly." },
      { title: "Investors", text: "They study the opportunity and freely decide whether to subscribe." },
    ],
    servicesEyebrow: "Our services",
    servicesTitle: "Three services, the same level of support.",
    servicesLead: "Whether you want to finance your business, entrust or learn to manage capital, or stay compliant every month.",
    services: [
      { kicker: "Financing", title: "Raise funds or invest in reviewed companies", text: "Matching companies and investors, through shares or bonds, from application review to subscription.", cta: "Explore the capital market", alt: "Handing over a financing file" },
      { kicker: "Trading", title: "Managed capital mandates and trading academy", text: "Management governed by a notarised contract, written withdrawal terms, and training to understand markets at your own pace.", cta: "Explore trading", alt: "Market chart on screen" },
      { kicker: "Tax advisory", title: "A monthly subscription to stay compliant", text: "For shops, cosmetics retailers and trading counters: filings, administrative obligations and advice, every month.", cta: "See the subscription", alt: "Calculator and accounting documents" },
    ],
    risk: "Risk of capital loss",
    stepsEyebrow: "Capital market · The process",
    stepsTitle: "Six steps, from issuance request to transaction.",
    steps: [
      { title: "Issuance request", text: "The company presents its project and funding need." },
      { title: "Document review", text: "Financial statements, articles and tax status are reviewed by our team." },
      { title: "Opportunity presentation", text: "A clear file is prepared for investors." },
      { title: "Investors", text: "Registered investors study the opportunity and ask their questions." },
      { title: "Subscription", text: "Each investor freely decides how much to commit." },
      { title: "Transaction", text: "Funds and securities are exchanged under contract." },
    ],
    stepsCta: "Submit an issuance application",
    eligibility: "Eligibility criteria",
    activityEyebrow: "Our activity",
    activityTitle: "What we have supported.",
    counters: ["Applications reviewed", "Companies supported", "Registered investors", "People trained"],
    figuresNote: (d: string | null) => `Figures as of ${d ?? "[date to be provided]"}.${impact.isSample ? " Sample values, to be replaced with SUN Capital SARL's actual data." : ""}`,
    principleEyebrow: "Our principle",
    principle: ["Your capital can be managed.", "Your skills can be developed.", "Your decision to invest is yours."],
    riskTitle: "Risk warning",
    riskText: "All investment and trading involve risks, including partial or total loss of the capital invested. Past performance is not a guide to future performance. SUN Market guarantees no return.",
    riskLink: "Read our framework & transparency page",
    talk: "Let's talk about your project",
    talkLead: "A question about financing, trading or tax advisory? Our team answers Monday to Friday, 8:30 am to 5:00 pm.",
    address: ADDRESS_EN,
  },
};

const SERVICE_META = [
  { page: "marche" as const, img: "finance", filter: "saturate(.85)", tint: 0.1, risk: false, icon: ["M4 20h16", "M6 16V10", "M10 16V7", "M14 16v-4", "M18 16V9"] },
  { page: "trading" as const, img: "trading", filter: "saturate(.5) hue-rotate(20deg)", tint: 0.45, risk: true, icon: ["M3 9l9-4 9 4-9 4z", "M7 11v4c3 2 7 2 10 0v-4"] },
  { page: "fiscal" as const, img: "fiscal", filter: "saturate(.8)", tint: 0.12, risk: false, icon: ["M6 3h12v18H6z", "M9 7h6", "M9 11h2", "M13 11h2", "M9 15h2", "M13 15h2"] },
];

const btnOrange56 = `height:56px;padding:0 26px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;gap:12px;transition:background 180ms`;
const tile = `height:56px;padding:0 20px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1.5px #C9C3F0;color:#261A66;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;gap:10px;transition:box-shadow 180ms`;

export default function HomePage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const depot = href("marche", lang, "#depot");
  const nodeIcons = [
    <Icon key="b" size={34} color="#261A66" d={["M4 21V8l8-5 8 5v13", "M9 21v-6h6v6", "M8 11h.01", "M16 11h.01"]} />,
    // eslint-disable-next-line @next/next/no-img-element
    <img key="l" src="/brand/logo-blanc.webp" alt="" style={s(`width:72%;height:auto`)} />,
    <Icon key="p" size={34} color="#261A66" d={["M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M3 20c0-3 3-5 6-5s6 2 6 5", "M16 5a3 3 0 0 1 0 6", "M18 15c2 .6 3 2.3 3 5"]} />,
  ];

  return (
    <SiteShell lang={lang} page="home" active="home" fixedHeader mobileCta={{ label: t.cta, to: depot }}>
      <IntroLogo lang={lang} />

      {/* 2. Hero */}
      <section className="sun-hero-home" style={s(`background:#261A66;color:#fff;position:relative;overflow:hidden;min-height:100svh;display:flex;align-items:center;padding-left:clamp(20px,4vw,48px);padding-right:clamp(20px,4vw,48px);padding-bottom:clamp(64px,9vw,128px)`)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-parallax="0.18" src="/images/apropos.webp" srcSet="/images/apropos-480.webp 480w, /images/apropos.webp 736w" sizes="100vw" alt="" fetchPriority="high"
          style={s(`position:absolute;left:0;top:-8%;width:100%;height:116%;object-fit:cover;object-position:60% 30%;display:block;filter:saturate(.85)`)} />
        <div className="sun-hero-overlay" style={s(`position:absolute;inset:0`)} />
        <svg data-parallax="0.12" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" style={s(`position:absolute;inset:0;width:100%;height:100%;pointer-events:none`)} aria-hidden="true">
          <path className="sun-curve" d="M-40 760 C 300 720, 520 420, 820 330 S 1300 160, 1520 40" fill="none" stroke="#EF5F18" strokeWidth="2.5" pathLength={1} strokeDasharray="1" style={s(`animation:curveDraw 2400ms cubic-bezier(.65,0,.35,1) 600ms forwards`)} />
          <path className="sun-curve" d="M120 820 C 420 800, 640 560, 900 500 S 1320 380, 1520 260" fill="none" stroke="#EF5F18" strokeWidth="1.2" opacity=".45" pathLength={1} strokeDasharray="1" style={s(`animation:curveDraw 2800ms cubic-bezier(.65,0,.35,1) 900ms forwards`)} />
        </svg>
        <div style={s(`position:relative;max-width:1224px;width:100%;margin:0 auto`)}>
          <div style={s(`display:flex;flex-direction:column;gap:clamp(20px,2.4vw,28px);max-width:760px`)}>
            <div data-hero="" style={s(`font:700 13px/1.3 'Montserrat';letter-spacing:.14em;text-transform:uppercase;color:#C9C3F0;display:flex;align-items:center;gap:10px`)}>
              <span style={s(`width:8px;height:8px;border-radius:50%;background:#EF5F18;flex:none`)} />{t.eyebrow}
            </div>
            <h1 style={s(`margin:0;font:700 clamp(38px,5.6vw,72px)/1.06 'Montserrat',sans-serif;letter-spacing:-.028em;text-wrap:balance`)}>
              {t.words.map((w, i) => (
                <span key={i} style={s(`display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em;margin-right:.24em`)}>
                  <span data-word="" style={s(`display:inline-block`)}>{w}</span>
                </span>
              ))}
            </h1>
            <p data-hero="" style={s(`margin:0;font:400 clamp(18px,1.6vw,21px)/1.55 'Source Sans 3';color:#E4E0F7;max-width:560px;text-wrap:pretty`)}>{t.lead}</p>
            <div data-hero="" style={s(`display:flex;flex-wrap:wrap;gap:12px;margin-top:4px`)}>
              <Link href={depot} data-magnetic="" className="hv-btn-orange" style={s(btnOrange56)}>{t.cta}<ArrowRight /></Link>
              <a href="#apercu" data-magnetic="" className="hv-btn-onviolet" style={s(`height:56px;padding:0 26px;border-radius:10px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.45);color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;transition:background 180ms,box-shadow 180ms`)}>{t.invest}</a>
            </div>
            <ul data-hero="" style={s(`margin:8px 0 0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:10px 24px;font:600 15px/1.4 'Source Sans 3';color:#E4E0F7`)}>
              {t.bullets.map((b) => (
                <li key={b} style={s(`display:flex;align-items:center;gap:8px`)}><span style={s(`width:6px;height:6px;border-radius:50%;background:#EF5F18`)} />{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. En un coup d'œil (épinglé) */}
      <section id="apercu" data-pin="" className="sun-pin" style={s(`position:relative;background:#FAF8F5;scroll-margin-top:0`)}>
        <div className="sun-pin-inner" style={s(`display:flex;align-items:center;padding:clamp(80px,10vw,120px) clamp(20px,4vw,48px)`)}>
          <GridPattern id="grid-apercu" />
          <div style={s(`position:relative;max-width:1224px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:clamp(40px,6vw,72px)`)}>
            <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:16px;max-width:720px`)}>
              <Eyebrow>{t.glanceEyebrow}</Eyebrow>
              <H2>{t.glanceTitle}</H2>
            </div>
            <div className="sun-nodes">
              {t.nodes.map((n, i) => (
                <FragmentNode key={n.title} i={i} title={n.title} text={n.text} icon={nodeIcons[i]} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nos services */}
      <section id="services" style={s(`padding:clamp(72px,10vw,136px) clamp(20px,4vw,48px);background:#fff;scroll-margin-top:60px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(40px,5vw,64px)`)}>
          <div style={s(`display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap`)}>
            <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:16px;max-width:680px`)}>
              <Eyebrow>{t.servicesEyebrow}</Eyebrow>
              <H2>{t.servicesTitle}</H2>
            </div>
            <p data-reveal="" data-delay="80" style={s(`margin:0;max-width:400px;font:400 18px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{t.servicesLead}</p>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px;perspective:1000px`)}>
            {t.services.map((sv, i) => {
              const m = SERVICE_META[i];
              return (
                <Link key={sv.kicker} href={href(m.page, lang)} data-reveal="" data-delay={String(i * 80)} style={s(`text-decoration:none;color:inherit;display:block`)}>
                  <article data-tilt="" style={s(`height:100%;background:#FAF8F5;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06);transition:transform 280ms cubic-bezier(.22,1,.36,1),box-shadow 280ms`)}>
                    <div style={s(`position:relative;aspect-ratio:16/10;overflow:hidden;background:#261A66`)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/images/${m.img}.webp`} srcSet={`/images/${m.img}-480.webp 480w, /images/${m.img}.webp ${m.img === "fiscal" ? 612 : m.img === "trading" ? 598 : 736}w`} sizes="(max-width: 760px) 100vw, 400px" alt={sv.alt} loading="lazy"
                        style={{ ...s(`width:100%;height:100%;object-fit:cover;display:block`), filter: m.filter }} />
                      <div style={{ ...s(`position:absolute;inset:0;background:#261A66;mix-blend-mode:color`), opacity: m.tint }} />
                      <div style={s(`position:absolute;left:20px;top:20px;width:52px;height:52px;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(23,15,69,.18)`)}>
                        <Icon size={24} color="#261A66" d={m.icon} />
                        <span style={s(`position:absolute;right:9px;top:9px;width:6px;height:6px;border-radius:50%;background:#EF5F18`)} />
                      </div>
                    </div>
                    <div style={s(`padding:28px;display:flex;flex-direction:column;gap:12px;flex:1`)}>
                      <div style={s(`font:700 13px/1 'Montserrat';letter-spacing:.14em;text-transform:uppercase;color:#B8460E`)}>{sv.kicker}</div>
                      <h3 style={s(`margin:0;font:600 clamp(20px,1.8vw,24px)/1.25 'Montserrat';color:#261A66;letter-spacing:-.01em;text-wrap:balance`)}>{sv.title}</h3>
                      <p style={s(`margin:0;font:400 16px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{sv.text}</p>
                      {m.risk ? <RiskTag>{t.risk}</RiskTag> : null}
                      <span style={s(`margin-top:auto;padding-top:8px;display:flex;align-items:center;gap:10px;font:600 15px/1 'Montserrat';color:#B8460E`)}>{sv.cta}<ArrowRight /></span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Parcours */}
      <section id="parcours" style={s(`position:relative;padding:clamp(72px,10vw,136px) clamp(20px,4vw,48px);background:#FAF8F5;scroll-margin-top:60px`)}>
        <GridPattern id="grid-parcours" />
        <div style={s(`position:relative;max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(48px,6vw,80px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:16px;max-width:720px`)}>
            <Eyebrow>{t.stepsEyebrow}</Eyebrow>
            <H2>{t.stepsTitle}</H2>
          </div>
          <div data-steps="" className="sun-steps" style={s(`position:relative`)}>
            <div className="sun-steps-track" style={s(`position:absolute;background:#E6E6E6;border-radius:2px;overflow:hidden`)}>
              <div data-steps-line="" style={s(`position:absolute;inset:0;background:#261A66`)} />
            </div>
            {t.steps.map((st, i) => (
              <div key={st.title} data-step={String(i)} className="sun-step" style={s(`position:relative;display:flex;align-items:flex-start`)}>
                <span style={s(`position:relative;flex:none;width:24px;height:24px;border-radius:50%;background:#FAF8F5;box-shadow:inset 0 0 0 2px #C9C3F0;display:flex;align-items:center;justify-content:center`)}>
                  <span data-step-dot="" style={s(`position:absolute;inset:0;border-radius:50%;background:#261A66;transition:transform 420ms cubic-bezier(.34,1.56,.64,1)`)} />
                  <span data-step-core="" style={s(`position:relative;width:10px;height:10px;border-radius:50%;background:#EF5F18;transition:transform 420ms cubic-bezier(.34,1.56,.64,1) 80ms`)} />
                </span>
                <div style={s(`display:flex;flex-direction:column;gap:8px;padding-right:12px`)}>
                  <span data-step-num="" style={s(`font:700 13px/1 'Montserrat';letter-spacing:.1em;color:#5C5873;transition:color 280ms`)}>{String(i + 1).padStart(2, "0")}</span>
                  <strong style={s(`font:600 18px/1.3 'Montserrat';color:#261A66;text-wrap:balance`)}>{st.title}</strong>
                  <span style={s(`font:400 15px/1.5 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{st.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div data-reveal="" style={s(`display:flex;flex-wrap:wrap;gap:12px;align-items:center`)}>
            <Link href={depot} data-magnetic="" className="hv-btn-violet" style={s(`height:52px;padding:0 24px;border-radius:10px;background:#261A66;color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;transition:background 180ms`)}>{t.stepsCta}</Link>
            <Link href={href("marche", lang, "#eligibilite")} className="hv-link-violet" style={s(`height:52px;padding:0 8px;display:flex;align-items:center;gap:8px;font:600 16px/1 'Montserrat';color:#B8460E;text-decoration:none`)}>{t.eligibility}<ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* 6. Notre activité */}
      <section style={s(`background:#261A66;color:#fff;position:relative;overflow:hidden;padding:clamp(72px,10vw,128px) clamp(20px,4vw,48px)`)}>
        <svg data-parallax="-0.06" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" style={s(`position:absolute;inset:-10% 0;width:100%;height:120%;pointer-events:none`)} aria-hidden="true">
          <path d="M-60 120 C 360 80, 600 420, 980 460 S 1380 400, 1520 300" fill="none" stroke="#EF5F18" strokeWidth="2" opacity=".7" />
        </svg>
        <div style={s(`position:relative;max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(40px,5vw,64px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:16px;max-width:680px`)}>
            <Eyebrow onViolet>{t.activityEyebrow}</Eyebrow>
            <H2 onViolet>{t.activityTitle}</H2>
          </div>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:40px 32px`)}>
            {t.counters.map((label, i) => (
              <div key={label} data-reveal="" data-delay={String(i * 80)} style={s(`display:flex;flex-direction:column;gap:12px`)}>
                <div style={s(`display:flex;align-items:baseline;gap:4px;font:700 clamp(48px,5vw,68px)/1 'Montserrat';letter-spacing:-.03em;font-variant-numeric:tabular-nums`)}>
                  <span data-count={String(impact.values[i])}>{impact.values[i].toLocaleString(lang === "en" ? "en-US" : "fr-FR")}</span>
                  <span style={s(`color:#EF5F18`)}>.</span>
                </div>
                <span style={s(`font:600 17px/1.4 'Source Sans 3';color:#E4E0F7`)}>{label}</span>
              </div>
            ))}
          </div>
          <p style={s(`margin:0;font:400 15px/1.5 'Source Sans 3';color:#C9C3F0`)}>{t.figuresNote(impactDate)}</p>
        </div>
      </section>

      {/* 7. Notre principe */}
      <section id="principe" style={s(`background:#EEEBFB;padding:clamp(80px,11vw,152px) clamp(20px,4vw,48px);scroll-margin-top:60px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(28px,3vw,40px)`)}>
          <div data-reveal=""><Eyebrow>{t.principleEyebrow}</Eyebrow></div>
          <div style={s(`display:flex;flex-direction:column;gap:6px;font:700 clamp(28px,4.4vw,60px)/1.14 'Montserrat';letter-spacing:-.025em;color:#261A66`)}>
            <div style={s(`overflow:hidden;padding-bottom:.08em`)}><div data-mask="" data-delay="0">{t.principle[0]}</div></div>
            <div style={s(`overflow:hidden;padding-bottom:.08em`)}><div data-mask="" data-delay="140">{t.principle[1]}</div></div>
            <div style={s(`overflow:hidden;padding-bottom:.3em`)}>
              <div data-mask="" data-delay="280" style={s(`display:inline-flex;flex-direction:column;align-items:flex-start`)}>
                {t.principle[2]}
                <div data-underline="" style={s(`width:100%;height:.22em;transform-origin:0 50%`)}>
                  <svg viewBox="0 0 400 14" preserveAspectRatio="none" style={s(`width:100%;height:100%;display:block`)} aria-hidden="true">
                    <path d="M2 10 C 120 3, 280 2, 398 7" fill="none" stroke="#EF5F18" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section id="contact" style={s(`padding:clamp(72px,10vw,128px) clamp(20px,4vw,48px) clamp(56px,7vw,96px);background:#FAF8F5;scroll-margin-top:60px`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(48px,6vw,72px)`)}>
          <RiskBanner title={t.riskTitle} linkLabel={t.riskLink} linkHref={href("cadre", lang, "#risques")}>{t.riskText}</RiskBanner>
          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,72px);align-items:end`)}>
            <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:20px`)}>
              <h2 style={s(`margin:0;font:700 clamp(32px,4.4vw,60px)/1.06 'Montserrat';letter-spacing:-.028em;color:#261A66;text-wrap:balance`)}>{t.talk}<span style={s(`color:#EF5F18`)}>.</span></h2>
              <p style={s(`margin:0;font:400 19px/1.55 'Source Sans 3';color:#5C5873;max-width:520px;text-wrap:pretty`)}>{t.talkLead}</p>
            </div>
            <div style={s(`display:flex;flex-direction:column;gap:12px`)}>
              <Link href={depot} data-magnetic="" className="hv-btn-orange" style={s(`height:60px;padding:0 28px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 17px/1 'Montserrat';display:flex;align-items:center;justify-content:space-between;transition:background 180ms`)}>{t.cta}<ArrowRight size={20} /></Link>
              <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:12px`)}>
                <a href={WHATSAPP} className="hv-tile" style={s(tile)}><WhatsAppIcon />WhatsApp</a>
                <a href={PHONE_TEL} className="hv-tile" style={s(tile)}><PhoneIcon />{PHONE}</a>
              </div>
              <span style={s(`font:400 15px/1.5 'Source Sans 3';color:#5C5873`)}>{t.address}</span>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function FragmentNode({ i, title, text, icon }: { i: number; title: string; text: string; icon: React.ReactNode }) {
  return (
    <>
      {i > 0 ? (
        <div className="sun-node-line" style={s(`justify-self:center;background:#E6E6E6;position:relative;border-radius:2px;overflow:hidden`)}>
          <div data-pin-line={String(i - 1)} style={s(`position:absolute;inset:0;background:#EF5F18`)} />
        </div>
      ) : null}
      <div data-node={String(i)} style={s(`display:flex;flex-direction:column;align-items:center;gap:20px;justify-self:center;text-align:center;transition:opacity 400ms cubic-bezier(.22,1,.36,1)`)}>
        <div className="sun-node-circle" style={{ ...s(`position:relative;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.08)`), background: i === 1 ? "#261A66" : "#fff" }}>
          <span data-ring="" style={s(`position:absolute;inset:-8px;border-radius:50%;box-shadow:0 0 0 2px #EF5F18;opacity:0;transform:scale(.9);transition:opacity 400ms,transform 500ms cubic-bezier(.34,1.56,.64,1)`)} />
          {icon}
        </div>
        <div style={s(`display:flex;flex-direction:column;gap:6px;max-width:260px`)}>
          <strong style={s(`font:700 clamp(18px,1.6vw,22px)/1.2 'Montserrat';color:#261A66`)}>{title}</strong>
          <span style={s(`font:400 16px/1.5 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{text}</span>
        </div>
      </div>
    </>
  );
}
