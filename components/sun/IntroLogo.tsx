"use client";

// Intro du logo (cahier §4 et §7.1) : une fois par session, mode complet
// uniquement, bouton « Passer l'intro ». Le déclenchement (<html data-intro>)
// est décidé avant l'affichage par lib/motion-script.ts. Le masque SVG trace le logo PNG
// (repris tel quel de 03 Accueil.dc.html, chemins calés sur un cadre 1200×675).
// À remplacer par les vrais chemins du SVG officiel dès réception.
import { useEffect, useRef } from "react";

const P = { fill: "none", stroke: "#fff", strokeWidth: 150, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1, strokeDasharray: 1 };

export default function IntroLogo({ lang }: { lang: "fr" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);

  // « Passer l'intro » : la fin normale est gérée par lib/motion-script.ts et le CSS.
  useEffect(() => {
    const btn = ref.current?.querySelector("button");
    const skip = () => {
      const d = document.documentElement;
      if (!d.hasAttribute("data-intro")) return;
      d.removeAttribute("data-intro");
      window.dispatchEvent(new Event("sun:intro-end"));
    };
    btn?.addEventListener("click", skip);
    return () => btn?.removeEventListener("click", skip);
  }, []);

  return (
    <>
      <div ref={ref} className="sun-intro" aria-hidden="false"
        style={{ position: "fixed", inset: 0, zIndex: 90, background: "#261A66", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "min(64vw,440px)" }}>
          <svg viewBox="0 0 1200 675" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }} role="img" aria-label="SUN Market">
            <defs>
              <mask id="sunIntroMask" maskUnits="userSpaceOnUse" x={0} y={0} width={1200} height={675}>
                <path {...P} d="M53 344 L110 430 L201 455 L320 410 L355 335 L300 270 L179 245 L70 210 L53 155 L100 70 L197 45 L300 70 L345 130 L467 371 L540 440 L616 455 L720 400 L765 299 L730 170 L639 29" style={{ strokeDashoffset: 1, animation: "sunDraw 760ms cubic-bezier(.65,0,.35,1) 100ms forwards" }} />
                <path {...P} d="M690 90 L860 220 L972 317 L1000 420 L1010 500" style={{ strokeDashoffset: 1, animation: "sunDraw 300ms cubic-bezier(.22,1,.36,1) 780ms forwards" }} />
                <path {...P} d="M805 290 L900 380 L985 488" style={{ strokeDashoffset: 1, animation: "sunDraw 260ms cubic-bezier(.22,1,.36,1) 860ms forwards" }} />
                <path {...P} d="M1022 500 L1022 0" style={{ strokeDashoffset: 1, animation: "sunDraw 260ms cubic-bezier(.22,1,.36,1) 980ms forwards" }} />
                <rect x={0} y={0} width={1060} height={520} fill="#fff" style={{ opacity: 0, animation: "sunFill 200ms linear 1180ms forwards" }} />
                <circle cx={1126} cy={430} r={80} fill="#fff" style={{ transformOrigin: "1126px 430px", transform: "scale(0)", animation: "sunDot 460ms cubic-bezier(.34,1.56,.64,1) 1150ms forwards" }} />
              </mask>
              <clipPath id="sunIntroTop"><rect x={0} y={0} width={1200} height={520} /></clipPath>
              <clipPath id="sunIntroBot"><rect x={0} y={520} width={1200} height={160} /></clipPath>
            </defs>
            <g clipPath="url(#sunIntroTop)"><image href="/brand/logo-blanc-1200.png" width={1200} height={675} mask="url(#sunIntroMask)" /></g>
            <g style={{ opacity: 0, animation: "sunRise 450ms cubic-bezier(.22,1,.36,1) 1400ms forwards" }}><image href="/brand/logo-blanc-1200.png" width={1200} height={675} clipPath="url(#sunIntroBot)" /></g>
          </svg>
        </div>
        <button type="button" className="hv-ring-white-border"
          style={{ position: "absolute", right: "clamp(16px,4vw,40px)", bottom: "clamp(16px,4vw,40px)", height: 44, padding: "0 18px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,.4)", background: "transparent", color: "#fff", font: "600 14px/1 var(--font-montserrat), sans-serif", cursor: "pointer" }}>
          {lang === "en" ? "Skip intro" : "Passer l'intro"}
        </button>
      </div>
    </>
  );
}
