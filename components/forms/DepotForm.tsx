"use client";

// Dépôt de dossier d'émission en 3 étapes — 04 Marché financier.dc.html et
// cahier des charges §8. Contrairement à la maquette (démo), l'envoi est réel :
// fichiers envoyés directement du navigateur vers Vercel Blob, puis dossier
// enregistré en base avec une référence SM-AAAA-NNNN.
// Brouillon gardé dans localStorage.sunDepotDraft (hors fichiers), effacé après envoi.
import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";
import { s } from "@/lib/css";
import { phoneError } from "@/lib/validate";
import { Pills, RadioCard, Spinner, SuccessBadge, TextArea, TextField } from "@/components/sun/fields";

const DRAFT = "sunDepotDraft";
const MAX = 10 * 1024 * 1024;
const ACCEPT = "application/pdf,image/jpeg,image/png";

const SECTORS = ["Technologie", "Commerce", "Industrie", "Services", "Autre"] as const;
const AGES = ["Moins de 2 ans", "Plus de 2 ans", "Plus de 5 ans"] as const;
const TYPES = ["Actions", "Obligations"] as const;

const T = {
  fr: {
    steps: ["Entreprise", "Financement", "Documents"],
    progress: "Progression",
    s0: "Votre entreprise", raison: "Raison sociale", rccm: "N° RCCM (facultatif à ce stade)", tel: "Téléphone du dirigeant", telHint: "Exemple : +243 840 922 275",
    raisonErr: "Indiquez la raison sociale.",
    sector: "Secteur d'activité", sectors: SECTORS as readonly string[], age: "Depuis combien de temps l'entreprise existe-t-elle ?", ages: AGES as readonly string[],
    young: "Le marché financier s'adresse aux entreprises de plus de deux ans avec des bilans disponibles. Vous pouvez tout de même nous écrire : nous vous orienterons vers l'accompagnement adapté.",
    s1: "Votre besoin de financement", type: "Type d'émission",
    types: [["Actions", "Ouvrir une partie du capital à de nouveaux associés."], ["Obligations", "Emprunter auprès d’investisseurs, avec remboursement à échéance."]],
    montant: "Montant recherché", usage: "À quoi serviront les fonds ?", usagePh: "Nouveaux équipements, développement commercial, fonds de roulement…",
    s2: "Vos documents",
    docs: ["Statuts de l’entreprise", "Bilans des deux derniers exercices", "RCCM, Id. Nat. et NIF", "Présentation du projet (facultatif)"],
    docSub: "PDF, JPG ou PNG · 10 Mo max", add: "Ajouter", remove: "Retirer", uploading: "Envoi…",
    tooBig: "Fichier trop lourd (10 Mo max).", badType: "Format accepté : PDF, JPG ou PNG.", uploadFail: "L'envoi du fichier a échoué. Vérifiez votre connexion et réessayez.",
    missingDocs: "Ajoutez les trois documents obligatoires pour envoyer le dossier.",
    certify: "Je certifie l'exactitude des informations fournies et j'accepte leur traitement par SUN Capital SARL pour l'analyse du dossier.",
    certifyErr: "Cochez la case pour confirmer l'exactitude des informations.",
    back: "Retour", next: "Continuer", send: "Envoyer le dossier", sending: "Envoi en cours…",
    sendFail: "L'envoi a échoué. Vos réponses sont conservées : réessayez dans un instant, ou écrivez-nous sur WhatsApp.",
    done: "Dossier reçu. Merci.", ref: "Référence", doneText: "Un analyste vous contacte sous 5 jours ouvrés pour l'étape 2 du parcours : l'analyse des documents.",
    track: ["Demande d'émission", "Analyse des documents"], again: "Déposer un autre dossier",
  },
  en: {
    steps: ["Company", "Financing", "Documents"],
    progress: "Progress",
    s0: "Your company", raison: "Company name", rccm: "RCCM no. (optional at this stage)", tel: "Director's phone", telHint: "Example: +243 840 922 275",
    raisonErr: "Enter the company name.",
    sector: "Business sector", sectors: ["Technology", "Retail", "Industry", "Services", "Other"], age: "How long has the company existed?", ages: ["Less than 2 years", "More than 2 years", "More than 5 years"],
    young: "The capital market is for companies over two years old with financial statements available. You can still write to us: we will point you to the right kind of support.",
    s1: "Your funding need", type: "Type of issuance",
    types: [["Shares", "Open part of the capital to new partners."], ["Bonds", "Borrow from investors, with repayment at maturity."]],
    montant: "Amount sought", usage: "What will the funds be used for?", usagePh: "New equipment, business development, working capital…",
    s2: "Your documents",
    docs: ["Articles of association", "Financial statements for the last two years", "RCCM, Nat. ID and tax number", "Project presentation (optional)"],
    docSub: "PDF, JPG or PNG · 10 MB max", add: "Add", remove: "Remove", uploading: "Uploading…",
    tooBig: "File too large (10 MB max).", badType: "Accepted formats: PDF, JPG or PNG.", uploadFail: "Upload failed. Check your connection and try again.",
    missingDocs: "Add the three required documents to submit the application.",
    certify: "I certify that the information provided is accurate and agree to its processing by SUN Capital SARL to review the application.",
    certifyErr: "Tick the box to confirm the information is accurate.",
    back: "Back", next: "Continue", send: "Submit the application", sending: "Sending…",
    sendFail: "Submission failed. Your answers are kept: try again shortly, or write to us on WhatsApp.",
    done: "Application received. Thank you.", ref: "Reference", doneText: "An analyst will contact you within 5 working days for step 2 of the process: document review.",
    track: ["Issuance request", "Document review"], again: "Submit another application",
  },
};

