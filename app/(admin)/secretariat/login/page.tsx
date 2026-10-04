// Connexion Secrétariat — écran scindé ≥ 900 px (12 Espace Secretariat.dc.html, cahier §15).
import Link from "next/link";
import { s } from "@/lib/css";
import LoginForm from "@/components/secretariat/LoginForm";

export default function SecretariatLoginPage() {
  return (
    <div className="sun-login-grid" style={s(`min-height:100vh;display:grid`)}>
      <div className="only-wide-900" style={s(`background:#261A66;color:#fff;position:relative;overflow:hidden;padding:48px;flex-direction:column;justify-content:space-between`)}>
        <svg viewBox="0 0 600 800" preserveAspectRatio="none" style={s(`position:absolute;inset:0;width:100%;height:100%`)} aria-hidden="true">
          <path className="sun-curve" d="M-20 760 C 160 700, 260 420, 420 360 S 600 200, 640 80" fill="none" stroke="#EF5F18" strokeWidth="2.5" pathLength={1} strokeDasharray="1" style={s(`animation:curveDraw 2200ms cubic-bezier(.65,0,.35,1) 200ms forwards`)} />
        </svg>
        <Link href="/" style={s(`position:relative;align-self:flex-start`)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-blanc.webp" alt="SUN Market, retour au site" width={92} height={52} style={s(`height:52px;width:auto`)} />
        </Link>
        <div style={s(`position:relative;display:flex;flex-direction:column;gap:14px;max-width:420px`)}>
          <h1 style={s(`margin:0;font:700 clamp(32px,3.4vw,44px)/1.1 'Montserrat';letter-spacing:-.025em`)}>Espace Secrétariat<span style={s(`color:#EF5F18`)}>.</span></h1>
          <p style={s(`margin:0;font:400 18px/1.55 'Source Sans 3';color:#E4E0F7`)}>Accès réservé à l'équipe SUN Capital SARL : suivi des dossiers, des demandes de contact et des abonnements.</p>
        </div>
        <span style={s(`position:relative;font:400 14px/1.4 'Source Sans 3';color:#C9C3F0`)}>© 2026 SUN Capital SARL</span>
      </div>
      <main style={s(`display:flex;align-items:center;justify-content:center;padding:clamp(24px,5vw,64px)`)}>
        <LoginForm showLogo />
      </main>
    </div>
  );
}
