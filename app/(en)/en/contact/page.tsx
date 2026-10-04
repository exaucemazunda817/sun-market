import ContactPage from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "en", "Contact",
  "Contact SUN Market by WhatsApp, by phone, in writing or at our offices in Gombe, Kinshasa.");

export default function Page() {
  return <ContactPage lang="en" />;
}
