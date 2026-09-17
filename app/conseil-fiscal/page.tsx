import DossierForm from "@/components/DossierForm";
import { services, difficulteOperateursEco } from "@/lib/content";

export default function ConseilFiscalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sun-orange">
        Conseil fiscal
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-sun-navy sm:text-4xl">
        {services.CONSEIL_FISCAL.titre}
      </h1>
      <p className="mt-4 text-foreground/70">{services.CONSEIL_FISCAL.description}</p>

      <div className="mt-6 rounded-xl border border-sun-orange/30 bg-orange-50 p-4 text-sm text-sun-navy">
        {difficulteOperateursEco}
      </div>

      <div className="mt-10">
        <DossierForm
          dossierType="CONSEIL_FISCAL"
          title="Demander l'accompagnement"
          fields={[
            { name: "entrepriseNom", label: "Nom du commerce / de l'activité", required: true },
            { name: "contactNom", label: "Nom complet", required: true },
            { name: "contactEmail", label: "E-mail", type: "email", required: true },
            { name: "contactTelephone", label: "Téléphone", type: "tel", required: true },
            { name: "message", label: "Décrivez votre activité et vos besoins", type: "textarea" },
          ]}
        />
      </div>
    </div>
  );
}
