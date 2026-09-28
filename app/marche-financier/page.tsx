import type { Metadata } from "next";
import { Building2, ShieldCheck, Wallet } from "lucide-react";
import DossierForm from "@/components/DossierForm";
import Reveal from "@/components/Reveal";
import { btn, CheckList, Eyebrow, PageHero, Steps } from "@/components/ui";
import { pageContent } from "@/lib/content";

const { financementEntreprises: entreprises, financementInvestisseurs: investisseurs } = pageContent;

export const metadata: Metadata = {
  title: "Marché financier",
  description: entreprises.sousTitre,
  alternates: { canonical: "/marche-financier" },
};

function Reassurance({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5 rounded-2xl bg-sun-navy-50 p-5">
      {items.map((r) => (
        <li key={r} className="flex items-start gap-2.5 text-sm text-sun-navy">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sun-orange" aria-hidden />
          {r}
        </li>
      ))}
    </ul>
  );
}

function SpaceHeader({ Icon, eyebrow, title, intro }: { Icon: typeof Building2; eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sun-navy text-white">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-1.5 font-display text-2xl font-bold text-sun-navy">{title}</h2>
        {intro && <p className="mt-2 text-sm leading-relaxed text-sun-muted">{intro}</p>}
      </div>
    </div>
  );
}

export default function MarcheFinancierPage() {
  return (
    <>
      <PageHero
        eyebrow="Marché financier"
        title={entreprises.titre}
        subtitle={entreprises.sousTitre}
        image={{ src: "/images/financement.jpg", alt: "Une personne tend un dossier de documents au-dessus d'un bureau." }}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#entreprises" className={btn.primary}>
            Espace Entreprises
          </a>
          <a href="#investisseurs" className={btn.outlineLight}>
            Espace Investisseurs
          </a>
        </div>
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-10">
        {/* Espace Entreprises */}
        <section id="entreprises" className="flex flex-col gap-8">
          <Reveal from="left">
            <SpaceHeader Icon={Building2} eyebrow="Pour les entreprises" title="Espace Entreprises" />
            <CheckList items={entreprises.pourquoi} className="mt-6" />
          </Reveal>

          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {entreprises.titresProposables.map((t) => (
                <div key={t.titre} className="rounded-2xl bg-sun-surface p-5 ring-1 ring-sun-line">
                  <h3 className="font-display text-base font-bold text-sun-navy">{t.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sun-muted">{t.texte}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h3 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-sun-navy/70">
              Comment ça marche
            </h3>
            <Steps items={entreprises.etapes} />
          </Reveal>

          <Reveal>
            <Reassurance items={entreprises.reassurance} />
          </Reveal>

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
        </section>

        {/* Espace Investisseurs */}
        <section id="investisseurs" className="flex flex-col gap-8">
          <Reveal from="right">
            <SpaceHeader
              Icon={Wallet}
              eyebrow="Pour les investisseurs"
              title="Espace Investisseurs"
              intro={investisseurs.sousTitre}
            />
            <CheckList items={investisseurs.pourquoi} className="mt-6" />
          </Reveal>

          <Reveal>
            <h3 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-sun-navy/70">
              Comment ça marche
            </h3>
            <Steps items={investisseurs.etapes} />
          </Reveal>

          <Reveal>
            <Reassurance items={investisseurs.reassurance} />
          </Reveal>

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
        </section>
      </div>
    </>
  );
}
