"use client";

// Champs de formulaire des maquettes (cahier §6) : champ texte à étiquette
// flottante, pilules de choix, carte radio, ligne de fichier, bouton d'envoi.
import { useState, type ReactNode } from "react";
import { s } from "@/lib/css";

export function TextField({
  id, label, value, onChange, error, hint, inputMode, type = "text", autoComplete, required, onBlur, suffix, maxLength, bg = "#fff",
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string; hint?: string;
  inputMode?: "text" | "tel" | "numeric" | "email"; type?: string; autoComplete?: string; required?: boolean; onBlur?: () => void; suffix?: string; maxLength?: number; bg?: string;
}) {
  const [focus, setFocus] = useState(false);
  const up = focus || !!value;
  const ok = !error && !!value && !focus && required;
  const ring = error ? "inset 0 0 0 2px #B42318" : focus ? "inset 0 0 0 2px #261A66" : "inset 0 0 0 1.5px #C9C3F0";
  const hintId = `${id}-hint`;
  return (
    <div style={s(`display:flex;flex-direction:column;gap:6px`)}>
      <div style={{ ...s(`position:relative;height:56px;border-radius:6px;transition:box-shadow 180ms`), background: error ? "#FEF3F2" : bg, boxShadow: ring }}>
        <input id={id} value={value} type={type} inputMode={inputMode} autoComplete={autoComplete} maxLength={maxLength}
          aria-invalid={!!error} aria-required={required} aria-describedby={error || hint ? hintId : undefined}
          onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); onBlur?.(); }}
          style={{ ...s(`position:absolute;inset:0;width:100%;border:0;background:transparent;font:400 17px/1.2 'Source Sans 3';color:#1A1730;outline:none`), padding: suffix ? "22px 64px 6px 16px" : ok ? "22px 44px 6px 16px" : "22px 16px 6px" }} />
        <label htmlFor={id} style={{ ...s(`position:absolute;left:16px;top:0;height:100%;display:flex;align-items:center;pointer-events:none;font:400 17px/1 'Source Sans 3';transform-origin:0 50%;transition:transform 180ms cubic-bezier(.22,1,.36,1),color 180ms;white-space:nowrap`), color: error ? "#B42318" : focus ? "#261A66" : "#5C5873", transform: up ? "translateY(-11px) scale(.78)" : "none" }}>{label}</label>
        {suffix ? <span style={s(`position:absolute;right:16px;top:50%;transform:translateY(-50%);font:700 14px/1 'Montserrat';color:#5C5873`)}>{suffix}</span> : null}
        {ok && !suffix ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2E6B52" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s(`position:absolute;right:14px;top:50%;margin-top:-10px`)}>
            <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray="1" style={s(`stroke-dashoffset:1;animation:sunDraw 400ms cubic-bezier(.65,0,.35,1) forwards`)} />
          </svg>
        ) : null}
      </div>
      {error || hint ? (
        <span id={hintId} role={error ? "alert" : undefined} style={{ ...s(`font:14px/1.4 'Source Sans 3';display:flex;gap:6px;align-items:flex-start`), color: error ? "#B42318" : "#5C5873", fontWeight: error ? 600 : 400 }}>
          {error ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={s(`flex:none;margin-top:1px`)}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><path d="M12 16.5v.01" /></svg>
          ) : null}
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}

export function TextArea({ id, label, value, onChange, placeholder, rows = 4, error, maxLength, bg = "#fff" }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; error?: string; maxLength?: number; bg?: string }) {
  return (
    <div style={s(`display:flex;flex-direction:column;gap:6px`)}>
      <label htmlFor={id} style={s(`font:600 16px/1.3 'Source Sans 3'`)}>{label}</label>
      <textarea id={id} rows={rows} value={value} placeholder={placeholder} maxLength={maxLength} aria-invalid={!!error} onChange={(e) => onChange(e.target.value)}
        style={{ ...s(`border:0;border-radius:6px;padding:14px 16px;font:400 17px/1.5 'Source Sans 3';color:#1A1730;resize:vertical`), background: error ? "#FEF3F2" : bg, boxShadow: error ? "inset 0 0 0 2px #B42318" : "inset 0 0 0 1.5px #C9C3F0" }} />
      {error ? <span role="alert" style={s(`font:600 14px/1.4 'Source Sans 3';color:#B42318`)}>{error}</span> : null}
    </div>
  );
}

export function Pills<T extends string>({ label, options, value, onChange, display, hideLabel }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void; display?: (v: T) => string; hideLabel?: boolean }) {
  return (
    <div role="group" aria-label={label} style={s(`display:flex;flex-direction:column;gap:10px`)}>
      {hideLabel ? null : <span style={s(`font:600 16px/1.3 'Source Sans 3'`)}>{label}</span>}
      <div style={s(`display:flex;flex-wrap:wrap;gap:8px`)}>
        {options.map((o) => {
          const on = o === value;
          return (
            <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={on}
              style={{ ...s(`height:44px;padding:0 16px;border-radius:999px;border:0;font:600 14px/1 'Montserrat';cursor:pointer;transition:background 180ms,color 180ms`), background: on ? "#261A66" : "#fff", color: on ? "#fff" : "#261A66", boxShadow: on ? "none" : "inset 0 0 0 1.5px #C9C3F0" }}>
              {display ? display(o) : o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RadioCard({ on, onClick, title, text, minHeight }: { on: boolean; onClick: () => void; title: ReactNode; text?: ReactNode; minHeight?: number }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onClick}
      style={{ ...s(`text-align:left;padding:18px;border-radius:10px;border:0;background:#fff;cursor:pointer;display:flex;flex-direction:column;gap:6px;transition:box-shadow 180ms`), boxShadow: on ? "inset 0 0 0 2px #261A66" : "inset 0 0 0 1.5px #C9C3F0", minHeight }}>
      <span style={s(`display:flex;align-items:center;justify-content:space-between;width:100%;gap:12px`)}>
        <strong style={s(`font:700 17px/1.2 'Montserrat';color:#261A66`)}>{title}</strong>
        <span style={{ ...s(`flex:none;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center`), boxShadow: on ? "inset 0 0 0 2px #261A66" : "inset 0 0 0 2px #C9C3F0" }}>
          <span style={{ ...s(`width:10px;height:10px;border-radius:50%;background:#EF5F18;transition:transform 280ms cubic-bezier(.34,1.56,.64,1)`), transform: on ? "scale(1)" : "scale(0)" }} />
        </span>
      </span>
      {text ? <span style={s(`font:400 15px/1.45 'Source Sans 3';color:#5C5873`)}>{text}</span> : null}
    </button>
  );
}

export function Spinner({ color = "#170F45" }: { color?: string }) {
  return <span aria-hidden="true" style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${color}`, borderRightColor: "transparent", animation: "sunSpin 700ms linear infinite", display: "inline-block" }} />;
}

export function SuccessBadge() {
  return (
    <span style={s(`width:64px;height:64px;border-radius:50%;background:#261A66;display:flex;align-items:center;justify-content:center;animation:sunPop 460ms cubic-bezier(.34,1.56,.64,1)`)}>
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#EF5F18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray="1" style={s(`stroke-dashoffset:1;animation:sunDraw 400ms cubic-bezier(.65,0,.35,1) 250ms forwards`)} />
      </svg>
    </span>
  );
}
