import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { pageContent } from "@/lib/content";

const { financementEntreprises: entreprises, financementInvestisseurs: investisseurs } = pageContent;

export default function MarcheFinancierPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        Marché financier
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">
        {entreprises.titre}
      </h1>
      <p className="mt-4 max-w-3xl text-foreground/70">{entreprises.sousTitre}</p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Espace Entreprises */}
        <div>
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-sun-navy">Espace Entreprises</h2>
            <ul className="mt-4 space-y-2">
              {entreprises.pourquoi.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-orange" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {entreprises.titresProposables.map((t) => (
                <div key={t.titre} className="rounded-xl border border-sun-navy/10 p-4">
                  <h3 className="font-display text-sm font-semibold text-sun-navy">{t.titre}</h3>
                  <p className="mt-1.5 text-xs text-foreground/70">{t.texte}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wide text-sun-navy/70">
              Comment ça marche
            </h3>
            <ol className="mt-3 space-y-2.5">
              {entreprises.etapes.map((e, i) => (
                <li key={e.titre} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-orange/15 text-xs font-bold text-sun-orange">
                    {i + 1}
                  </span>
                  <span className="text-foreground/70">
                    <b className="text-sun-navy">{e.titre}</b>
                    {e.texte ? ` — ${e.texte}` : ""}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-6 space-y-2 rounded-xl bg-sun-gray p-4">
              {entreprises.reassurance.map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs text-foreground/70">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-orange" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-6">
            <DossierForm
              dossierType="ENTREPRISE_EMISSION"
              title="Présenter mon projet"
              withDocuments
              fields={[
                { name: "entrepriseNom", label: "Nom de l'entreprise", required: true },
                { name: "contactNom", label: "Nom du contact", required: true },
                { name: "contactEmail", label: "E-mail", type: "email", required: true },
                { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
                { name: "message", label: "Description du projet / besoin de financement", type: "textarea" },
              ]}
            />
          </div>
        </div>

        {/* Espace Investisseurs */}
        <div>
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-sun-navy">Espace Investisseurs</h2>
            <p className="mt-2 text-sm italic text-foreground/70">{investisseurs.sousTitre}</p>
            <ul className="mt-4 space-y-2">
              {investisseurs.pourquoi.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-orange" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wide text-sun-navy/70">
              Comment ça marche
            </h3>
            <ol className="mt-3 space-y-2.5">
              {investisseurs.etapes.map((e, i) => (
                <li key={e.titre} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-orange/15 text-xs font-bold text-sun-orange">
                    {i + 1}
                  </span>
                  <span className="text-foreground/70">
                    <b className="text-sun-navy">{e.titre}</b> — {e.texte}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-6 space-y-2 rounded-xl bg-sun-gray p-4">
              {investisseurs.reassurance.map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs text-foreground/70">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-orange" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-6">
            <DossierForm
              dossierType="INVESTISSEUR"
              title="Faire part de mon intérêt"
              fields={[
                { name: "contactNom", label: "Nom complet", required: true },
                { name: "contactEmail", label: "E-mail", type: "email", required: true },
                { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
                { name: "entrepriseNom", label: "Entreprise (si applicable)" },
                { name: "message", label: "Votre projet d'investissement", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
