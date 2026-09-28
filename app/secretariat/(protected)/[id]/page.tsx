import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import DossierActions from "@/components/DossierActions";

export const metadata: Metadata = {
  title: { absolute: "Secrétariat — SUN Market" },
  robots: { index: false, follow: false },
};

const typeLabels: Record<string, string> = {
  ENTREPRISE_EMISSION: "Émission (entreprise)",
  INVESTISSEUR: "Investisseur",
  FORMATION_TRADING: "Formation trading",
  CONSEIL_FISCAL: "Conseil fiscal",
};

export default async function DossierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dossier = await prisma.dossier.findUnique({ where: { id }, include: { documents: true } });

  if (!dossier) notFound();

  return (
    <div className="max-w-3xl">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-sun-orange">
        {typeLabels[dossier.type] ?? dossier.type}
      </p>
      <h1 className="mt-1 font-display text-2xl font-bold text-sun-navy">
        {dossier.entrepriseNom || dossier.contactNom}
      </h1>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-sun-navy/10 bg-white p-4 text-sm">
        <div><dt className="text-foreground/50">Contact</dt><dd>{dossier.contactNom}</dd></div>
        <div><dt className="text-foreground/50">E-mail</dt><dd>{dossier.contactEmail}</dd></div>
        <div><dt className="text-foreground/50">Téléphone</dt><dd>{dossier.contactTelephone}</dd></div>
        <div><dt className="text-foreground/50">Statut</dt><dd>{dossier.status}</dd></div>
        {dossier.message && (
          <div className="col-span-2"><dt className="text-foreground/50">Message</dt><dd className="whitespace-pre-wrap">{dossier.message}</dd></div>
        )}
        {dossier.rejectReason && (
          <div className="col-span-2"><dt className="text-foreground/50">Motif de rejet</dt><dd>{dossier.rejectReason}</dd></div>
        )}
      </dl>

      {dossier.documents.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-lg font-semibold text-sun-navy">Documents joints</h2>
          <ul className="mt-2 space-y-2">
            {dossier.documents.map((doc) => (
              <li key={doc.id}>
                <a
                  href={`/api/secretariat/dossiers/${dossier.id}/document/${doc.id}`}
                  className="text-sm font-medium text-sun-navy underline hover:text-sun-orange"
                >
                  {doc.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <DossierActions dossierId={dossier.id} />
      </div>
    </div>
  );
}
