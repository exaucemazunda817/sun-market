"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInViewOnce } from "@/components/useInViewOnce";
import { EASE_OUT_SOFT } from "@/lib/motion";

// Apparition au défilement. La détection (y compris les blocs déjà dépassés,
// pour qu'aucun ne reste invisible) est dans useInViewOnce ; l'ancien filet
// qui révélait tout après 2,5 s supprimait l'effet et n'existe plus.
export default function Reveal({
  children,
  delay = 0,
  className,
  from = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  // « left » / « right » : arrivée latérale pour les colonnes en vis-à-vis
  // (motif « sections alternées » d'AOS), en grand écran seulement — sur
  // téléphone tout est sur une colonne et l'arrivée reste verticale.
  from?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (from === "up" || !window.matchMedia("(min-width: 1024px)").matches) return;
    const frame = requestAnimationFrame(() => setOffsetX(from === "left" ? -32 : 32));
    return () => cancelAnimationFrame(frame);
  }, [from]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={seen ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offsetX, y: offsetX ? 0 : 20 }}
      transition={{ duration: 0.7, delay: seen ? delay : 0, ease: EASE_OUT_SOFT }}
    >
      {children}
    </motion.div>
  );
}
