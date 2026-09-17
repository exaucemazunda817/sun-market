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

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Vision</h2>
          <p className="mt-2 rounded-lg placeholder-note px-4 py-3 text-sm">
            {aPropos.visionPlaceholder}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Mission</h2>
          <p className="mt-2 rounded-lg placeholder-note px-4 py-3 text-sm">
            {aPropos.missionPlaceholder}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Valeurs</h2>
          <p className="mt-2 rounded-lg placeholder-note px-4 py-3 text-sm">
            {aPropos.valeursPlaceholder}
          </p>
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
