"use client";

// Base Neon indisponible ou endormie : message clair plutôt qu'une page blanche.
export default function SecretariatError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-xl font-bold text-sun-navy">Les dossiers n&apos;ont pas pu être chargés.</h1>
      <p className="mt-2 text-sm text-sun-muted">La base de données ne répond pas pour le moment. Réessayez dans quelques secondes.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 min-h-11 rounded-full bg-sun-navy px-6 text-sm font-semibold text-white hover:bg-sun-navy-dark"
      >
        Réessayer
      </button>
    </div>
  );
}
