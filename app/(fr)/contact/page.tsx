import ContactPage from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "fr", "Contact",
  "Contactez SUN Market par WhatsApp, par téléphone, par écrit ou à nos bureaux de Gombe, Kinshasa.");

export default function Page() {
  return <ContactPage lang="fr" />;
}
