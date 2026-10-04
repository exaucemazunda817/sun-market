"use client";

// Reproduit design/design_handoff_sun_market/SUN Header.dc.html (cahier §5).
// Les variantes large/étroite sont gérées en CSS (globals.css) et non en
// JavaScript, pour éviter tout décalage au chargement sur mobile.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { s } from "@/lib/css";
import { href, type Lang, type PageKey, ROUTES, WHATSAPP, PHONE, PHONE_TEL } from "@/lib/routes";
import { WhatsAppIcon } from "./icons";

const NAV: { key: PageKey; fr: string; en: string }[] = [
  { key: "marche", fr: "Marché financier", en: "Capital market" },
  { key: "trading", fr: "Trading", en: "Trading" },
  { key: "fiscal", fr: "Conseil fiscal", en: "Tax advisory" },
  { key: "apropos", fr: "À propos", en: "About" },
  { key: "actus", fr: "Actualités", en: "News" },
  { key: "contact", fr: "Contact", en: "Contact" },
];

export type HeaderProps = {
  lang: Lang;
  active?: PageKey | null;
  /** Équivalent de la page courante dans l'autre langue. */
  page?: PageKey;
  /** Fixe sur l'accueil (le hero compense sa hauteur), collant ailleurs. */
  fixed?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function Header({ lang, active = null, page = "home", fixed = false, ctaLabel, ctaHref }: HeaderProps) {
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 8);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const cta = ctaLabel ?? (en ? "Submit an application" : "Déposer un dossier");
  const ctaTo = ctaHref ?? href("marche", lang, "#depot");
  const t = en ? { nav: "Main navigation", menu: "Menu", close: "Close menu" } : { nav: "Navigation principale", menu: "Menu", close: "Fermer le menu" };
  const links = NAV.map((l) => {
    const on = l.key === active;
    return { label: en ? l.en : l.fr, to: ROUTES[l.key][lang], on };
  });
  const frHref = ROUTES[page].fr;
  const enHref = ROUTES[page].en;

  return (
    <header
      data-header=""
      style={{
        ...s(`background:#261A66;font-family:'Montserrat',sans-serif;transition:box-shadow 280ms;z-index:50`),
        position: fixed ? "fixed" : "sticky",
        top: 0,
        left: fixed ? 0 : undefined,
        right: fixed ? 0 : undefined,
        boxShadow: scrolled ? "0 8px 24px rgba(23,15,69,.25)" : "none",
      }}
    >
      <div className="sun-header-bar" style={s(`max-width:1320px;margin:0 auto;padding:0 clamp(20px,4vw,48px);display:flex;align-items:center;justify-content:space-between;gap:24px`)}>
        <Link href={ROUTES.home[lang]} aria-label="SUN Market" style={s(`display:flex;flex:none`)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sun-header-logo" src="/brand/logo-blanc.webp" alt="SUN Market" width={78} height={44} style={s(`width:auto;display:block`)} />
        </Link>
        <nav aria-label={t.nav} className="sun-header-wide" style={s(`gap:26px;align-items:center`)}>
          {links.map((l) => (
            <Link key={l.to} href={l.to} aria-current={l.on ? "page" : undefined} className="hv-link-orange"
              style={{ ...s(`text-decoration:none;font:600 15px/1 'Montserrat';padding:14px 0;transition:color 180ms`), color: l.on ? "#FF8A4C" : "#fff", boxShadow: l.on ? "inset 0 -2px 0 #EF5F18" : "none" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div style={s(`display:flex;align-items:center;gap:12px`)}>
          <div role="group" aria-label="Langue / Language" style={s(`display:flex;border-radius:999px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.3);padding:3px`)}>
            <Link href={frHref} hrefLang="fr" aria-current={en ? undefined : "true"}
              style={{ ...s(`height:38px;min-width:44px;border-radius:999px;font:700 13px/38px 'Montserrat';text-align:center;text-decoration:none;transition:background 180ms`), background: en ? "transparent" : "#fff", color: en ? "#fff" : "#261A66" }}>FR</Link>
            <Link href={enHref} hrefLang="en" aria-current={en ? "true" : undefined}
              style={{ ...s(`height:38px;min-width:44px;border-radius:999px;font:700 13px/38px 'Montserrat';text-align:center;text-decoration:none;transition:background 180ms`), background: en ? "#fff" : "transparent", color: en ? "#261A66" : "#fff" }}>EN</Link>
          </div>
          <a href={WHATSAPP} aria-label="WhatsApp" className="sun-header-wide hv-ring-white" style={s(`width:44px;height:44px;border-radius:50%;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.3);color:#fff`)}>
            <WhatsAppIcon size={20} />
          </a>
          <Link href={ctaTo} className="sun-header-wide hv-btn-orange" style={s(`height:48px;padding:0 22px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 15px/1 'Montserrat';align-items:center;transition:background 180ms`)}>
            {cta}
          </Link>
          <button ref={toggleRef} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="sun-mobile-menu" aria-label={t.menu} className="sun-header-narrow"
            style={s(`width:44px;height:44px;border:0;border-radius:10px;background:rgba(255,255,255,.08);color:#fff;align-items:center;justify-content:center;cursor:pointer`)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16" /><path d="M4 16h10" /><circle cx="19" cy="16" r="1.6" fill="#EF5F18" stroke="none" /></svg>
          </button>
        </div>
      </div>

      <div id="sun-mobile-menu" aria-hidden={!open} className="sun-header-narrow"
        style={{ ...s(`position:fixed;inset:0;z-index:70;background:#261A66;color:#fff;flex-direction:column;padding:0 24px 32px;transition:transform 420ms cubic-bezier(.22,1,.36,1);overflow:auto`), transform: open ? "none" : "translateY(-100%)", visibility: open ? "visible" : "hidden" }}>
        <div style={s(`height:64px;display:flex;align-items:center;justify-content:space-between;flex:none`)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-blanc.webp" alt="SUN Market" width={60} height={34} style={s(`height:34px;width:auto`)} />
          <button type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label={t.close}
            style={s(`width:44px;height:44px;border:0;border-radius:10px;background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
          </button>
        </div>
        <nav aria-label={t.nav} style={s(`display:flex;flex-direction:column;gap:4px;margin-top:32px`)}>
          {links.map((l, i) => (
            <Link key={l.to} href={l.to} onClick={() => setOpen(false)} aria-current={l.on ? "page" : undefined} tabIndex={open ? 0 : -1}
              style={{
                ...s(`text-decoration:none;font:700 28px/1.2 'Montserrat';letter-spacing:-.02em;padding:12px 0;display:flex;align-items:center;gap:14px`),
                color: l.on ? "#FF8A4C" : "#fff",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(16px)",
                transition: `opacity 280ms cubic-bezier(.22,1,.36,1) ${open ? 180 + i * 50 : 0}ms,transform 420ms cubic-bezier(.22,1,.36,1) ${open ? 180 + i * 50 : 0}ms`,
              }}>
              <span style={s(`width:8px;height:8px;border-radius:50%;background:#EF5F18`)} />
              {l.label}
            </Link>
          ))}
        </nav>
        <div style={s(`margin-top:auto;padding-top:32px;display:flex;flex-direction:column;gap:12px`)}>
          <Link href={ctaTo} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} style={s(`height:52px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;justify-content:center`)}>{cta}</Link>
          <a href={PHONE_TEL} tabIndex={open ? 0 : -1} style={s(`height:52px;border-radius:10px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.4);color:#fff;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;justify-content:center`)}>{PHONE}</a>
        </div>
      </div>
    </header>
  );
}
