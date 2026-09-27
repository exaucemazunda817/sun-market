"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

// Apparition au défilement. Deux pièges déjà rencontrés sur les autres projets
// de Mazunda (gospel-nation, nutrimix-boutique) :
// 1. Un IntersectionObserver seul peut laisser un bloc invisible pour de bon
//    (déjà à l'écran au montage, ou dépassé trop vite / via une ancre). On
//    vérifie donc au montage ET à chaque défilement : un bloc à l'écran ou
//    déjà dépassé est révélé.
// 2. Un filet de sécurité qui révèle TOUT après un délai supprime l'effet
//    (l'ancienne version le faisait après 2,5 s) : il n'y en a plus.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }

    let done = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) reveal();
      },
      { threshold: 0.12 }
    );
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) reveal();
    };
    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener("scroll", check);
    };
    function reveal() {
      if (done) return;
      done = true;
      cleanup();
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } });
    }

    observer.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 20 }} animate={controls}>
      {children}
    </motion.div>
  );
}
