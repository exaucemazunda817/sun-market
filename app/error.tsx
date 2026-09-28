"use client";

import { btn, PageHero } from "@/components/ui";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PageHero eyebrow="Erreur" title="Un problème est survenu." subtitle="Réessayez dans un instant. Si le problème persiste, contactez-nous.">
      <button type="button" onClick={reset} className={`${btn.primary} mt-9`}>
        Réessayer
      </button>
    </PageHero>
  );
}
