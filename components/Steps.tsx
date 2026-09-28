"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useInViewOnce } from "@/components/useInViewOnce";

// Frise verticale numérotée. À l'arrivée à l'écran, chaque pastille apparaît à
// son tour et le trait qui la relie à la suivante se dessine de haut en bas
// (technique de tracé de ligne d'animejs, réalisée avec motion déjà installé).
export default function Steps({ items }: { items: readonly { titre: string; texte?: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const seen = useInViewOnce(ref);
  const step = 0.18;

  return (
    <ol ref={ref} className="relative">
      {items.map((s, i) => (
        <li key={s.titre} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <motion.span
              aria-hidden
              className="absolute bottom-1 left-[15px] top-9 w-px origin-top bg-sun-navy-100"
              initial={{ scaleY: 0 }}
              animate={seen ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.45, delay: i * step + 0.2, ease: "easeInOut" }}
            />
          )}
          <motion.span
            className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-navy font-display text-sm font-bold text-white"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={seen ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22, delay: i * step }}
          >
            {i + 1}
          </motion.span>
          <motion.div
            className="pt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={seen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: i * step + 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-[15px] font-semibold leading-snug text-sun-navy">{s.titre}</p>
            {s.texte && <p className="mt-1 text-sm leading-relaxed text-sun-muted">{s.texte}</p>}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
