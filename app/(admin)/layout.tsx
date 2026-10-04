import type { Metadata } from "next";
import RootDocument from "@/components/sun/RootDocument";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Espace Secrétariat · SUN Market",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="fr">{children}</RootDocument>;
}
