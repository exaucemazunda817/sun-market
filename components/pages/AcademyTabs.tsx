"use client";

// Onglets En présentiel / En ligne de l'académie (07 Trading.dc.html, cahier §10) :
// role="tablist", navigation au clavier par flèches.
import { useRef, useState } from "react";
import { s } from "@/lib/css";

type Format = { label: string; duree: string; lieu: string };

export default function AcademyTabs({
  title, eyebrow, formats, modules, priceLabel, payWord, durationWord, placeWord, cta, ctaHref, tablistLabel,
}: {
  title: string; eyebrow: React.ReactNode; formats: Format[]; modules: [string, string][]; priceLabel: string; payWord: string;
  durationWord: string; placeWord: string; cta: string; ctaHref: string; tablistLabel: string;
}) {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const f = formats[i];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : formats.length - 1)) % formats.length;
    setI(n);
    refs.current[n]?.focus();
  };
  return (
    <div style={s(`max-width:1224px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(36px,5vw,56px)`)}>
      <div style={s(`display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap`)}>
        <div data-reveal="" style={s(`display:flex;flex-direction:column;gap:14px;max-width:700px`)}>
          {eyebrow}
          <h2 style={s(`margin:0;font:700 clamp(28px,3.6vw,44px)/1.12 'Montserrat';letter-spacing:-.02em;color:#261A66;text-wrap:balance`)}>{title}</h2>
        </div>
        <div role="tablist" aria-label={tablistLabel} onKeyDown={onKey} style={s(`display:flex;gap:4px;padding:4px;border-radius:12px;background:#fff`)}>
          {formats.map((x, k) => (
            <button key={x.label} ref={(el) => { refs.current[k] = el; }} role="tab" id={`academie-tab-${k}`} aria-selected={k === i} aria-controls="academie-panel" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)}
              style={{ ...s(`height:44px;padding:0 18px;border:0;border-radius:9px;font:600 14px/1 'Montserrat';cursor:pointer;transition:background 180ms,color 180ms`), background: k === i ? "#261A66" : "transparent", color: k === i ? "#fff" : "#261A66" }}>{x.label}</button>
          ))}
        </div>
      </div>
      <div id="academie-panel" role="tabpanel" aria-labelledby={`academie-tab-${i}`} style={s(`display:flex;flex-direction:column;gap:clamp(36px,5vw,56px)`)}>
        <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px`)}>
          {modules.map(([t, d], k) => (
            <div key={t} data-reveal="" data-delay={String(k * 80)} data-tilt="" style={s(`background:#fff;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px`)}>
              <span style={s(`font:700 13px/1 'Montserrat';letter-spacing:.1em;color:#B8460E`)}>MODULE {String(k + 1).padStart(2, "0")}</span>
              <h3 style={s(`margin:0;font:600 19px/1.3 'Montserrat';color:#261A66`)}>{t}</h3>
              <span style={s(`font:400 16px/1.55 'Source Sans 3';color:#5C5873;text-wrap:pretty`)}>{d}</span>
            </div>
          ))}
        </div>
        <div style={s(`display:flex;flex-wrap:wrap;gap:16px 32px;align-items:center;justify-content:space-between;background:#fff;border-radius:16px;padding:24px 28px`)}>
          <div style={s(`display:flex;flex-wrap:wrap;gap:12px 32px;font:400 16px/1.4 'Source Sans 3'`)}>
            <span><strong style={s(`font:700 16px/1 'Montserrat';color:#261A66`)}>{f.duree}</strong> · {durationWord}</span>
            <span><strong style={s(`font:700 16px/1 'Montserrat';color:#261A66`)}>{f.lieu}</strong> · {placeWord}</span>
            <span><strong style={s(`font:700 16px/1 'Montserrat';color:#261A66`)}>{priceLabel}</strong> · {payWord}</span>
          </div>
          <a href={ctaHref} className="hv-btn-violet" style={s(`height:52px;padding:0 24px;border-radius:10px;background:#261A66;color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;transition:background 180ms`)}>{cta}</a>
        </div>
      </div>
    </div>
  );
}
