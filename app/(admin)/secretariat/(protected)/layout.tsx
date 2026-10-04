// Barre de l'espace Secrétariat (12 Espace Secretariat.dc.html) : violet 64 px,
// logo, libellé, navigation, déconnexion.
import Link from "next/link";
import { s } from "@/lib/css";
import LogoutButton from "@/components/secretariat/LogoutButton";

export default function SecretariatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={s(`min-height:100vh;display:flex;flex-direction:column;animation:paneIn 420ms cubic-bezier(.22,1,.36,1)`)}>
      <header style={s(`background:#261A66;min-height:64px;padding:0 clamp(16px,3vw,32px);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap`)}>
        <div style={s(`display:flex;align-items:center;gap:16px;flex-wrap:wrap`)}>
          <Link href="/secretariat" style={s(`display:flex`)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-blanc.webp" alt="SUN Market" width={60} height={34} style={s(`height:34px;width:auto`)} />
          </Link>
          <span style={s(`font:600 14px/1 'Montserrat';color:#C9C3F0`)}>Secrétariat</span>
          <nav aria-label="Secrétariat" style={s(`display:flex;gap:4px`)}>
            <Link href="/secretariat" className="hv-link-orange" style={s(`color:#fff;text-decoration:none;font:600 14px/1 'Montserrat';padding:14px 10px`)}>Dossiers</Link>
            <Link href="/secretariat/messages" className="hv-link-orange" style={s(`color:#fff;text-decoration:none;font:600 14px/1 'Montserrat';padding:14px 10px`)}>Messages</Link>
          </nav>
        </div>
        <LogoutButton />
      </header>
      <main style={s(`flex:1;padding:clamp(24px,4vw,48px) clamp(16px,3vw,32px);max-width:1280px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:28px`)}>
        {children}
      </main>
    </div>
  );
}
