import ActusPage from "@/components/pages/ActusPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("actus", "fr", "Actualités", "Conseils pratiques, explications et nouvelles de SUN Market.");

export default function Page() {
  return <ActusPage lang="fr" />;
}
