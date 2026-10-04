// Actualités — reproduit design/design_handoff_sun_market/« 10 Actualites.dc.html »
// (cahier §13) et le modèle d'article (H1, chapeau, image 16:9, corps 18 px
// max 720 px, encadré de risque si le sujet est l'investissement).
import Link from "next/link";
import { s } from "@/lib/css";
import { type Article, formatDate, getArticles, renderMarkdown } from "@/lib/articles";
import { articleHref, href, type Lang, WHATSAPP } from "@/lib/routes";
import SiteShell from "@/components/sun/SiteShell";
import { ArrowRight, WhatsAppIcon } from "@/components/sun/icons";
import { Eyebrow, RiskBanner } from "@/components/sun/ui";
import ActusGrid from "./ActusGrid";

const T = {
  fr: {
    eyebrow: "Actualités & éducation financière", title: "Comprendre avant de décider", lead: "Conseils pratiques, explications et nouvelles de SUN Market.",
    featured: "À la une", read: "Lire l'article", min: (n: string) => `${n || "[n]"} min`,
    cats: [["all", "Tout"], ["education", "Éducation financière"], ["fiscalite", "Fiscalité"], ["trading", "Trading"], ["sunmarket", "SUN Market"]] as [string, string][],
    tablist: "Catégories", photo: "photo",
    waTitle: "Recevoir nos conseils sur WhatsApp", waText: "Un message par mois, sans publicité. Désinscription en un mot.", waBtn: "S'inscrire",
    waMsg: "Je souhaite recevoir les conseils SUN Market",
    crumbs: ["Accueil", "Actualités"], back: "Toutes les actualités",
    riskTitle: "Avertissement sur les risques", riskText: "Tout investissement comporte un risque de perte partielle ou totale du capital. Cet article est informatif et ne constitue pas un conseil personnalisé. SUN Market ne garantit aucun rendement.", riskLink: "Cadre et transparence",
  },
  en: {
    eyebrow: "News & financial education", title: "Understand before you decide", lead: "Practical advice, explanations and SUN Market news.",
    featured: "Featured", read: "Read the article", min: (n: string) => `${n || "[n]"} min`,
    cats: [["all", "All"], ["education", "Financial education"], ["fiscalite", "Tax"], ["trading", "Trading"], ["sunmarket", "SUN Market"]] as [string, string][],
    tablist: "Categories", photo: "photo",
    waTitle: "Get our advice on WhatsApp", waText: "One message a month, no advertising. Unsubscribe in one word.", waBtn: "Subscribe",
    waMsg: "I would like to receive SUN Market advice",
    crumbs: ["Home", "News"], back: "All news",
    riskTitle: "Risk warning", riskText: "All investment carries a risk of partial or total loss of capital. This article is for information only and is not personalised advice. SUN Market guarantees no return.", riskLink: "Framework & transparency",
  },
};

const mobileCta = (lang: Lang) => ({ label: lang === "en" ? "Submit an application" : "Déposer un dossier", to: href("marche", lang, "#depot") });

