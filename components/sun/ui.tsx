// Petits composants récurrents des maquettes : surtitre, titre de section,
// bandeau de risque (complet et compact).
import Link from "next/link";
import type { ReactNode } from "react";
import { s } from "@/lib/css";
import { WarningIcon } from "./icons";

export function Eyebrow({ children, onViolet = false }: { children: ReactNode; onViolet?: boolean }) {
  return (
    <div style={{ ...s(`font:700 13px/1 'Montserrat';letter-spacing:.14em;text-transform:uppercase;display:flex;align-items:center;gap:10px`), color: onViolet ? "#FF8A4C" : "#B8460E" }}>
      <span style={s(`width:8px;height:8px;border-radius:50%;background:#EF5F18;flex:none`)} />
      {children}
    </div>
  );
}

export function H2({ children, onViolet = false }: { children: ReactNode; onViolet?: boolean }) {
  return (
    <h2 style={{ ...s(`margin:0;font:700 clamp(28px,3.6vw,46px)/1.12 'Montserrat';letter-spacing:-.02em;text-wrap:balance`), color: onViolet ? "#fff" : "#261A66" }}>
      {children}
    </h2>
  );
}

export function RiskBanner({ title, children, linkLabel, linkHref }: { title: string; children: ReactNode; linkLabel?: string; linkHref?: string }) {
  return (
    <div role="note" aria-label={title} style={s(`background:#FFF4EC;border-radius:10px;padding:clamp(20px,2.4vw,28px);display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:start`)}>
      <span style={s(`width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:#B8460E`)}><WarningIcon size={22} /></span>
      <div style={s(`display:flex;flex-direction:column;gap:6px`)}>
        <strong style={s(`font:700 17px/1.3 'Montserrat';color:#8A3A0F`)}>{title}</strong>
        <p style={s(`margin:0;font:400 17px/1.55 'Source Sans 3';color:#8A3A0F;text-wrap:pretty`)}>
          {children}
          {linkLabel && linkHref ? (<>{" "}<Link href={linkHref} style={s(`color:#8A3A0F;font-weight:700`)}>{linkLabel}</Link></>) : null}
        </p>
      </div>
    </div>
  );
}

export function RiskTag({ children }: { children: ReactNode }) {
  return (
    <span style={s(`align-self:flex-start;display:flex;align-items:center;gap:8px;background:#FFF4EC;color:#8A3A0F;font:600 14px/1.3 'Source Sans 3';padding:8px 12px;border-radius:6px`)}>
      <WarningIcon size={16} />
      {children}
    </span>
  );
}
