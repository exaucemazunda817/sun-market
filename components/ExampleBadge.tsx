import { cn } from "@/lib/utils";

// Signale des chiffres inventés en attendant les vrais (voir `chiffres` dans
// lib/content.ts). Disparaît dès que `exemple` passe à false.
export function ExampleBadge({ show, dark = false, className }: { show: boolean; dark?: boolean; className?: string }) {
  if (!show) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed px-3 py-1 text-xs font-semibold",
        dark ? "border-sun-orange/70 text-sun-orange" : "placeholder-note",
        className
      )}
    >
      Chiffres d&apos;exemple — à remplacer
    </span>
  );
}
