import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "en", null,
  "SUN Market connects companies seeking capital with investors looking for qualified opportunities, within a structured framework, in Kinshasa.");

export default function Page() {
  return <HomePage lang="en" />;
}
