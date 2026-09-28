"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { EASE_OUT_SOFT } from "@/lib/motion";

// Grand bouton animé (lueur pulsée, voir .btn-pulse dans globals.css) qui
// révèle le formulaire au clic, plutôt que de l'afficher d'emblée à côté du
// texte. `children` (le formulaire) n'est monté qu'une fois ouvert.
export default function RevealFormButton({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-pulse group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-sun-orange px-9 text-base font-bold text-white transition-colors hover:bg-sun-orange-dark sm:w-auto"
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE_OUT_SOFT }}>
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
            className="overflow-hidden"
          >
            <div className="mt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
