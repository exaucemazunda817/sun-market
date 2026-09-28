"use client";

import { motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { useInViewOnce } from "@/components/useInViewOnce";
import { EASE_OUT_SOFT } from "@/lib/motion";

// Histogramme à une seule série (méthode du skill dataviz) : barres fines à
// bout arrondi posées sur la ligne de base, 2 px d'écart, grille discrète,
// valeurs en encre de texte (jamais en couleur de série), infobulle au survol
// avec une zone de survol plus large que la barre, et un tableau des données
// pour les lecteurs d'écran. Couleur : orange de la charte, validée par
// scripts/validate_palette.js (luminosité et contraste sur fond clair).
type Point = { label: string; valeur: number };

const W = 520;
const H = 240;
const PAD = { top: 28, right: 8, bottom: 34, left: 8 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export default function BarChart({ title, unite, data }: { title: string; unite: string; data: readonly Point[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const [hover, setHover] = useState<number | null>(null);
  const titleId = useId();

  const max = Math.max(...data.map((d) => d.valeur));
  const niceMax = Math.ceil(max / 10) * 10 || 10;
  const band = PLOT_W / data.length;
  const barW = Math.min(56, band * 0.5);
  const cx = (i: number) => PAD.left + band * i + band / 2;
  const y = (v: number) => PAD.top + PLOT_H - (v / niceMax) * PLOT_H;
  const grid = [0.5, 1].map((f) => Math.round(niceMax * f));

  return (
    <figure ref={ref} className="relative m-0" aria-labelledby={titleId}>
      <figcaption id={titleId} className="font-display text-base font-semibold text-sun-navy">
        {title}
      </figcaption>
      <div className="relative mt-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
          {grid.map((g) => (
            <g key={g}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(g)} y2={y(g)} stroke="var(--sun-line)" strokeWidth="1" />
              <text x={W - PAD.right} y={y(g) - 5} textAnchor="end" fontSize="14" fill="var(--sun-muted)">
                {g}
              </text>
            </g>
          ))}
          <line x1={PAD.left} x2={W - PAD.right} y1={y(0)} y2={y(0)} stroke="var(--sun-muted)" strokeOpacity="0.5" strokeWidth="1" />
          {data.map((d, i) => {
            const h = y(0) - y(d.valeur);
            const r = Math.min(4, h / 2);
            const x0 = cx(i) - barW / 2;
            const top = y(d.valeur);
            // Bout arrondi (4 px) en haut, base droite sur la ligne de base.
            const path = `M${x0},${y(0)} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + barW - r} Q${x0 + barW},${top} ${x0 + barW},${top + r} V${y(0)} Z`;
            const active = hover === i;
            return (
              <g key={d.label}>
                <motion.path
                  d={path}
                  fill="var(--sun-orange)"
                  fillOpacity={hover === null || active ? 1 : 0.45}
                  style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: seen ? 1 : 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT_SOFT }}
                />
                <text x={cx(i)} y={top - 8} textAnchor="middle" fontSize="17" fontWeight="600" fill="var(--sun-navy)">
                  {d.valeur}
                </text>
                <text x={cx(i)} y={H - 10} textAnchor="middle" fontSize="15" fill="var(--sun-muted)">
                  {d.label}
                </text>
                {/* Zone de survol : toute la colonne, plus large que la barre. */}
                <rect
                  x={PAD.left + band * i}
                  y={PAD.top}
                  width={band}
                  height={PLOT_H}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-sun-navy px-3 py-2 text-xs font-medium text-white shadow-lg"
            style={{
              left: `${(cx(hover) / W) * 100}%`,
              top: `${(y(data[hover].valeur) / H) * 100}%`,
              marginTop: -22,
            }}
          >
            {data[hover].label} : {data[hover].valeur} {unite}
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Période</th>
            <th scope="col">Nombre de {unite}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>{d.valeur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
