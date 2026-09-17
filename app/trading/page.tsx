import DossierForm from "@/components/DossierForm";
import { services } from "@/lib/content";

export default function TradingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        Trading
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">
        {services.TRADING.titre}
      </h1>
      <p className="mt-4 max-w-3xl text-foreground/70">{services.TRADING.description}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-sun-navy/10 p-6">
          <h2 className="font-display text-lg font-semibold text-sun-navy">
            Gestion sous mandat — modèle de contrat
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Téléchargez le modèle de contrat de gestion sous mandat pour connaître les
            responsabilités des parties, les modalités de gestion, les risques liés au trading, les
            conditions de rémunération, de retrait et la clause de garantie du capital.
          </p>
          <a
            href="/documents/contrat-gestion-sous-mandat.pdf"
            className="mt-4 inline-block rounded-full border-2 border-sun-navy px-5 py-2.5 text-sm font-semibold text-sun-navy transition-colors hover:bg-sun-navy hover:text-white"
          >
            Télécharger le modèle de contrat
          </a>
          <p className="mt-2 text-xs text-foreground/50">
            [À COMPLÉTER — le PDF du modèle de contrat doit être déposé dans public/documents/]
          </p>
        </div>

        <div>
          <DossierForm
            dossierType="FORMATION_TRADING"
            title="S'inscrire aux formations en trading"
            fields={[
              { name: "contactNom", label: "Nom complet", required: true },
              { name: "contactEmail", label: "E-mail", type: "email", required: true },
              { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
              { name: "message", label: "Votre niveau / vos attentes", type: "textarea" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
