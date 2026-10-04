import CadrePage from "@/components/pages/CadrePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("cadre", "fr", "Cadre et transparence",
  "Statut juridique de SUN Capital SARL, contrats, avertissements sur les risques, engagements et protection des données.");

export default function Page() {
  return <CadrePage lang="fr" />;
}