export default function ActusPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const all = getArticles(lang);
  const featured = all.find((a) => a.featured);
  const rest = all.filter((a) => a !== featured);
  const catLabel = (c: string) => t.cats.find(([k]) => k === c)?.[1] ?? c;
  const meta = (a: Article) => `${a.date ? formatDate(a.date, lang) : "[date]"} · ${t.min(a.readMinutes)}`;

  return (
    <SiteShell lang={lang} page="actus" active="actus" mobileCta={mobileCta(lang)}>
      <div style={s(`padding:clamp(48px,7vw,88px) clamp(20px,4vw,48px) clamp(64px,9vw,120px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(40px,5vw,64px)`)}>
          <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:16px;max-width:760px`)}>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 style={s(`margin:0;font:700 clamp(34px,5vw,60px)/1.06 'Montserrat';letter-spacing:-.028em;color:#261A66;text-wrap:balance`)}>{t.title}<span style={s(`color:#EF5F18`)}>.</span></h1>
            <p style={s(`margin:0;font:400 19px/1.55 'Source Sans 3';color:#5C5873`)}>{t.lead}</p>
          </div>

          {featured ? (() => {
            const inner = (
              <>
                <div style={s(`position:relative;min-height:280px`)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.image || "/images/finance.webp"} alt={featured.imageNote} style={s(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.85)`)} />
                </div>
                <div style={s(`padding:clamp(28px,4vw,48px);display:flex;flex-direction:column;gap:16px;justify-content:center;color:#fff`)}>
                  <div style={s(`display:flex;gap:10px;align-items:center;flex-wrap:wrap`)}>
                    <span style={s(`font:700 12px/1 'Montserrat';color:#170F45;background:#EF5F18;padding:7px 10px;border-radius:999px`)}>{t.featured}</span>
                    <span style={s(`font:400 14px/1 'Source Sans 3';color:#C9C3F0`)}>{meta(featured)}</span>
                  </div>
                  <h2 style={s(`margin:0;font:700 clamp(24px,2.8vw,34px)/1.15 'Montserrat';letter-spacing:-.02em;text-wrap:balance`)}>{featured.title}</h2>
                  <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#E4E0F7`)}>{featured.summary}</p>
                  {featured.published ? <span style={s(`display:flex;align-items:center;gap:10px;font:600 15px/1 'Montserrat';color:#FF8A4C`)}>{t.read}<ArrowRight /></span> : null}
                </div>
              </>
            );
            const st = s(`text-decoration:none;color:inherit;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));background:#261A66;border-radius:16px;overflow:hidden;box-shadow:0 2px 4px rgba(38,26,102,.06),0 20px 48px rgba(38,26,102,.14);transition:transform 280ms cubic-bezier(.22,1,.36,1)`);
            return featured.published
              ? <Link href={articleHref(featured.slug, lang)} data-reveal="" data-tilt="" style={st}>{inner}</Link>
              : <article data-reveal="" data-tilt="" style={st}>{inner}</article>;
          })() : null}

          <ActusGrid cats={t.cats} tablistLabel={t.tablist} photoWord={t.photo}
            cards={rest.map((a, i) => ({
              slug: a.slug, href: a.published ? articleHref(a.slug, lang) : null, category: a.category, catLabel: catLabel(a.category),
              title: a.title, summary: a.summary, read: t.min(a.readMinutes), image: a.image, imageNote: a.imageNote, tone: i % 2 ? "#EEEBFB" : "#E6E6E6",
            }))} />

          <div style={s(`background:#EEEBFB;border-radius:16px;padding:clamp(24px,4vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:24px;align-items:center`)}>
            <div style={s(`display:flex;flex-direction:column;gap:8px`)}>
              <strong style={s(`font:700 clamp(22px,2.4vw,28px)/1.2 'Montserrat';color:#261A66`)}>{t.waTitle}</strong>
              <span style={s(`font:400 16px/1.5 'Source Sans 3';color:#261A66`)}>{t.waText}</span>
            </div>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(t.waMsg)}`} className="hv-btn-violet" style={s(`justify-self:start;height:52px;padding:0 22px;border-radius:10px;background:#261A66;color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;gap:10px;transition:background 180ms`)}><WhatsAppIcon />{t.waBtn}</a>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

export function ArticleView({ lang, a }: { lang: Lang; a: Article }) {
  const t = T[lang];
  const catLabel = t.cats.find(([k]) => k === a.category)?.[1] ?? a.category;
  return (
    <SiteShell lang={lang} page="actus" active="actus" mobileCta={mobileCta(lang)}>
      <article style={s(`padding:clamp(48px,7vw,88px) clamp(20px,4vw,48px) clamp(64px,9vw,120px)`)}>
        <div style={s(`max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:24px`)}>
          <nav aria-label={lang === "en" ? "Breadcrumb" : "Fil d'Ariane"} style={s(`font:400 14px/1 'Source Sans 3';color:#5C5873;display:flex;gap:8px;flex-wrap:wrap`)}>
            <Link href={href("home", lang)} style={s(`color:#5C5873`)}>{t.crumbs[0]}</Link><span aria-hidden="true">/</span>
            <Link href={href("actus", lang)} style={s(`color:#5C5873`)}>{t.crumbs[1]}</Link>
          </nav>
          <div style={s(`display:flex;gap:10px;align-items:center;flex-wrap:wrap`)}>
            <span style={s(`font:700 12px/1 'Montserrat';letter-spacing:.04em;color:#261A66;background:#EEEBFB;padding:7px 10px;border-radius:999px`)}>{catLabel}</span>
            <span style={s(`font:400 14px/1 'Source Sans 3';color:#5C5873`)}>{formatDate(a.date, lang)} · {t.min(a.readMinutes)}</span>
          </div>
          <h1 style={s(`margin:0;font:700 clamp(32px,4.6vw,52px)/1.08 'Montserrat';letter-spacing:-.028em;color:#261A66;text-wrap:balance`)}>{a.title}</h1>
          <p style={s(`margin:0;font:400 clamp(18px,1.6vw,21px)/1.55 'Source Sans 3';color:#5C5873`)}>{a.summary}</p>
        </div>
        {a.image ? (
          <div style={s(`max-width:1024px;margin:clamp(32px,4vw,48px) auto;aspect-ratio:16/9;border-radius:16px;overflow:hidden;position:relative`)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.image} alt={a.imageNote} style={s(`width:100%;height:100%;object-fit:cover`)} />
          </div>
        ) : <div style={s(`height:32px`)} />}
        <div style={s(`max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:32px`)}>
          <div className="sun-article" dangerouslySetInnerHTML={{ __html: renderMarkdown(a.body) }} />
          {a.risk ? <RiskBanner title={t.riskTitle} linkLabel={t.riskLink} linkHref={href("cadre", lang, "#risques")}>{t.riskText}</RiskBanner> : null}
          <Link href={href("actus", lang)} className="hv-link-violet" style={s(`display:flex;align-items:center;gap:8px;font:600 16px/1 'Montserrat';color:#B8460E;text-decoration:none;min-height:44px`)}>← {t.back}</Link>
        </div>
      </article>
    </SiteShell>
  );
}
