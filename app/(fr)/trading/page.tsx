import TradingPage from "@/components/pages/TradingPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("trading", "fr", "Trading",
  "Gestion de capital sous mandat encadrée par contrat notarié, et académie de trading. Le trading comporte un risque élevé de perte.");

export default function Page() {
  return <TradingPage lang="fr" />;
}
