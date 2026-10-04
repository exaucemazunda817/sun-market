import FiscalPage from "@/components/pages/FiscalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("fiscal", "en", "Tax advisory",
  "A monthly administrative and tax support subscription for shops, cosmetics retailers and trading counters in Kinshasa.");

export default function Page() {
  return <FiscalPage lang="en" />;
}
