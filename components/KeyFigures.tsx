"use client";

import { animate } from "motion";
import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/components/useInViewOnce";

// Chiffre clé qui monte de 0 à sa valeur à l'arrivée à l'écran. Rendu serveur
// et « Réduire les animations » : la valeur finale directement.
function Figure({ valeur, suffixe, label }: { valeur: number; suffixe: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const [shown, setShown] = useState(valeur);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, valeur, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [seen, valeur]);

  return (
    <div ref={ref} className="border-l border-white/15 pl-5">
      <p className="font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
        {shown.toLocaleString("fr-FR")}
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
