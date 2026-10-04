"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { s } from "@/lib/css";

export default function MessageToggle({ id, traite }: { id: string; traite: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button type="button" disabled={busy} className="hv-btn-outline"
      onClick={async () => { setBusy(true); await fetch(`/api/secretariat/messages/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ traite: !traite }) }); router.refresh(); setBusy(false); }}
      style={s(`align-self:flex-start;height:44px;padding:0 16px;border-radius:10px;border:0;background:transparent;box-shadow:inset 0 0 0 1.5px #261A66;color:#261A66;font:600 14px/1 'Montserrat';cursor:pointer`)}>
      {traite ? "Marquer comme non traité" : "Marquer comme traité"}
    </button>
  );
}
