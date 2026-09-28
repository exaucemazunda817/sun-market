"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { EASE_OUT_SOFT } from "@/lib/motion";

// Le template est recréé à chaque changement de page : la nouvelle page arrive
// par un léger glissement. Jamais au tout premier chargement (le contenu doit
// s'afficher tout de suite, sans attendre le JavaScript) ni avec « Réduire les
// animations » (MotionConfig, voir MotionProvider). Le drapeau n'est levé que
// dans le navigateur, après le premier affichage : côté serveur, tout rendu
// reste statique.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => typeof window !== "undefined" && hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
    >
      {children}
    </motion.div>
  );
}
