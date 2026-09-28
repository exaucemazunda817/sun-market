"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

// Parallaxe du bandeau (technique « scrub » de GSAP ScrollTrigger, faite avec
// motion) : la photo descend moins vite que la page quand on défile, ce qui
// donne de la profondeur. Position de défilement LUE seulement, jamais pilotée.
// Coupé avec « Réduire les animations ».
export default function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);

  return (
    <motion.div className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
