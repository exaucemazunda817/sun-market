"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { s } from "@/lib/css";

export default function DossierActions({ dossierId, status }: { dossierId: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const call = async (action: "validate" | "reject") => {
    setLoading(true); setError("");
    const res = await fetch(`/api/secretariat/dossiers/${dossierId}/${action}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: action === "reject" ? JSON.stringify({ reason }) : undefined,
    });
    if (!res.ok) setError("L'action a échoué. Rechargez la page et réessayez.");
    router.refresh(); setLoading(false); setRejecting(false);
  };

  return (
    <div style={s(`background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.06)`)}>
      <div style={s(`display:flex;flex-wrap:wrap;gap:12px`)}>
        <button type="button" onClick={() => call("validate")} disabled={loading || status === "VALIDATED"} className="hv-btn-violet"
          style={{ ...s(`height:48px;padding:0 20px;border-radius:10px;border:0;background:#261A66;color:#fff;font:600 15px/1 'Montserrat';cursor:pointer`), opacity: status === "VALIDATED" ? 0.5 : 1 }}>Valider</button>
        <button type="button" onClick={() => setRejecting((v) => !v)} disabled={loading} aria-expanded={rejecting} className="hv-btn-outline"
          style={s(`height:48px;padding:0 20px;border-radius:10px;border:0;background:transparent;box-shadow:inset 0 0 0 1.5px #261A66;color:#261A66;font:600 15px/1 'Montserrat';cursor:pointer`)}>Refuser</button>
      </div>
      {rejecting ? (
        <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
          <label htmlFor="reason" style={s(`font:600 15px/1.3 'Source Sans 3'`)}>Motif du refus (facultatif)</label>
          <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} maxLength={1000}
            style={s(`border:0;border-radius:6px;background:#FAF8F5;box-shadow:inset 0 0 0 1.5px #C9C3F0;padding:12px 14px;font:400 16px/1.5 'Source Sans 3';resize:vertical`)} />
          <button type="button" onClick={() => call("reject")} disabled={loading}
            style={s(`align-self:flex-start;height:44px;padding:0 18px;border-radius:10px;border:0;background:#B42318;color:#fff;font:600 14px/1 'Montserrat';cursor:pointer`)}>Confirmer le refus</button>
        </div>
      ) : null}
      {error ? <p role="alert" style={s(`margin:0;color:#B42318;font:600 14px/1.4 'Source Sans 3'`)}>{error}</p> : null}
    </div>
  );
}
