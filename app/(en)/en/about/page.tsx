import AproposPage from "@/components/pages/AproposPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("apropos", "en", "About",
  "SUN Market, the platform of SUN Capital SARL in Kinshasa/Gombe: our mission, our values and our team.");

export default function Page() {
  return <AproposPage lang="en" />;
}
