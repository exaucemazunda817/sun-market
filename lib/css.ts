import type { CSSProperties } from "react";

// Les maquettes (design/design_handoff_sun_market/*.dc.html) décrivent chaque
// élément avec un attribut style="…" en CSS brut. Pour rester fidèle au pixel
// près, on recopie ces chaînes telles quelles et on les convertit ici en objet
// de style React, plutôt que de les réécrire à la main (source d'erreurs).
const cache = new Map<string, CSSProperties>();

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
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/^-(webkit|moz|ms)-/, (_, p) => p.charAt(0).toUpperCase() + p.slice(1) + "-")
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = value;
  }
  const res = out as CSSProperties;
  cache.set(css, res);
  return res;
}
