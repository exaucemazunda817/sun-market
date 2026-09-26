import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { pageContent } from "@/lib/content";

const { conseilFiscal } = pageContent;

export default function ConseilFiscalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        Conseil fiscal
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">
        {conseilFiscal.accroche}
      </h1>

      <Reveal>
        <p className="mt-4 text-foreground/70">{conseilFiscal.intro}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 rounded-xl border border-sun-orange/30 bg-orange-50 p-4 text-sm text-sun-navy">
          {conseilFiscal.positionnement}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-10 font-display text-xl font-semibold text-sun-navy">Notre accompagnement fiscal</h2>
        <ol className="mt-4 space-y-3">
          {conseilFiscal.etapes.map((e, i) => (
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

      <Reveal delay={0.15}>
        <h2 className="mt-10 font-display text-xl font-semibold text-sun-navy">Un accompagnement à tous les niveaux</h2>
        <p className="mt-2 text-sm text-foreground/70">{conseilFiscal.niveaux}</p>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="mt-10 font-display text-xl font-semibold text-sun-navy">Choisissez votre formule d&apos;abonnement</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {conseilFiscal.formules.map((f) => (
            <div key={f.nom} className="rounded-xl border border-sun-navy/10 p-4">
              <p className="font-display text-base font-semibold text-sun-navy">{f.nom}</p>
              <p className="mt-1.5 text-sm text-foreground/70">{f.pourQui}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mt-10 text-center font-display text-lg italic text-sun-navy">{conseilFiscal.cloture}</p>
      </Reveal>

      <div className="mt-10">
        <DossierForm
          dossierType="CONSEIL_FISCAL"
          title="Choisir mon abonnement"
          fields={[
            { name: "entrepriseNom", label: "Nom du commerce / de l'activité", required: true },
            { name: "contactNom", label: "Nom complet", required: true },
            { name: "contactEmail", label: "E-mail", type: "email", required: true },
            { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
            {
              name: "message",
              label: "Décrivez votre activité, vos besoins et la formule souhaitée (trimestrielle, semestrielle ou annuelle)",
              type: "textarea",
            },
          ]}
        />
      </div>
    </div>
  );
}
