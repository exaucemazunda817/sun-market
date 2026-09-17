import Link from "next/link";
import { prisma } from "@/lib/db";
import { services } from "@/lib/content";

// Sans cette option, Next tente de pré-rendre cette page statiquement au build
// (exécutant la requête Prisma une seule fois) — la liste des dossiers doit au
// contraire toujours refléter l'état actuel de la base à chaque visite.
export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  PENDING: "En attente",
  VALIDATED: "Validé",
  REJECTED: "Rejeté",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  VALIDATED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const typeLabels: Record<string, string> = {
  ENTREPRISE_EMISSION: "Émission (entreprise)",
  INVESTISSEUR: "Investisseur",
  FORMATION_TRADING: "Formation trading",
  CONSEIL_FISCAL: "Conseil fiscal",
};

export default async function SecretariatDossiersPage() {
  const dossiers = await prisma.dossier.findMany({
    orderBy: { createdAt: "desc" },
    include: { documents: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sun-navy">Dossiers reçus</h1>
      <p className="mt-1 text-sm text-foreground/60">
        {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""} au total — {Object.keys(services).length} types de demandes.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-sun-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-sun-gray/60 text-xs uppercase tracking-wide text-foreground/60">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Documents</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Reçu le</th>
            </tr>
          </thead>
          <tbody>
            {dossiers.map((d) => (
              <tr key={d.id} className="border-t border-sun-navy/5 hover:bg-sun-gray/30">
                <td className="px-4 py-3">
                  <Link href={`/secretariat/${d.id}`} className="font-medium text-sun-navy hover:underline">
                    {typeLabels[d.type] ?? d.type}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div>{d.contactNom}</div>
                  <div className="text-xs text-foreground/50">{d.contactEmail}</div>
                </td>
                <td className="px-4 py-3">{d.documents.length}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[d.status]}`}>
                    {statusLabels[d.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-foreground/50">
                  {d.createdAt.toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
            {dossiers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-foreground/50">
                  Aucun dossier reçu pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
