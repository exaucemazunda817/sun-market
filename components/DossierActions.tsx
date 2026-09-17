"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DossierActions({ dossierId }: { dossierId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  async function validate() {
    setLoading(true);
    await fetch(`/api/secretariat/dossiers/${dossierId}/validate`, { method: "POST" });
    router.refresh();
    setLoading(false);
  }

  async function reject() {
    setLoading(true);
    await fetch(`/api/secretariat/dossiers/${dossierId}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    router.refresh();
    setLoading(false);
    setRejecting(false);
  }

  return (
    <div className="rounded-xl border border-sun-navy/10 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={validate}
          disabled={loading}
          className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
        >
          Valider
        </button>
        <button
          onClick={() => setRejecting((v) => !v)}
          disabled={loading}
          className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          Rejeter
        </button>
      </div>
      {rejecting && (
        <div className="mt-3 space-y-2">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Motif du rejet (optionnel)"
            rows={2}
            className="w-full rounded-lg border border-sun-navy/20 px-3 py-2 text-sm focus:border-sun-navy focus:outline-none"
          />
          <button
            onClick={reject}
            disabled={loading}
            className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            Confirmer le rejet
          </button>
        </div>
      )}
    </div>
  );
}
