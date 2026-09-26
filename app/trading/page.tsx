import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { pageContent } from "@/lib/content";

const { trading } = pageContent;

export default function TradingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        Trading
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">{trading.titre}</h1>
      <p className="mt-4 max-w-3xl text-foreground/70">{trading.sousTitre}</p>

      <Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {trading.deuxFacons.map((f) => (
            <li key={f.question} className="rounded-xl border border-sun-navy/10 p-4">
              <p className="font-display text-sm font-semibold text-sun-navy">{f.question}</p>
              <p className="mt-1.5 text-sm text-foreground/70">{f.reponse}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Gestion de capital */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-sun-navy/10 p-6">
            <h2 className="font-display text-lg font-semibold text-sun-navy">{trading.gestion.titre}</h2>
            <p className="mt-2 text-sm text-foreground/70">{trading.gestion.texte}</p>

            <h3 className="mt-5 text-sm font-semibold text-sun-navy">{trading.gestion.contratTitre}</h3>
            <ul className="mt-2 space-y-1.5">
              {trading.gestion.contratPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-foreground/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-orange" />
                  {p}
                </li>
              ))}
            </ul>

            <h3 className="mt-5 text-sm font-semibold text-sun-navy">{trading.gestion.suiviTitre}</h3>
            <p className="mt-1.5 text-sm text-foreground/70">{trading.gestion.suiviTexte}</p>

            <a
              href="/documents/contrat-gestion-sous-mandat.pdf"
              className="mt-5 inline-block rounded-full border-2 border-sun-navy px-5 py-2.5 text-sm font-semibold text-sun-navy transition-colors hover:bg-sun-navy hover:text-white"
            >
              Télécharger le modèle de contrat
            </a>
            <p className="mt-2 text-xs text-foreground/50">
              [À COMPLÉTER — le PDF du modèle de contrat doit être déposé dans public/documents/]
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DossierForm
            dossierType="FORMATION_TRADING"
            title="Simuler ma gestion de capital"
            fields={[
              { name: "contactNom", label: "Nom complet", required: true },
              { name: "contactEmail", label: "E-mail", type: "email", required: true },
              { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
              { name: "message", label: "Capital envisagé / vos questions", type: "textarea" },
            ]}
          />
        </Reveal>
      </div>

      {/* Académie de trading */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-sun-navy/10 p-6">
            <h2 className="font-display text-lg font-semibold text-sun-navy">{trading.academie.titre}</h2>

            <h3 className="mt-4 text-sm font-semibold text-sun-navy">Ce que vous allez apprendre</h3>
            <ul className="mt-2 space-y-1.5">
              {trading.academie.apprentissage.map((a) => (
                <li key={a} className="flex items-start gap-2 text-xs text-foreground/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-orange" />
                  {a}
                </li>
              ))}
            </ul>

            <h3 className="mt-5 text-sm font-semibold text-sun-navy">{trading.academie.objectifTitre}</h3>
            <p className="mt-1.5 text-sm text-foreground/70">{trading.academie.objectifTexte}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DossierForm
            dossierType="FORMATION_TRADING"
            title="Rejoindre l'académie"
            fields={[
              { name: "contactNom", label: "Nom complet", required: true },
              { name: "contactEmail", label: "E-mail", type: "email", required: true },
              { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
              { name: "message", label: "Votre niveau / vos attentes", type: "textarea" },
            ]}
          />
        </Reveal>
      </div>

      <Reveal>
        <p className="mt-16 text-center font-display text-xl italic text-sun-navy sm:text-2xl">
          {trading.cloture}
        </p>
      </Reveal>
    </div>
  );
}
