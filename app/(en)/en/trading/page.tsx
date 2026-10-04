import TradingPage from "@/components/pages/TradingPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("trading", "en", "Trading",
  "Capital management under a notarised mandate, and a trading academy. Trading carries a high risk of loss.");

export default function Page() {
  return <TradingPage lang="en" />;
}
