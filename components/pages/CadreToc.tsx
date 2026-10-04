"use client";

// Sommaire collant de « Cadre et transparence » (cahier §12) : suivi de la
// section active à 200 px du haut, point orange + texte violet gras.
import { useEffect, useState } from "react";
import { s } from "@/lib/css";

export default function CadreToc({ items, label }: { items: [string, string][]; label: string }) {
  const [active, setActive] = useState(items[0][0]);
  useEffect(() => {
    const onS = () => {
      let a = items[0][0];
      items.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 200) a = id; });
      setActive(a);
    };
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, [items]);
  return (
    <nav aria-label={label} className="sun-toc" style={s(`top:108px;display:flex;flex-direction:column;gap:2px`)}>
      <span style={s(`font:700 12px/1 'Montserrat';letter-spacing:.12em;text-transform:uppercase;color:#5C5873;margin-bottom:12px`)}>{label}</span>
      {items.map(([id, l]) => {
        const on = active === id;
        return (
          <a key={id} href={`#${id}`} aria-current={on ? "location" : undefined} className="hv-link-violet"
            style={{ ...s(`display:flex;align-items:center;gap:10px;min-height:44px;text-decoration:none;font-size:15px;line-height:1.3;font-family:var(--font-montserrat),sans-serif;transition:color 180ms`), color: on ? "#261A66" : "#5C5873", fontWeight: on ? 700 : 600 }}>
            <span style={{ ...s(`width:7px;height:7px;border-radius:50%;transition:background 180ms;flex:none`), background: on ? "#EF5F18" : "#C9C3F0" }} />{l}
          </a>
        );
      })}
    </nav>
  );
}
