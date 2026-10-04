import MarchePage from "@/components/pages/MarchePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("marche", "fr", "Marché financier",
  "Financer une entreprise ou investir dans un cadre clair : dépôt de dossier d'émission en 3 étapes, analyse des documents, présentation aux investisseurs.");

export default function Page() {
  return <MarchePage lang="fr" />;
}
