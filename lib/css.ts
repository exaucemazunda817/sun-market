import type { CSSProperties } from "react";

// Les maquettes (design/design_handoff_sun_market/*.dc.html) décrivent chaque
// élément avec un attribut style="…" en CSS brut. Pour rester fidèle au pixel
// près, on recopie ces chaînes telles quelles et on les convertit ici en objet
// de style React, plutôt que de les réécrire à la main (source d'erreurs).
const cache = new Map<string, CSSProperties>();

// Échelle des textes : toutes les tailles des maquettes sont réduites de 10 %
// (demande de Mazunda, 04/10/2026), sans descendre sous 12 px. Appliquée ici
// une seule fois pour tout le site, les proportions du design restent intactes.
export const TYPE_SCALE = 0.9;
const MIN_PX = 12;
const px = (n: number) => `${Math.max(MIN_PX, Math.round(n * TYPE_SCALE * 10) / 10)}px`;
// Réduit une taille de police : « 17px » ou « clamp(38px,5.6vw,72px) ».
function scaleSize(size: string): string {
  const one = size.match(/^(\d+(?:\.\d+)?)px$/);
  if (one) return px(Number(one[1]));
  const c = size.match(/^clamp\((\d+(?:\.\d+)?)px,\s*(\d+(?:\.\d+)?)vw,\s*(\d+(?:\.\d+)?)px\)$/);
  if (c) return `clamp(${px(Number(c[1]))},${Math.round(Number(c[2]) * TYPE_SCALE * 100) / 100}vw,${px(Number(c[3]))})`;
  return size;
}
// « font: 700 clamp(…)/1.06 … » : la taille est le jeton qui précède « / » ou la famille.
function scaleFont(value: string): string {
  return value.replace(/(^|\s)(clamp\([^)]*\)|\d+(?:\.\d+)?px)(?=\/|\s)/, (_, sp, size) => sp + scaleSize(size));
}

export function s(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;
  const out: Record<string, string> = {};
  // Découpe sur « ; » hors parenthèses (les dégradés et cubic-bezier en contiennent).
  let depth = 0;
  let cur = "";
  const parts: string[] = [];
  for (const ch of css) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) {
      parts.push(cur);
      cur = "";
    } else cur += ch;
  }
  parts.push(cur);
  for (const part of parts) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const prop = part.slice(0, i).trim();
    // Les maquettes nomment les polices en clair ; next/font les sert sous un nom
    // haché, d'où le remplacement par ses variables CSS.
    const value = part
      .slice(i + 1)
      .trim()
      .replace(/'Montserrat'(\s*,\s*sans-serif)?/g, "var(--font-montserrat), sans-serif")
      .replace(/'Source Sans 3'(\s*,\s*(system-ui,\s*)?sans-serif)?/g, "var(--font-source-sans), system-ui, sans-serif");
    if (!prop) continue;
    const scaled = prop === "font" ? scaleFont(value) : prop === "font-size" ? scaleSize(value) : value;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/^-(webkit|moz|ms)-/, (_, p) => p.charAt(0).toUpperCase() + p.slice(1) + "-")
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = scaled;
  }
  const res = out as CSSProperties;
  cache.set(css, res);
  return res;
}
