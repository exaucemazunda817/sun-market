import { company, aPropos } from "@/lib/content";

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        À propos
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">
        {company.raisonSociale}
      </h1>
      <p className="mt-4 text-lg italic text-foreground/70">{company.credo}</p>
      <p className="mt-6 text-lg font-medium text-sun-navy">{aPropos.presentationSubtitle}</p>

      <div className="mt-10 space-y-8">
        <section className="space-y-3">
          {aPropos.presentationIntro.map((p) => (
            <p key={p} className="text-foreground/80">
              {p}
            </p>
          ))}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">
            {aPropos.activitesIntro}
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {aPropos.activites.map((a) => (
              <div key={a.titre} className="rounded-lg border border-border px-4 py-4">
                <h3 className="font-display text-base font-semibold text-sun-navy">{a.titre}</h3>
                <p className="mt-2 text-sm text-foreground/80">{a.texte}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Mission</h2>
          <p className="mt-2 text-foreground/80">{aPropos.mission}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Vision</h2>
          <p className="mt-2 text-foreground/80">{aPropos.vision}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Notre approche</h2>
          <div className="mt-2 space-y-3 text-foreground/80">
            {aPropos.approcheIntro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {aPropos.approchePrincipes.map((principe) => (
              <span
                key={principe}
                className="rounded-full border border-sun-orange/40 bg-sun-orange/10 px-4 py-1.5 text-sm font-semibold text-sun-navy"
              >
                {principe}
              </span>
            ))}
          </div>
          <p className="mt-4 text-foreground/80">{aPropos.approcheConclusion}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Équipe</h2>
          <p className="mt-2 rounded-lg placeholder-note px-4 py-3 text-sm">
            {aPropos.equipePlaceholder}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">
            Positionnement dans le secteur financier
          </h2>
          <p className="mt-2 rounded-lg placeholder-note px-4 py-3 text-sm">
            {aPropos.positionnementPlaceholder}
          </p>
        </section>
      </div>
    </div>
  );
}
