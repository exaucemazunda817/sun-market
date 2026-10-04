"use client";

// Carte d'abonnement conseil fiscal — 05 Conseil fiscal.dc.html, cahier §9.
// Durée 1/3/12 mois (contrôle segmenté), moyen de paiement (cartes radio),
// champ numéro selon le moyen, récapitulatif, bouton d'action.
// Sans prestataire de paiement branché (content.onlinePaymentEnabled), le bouton
// envoie une demande d'abonnement : jamais de faux écran « validez sur votre téléphone ».
import { useState } from "react";
import { s } from "@/lib/css";
import { bank, fiscalPriceUsd, onlinePaymentEnabled } from "@/lib/content";
import { normalizeDrcPhone } from "@/lib/validate";
import { Spinner, SuccessBadge } from "@/components/sun/fields";

const MONTHS = [1, 3, 12] as const;
const METHODS = ["M-Pesa", "Orange Money", "Airtel Money", "Virement", "Carte bancaire"] as const;
type Method = (typeof METHODS)[number];

const T = {
  fr: {
    plan: "Abonnement conseil fiscal", per: "USD / mois", price: "[montant]", noCommit: "Sans engagement",
    duration: "Durée de paiement", months: ["1 mois", "3 mois", "12 mois"], method: "Moyen de paiement",
    subs: ["Vodacom", "Orange", "Airtel", "Banque locale", "Clients à l’étranger"], labels: ["M-Pesa", "Orange Money", "Airtel Money", "Virement", "Carte bancaire"],
    number: (m: string) => `Numéro ${m}`, yourNumber: "Votre numéro (WhatsApp)",
    phoneErr: "Numéro incomplet : 9 chiffres après +243.",
    phoneHintPay: "Vous recevrez une demande de validation sur ce numéro.",
    phoneHintReq: "Votre conseiller vous appelle sur ce numéro pour finaliser le paiement.",
    bankTitle: "Coordonnées bancaires", bankLine: (b: string, c: string) => `Bénéficiaire : SUN Capital SARL · Banque : ${b} · IBAN / n° de compte : ${c}`, tbd: "[à fournir]",
    bankDelay: "L'abonnement démarre à réception du virement (1 à 3 jours ouvrés).",
    card: "Pour les clients à l'étranger. Vous serez redirigé vers une page de paiement sécurisée (Visa, Mastercard).",
    line: (n: number) => `Abonnement × ${n} mois`, total: "Total",
    payMM: (m: string) => `Payer avec ${m}`, payBank: "Recevoir les coordonnées par SMS", payCard: "Continuer vers le paiement",
    request: "Envoyer ma demande d'abonnement", sending: "Envoi en cours…",
    cancel: "Résiliable à tout moment, par WhatsApp ou à nos bureaux.",
    waitTitle: "Validez le paiement sur votre téléphone", waitText: (m: string, p: string) => `Une demande ${m} a été envoyée au +243 ${p}. Saisissez votre code PIN pour confirmer.`,
    paidTitle: "Bienvenue parmi nos abonnés.", paidText: "Paiement reçu. Votre conseiller vous appelle sous 48 heures pour fixer le premier rendez-vous et la liste des documents à préparer. Un reçu vous est envoyé par SMS.",
    reqTitle: "Demande reçue. Merci.", reqText: (r: string) => `Référence ${r}. Votre conseiller vous appelle sous 48 heures ouvrées pour confirmer l'abonnement, le paiement et la liste des documents à préparer.`,
    fail: "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous sur WhatsApp.",
  },
  en: {
    plan: "Tax advisory subscription", per: "USD / month", price: "[amount]", noCommit: "No commitment",
    duration: "Payment period", months: ["1 month", "3 months", "12 months"], method: "Payment method",
    subs: ["Vodacom", "Orange", "Airtel", "Local bank", "Clients abroad"], labels: ["M-Pesa", "Orange Money", "Airtel Money", "Bank transfer", "Bank card"],
    number: (m: string) => `${m} number`, yourNumber: "Your number (WhatsApp)",
    phoneErr: "Incomplete number: 9 digits after +243.",
    phoneHintPay: "You will receive a confirmation request on this number.",
    phoneHintReq: "Your advisor will call you on this number to complete the payment.",
    bankTitle: "Bank details", bankLine: (b: string, c: string) => `Beneficiary: SUN Capital SARL · Bank: ${b} · IBAN / account no.: ${c}`, tbd: "[to be provided]",
    bankDelay: "The subscription starts once the transfer is received (1 to 3 working days).",
    card: "For clients abroad. You will be redirected to a secure payment page (Visa, Mastercard).",
    line: (n: number) => `Subscription × ${n} month${n > 1 ? "s" : ""}`, total: "Total",
    payMM: (m: string) => `Pay with ${m}`, payBank: "Get the details by SMS", payCard: "Continue to payment",
    request: "Send my subscription request", sending: "Sending…",
    cancel: "Cancel at any time, via WhatsApp or at our offices.",
    waitTitle: "Confirm the payment on your phone", waitText: (m: string, p: string) => `A ${m} request was sent to +243 ${p}. Enter your PIN to confirm.`,
    paidTitle: "Welcome among our subscribers.", paidText: "Payment received. Your advisor will call you within 48 hours to set the first meeting and the list of documents to prepare. A receipt is sent to you by SMS.",
    reqTitle: "Request received. Thank you.", reqText: (r: string) => `Reference ${r}. Your advisor will call you within 48 working hours to confirm the subscription, the payment and the documents to prepare.`,
    fail: "Sending failed. Try again shortly, or write to us on WhatsApp.",
  },
};

