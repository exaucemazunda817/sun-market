import AproposPage from "@/components/pages/AproposPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("apropos", "fr", "À propos",
  "SUN Market, plateforme de SUN Capital SARL à Kinshasa/Gombe : notre mission, nos valeurs et notre équipe.");

export default function Page() {
  return <AproposPage lang="fr" />;
}
