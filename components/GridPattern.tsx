import { cn } from "@/lib/utils";

// Motif de grille discret pour le hero — inspiré de Magic UI (GridPattern),
// simplifié en SVG statique pur (pas de dépendance supplémentaire), avec un
// masque radial pour l'estomper vers les bords. Volontairement sobre : pas
// d'animation, pas d'effet spectaculaire — un site financier doit inspirer la
// confiance, pas distraire.
export function GridPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        className
      )}
    >
      <defs>
        <pattern id="sun-market-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sun-market-grid)" />
    </svg>
  );
}
