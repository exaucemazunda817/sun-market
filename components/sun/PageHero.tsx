// Hero des pages internes (cahier §5) : photo plein cadre, voile violet,
// courbe orange tracée, fil d'Ariane, H1, chapeau, deux boutons.
// Hauteur min(80svh, 760px). Repris de 04 Marché financier.dc.html.
import Link from "next/link";
import type { ReactNode } from "react";
import { s } from "@/lib/css";

// Largeur réelle des photos fournies (à remplacer par des versions HD 1600 px).
const IMG_W: Record<string, number> = { apropos: 736, finance: 736, fiscal: 612, trading: 598 };

export type HeroButton = { label: string; href: string; primary?: boolean; external?: boolean; icon?: ReactNode };

export default function PageHero({
  img, pos, filter = "saturate(.85)", imgClassName, overlayExtra, crumbs, title, lead, buttons, curve = "M-40 560 C 360 540, 560 260, 900 220 S 1320 120, 1520 20",
}: {
  img: string;
  pos: string;
  filter?: string;
  imgClassName?: string;
  overlayExtra?: ReactNode;
  crumbs: { label: string; href?: string }[];
  title: string;
  lead: string;
  buttons: HeroButton[];
  curve?: string;
}) {
  return (
    <section style={s(`background:#261A66;color:#fff;position:relative;overflow:hidden;min-height:min(80svh,760px);display:flex;align-items:center;padding:clamp(40px,6vw,80px) clamp(20px,4vw,48px) clamp(56px,8vw,104px)`)}>
      {/* Photo : profondeur au défilement (cadre) + zoom lent à l'arrivée (image),
          comme les bandeaux de Gospel Nation et One Love. */}
      <div data-parallax="0.18" aria-hidden="true" style={s(`position:absolute;left:0;right:0;top:-8%;height:116%;overflow:hidden`)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/${img}.webp`} srcSet={`/images/${img}-480.webp 480w, /images/${img}.webp ${IMG_W[img] ?? 736}w`} sizes="100vw" alt="" fetchPriority="high" className={`sun-hero-zoom ${imgClassName ?? ""}`}
          style={{ ...s(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block`), objectPosition: pos, filter }} />
      </div>
      {overlayExtra}
      <div className="sun-hero-overlay sun-hero-overlay-page" style={s(`position:absolute;inset:0`)} />
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" style={s(`position:absolute;inset:0;width:100%;height:100%;pointer-events:none`)} aria-hidden="true">
        <path className="sun-curve" d={curve} fill="none" stroke="#EF5F18" strokeWidth="2.5" pathLength={1} strokeDasharray="1" style={s(`animation:curveDraw 2200ms cubic-bezier(.65,0,.35,1) 200ms forwards`)} />
      </svg>
      <div style={s(`position:relative;max-width:1224px;width:100%;margin:0 auto`)}>
        <div style={s(`display:flex;flex-direction:column;gap:22px;max-width:720px`)}>
          <nav data-hero="" aria-label={crumbs[0]?.label === "Home" ? "Breadcrumb" : "Fil d'Ariane"} style={s(`font:400 14px/1 'Source Sans 3';color:#C9C3F0;display:flex;gap:8px;flex-wrap:wrap`)}>
            {crumbs.map((c, i) => (
              <span key={c.label} style={s(`display:flex;gap:8px`)}>
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {c.href ? <Link href={c.href} style={s(`color:#C9C3F0`)}>{c.label}</Link> : <span aria-current="page" style={s(`color:#fff`)}>{c.label}</span>}
              </span>
            ))}
          </nav>
          <h1 style={s(`margin:0;font:700 clamp(36px,5vw,64px)/1.06 'Montserrat';letter-spacing:-.028em;text-wrap:balance`)}>
            {title.split(" ").map((w, i, all) => (
              <span key={i} style={s(`display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em;margin-right:.24em`)}>
                <span data-word="" style={s(`display:inline-block`)}>{w}{i === all.length - 1 ? <span style={s(`color:#EF5F18`)}>.</span> : null}</span>
              </span>
            ))}
          </h1>
          <p data-hero="" style={s(`margin:0;font:400 clamp(18px,1.6vw,20px)/1.55 'Source Sans 3';color:#E4E0F7;max-width:580px;text-wrap:pretty`)}>{lead}</p>
          <div data-hero="" style={s(`display:flex;flex-wrap:wrap;gap:12px`)}>
            {buttons.map((b) => {
              const st = b.primary
                ? `height:56px;padding:0 26px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;gap:10px;transition:background 180ms`
                : `height:56px;padding:0 26px;border-radius:10px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.45);color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;gap:10px;transition:background 180ms`;
              const cls = b.primary ? "hv-btn-orange" : "hv-btn-onviolet";
              return b.external
                ? <a key={b.label} href={b.href} className={cls} style={s(st)}>{b.icon}{b.label}</a>
                : <Link key={b.label} href={b.href} className={cls} style={s(st)}>{b.icon}{b.label}</Link>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