export default function SubscribeCard({ lang }: { lang: "fr" | "en" }) {
  const t = T[lang];
  const [period, setPeriod] = useState(0);
  const [method, setMethod] = useState<Method>("M-Pesa");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState<"form" | "wait" | "paid" | "requested">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");

  const mm = method === "M-Pesa" || method === "Orange Money" || method === "Airtel Money";
  const mi = METHODS.indexOf(method);
  const months = MONTHS[period];
  const fmt = (n: number) => n.toLocaleString(lang === "en" ? "en-US" : "fr-FR");
  const unit = fiscalPriceUsd != null ? fmt(fiscalPriceUsd) : t.price;
  const sub = fiscalPriceUsd != null ? fmt(fiscalPriceUsd * months) : lang === "en" ? `[amount × ${months}]` : `[montant × ${months}]`;
  const total = fiscalPriceUsd != null ? fmt(fiscalPriceUsd * months) : "[total]";
  const needsPhone = mm || !onlinePaymentEnabled;
  const phoneBad = touched && needsPhone && !normalizeDrcPhone(phone);

  const submit = async () => {
    if (loading) return;
    setError("");
    if (needsPhone && !normalizeDrcPhone(phone)) { setTouched(true); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/abonnements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ months, method, telephone: phone }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reference) throw new Error(data.error || "");
      setRef(data.reference);
      // Paiement en ligne branché : ici démarrerait le suivi de la transaction (polling,
      // délai d'expiration, bouton « Renvoyer »), puis l'écran « paid ».
      setPhase(onlinePaymentEnabled && mm ? "wait" : "requested");
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : t.fail);
    } finally {
      setLoading(false);
    }
  };

  const action = !onlinePaymentEnabled ? t.request : mm ? t.payMM(t.labels[mi]) : method === "Virement" ? t.payBank : t.payCard;

  return (
    <div className="sun-sticky-pay" style={s(`background:#fff;border-radius:16px;padding:clamp(24px,3vw,36px);display:flex;flex-direction:column;gap:24px;box-shadow:0 2px 4px rgba(38,26,102,.06),0 20px 48px rgba(38,26,102,.14)`)}>
      <span className="sun-beam" aria-hidden="true" />
      {phase === "form" ? (
        <>
          <div style={s(`display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap`)}>
            <div style={s(`display:flex;flex-direction:column;gap:6px`)}>
              <span style={s(`font:700 13px/1 'Montserrat';letter-spacing:.12em;text-transform:uppercase;color:#5C5873`)}>{t.plan}</span>
              <div style={s(`display:flex;align-items:baseline;gap:6px`)}>
                <span style={s(`font:700 clamp(36px,4vw,48px)/1 'Montserrat';letter-spacing:-.03em;color:#261A66`)}>{unit}</span>
                <span style={s(`font:600 16px/1 'Source Sans 3';color:#5C5873`)}>{t.per}</span>
              </div>
            </div>
            <span style={s(`font:700 12px/1 'Montserrat';color:#261A66;background:#EEEBFB;padding:8px 12px;border-radius:999px`)}>{t.noCommit}</span>
          </div>

          <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
            <span id="duree-label" style={s(`font:600 16px/1.3 'Source Sans 3'`)}>{t.duration}</span>
            <div role="radiogroup" aria-labelledby="duree-label" style={s(`display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:4px;border-radius:12px;background:#FAF8F5;box-shadow:inset 0 0 0 1px #E6E6E6;position:relative`)}>
              <span aria-hidden="true" style={{ ...s(`position:absolute;top:4px;bottom:4px;left:4px;width:calc((100% - 16px) / 3);border-radius:9px;background:#261A66;transition:transform 280ms cubic-bezier(.22,1,.36,1)`), transform: `translateX(calc(${period} * (100% + 4px)))` }} />
              {t.months.map((l, i) => (
                <button key={l} type="button" role="radio" aria-checked={period === i} onClick={() => setPeriod(i)}
                  style={{ ...s(`position:relative;height:44px;border:0;background:transparent;font:600 14px/1 'Montserrat';cursor:pointer;transition:color 280ms`), color: period === i ? "#fff" : "#261A66" }}>{l}</button>
              ))}
            </div>
          </div>

          <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
            <span id="moyen-label" style={s(`font:600 16px/1.3 'Source Sans 3'`)}>{t.method}</span>
            <div role="radiogroup" aria-labelledby="moyen-label" style={s(`display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,140px),1fr));gap:10px`)}>
              {METHODS.map((m, i) => {
                const on = method === m;
                return (
                  <button key={m} type="button" role="radio" aria-checked={on} onClick={() => setMethod(m)}
                    style={{ ...s(`min-height:64px;padding:12px;border-radius:10px;border:0;cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:4px;text-align:left;transition:box-shadow 180ms,background 180ms`), background: on ? "#fff" : "#FAF8F5", boxShadow: on ? "inset 0 0 0 2px #261A66" : "inset 0 0 0 1.5px #E6E6E6" }}>
                    <span style={s(`display:flex;align-items:center;gap:8px`)}>
                      <span style={{ ...s(`width:10px;height:10px;border-radius:50%;transition:background 180ms;flex:none`), background: on ? "#EF5F18" : "#C9C3F0" }} />
                      <strong style={s(`font:700 15px/1.2 'Montserrat';color:#261A66`)}>{t.labels[i]}</strong>
                    </span>
                    <span style={s(`font:400 13px/1.3 'Source Sans 3';color:#5C5873`)}>{t.subs[i]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div key={method} style={s(`display:flex;flex-direction:column;gap:12px;animation:paneIn 360ms cubic-bezier(.22,1,.36,1)`)}>
            {method === "Virement" ? (
              <div style={s(`background:#FAF8F5;border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:6px;font:400 15px/1.5 'Source Sans 3'`)}>
                <strong style={s(`font:600 15px/1.3 'Montserrat';color:#261A66`)}>{t.bankTitle}</strong>
                <span>{t.bankLine(bank.banque ?? t.tbd, bank.compte ?? t.tbd)}</span>
                <span style={s(`color:#5C5873`)}>{t.bankDelay}</span>
              </div>
            ) : null}
            {method === "Carte bancaire" ? <div style={s(`background:#FAF8F5;border-radius:10px;padding:16px;font:400 15px/1.5 'Source Sans 3';color:#5C5873`)}>{t.card}</div> : null}
            {needsPhone ? (
              <div style={s(`display:flex;flex-direction:column;gap:6px`)}>
                <div style={{ ...s(`position:relative;height:56px;border-radius:6px`), background: phoneBad ? "#FEF3F2" : "#FAF8F5", boxShadow: phoneBad ? "inset 0 0 0 2px #B42318" : "inset 0 0 0 1.5px #C9C3F0" }}>
                  <label htmlFor="mm-phone" style={s(`position:absolute;left:16px;top:8px;font:400 13px/1 'Source Sans 3';color:#5C5873`)}>{mm ? t.number(t.labels[mi]) : t.yourNumber}</label>
                  <span aria-hidden="true" style={s(`position:absolute;left:16px;bottom:10px;font:600 17px/1 'Source Sans 3';color:#5C5873`)}>+243</span>
                  <input id="mm-phone" value={phone} inputMode="tel" autoComplete="tel-national" maxLength={16} placeholder="84 092 2275" aria-invalid={phoneBad} aria-describedby="mm-phone-hint"
                    onChange={(e) => setPhone(e.target.value)} onBlur={() => setTouched(true)}
                    style={s(`position:absolute;inset:0;width:100%;border:0;background:transparent;padding:22px 16px 6px 60px;font:400 17px/1.2 'Source Sans 3';color:#1A1730;outline:none`)} />
                </div>
                <span id="mm-phone-hint" role={phoneBad ? "alert" : undefined} style={{ ...s(`font-size:14px;line-height:1.4;font-family:var(--font-source-sans),sans-serif`), color: phoneBad ? "#B42318" : "#5C5873", fontWeight: phoneBad ? 600 : 400 }}>
                  {phoneBad ? t.phoneErr : onlinePaymentEnabled && mm ? t.phoneHintPay : t.phoneHintReq}
                </span>
              </div>
            ) : null}
          </div>

          <div style={s(`display:flex;flex-direction:column;gap:8px;padding:16px 0 0;box-shadow:inset 0 1px 0 #E6E6E6;font:400 16px/1.4 'Source Sans 3'`)}>
            <div style={s(`display:flex;justify-content:space-between;gap:12px`)}><span style={s(`color:#5C5873`)}>{t.line(months)}</span><span>{sub} USD</span></div>
            <div style={s(`display:flex;justify-content:space-between;gap:12px;font:700 18px/1.3 'Montserrat';color:#261A66`)}><span>{t.total}</span><span>{total} USD</span></div>
          </div>
          {error ? <p role="alert" style={s(`margin:0;font:600 15px/1.45 'Source Sans 3';color:#B42318;background:#FEF3F2;border-radius:6px;padding:12px 14px`)}>{error}</p> : null}
          <button type="button" onClick={submit} aria-busy={loading} className="hv-btn-orange"
            style={s(`height:56px;border-radius:10px;border:0;background:#EF5F18;color:#170F45;font:600 17px/1 'Montserrat';cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:background 180ms;padding:0 16px;text-align:center`)}>
            {loading ? <Spinner /> : null}{loading ? t.sending : action}
          </button>
          <span style={s(`font:400 14px/1.5 'Source Sans 3';color:#5C5873;text-align:center`)}>{t.cancel}</span>
        </>
      ) : null}

      {phase === "wait" ? (
        <div role="status" style={s(`display:flex;flex-direction:column;gap:18px;align-items:center;text-align:center;padding:24px 0`)}>
          <span style={s(`position:relative;width:64px;height:64px;display:flex;align-items:center;justify-content:center`)}>
            <span style={s(`position:absolute;inset:0;border-radius:50%;background:#EEEBFB;animation:sunPulse2 1600ms ease-in-out infinite`)} />
            <span style={s(`position:relative;width:20px;height:20px;border-radius:50%;background:#EF5F18`)} />
          </span>
          <strong style={s(`font:700 22px/1.3 'Montserrat';color:#261A66`)}>{t.waitTitle}</strong>
          <p style={s(`margin:0;font:400 16px/1.55 'Source Sans 3';color:#5C5873;max-width:340px`)}>{t.waitText(t.labels[mi], phone)}</p>
        </div>
      ) : null}

      {phase === "paid" || phase === "requested" ? (
        <div role="status" style={s(`display:flex;flex-direction:column;gap:18px;align-items:flex-start;padding:12px 0`)}>
          <SuccessBadge />
          <strong style={s(`font:700 26px/1.2 'Montserrat';color:#261A66`)}>{phase === "paid" ? t.paidTitle : t.reqTitle}</strong>
          <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#5C5873`)}>{phase === "paid" ? t.paidText : t.reqText(ref)}</p>
        </div>
      ) : null}
    </div>
  );
}
