"use client";

// Accordéon FAQ (cahier §6) : bouton pleine largeur 64 px min, icône + qui
// tourne de 45°, réponse en grid-template-rows 0fr → 1fr, aria-expanded.
import { useId, useState } from "react";
import { s } from "@/lib/css";

export default function Accordion({ items, initial = 0 }: { items: [string, string][]; initial?: number }) {
  const [open, setOpen] = useState(initial);
  const base = useId();
  return (
    <div style={s(`display:flex;flex-direction:column`)}>
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={q} style={s(`box-shadow:inset 0 -1px 0 #E6E6E6`)}>
            <h3 style={s(`margin:0`)}>
              <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} aria-controls={`${base}-${i}`} id={`${base}-${i}-q`}
                style={s(`width:100%;min-height:64px;padding:16px 0;border:0;background:transparent;display:flex;justify-content:space-between;align-items:center;gap:16px;text-align:left;cursor:pointer;font:600 18px/1.35 'Montserrat';color:#261A66`)}>
                {q}
                <span style={{ ...s(`flex:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 180ms`), background: on ? "#261A66" : "#EEEBFB" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={on ? "#fff" : "#261A66"} strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"
                    style={{ transform: on ? "rotate(45deg)" : "none", transition: "transform 280ms cubic-bezier(.22,1,.36,1)" }}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </span>
              </button>
            </h3>
            <div id={`${base}-${i}`} role="region" aria-labelledby={`${base}-${i}-q`}
              style={{ display: "grid", gridTemplateRows: on ? "1fr" : "0fr", transition: "grid-template-rows 280ms cubic-bezier(.22,1,.36,1)" }}>
              <div style={s(`overflow:hidden`)}>
                <p style={s(`margin:0 0 20px;font:400 17px/1.6 'Source Sans 3';color:#5C5873;max-width:720px`)}>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
