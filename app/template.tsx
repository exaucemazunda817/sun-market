"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// Le template est recréé à chaque changement de page : la nouvelle page arrive
// par un léger glissement. Jamais au tout premier chargement (le contenu doit
// s'afficher tout de suite, sans attendre le JavaScript) ni avec « Réduire les
// animations ». Le drapeau n'est levé que dans le navigateur, après le premier
// affichage : côté serveur, tout rendu reste statique.
const navigation = { started: false };

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => typeof window !== "undefined" && navigation.started);

  useEffect(() => {
    navigation.started = true;
  }, []);

  return (
    <motion.div
      initial={animate && !reduce ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
