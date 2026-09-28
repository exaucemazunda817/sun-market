import Link from "next/link";
import { btn, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="Erreur 404" title="Cette page n'existe pas." subtitle="Le lien est peut-être incorrect ou la page a été déplacée.">
      <Link href="/" className={`${btn.primary} mt-9`}>
        Retour à l&apos;accueil
      </Link>
    </PageHero>
  );
}
