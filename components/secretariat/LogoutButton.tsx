"use client";

import { useRouter } from "next/navigation";
import { s } from "@/lib/css";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button type="button" className="hv-white10" onClick={async () => { await fetch("/api/session/logout", { method: "POST" }); router.push("/secretariat/login"); router.refresh(); }}
      style={s(`height:40px;padding:0 14px;border-radius:999px;border:0;background:rgba(255,255,255,.1);color:#fff;font:600 13px/1 'Montserrat';cursor:pointer`)}>
      Se déconnecter
    </button>
  );
}
