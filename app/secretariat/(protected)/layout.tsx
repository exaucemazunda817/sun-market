"use client";

import { useRouter } from "next/navigation";
import { company } from "@/lib/content";

export default function SecretariatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/session/logout", { method: "POST" });
    router.push("/secretariat/login");
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-sun-gray/40">
      <div className="border-b border-sun-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="font-display font-semibold text-sun-navy">
            Secrétariat · {company.nomCommercial}
          </p>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-foreground/60 hover:text-sun-navy"
          >
            Déconnexion
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
