"use client";

// Moteur d'animation commun à toutes les pages (cahier des charges §4).
// Repris de la logique des maquettes (03 Accueil.dc.html…), mais piloté par
// des attributs data-* posés dans le HTML, pour que les pages restent des
// composants serveur. Un seul écouteur de scroll passif, regroupé dans rAF.
//
// Niveaux : <html data-motion="full|lite|reduced"> est posé avant l'affichage
// par le script de <head> (MOTION_HEAD_SCRIPT). Sans JavaScript, l'attribut
// n'existe pas et tout est visible.
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Mode = "full" | "lite" | "reduced";


const EASE = "cubic-bezier(.22,1,.36,1)";
const cl = (v: number) => Math.max(0, Math.min(1, v));

function mode(): Mode {
  const m = document.documentElement.getAttribute("data-motion");
  return m === "full" || m === "lite" || m === "reduced" ? m : "reduced";
}

export default function Motion({ lang }: { lang: "fr" | "en" }) {
  const pathname = usePathname();
  const router = useRouter();
  const curtainRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);

  // Volet : sortie après un changement de page.
  useEffect(() => {
    const c = curtainRef.current;
    if (!c || !navigating.current) return;
    navigating.current = false;
    c.style.transform = "translateX(101%)";
    const t = setTimeout(() => { c.style.transition = "none"; c.style.transform = "translateX(-101%)"; }, 470);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    (window as unknown as { __sunMotionReady: boolean }).__sunMotionReady = true;
    const M = mode();
    const root = document;
    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));
    const offs: (() => void)[] = [];
    const timers: number[] = [];
    const vertical = () => window.innerWidth < 760;

    // ---- Apparitions : titre mot par mot, blocs du hero, révélations, masques,
    // compteurs, points. Chaque effet SE REJOUE à chaque retour à l'écran
    // (règle de Mazunda, déjà appliquée sur One Love) : un élément ne se remet
    // en attente qu'une fois ENTIÈREMENT sorti de l'écran, pour qu'on ne le
    // voie jamais disparaître. Vérification à chaque défilement (comme useSeen
    // sur One Love) + observateurs pour les glissements de mise en page et les
    // blocs ajoutés après coup (filtres, changement de page).
    const SEL = "[data-word],[data-hero],[data-reveal],[data-mask],[data-count],[data-pop]";
    const fmt = (v: number) => Math.round(v).toLocaleString(lang === "en" ? "en-US" : "fr-FR");
    const shown = new WeakMap<HTMLElement, boolean>();
    const rafs = new WeakMap<HTMLElement, number>();
    let items: HTMLElement[] = [];
    let heroBoost = 0; // délai supplémentaire au tout premier affichage (après l'intro)

    const delayOf = (el: HTMLElement) => {
      if (el.hasAttribute("data-word")) return Number(el.dataset.i || 0) * 60;
      if (el.hasAttribute("data-hero")) return 250 + Number(el.dataset.i || 0) * 80;
      if (el.hasAttribute("data-pop")) return 200 + Number(el.dataset.popDelay || 0);
      return Number(el.dataset.delay || 0);
    };
    const hide = (el: HTMLElement) => {
      el.classList.remove("is-in");
      el.style.transition = "none";
      if (el.hasAttribute("data-count")) { cancelAnimationFrame(rafs.get(el) ?? 0); el.textContent = fmt(0); return; }
      if (el.hasAttribute("data-pop")) { el.style.transform = "scale(0)"; return; }
      if (el.hasAttribute("data-word")) { el.style.transform = M === "full" ? "translateY(110%)" : "none"; return; }
      if (el.hasAttribute("data-mask")) {
        el.style.transform = M === "full" ? "translateY(105%)" : "none";
        el.style.opacity = M === "full" ? "1" : "0";
        const u = el.querySelector<HTMLElement>("[data-underline]");
        if (u) { u.style.transition = "none"; u.style.transform = "scaleX(0)"; }
        return;
      }
      el.style.opacity = "0";
      el.style.transform = M === "full" ? "translateY(16px)" : "none";
    };
    const show = (el: HTMLElement) => {
      el.classList.add("is-in"); // Blur Text : le titre de section passe du flou au net
      const d = delayOf(el) + heroBoost * (el.hasAttribute("data-word") || el.hasAttribute("data-hero") ? 1 : 0);
      if (el.hasAttribute("data-count")) {
        const target = Number(el.dataset.count), t0 = performance.now() + d, dur = 1100;
        const step = (t: number) => {
          const k = Math.max(0, Math.min(1, (t - t0) / dur));
          el.textContent = fmt(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) rafs.set(el, requestAnimationFrame(step));
        };
        rafs.set(el, requestAnimationFrame(step));
        return;
      }
      if (el.hasAttribute("data-pop")) { el.style.transition = `transform 420ms cubic-bezier(.34,1.56,.64,1) ${d}ms`; el.style.transform = "scale(1)"; return; }
      if (el.hasAttribute("data-word")) { el.style.transition = `transform 800ms ${EASE} ${d}ms`; el.style.transform = "none"; return; }
      if (el.hasAttribute("data-mask")) {
        el.style.transition = `transform 800ms ${EASE} ${d}ms, opacity 600ms ${EASE} ${d}ms`;
        el.style.transform = "none"; el.style.opacity = "1";
        const u = el.querySelector<HTMLElement>("[data-underline]");
        if (u) { u.style.transition = `transform 900ms cubic-bezier(.65,0,.35,1) ${d + 900}ms`; u.style.transform = "scaleX(1)"; }
        return;
      }
      el.style.transition = `opacity 600ms ${EASE} ${d}ms, transform 600ms ${EASE} ${d}ms`;
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    // Les mots et les lignes masquées bougent dans un cadre fixe : on mesure le cadre.
    const box = (el: HTMLElement) => (el.hasAttribute("data-word") || el.hasAttribute("data-mask") ? el.parentElement ?? el : el);

    const collect = () => {
      const fresh = q(SEL);
      // Numérotation des mots et blocs du hero pour le décalage en cascade.
      q("[data-word]").forEach((w, i) => { w.dataset.i = String(i); });
      q("[data-hero]").forEach((h, i) => { h.dataset.i = String(i); });
      fresh.forEach((el) => { if (!shown.has(el)) { shown.set(el, false); if (M !== "reduced") hide(el); } });
      items = fresh;
    };
    // Une vérification programmée n'est jamais annulée : les appels suivants
    // attendent qu'elle passe. (Annuler à chaque appel la repoussait sans fin
    // quand la page signale des changements en continu.)
    let checkFrame = 0;
    let checkPending = false;
    let started = false; // rien ne se joue tant que l'intro du logo n'est pas finie
    const check = () => {
      if (!started || checkPending) return;
      checkPending = true;
      checkFrame = requestAnimationFrame(() => {
        checkPending = false;
        const vh = window.innerHeight;
        for (const el of items) {
          const b = box(el);
          if (b.getClientRects().length === 0) continue;
          const r = b.getBoundingClientRect();
          const inView = r.bottom > 0 && r.top < vh;
          const enter = r.bottom > 0 && (r.top < vh * 0.88 || r.bottom <= vh);
          if (shown.get(el) && !inView) { shown.set(el, false); hide(el); }
          else if (!shown.get(el) && enter) { shown.set(el, true); show(el); }
        }
        heroBoost = 0;
      });
    };

    if (M === "reduced") {
      q(SEL).forEach((el) => { el.classList.add("is-in"); el.style.opacity = "1"; el.style.transform = "none"; });
    } else {
      collect();
      const start = () => { started = true; requestAnimationFrame(() => requestAnimationFrame(check)); };
      if (document.documentElement.hasAttribute("data-intro")) {
        const onIntroEnd = () => { heroBoost = 250; start(); };
        window.addEventListener("sun:intro-end", onIntroEnd, { once: true });
        offs.push(() => window.removeEventListener("sun:intro-end", onIntroEnd));
      } else start();
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check, { passive: true });
      const io = new IntersectionObserver(() => check(), { threshold: [0, 0.12, 0.5, 1] });
      const observeAll = () => items.forEach((el) => io.observe(box(el)));
      observeAll();
      let mutFrame = 0;
      let mutPending = false;
      const mo = new MutationObserver(() => {
        if (mutPending) return;
        mutPending = true;
        mutFrame = requestAnimationFrame(() => { mutPending = false; collect(); observeAll(); check(); });
      });
      mo.observe(document.body, { childList: true, subtree: true });
      offs.push(() => {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
        io.disconnect(); mo.disconnect();
        cancelAnimationFrame(checkFrame); cancelAnimationFrame(mutFrame);
      });
    }

    // ---- Scroll : barre de lecture, parallaxe, section épinglée, parcours ----
    const parallax = q("[data-parallax]");
    const pin = root.querySelector<HTMLElement>("[data-pin]");
    const pinLines = q("[data-pin-line]");
    const nodes = q("[data-node]");
    const stepsBlocks = q("[data-steps]");
    const header = root.querySelector<HTMLElement>("[data-header]");
    const update = () => {
      const vh = window.innerHeight, sy = window.scrollY, H = document.documentElement.scrollHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${cl(sy / Math.max(1, H - vh))})`;
      if (M === "full") parallax.forEach((p) => { p.style.transform = `translate3d(0,${(sy * Number(p.dataset.parallax)).toFixed(1)}px,0)`; });
      const v = vertical();
      const axis = v ? "scaleY" : "scaleX";
      if (pin) {
        const pinned = M === "full" && !v;
        const r = pin.getBoundingClientRect();
        const p = pinned ? cl(-r.top / Math.max(1, r.height - vh)) : M === "reduced" ? 1 : cl((vh * 0.8 - r.top) / (r.height * 0.7));
        const a = cl((p - 0.12) / 0.3), b = cl((p - 0.5) / 0.3);
        if (pinLines[0]) pinLines[0].style.transform = `${axis}(${a})`;
        if (pinLines[1]) pinLines[1].style.transform = `${axis}(${b})`;
        const act = [p > 0.02 || M === "reduced", a >= 1, b >= 1];
        nodes.forEach((n, i) => {
          n.style.opacity = act[i] ? "1" : ".38";
          const ring = n.querySelector<HTMLElement>("[data-ring]");
          if (ring) {
            const on = (i === 0 && a < 1 && act[0]) || (i === 1 && a >= 1 && b < 1) || (i === 2 && b >= 1);
            ring.style.opacity = on ? "1" : "0";
            ring.style.transform = on ? "scale(1)" : "scale(.9)";
          }
        });
      }
      stepsBlocks.forEach((block) => {
        const r = block.getBoundingClientRect();
        const p = M === "reduced" ? 1 : cl((vh * 0.7 - r.top) / (r.height * 0.75));
        const line = block.querySelector<HTMLElement>("[data-steps-line]");
        if (line) line.style.transform = `${axis}(${p})`;
        const steps = Array.from(block.querySelectorAll<HTMLElement>("[data-step]"));
        const last = Math.max(1, steps.length - 1);
        steps.forEach((st, i) => {
          const on = p >= i / last - 0.001 && p > 0.01;
          const dot = st.querySelector<HTMLElement>("[data-step-dot]");
          const core = st.querySelector<HTMLElement>("[data-step-core]");
          const num = st.querySelector<HTMLElement>("[data-step-num]");
          if (dot) dot.style.transform = on ? "scale(1)" : "scale(0)";
          if (core) core.style.transform = on ? "scale(1)" : "scale(0)";
          if (num) num.style.color = on ? "#B8460E" : "#5C5873";
        });
      });
      void header;
    };
    let ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    offs.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); });
    update();

    // ---- Boutons magnétiques, cartes inclinables (pointeur fin, mode complet) ----
    // Le curseur personnalisé (point orange) a été retiré à la demande de Mazunda
    // (04/10/2026) : la flèche normale de la souris est conservée.
    const fine = typeof window.matchMedia === "function" && window.matchMedia("(pointer:fine)").matches;
    if (M === "full" && fine) {
      q("[data-magnetic]").forEach((b) => {
        const m = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.2, dy = (e.clientY - r.top - r.height / 2) * 0.3;
          b.style.transition = "transform 150ms ease-out, background 180ms";
          b.style.transform = `translate(${Math.max(-8, Math.min(8, dx))}px,${Math.max(-6, Math.min(6, dy))}px)`;
        };
        const l = () => { b.style.transition = "transform 400ms cubic-bezier(.34,1.56,.64,1), background 180ms"; b.style.transform = "none"; };
        b.addEventListener("mousemove", m); b.addEventListener("mouseleave", l);
        offs.push(() => { b.removeEventListener("mousemove", m); b.removeEventListener("mouseleave", l); b.style.transform = ""; });
      });
    }
    if (M !== "reduced" && fine) {
      q("[data-tilt]").forEach((a) => {
        const lite = M === "lite";
        const m = (e: MouseEvent) => {
          const r = a.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          // Spotlight Card : position du halo
          a.style.setProperty("--sun-mx", `${e.clientX - r.left}px`);
          a.style.setProperty("--sun-my", `${e.clientY - r.top}px`);
          a.style.transition = `transform 280ms ${EASE}, box-shadow 280ms, opacity 600ms ${EASE}`;
          a.style.transform = lite ? "translateY(-6px)" : `translateY(-6px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg)`;
          a.style.boxShadow = "0 2px 4px rgba(38,26,102,.06),0 20px 48px rgba(38,26,102,.14)";
        };
        const l = () => { a.style.transition = `transform 400ms ${EASE}, box-shadow 280ms, opacity 600ms ${EASE}`; a.style.transform = "none"; a.style.boxShadow = ""; };
        a.addEventListener("mousemove", m); a.addEventListener("mouseleave", l);
        offs.push(() => { a.removeEventListener("mousemove", m); a.removeEventListener("mouseleave", l); });
      });
    }

    // ---- Liens : ancres internes (compensation de l'en-tête) et volet de transition ----
    const curtain = curtainRef.current;
    const runCurtain = (mid: () => void) => {
      if (!curtain || M === "reduced") { mid(); return; }
      const dur = M === "lite" ? 200 : 450;
      if (M === "lite") {
        curtain.style.transition = "none";
        curtain.style.opacity = "0";
        curtain.style.transform = "none";
        requestAnimationFrame(() => { curtain.style.transition = `opacity ${dur}ms`; curtain.style.opacity = "1"; });
        timers.push(window.setTimeout(() => { mid(); curtain.style.opacity = "0"; timers.push(window.setTimeout(() => { curtain.style.transition = "none"; curtain.style.transform = "translateX(-101%)"; curtain.style.opacity = "1"; }, dur + 20)); }, dur + 20));
        return;
      }
      curtain.style.transition = `transform ${dur}ms cubic-bezier(.65,0,.35,1)`;
      curtain.style.transform = "translateX(0)";
      timers.push(window.setTimeout(mid, dur + 20));
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        const el = id ? document.getElementById(id) : null;
        if (!el) return;
        e.preventDefault();
        const off = el.hasAttribute("data-pin") ? 0 : (header?.offsetHeight ?? 64) - 8;
        const jump = () => {
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - off);
          history.replaceState(null, "", url.hash);
          update();
          const focusable = el.querySelector<HTMLElement>("h1,h2,h3,input,button,a");
          focusable?.focus({ preventScroll: true });
          if (curtain && M === "full") {
            curtain.style.transform = "translateX(101%)";
            timers.push(window.setTimeout(() => { curtain.style.transition = "none"; curtain.style.transform = "translateX(-101%)"; }, 470));
          }
        };
        runCurtain(jump);
        return;
      }
      if (url.pathname !== location.pathname && !url.pathname.startsWith("/api") && !url.pathname.startsWith("/secretariat")) {
        e.preventDefault();
        navigating.current = M === "full";
        runCurtain(() => router.push(url.pathname + url.search + url.hash));
      }
    };
    document.addEventListener("click", onClick);
    offs.push(() => document.removeEventListener("click", onClick));

    return () => { offs.forEach((f) => f()); timers.forEach((t) => clearTimeout(t)); };
  }, [pathname, lang, router]);

  return (
    <>
      <div ref={progressRef} aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "#EF5F18", transform: "scaleX(0)", transformOrigin: "0 50%", zIndex: 60, pointerEvents: "none" }} />
      <div ref={curtainRef} aria-hidden="true" style={{ position: "fixed", inset: 0, background: "#261A66", zIndex: 85, transform: "translateX(-101%)", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#EF5F18" }} />
      </div>
    </>
  );
}
