"use client";

import { useEffect, useState, type RefObject } from "react";

// Passe à true quand l'élément arrive à l'écran — ou s'il est déjà dépassé
// (défilement rapide, ancre, rechargement en cours de page) : un
// IntersectionObserver seul peut laisser un bloc invisible pour de bon, piège
// déjà rencontré sur gospel-nation et nutrimix-boutique. Avec « Réduire les
// animations », true tout de suite.
export function useInViewOnce(ref: RefObject<Element | null>, threshold = 0.12): boolean {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) done();
      },
      { threshold }
    );
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) done();
    };
    let frame = 0;
    function cleanup() {
      observer.disconnect();
      window.removeEventListener("scroll", check);
      cancelAnimationFrame(frame);
    }
    function done() {
      cleanup();
      setSeen(true);
    }

    observer.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    // Une image plus tard : l'état de départ est d'abord affiché, puis animé.
    frame = requestAnimationFrame(check);
    return cleanup;
  }, [ref, threshold]);

  return seen;
}
