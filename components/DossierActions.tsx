"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DossierActions({ dossierId }: { dossierId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Une action qui échoue (session expirée, réseau coupé) doit se voir : sans
  // ça, le Secrétariat croyait avoir validé un dossier qui ne l'était pas.
  async function send(action: "validate" | "reject") {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/secretariat/dossiers/${dossierId}/${action}`, {
        method: "POST",
        headers: action === "reject" ? { "Content-Type": "application/json" } : undefined,
        body: action === "reject" ? JSON.stringify({ reason }) : undefined,
      });
      if (res.status === 401) {
        router.push("/secretariat/login");
        return;
      }
      if (!res.ok) {
        setError("L'action n'a pas été enregistrée. Réessayez.");
        return;
      }
      if (action === "reject") setRejecting(false);
      router.refresh();
    } catch {
      setError("Connexion impossible — l'action n'a pas été enregistrée.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-sun-navy/10 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => send("validate")}
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
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
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
            onClick={() => send("reject")}
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
