"use client";

// Formulaire de la page Contact (11 Contact.dc.html, cahier §14) : sujet,
// nom complet, téléphone (WhatsApp), message ; validation à la sortie du champ ;
// état d'envoi puis « Message bien reçu ». Envoi réel vers /api/contact.
import { useEffect, useState } from "react";
import { s } from "@/lib/css";
import { phoneError } from "@/lib/validate";
import { Pills, Spinner, TextArea, TextField } from "@/components/sun/fields";

const TOPICS = ["Financement", "Trading", "Conseil fiscal", "Autre"] as const;
const QUERY: Record<string, (typeof TOPICS)[number]> = { financement: "Financement", trading: "Trading", fiscal: "Conseil fiscal", autre: "Autre" };

const T = {
  fr: {
    title: "Écrire à SUN Market", topic: "Sujet", topics: TOPICS as readonly string[], nom: "Nom complet", nomErr: "Indiquez votre nom.", tel: "Téléphone (WhatsApp)", telHint: "Exemple : +243 840 922 275",
    msg: "Votre message", msgErr: "Écrivez votre message.", send: "Envoyer", sending: "Envoi en cours…",
    done: "Message bien reçu.", doneText: "Nous vous répondons sous 48 heures ouvrées.", again: "Envoyer un autre message",
    fail: "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous sur WhatsApp.",
  },
  en: {
    title: "Write to SUN Market", topic: "Topic", topics: ["Financing", "Trading", "Tax advisory", "Other"], nom: "Full name", nomErr: "Enter your name.", tel: "Phone (WhatsApp)", telHint: "Example: +243 840 922 275",
    msg: "Your message", msgErr: "Write your message.", send: "Send", sending: "Sending…",
    done: "Message received.", doneText: "We will reply within 48 working hours.", again: "Send another message",
    fail: "Sending failed. Try again shortly, or write to us on WhatsApp.",
  },
};

export default function ContactForm({ lang }: { lang: "fr" | "en" }) {
  const t = T[lang];
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Sujet présélectionné par un lien (?sujet=financement depuis la page Marché financier).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("sujet");
    if (q && QUERY[q]) setTopic(QUERY[q]);
  }, []);

  const errs = {
    nom: nom.trim().length < 2 ? t.nomErr : "",
    tel: phoneError(tel, lang),
    msg: msg.trim().length < 2 ? t.msgErr : "",
  };
  const shown = (k: keyof typeof errs) => (touched[k] ? errs[k] : "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    if (errs.nom || errs.tel || errs.msg) { setTouched({ nom: true, tel: true, msg: true }); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sujet: topic, nom, telephone: tel, message: msg }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "");
      setSent(true);
    } catch (e2) {
      setError(e2 instanceof Error && e2.message ? e2.message : t.fail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="formulaire" onSubmit={submit} noValidate style={s(`background:#fff;border-radius:16px;padding:clamp(24px,3vw,36px);display:flex;flex-direction:column;gap:18px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06);scroll-margin-top:96px`)}>
      {sent ? (
        <div role="status" style={s(`display:flex;flex-direction:column;gap:16px;align-items:flex-start;padding:12px 0`)}>
          <span style={s(`width:56px;height:56px;border-radius:50%;background:#261A66;display:flex;align-items:center;justify-content:center;animation:sunPop 460ms cubic-bezier(.34,1.56,.64,1)`)}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#EF5F18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray="1" style={s(`stroke-dashoffset:1;animation:sunDraw 400ms cubic-bezier(.65,0,.35,1) 250ms forwards`)} /></svg>
          </span>
          <strong style={s(`font:700 24px/1.2 'Montserrat';color:#261A66`)}>{t.done}</strong>
          <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#5C5873`)}>{t.doneText}</p>
          <button type="button" onClick={() => { setSent(false); setNom(""); setTel(""); setMsg(""); setTouched({}); }}
            style={s(`height:44px;padding:0 18px;border-radius:10px;border:0;background:#EEEBFB;color:#261A66;font:600 14px/1 'Montserrat';cursor:pointer`)}>{t.again}</button>
        </div>
      ) : (
        <>
          <strong style={s(`font:600 22px/1.3 'Montserrat';color:#261A66`)}>{t.title}</strong>
          <Pills label={t.topic} options={TOPICS} value={topic as (typeof TOPICS)[number]} onChange={setTopic} display={(o) => t.topics[TOPICS.indexOf(o)]} hideLabel />
          <TextField id="nom" label={t.nom} value={nom} onChange={setNom} required autoComplete="name" maxLength={120} bg="#FAF8F5"
            onBlur={() => setTouched((x) => ({ ...x, nom: true }))} error={shown("nom")} />
          <TextField id="tel" label={t.tel} value={tel} onChange={setTel} required type="tel" inputMode="tel" autoComplete="tel" maxLength={24} bg="#FAF8F5"
            onBlur={() => setTouched((x) => ({ ...x, tel: true }))} error={shown("tel")} hint={t.telHint} />
          <TextArea id="msg" label={t.msg} value={msg} onChange={(v) => { setMsg(v); }} rows={5} maxLength={4000} bg="#FAF8F5" error={shown("msg")} />
          {error ? <p role="alert" style={s(`margin:0;font:600 15px/1.45 'Source Sans 3';color:#B42318;background:#FEF3F2;border-radius:6px;padding:12px 14px`)}>{error}</p> : null}
          <button type="submit" aria-busy={loading} className="hv-btn-orange"
            style={s(`height:52px;border-radius:10px;border:0;background:#EF5F18;color:#170F45;font:600 16px/1 'Montserrat';cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:background 180ms`)}>
            {loading ? <Spinner /> : null}{loading ? t.sending : t.send}
          </button>
        </>
      )}
    </form>
  );
}
