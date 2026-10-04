import FiscalPage from "@/components/pages/FiscalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("fiscal", "fr", "Conseil fiscal",
  "Un abonnement mensuel d'accompagnement administratif et fiscal pour les boutiques, commerces de cosmétiques et comptoirs de Kinshasa.");

export default function Page() {
  return <FiscalPage lang="fr" />;
}
