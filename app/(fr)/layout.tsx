import type { Metadata } from "next";
import RootDocument from "@/components/sun/RootDocument";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "SUN Market · Equity & investment marketplace", template: "%s · SUN Market" },
  description:
    "SUN Market relie les entreprises qui cherchent des capitaux et les investisseurs qui cherchent des opportunités qualifiées, dans un cadre structuré, à Kinshasa.",
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="fr">{children}</RootDocument>;
}
