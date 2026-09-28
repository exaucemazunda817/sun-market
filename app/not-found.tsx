import Link from "next/link";
import { btn, Eyebrow, SunRings } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-sun-navy text-white">
      <SunRings className="absolute -right-24 -top-16 hidden h-[420px] w-[420px] text-sun-on-navy lg:block" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <Eyebrow dark>Erreur 404</Eyebrow>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-hero font-bold tracking-tight">Cette page n&apos;existe pas.</h1>
        <p className="mt-5 max-w-xl text-lg text-sun-on-navy">Le lien est peut-être incorrect ou la page a été déplacée.</p>
        <Link href="/" className={`${btn.primary} mt-9`}>
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
