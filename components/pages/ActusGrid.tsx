"use client";

// Filtres par catégorie + grille de cartes (10 Actualites.dc.html, cahier §13).
// Les cartes réapparaissent en cascade (60 ms) à chaque changement de filtre.
import Link from "next/link";
import { useState } from "react";
import { s } from "@/lib/css";

export type CardData = { slug: string; href: string | null; category: string; catLabel: string; title: string; summary: string; read: string; image: string; imageNote: string; tone: string };

export default function ActusGrid({ cats, cards, tablistLabel, photoWord }: { cats: [string, string][]; cards: CardData[]; tablistLabel: string; photoWord: string }) {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? cards : cards.filter((c) => c.category === cat);
  return (
    <>
      <div role="tablist" aria-label={tablistLabel} style={s(`display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none`)}>
        {cats.map(([key, label]) => {
          const on = cat === key;
          return (
            <button key={key} role="tab" aria-selected={on} aria-controls="actus-grid" onClick={() => setCat(key)}
              style={{ ...s(`flex:none;height:44px;padding:0 18px;border-radius:999px;border:0;font:600 14px/1 'Montserrat';cursor:pointer;transition:background 180ms,color 180ms`), background: on ? "#261A66" : "#fff", color: on ? "#fff" : "#261A66", boxShadow: on ? "none" : "inset 0 0 0 1.5px #C9C3F0" }}>{label}</button>
          );
        })}
      </div>
      <div id="actus-grid" role="tabpanel" key={cat} style={s(`display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:24px`)}>
        {list.map((p, i) => {
          const inner = (
            <>
              <div style={s(`aspect-ratio:16/9;position:relative;display:flex;align-items:flex-end;padding:16px;overflow:hidden`)}>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading="lazy" style={s(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)} />
                ) : (
                  <>
                    <div style={{ ...s(`position:absolute;inset:0`), background: p.tone }} />
                    <div style={s(`position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent 0 14px,rgba(38,26,102,.05) 14px 15px)`)} />
                    <span style={s(`position:relative;font:600 12px/1.3 ui-monospace,Menlo,monospace;color:#5C5873`)}>{photoWord} · {p.imageNote}</span>
                  </>
                )}
              </div>
              <div style={s(`padding:24px 28px 28px;display:flex;flex-direction:column;gap:12px;flex:1`)}>
                <div style={s(`display:flex;gap:10px;align-items:center;flex-wrap:wrap`)}>
                  <span style={s(`font:700 12px/1 'Montserrat';letter-spacing:.04em;color:#261A66;background:#EEEBFB;padding:7px 10px;border-radius:999px`)}>{p.catLabel}</span>
                  <span style={s(`font:400 14px/1 'Source Sans 3';color:#5C5873`)}>{p.read}</span>
                </div>
                <h3 style={s(`margin:0;font:600 20px/1.3 'Montserrat';color:#261A66;text-wrap:balance`)}>{p.title}</h3>
                <p style={s(`margin:0;font:400 16px/1.55 'Source Sans 3';color:#5C5873`)}>{p.summary}</p>
              </div>
            </>
          );
          const st = { ...s(`text-decoration:none;color:inherit;background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06);transition:transform 280ms cubic-bezier(.22,1,.36,1),box-shadow 280ms`) };
          const delay = String((i % 3) * 70);
          return p.href
            ? <Link key={p.slug} href={p.href} data-reveal="" data-delay={delay} data-tilt="" style={st}>{inner}</Link>
            : <article key={p.slug} data-reveal="" data-delay={delay} data-tilt="" style={st}>{inner}</article>;
        })}
      </div>
    </>
  );
}
