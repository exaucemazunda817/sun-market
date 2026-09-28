"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// « Réduire les animations » respecté en un seul endroit pour toutes les
// animations motion du site (frise, graphique, transitions, apparitions).
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
