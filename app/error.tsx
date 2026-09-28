"use client";

import { btn, Eyebrow } from "@/components/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-sun-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <Eyebrow dark>Erreur</Eyebrow>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-hero font-bold tracking-tight">Un problème est survenu.</h1>
        <p className="mt-5 max-w-xl text-lg text-sun-on-navy">Réessayez dans un instant. Si le problème persiste, contactez-nous.</p>
        <button type="button" onClick={reset} className={`${btn.primary} mt-9`}>
          Réessayer
        </button>
      </div>
    </section>
  );
}
