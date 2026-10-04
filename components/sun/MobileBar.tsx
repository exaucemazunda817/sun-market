// Barre d'action fixe sous 760 px (cahier §5).
import Link from "next/link";
import { s } from "@/lib/css";
import { WHATSAPP, PHONE_TEL, type Lang } from "@/lib/routes";
import { PhoneIcon, WhatsAppIcon } from "./icons";

const square = `flex:none;width:52px;height:52px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #C9C3F0;background:#fff;color:#261A66;display:flex;align-items:center;justify-content:center`;

export default function MobileBar({ lang, label, to }: { lang: Lang; label: string; to: string }) {
  return (
    <div className="sun-mobile-bar" style={s(`position:fixed;left:0;right:0;bottom:0;z-index:40;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:rgba(250,248,245,.96);box-shadow:0 -8px 24px rgba(38,26,102,.12);gap:10px`)}>
      <a href={WHATSAPP} aria-label="WhatsApp" style={s(square)}><WhatsAppIcon size={22} /></a>
      <a href={PHONE_TEL} aria-label={lang === "en" ? "Call" : "Appeler"} style={s(square)}><PhoneIcon size={22} /></a>
      <Link href={to} style={s(`flex:1;height:52px;border-radius:10px;background:#EF5F18;color:#170F45;text-decoration:none;font:600 16px/1 'Montserrat';display:flex;align-items:center;justify-content:center`)}>{label}</Link>
    </div>
  );
}