type Doc = { name: string; size: number; mimeType: string; blobUrl: string } | null;

export default function DepotForm({ lang }: { lang: "fr" | "en" }) {
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ raison: "", rccm: "", tel: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sector, setSector] = useState<string>(SECTORS[0]);
  const [age, setAge] = useState<string>(AGES[1]);
  const [type, setType] = useState<string>(TYPES[0]);
  const [montant, setMontant] = useState("");
  const [usage, setUsage] = useState("");
  const [docs, setDocs] = useState<Doc[]>([null, null, null, null]);
  const [busyDoc, setBusyDoc] = useState<number | null>(null);
  const [docErr, setDocErr] = useState<string[]>(["", "", "", ""]);
  const [certify, setCertify] = useState(false);
  const [stepErr, setStepErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const paneRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // Restauration du brouillon (les valeurs sont stockées dans la langue FR, indépendamment de l'affichage).
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT) || "null");
      if (d) {
        if (d.v) setV(d.v);
        if (SECTORS.includes(d.sector)) setSector(d.sector);
        if (AGES.includes(d.age)) setAge(d.age);
        if (TYPES.includes(d.type)) setType(d.type);
        if (typeof d.montant === "string") setMontant(d.montant);
        if (typeof d.usage === "string") setUsage(d.usage);
      }
    } catch {}
    restored.current = true;
  }, []);
  useEffect(() => {
    if (!restored.current || ref) return;
    try { localStorage.setItem(DRAFT, JSON.stringify({ v, sector, age, type, montant, usage })); } catch {}
  }, [v, sector, age, type, montant, usage, ref]);

  const err = (id: string) => {
    if (!touched[id]) return "";
    if (id === "raison") return v.raison.trim().length < 2 ? t.raisonErr : "";
    if (id === "tel") return phoneError(v.tel, lang);
    return "";
  };
  const focusPane = () => requestAnimationFrame(() => paneRef.current?.querySelector<HTMLElement>("input,button,textarea")?.focus());

  const pick = async (i: number, file: File | undefined) => {
    if (!file) return;
    const e = [...docErr];
    if (file.size > MAX) { e[i] = t.tooBig; setDocErr(e); return; }
    if (!ACCEPT.split(",").includes(file.type)) { e[i] = t.badType; setDocErr(e); return; }
    e[i] = ""; setDocErr(e); setBusyDoc(i);
    try {
      const blob = await upload(`dossiers/${file.name}`, file, { access: "private", handleUploadUrl: "/api/dossiers/upload", contentType: file.type });
      setDocs((d) => { const n = [...d]; n[i] = { name: file.name, size: file.size, mimeType: file.type, blobUrl: blob.url }; return n; });
      setStepErr("");
    } catch {
      const e2 = [...docErr]; e2[i] = t.uploadFail; setDocErr(e2);
    } finally {
      setBusyDoc(null);
    }
  };

  const next = async () => {
    if (loading || busyDoc !== null) return;
    setStepErr("");
    if (step === 0) {
      setTouched((x) => ({ ...x, raison: true, tel: true }));
      if (v.raison.trim().length < 2 || phoneError(v.tel, lang)) return;
    }
    if (step < 2) { setStep(step + 1); focusPane(); return; }
    if (docs.slice(0, 3).some((d) => !d)) { setStepErr(t.missingDocs); return; }
    if (!certify) { setStepErr(t.certifyErr); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/dossiers/emission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raison: v.raison, rccm: v.rccm, telephone: v.tel, secteur: sector, anciennete: age, typeTitre: type,
          montant: montant.replace(/\D/g, ""), usage, certify,
          documents: docs.map((d, i) => d && { slot: i, blobUrl: d.blobUrl, filename: d.name, mimeType: d.mimeType, size: d.size }).filter(Boolean),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reference) throw new Error(data.error || "fail");
      setRef(data.reference);
      try { localStorage.removeItem(DRAFT); } catch {}
    } catch (e) {
      setStepErr(e instanceof Error && e.message !== "fail" ? e.message : t.sendFail);
    } finally {
      setLoading(false);
    }
  };

  const fmtSize = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toLocaleString(lang === "en" ? "en-US" : "fr-FR", { maximumFractionDigits: 1 })} ${lang === "en" ? "MB" : "Mo"}` : `${Math.round(n / 1024)} ${lang === "en" ? "KB" : "Ko"}`);
  const label = (list: readonly string[], fr: string) => t[list === SECTORS ? "sectors" : "ages"][(list as string[]).indexOf(fr)] ?? fr;

  return (
    <div style={s(`position:relative;background:#FAF8F5;border-radius:16px;padding:clamp(20px,3vw,36px);display:flex;flex-direction:column;gap:28px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06)`)}>
      <span className="sun-beam" aria-hidden="true" />
      {ref ? (
        <div role="status" style={s(`display:flex;flex-direction:column;gap:20px;align-items:flex-start;padding:12px 0`)}>
          <SuccessBadge />
          <strong style={s(`font:700 clamp(24px,2.4vw,30px)/1.2 'Montserrat';color:#261A66`)}>{t.done}</strong>
          <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#5C5873`)}>{t.ref} <strong style={s(`color:#261A66;font-weight:700`)}>{ref}</strong>. {t.doneText}</p>
          <div style={s(`display:flex;flex-direction:column;gap:12px;width:100%`)}>
            <div style={s(`display:flex;gap:14px;align-items:center`)}>
              <span style={s(`width:24px;height:24px;border-radius:50%;background:#261A66;display:flex;align-items:center;justify-content:center`)}><svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span style={s(`font:600 15px/1.3 'Montserrat';color:#261A66`)}>{t.track[0]}</span>
            </div>
            <div style={s(`display:flex;gap:14px;align-items:center`)}>
              <span style={s(`width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #EF5F18;display:flex;align-items:center;justify-content:center`)}><span style={s(`width:10px;height:10px;border-radius:50%;background:#EF5F18`)} /></span>
              <span style={s(`font:700 15px/1.3 'Montserrat';color:#B8460E`)}>{t.track[1]}</span>
            </div>
          </div>
          <button type="button" onClick={() => { setRef(null); setStep(0); setDocs([null, null, null, null]); setCertify(false); setTouched({}); setV({ raison: "", rccm: "", tel: "" }); setMontant(""); setUsage(""); }}
            style={s(`height:44px;padding:0 18px;border-radius:10px;border:0;background:#EEEBFB;color:#261A66;font:600 14px/1 'Montserrat';cursor:pointer`)}>{t.again}</button>
        </div>
      ) : (
        <>
          <ol aria-label={t.progress} style={s(`margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px`)}>
            {t.steps.map((l, i) => (
              <li key={l} aria-current={i === step ? "step" : undefined} style={s(`display:flex;flex-direction:column;gap:10px`)}>
                <div style={s(`height:4px;border-radius:2px;background:#E6E6E6;overflow:hidden`)}>
                  <div style={{ ...s(`height:100%;transform-origin:0 50%;transition:transform 600ms cubic-bezier(.22,1,.36,1)`), background: i < step ? "#261A66" : "#EF5F18", transform: i <= step ? "scaleX(1)" : "scaleX(0)" }} />
                </div>
                <span style={{ ...s(`font-size:14px;line-height:1.3;font-family:var(--font-montserrat),sans-serif;display:flex;align-items:center;gap:6px`), fontWeight: i === step ? 700 : 600, color: i <= step ? "#261A66" : "#5C5873" }}>
                  <span style={{ ...s(`width:7px;height:7px;border-radius:50%;flex:none`), background: i < step ? "#261A66" : i === step ? "#EF5F18" : "#C9C3F0" }} />{l}
                </span>
              </li>
            ))}
          </ol>

          <div ref={paneRef} key={step} style={s(`display:flex;flex-direction:column;gap:18px;animation:paneIn 420ms cubic-bezier(.22,1,.36,1)`)}>
            {step === 0 ? (
              <>
                <strong style={s(`font:600 22px/1.3 'Montserrat';color:#261A66`)}>{t.s0}</strong>
                <TextField id="raison" label={t.raison} value={v.raison} required autoComplete="organization" maxLength={160}
                  onChange={(x) => setV({ ...v, raison: x })} onBlur={() => setTouched({ ...touched, raison: true })} error={err("raison")} />
                <TextField id="rccm" label={t.rccm} value={v.rccm} maxLength={80} onChange={(x) => setV({ ...v, rccm: x })} />
                <TextField id="tel" label={t.tel} value={v.tel} required inputMode="tel" type="tel" autoComplete="tel" maxLength={24}
                  onChange={(x) => setV({ ...v, tel: x })} onBlur={() => setTouched({ ...touched, tel: true })} error={err("tel")} hint={t.telHint} />
                <Pills label={t.sector} options={SECTORS} value={sector as (typeof SECTORS)[number]} onChange={setSector} display={(o) => label(SECTORS, o)} />
                <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
                  <Pills label={t.age} options={AGES} value={age as (typeof AGES)[number]} onChange={setAge} display={(o) => label(AGES, o)} />
                  {age === AGES[0] ? <span style={s(`display:flex;gap:10px;background:#EEEBFB;color:#261A66;font:400 15px/1.5 'Source Sans 3';padding:12px 14px;border-radius:6px`)}>{t.young}</span> : null}
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <strong style={s(`font:600 22px/1.3 'Montserrat';color:#261A66`)}>{t.s1}</strong>
                <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
                  <span id="type-label" style={s(`font:600 16px/1.3 'Source Sans 3'`)}>{t.type}</span>
                  <div role="radiogroup" aria-labelledby="type-label" style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:12px`)}>
                    {TYPES.map((ty, i) => <RadioCard key={ty} on={type === ty} onClick={() => setType(ty)} title={t.types[i][0]} text={t.types[i][1]} />)}
                  </div>
                </div>
                <TextField id="montant" label={t.montant} value={montant} inputMode="numeric" suffix="USD" maxLength={20}
                  onChange={(x) => { const d = x.replace(/\D/g, "").slice(0, 13); setMontant(d ? Number(d).toLocaleString(lang === "en" ? "en-US" : "fr-FR") : ""); }} />
                <TextArea id="usage" label={t.usage} value={usage} onChange={setUsage} placeholder={t.usagePh} maxLength={2000} />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <strong style={s(`font:600 22px/1.3 'Montserrat';color:#261A66`)}>{t.s2}</strong>
                {t.docs.map((l, i) => {
                  const d = docs[i];
                  const busy = busyDoc === i;
                  return (
                    <div key={l} style={s(`display:flex;flex-direction:column;gap:6px`)}>
                      <input ref={(el) => { inputs.current[i] = el; }} id={`doc-${i}`} type="file" accept={ACCEPT} hidden onChange={(e) => { pick(i, e.target.files?.[0]); e.target.value = ""; }} />
                      <button type="button" disabled={busy} aria-describedby={`doc-${i}-sub`}
                        onClick={() => { if (d) setDocs((x) => { const n = [...x]; n[i] = null; return n; }); else inputs.current[i]?.click(); }}
                        style={{ ...s(`display:flex;align-items:center;gap:14px;padding:16px;border-radius:10px;border:0;background:#fff;cursor:pointer;text-align:left;transition:box-shadow 180ms;width:100%`), boxShadow: d ? "inset 0 0 0 1.5px #261A66" : docErr[i] ? "inset 0 0 0 2px #B42318" : "inset 0 0 0 1.5px #C9C3F0" }}>
                        <span style={{ ...s(`flex:none;width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;transition:background 280ms`), background: d ? "#261A66" : "#EEEBFB" }}>
                          {busy ? <Spinner color="#261A66" /> : d ? (
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray="1" style={s(`stroke-dashoffset:1;animation:sunDraw 350ms cubic-bezier(.65,0,.35,1) forwards`)} /></svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#261A66" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
                          )}
                        </span>
                        <span style={s(`display:flex;flex-direction:column;gap:2px;flex:1;min-width:0`)}>
                          <strong style={s(`font:600 16px/1.3 'Montserrat';color:#261A66`)}>{l}</strong>
                          <span id={`doc-${i}-sub`} style={{ ...s(`font:400 14px/1.3 'Source Sans 3';overflow:hidden;text-overflow:ellipsis;white-space:nowrap`), color: d ? "#2E6B52" : "#5C5873" }}>{d ? `${d.name} · ${fmtSize(d.size)}` : t.docSub}</span>
                        </span>
                        <span style={s(`font:600 14px/1 'Montserrat';color:#B8460E;flex:none`)}>{busy ? t.uploading : d ? t.remove : t.add}</span>
                      </button>
                      {docErr[i] ? <span role="alert" style={s(`font:600 14px/1.4 'Source Sans 3';color:#B42318`)}>{docErr[i]}</span> : null}
                    </div>
                  );
                })}
                <label style={s(`display:flex;gap:12px;align-items:flex-start;cursor:pointer;font:400 15px/1.5 'Source Sans 3';color:#5C5873;min-height:44px;margin-top:6px`)}>
                  <input type="checkbox" checked={certify} onChange={() => setCertify(!certify)} style={s(`width:22px;height:22px;margin:1px 0 0;accent-color:#261A66;flex:none`)} />
                  <span>{t.certify}</span>
                </label>
              </>
            ) : null}
          </div>

          {stepErr ? <p role="alert" style={s(`margin:0;font:600 15px/1.45 'Source Sans 3';color:#B42318;background:#FEF3F2;border-radius:6px;padding:12px 14px`)}>{stepErr}</p> : null}

          <div style={s(`display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:4px`)}>
            {step > 0 ? (
              <button type="button" onClick={() => { setStep(step - 1); setStepErr(""); focusPane(); }} className="hv-btn-outline"
                style={s(`height:52px;padding:0 20px;border-radius:10px;border:0;background:transparent;box-shadow:inset 0 0 0 1.5px #261A66;color:#261A66;font:600 16px/1 'Montserrat';cursor:pointer`)}>{t.back}</button>
            ) : null}
            <span style={s(`flex:1`)} />
            <button type="button" onClick={next} aria-busy={loading} className="hv-btn-orange"
              style={s(`height:52px;padding:0 24px;border-radius:10px;border:0;background:#EF5F18;color:#170F45;font:600 16px/1 'Montserrat';cursor:pointer;display:flex;align-items:center;gap:10px;transition:background 180ms`)}>
              {loading ? <Spinner /> : null}{loading ? t.sending : step === 2 ? t.send : t.next}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
