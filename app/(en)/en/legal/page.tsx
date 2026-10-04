import CadrePage from "@/components/pages/CadrePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("cadre", "en", "Framework & transparency",
  "SUN Capital SARL's legal status, contracts, risk warnings, commitments and data protection.");

export default function Page() {
  return <CadrePage lang="en" />;
}
