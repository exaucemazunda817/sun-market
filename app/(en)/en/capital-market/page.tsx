import MarchePage from "@/components/pages/MarchePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("marche", "en", "Capital market",
  "Finance a company or invest within a clear framework: 3-step issuance application, document review, presentation to investors.");

export default function Page() {
  return <MarchePage lang="en" />;
}
