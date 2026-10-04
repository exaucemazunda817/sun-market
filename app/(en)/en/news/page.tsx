import ActusPage from "@/components/pages/ActusPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("actus", "en", "News", "Practical advice, explanations and SUN Market news.");

export default function Page() {
  return <ActusPage lang="en" />;
}
