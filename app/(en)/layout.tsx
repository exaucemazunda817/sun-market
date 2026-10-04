import type { Metadata } from "next";
import RootDocument from "@/components/sun/RootDocument";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "SUN Market · Equity & investment marketplace", template: "%s · SUN Market" },
  description:
    "SUN Market connects companies seeking capital with investors looking for qualified opportunities, within a structured framework, in Kinshasa.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
