import DossierForm from "@/components/DossierForm";
import { services } from "@/lib/content";

export default function MarcheFinancierPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        Marché financier
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">
        {services.MARCHE_FINANCIER.titre}
      </h1>
      <p className="mt-4 max-w-3xl text-foreground/70">{services.MARCHE_FINANCIER.description}</p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Espace Entreprises</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Vous souhaitez émettre des actions ou des obligations ? Déposez votre demande et les
            documents nécessaires à l&apos;étude de votre dossier (bilans, états financiers...).
          </p>
          <div className="mt-4">
            <DossierForm
              dossierType="ENTREPRISE_EMISSION"
              title="Demande d'émission de titres"
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

        <div>
          <h2 className="font-display text-xl font-semibold text-sun-navy">Espace Investisseurs</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Vous souhaitez acheter des actions ou des obligations ? Faites-nous part de votre
            intérêt et de votre capacité d&apos;investissement.
          </p>
          <div className="mt-4">
            <DossierForm
              dossierType="INVESTISSEUR"
              title="Demande d'investissement"
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
