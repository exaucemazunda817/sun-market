import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "fr", null,
  "SUN Market relie les entreprises qui cherchent des capitaux et les investisseurs qui cherchent des opportunités qualifiées, dans un cadre structuré, à Kinshasa.");

export default function Page() {
  return <HomePage lang="fr" />;
}
