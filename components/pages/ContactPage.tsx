// Contact — reproduit design/design_handoff_sun_market/« 11 Contact.dc.html »
// (cahier §14) : 3 tuiles, formulaire, carte OpenStreetMap différée.
import { s } from "@/lib/css";
import { ADDRESS_EN, ADDRESS_FR, href, type Lang, PHONE, PHONE_TEL, WHATSAPP } from "@/lib/routes";
import ContactForm from "@/components/forms/ContactForm";
import SiteShell from "@/components/sun/SiteShell";
import { Eyebrow } from "@/components/sun/ui";

// Repère approximatif (maquette) : à remplacer par les coordonnées exactes de l'immeuble 130B.
const LAT = -4.3105, LON = 15.309;

const T = {
  fr: {
    eyebrow: "Contact", title: "Parlons de votre projet", lead: "Par WhatsApp, par téléphone, par écrit ou à nos bureaux de Gombe.",
    wa: "Réponse rapide en heures ouvrées", call: "Appel direct", hours: "Horaires", hoursText: ["Lundi – vendredi, 8 h 30 – 17 h 00", "[Samedi : à confirmer]"],
    office: "Nos bureaux", route: "Ouvrir l'itinéraire", approx: "Position du repère approximative, à ajuster avec les coordonnées exactes de l'immeuble.",
    map: "Carte : SUN Market, Gombe, Kinshasa", address: ADDRESS_FR,
  },
  en: {
    eyebrow: "Contact", title: "Let's talk about your project", lead: "By WhatsApp, by phone, in writing or at our offices in Gombe.",
    wa: "Quick reply during business hours", call: "Direct call", hours: "Opening hours", hoursText: ["Monday – Friday, 8:30 am – 5:00 pm", "[Saturday: to be confirmed]"],
    office: "Our offices", route: "Get directions", approx: "Approximate marker position, to be adjusted with the building's exact coordinates.",
    map: "Map: SUN Market, Gombe, Kinshasa", address: ADDRESS_EN,
  },
};

const card = `background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:12px;min-height:150px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`;

export default function ContactPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <SiteShell lang={lang} page="contact" active="contact" mobileCta={{ label: lang === "en" ? "Submit an application" : "Déposer un dossier", to: href("marche", lang, "#depot") }}>
      <div style={s(`padding:clamp(48px,7vw,88px) clamp(20px,4vw,48px) clamp(64px,9vw,120px)`)}>
        <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(40px,5vw,64px)`)}>
          <div style={s(`display:flex;flex-direction:column;gap:16px;max-width:760px`)}>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 style={s(`margin:0;font:700 clamp(34px,5vw,60px)/1.06 'Montserrat';letter-spacing:-.028em;color:#261A66;text-wrap:balance`)}>{t.title}<span style={s(`color:#EF5F18`)}>.</span></h1>
            <p style={s(`margin:0;font:400 19px/1.55 'Source Sans 3';color:#5C5873`)}>{t.lead}</p>
          </div>

          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px`)}>
            <a href={WHATSAPP} className="hv-lift4" style={s(`text-decoration:none;background:#261A66;color:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:12px;min-height:150px;transition:transform 280ms cubic-bezier(.22,1,.36,1)`)}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#EF5F18" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l1.3-3.8A8 8 0 1 1 8 19z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z" /></svg>
              <strong style={s(`font:700 20px/1.2 'Montserrat'`)}>WhatsApp</strong>
              <span style={s(`font:400 16px/1.4 'Source Sans 3';color:#E4E0F7;margin-top:auto`)}>{t.wa}</span>
            </a>
            <a href={PHONE_TEL} className="hv-lift4" style={{ ...s(card), ...s(`text-decoration:none;color:#261A66;transition:transform 280ms cubic-bezier(.22,1,.36,1)`) }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#261A66" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
              <strong style={s(`font:700 20px/1.2 'Montserrat'`)}>{PHONE}</strong>
              <span style={s(`font:400 16px/1.4 'Source Sans 3';color:#5C5873;margin-top:auto`)}>{t.call}</span>
            </a>
            <div style={s(card)}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#261A66" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              <strong style={s(`font:700 20px/1.2 'Montserrat';color:#261A66`)}>{t.hours}</strong>
              <span style={s(`font:400 16px/1.5 'Source Sans 3';color:#5C5873;margin-top:auto`)}>{t.hoursText[0]}<br />{t.hoursText[1]}</span>
            </div>
          </div>

          <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px;align-items:stretch`)}>
            <ContactForm lang={lang} />
            <div style={s(`display:flex;flex-direction:column;gap:16px`)}>
              <div style={s(`flex:1;min-height:320px;border-radius:16px;overflow:hidden;position:relative;background:#E6E6E6;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`)}>
                <iframe title={t.map} loading="lazy" referrerPolicy="no-referrer"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=15.296%2C-4.320%2C15.322%2C-4.300&layer=mapnik&marker=${LAT}%2C${LON}`}
                  style={s(`position:absolute;inset:0;width:100%;height:100%;border:0;filter:saturate(.6)`)} />
              </div>
              <div style={s(`background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`)}>
                <strong style={s(`font:700 18px/1.3 'Montserrat';color:#261A66;display:flex;gap:10px;align-items:center`)}><span style={s(`width:8px;height:8px;border-radius:50%;background:#EF5F18`)} />{t.office}</strong>
                <span style={s(`font:400 17px/1.5 'Source Sans 3'`)}>{t.address}</span>
                <a href={`https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=17/${LAT}/${LON}`} target="_blank" rel="noopener noreferrer" style={s(`font:600 15px/1 'Montserrat';padding:14px 0;align-self:flex-start`)}>{t.route}</a>
                <span style={s(`font:400 13px/1.4 'Source Sans 3';color:#5C5873`)}>{t.approx}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
