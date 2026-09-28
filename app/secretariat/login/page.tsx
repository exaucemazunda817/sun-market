import type { Metadata } from "next";
import { company } from "@/lib/content";
import SecretariatLoginForm from "@/components/SecretariatLoginForm";

export const metadata: Metadata = {
  title: { absolute: `Espace Secrétariat — ${company.nomCommercial}` },
  robots: { index: false, follow: false },
};

export default function SecretariatLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-xl font-bold text-sun-navy">Espace Secrétariat</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Accès réservé au personnel de {company.raisonSociale}
        </p>
      </div>
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <SecretariatLoginForm />
      </div>
    </div>
  );
}
