"use client";

// Carte OpenStreetMap de la page Contact. Inactive tant qu'on ne la touche pas :
// sinon, sur téléphone, glisser le doigt sur la carte la déplace au lieu de
// faire défiler la page, et on ne parvient plus jusqu'au pied de page
// (constat du 04/10/2026).
import { useState } from "react";
import { s } from "@/lib/css";

export default function MapEmbed({ src, title, activateLabel }: { src: string; title: string; activateLabel: string }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <iframe title={title} loading="lazy" referrerPolicy="no-referrer" src={src} tabIndex={active ? 0 : -1}
        style={{ ...s(`position:absolute;inset:0;width:100%;height:100%;border:0;filter:saturate(.6)`), pointerEvents: active ? "auto" : "none" }} />
      {active ? null : (
        <button type="button" onClick={() => setActive(true)}
          style={s(`position:absolute;inset:0;width:100%;height:100%;border:0;background:transparent;cursor:pointer;display:flex;align-items:flex-end;justify-content:center;padding:16px`)}>
          <span style={s(`background:rgba(38,26,102,.9);color:#fff;font:600 14px/1 'Montserrat';padding:12px 16px;border-radius:999px;box-shadow:0 8px 20px rgba(23,15,69,.25)`)}>{activateLabel}</span>
        </button>
      )}
    </>
  );
}
