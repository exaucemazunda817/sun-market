"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/components/useInViewOnce";
import { EASE_OUT_SOFT } from "@/lib/motion";

const nombre = new Intl.NumberFormat("fr-FR");

// Chiffre clé qui monte de 0 à sa valeur à l'arrivée à l'écran. Rendu serveur
// et « Réduire les animations » : la valeur finale directement.
function Figure({ valeur, suffixe, label }: { valeur: number; suffixe: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const [shown, setShown] = useState(valeur);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!seen || reduce) return;
    const controls = animate(0, valeur, {
      duration: 1.4,
      ease: EASE_OUT_SOFT,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [seen, reduce, valeur]);

  return (
    <div ref={ref} className="border-l border-white/15 pl-5">
      <p className="font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
        {nombre.format(shown)}
        {suffixe}
      </p>
      <p className="mt-2 text-sm leading-snug text-sun-on-navy">{label}</p>
    </div>
  );
}

export default function KeyFigures({ items }: { items: readonly { valeur: number; suffixe: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {items.map((it) => (
        <Figure key={it.label} {...it} />
      ))}
    </div>
  );
}
