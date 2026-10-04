"use client";

// Formulaire de connexion du Secrétariat (12 Espace Secretariat.dc.html, cahier §15),
// branché sur /api/session/login.
import { useRouter } from "next/navigation";
import { useState } from "react";
import { s } from "@/lib/css";
import { legal } from "@/lib/content";
import { Spinner } from "@/components/sun/fields";

function Field({ id, label, value, onChange, type = "text", autoComplete, invalid, right }: { id: string; label: string; value: string; onChange: (v: string) => void; type?: string; autoComplete: string; invalid: boolean; right?: React.ReactNode }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ ...s(`position:relative;height:56px;border-radius:6px;background:#fff;transition:box-shadow 180ms`), boxShadow: invalid ? "inset 0 0 0 2px #B42318" : focus ? "inset 0 0 0 2px #261A66" : "inset 0 0 0 1.5px #C9C3F0" }}>
      <input id={id} type={type} value={value} autoComplete={autoComplete} aria-invalid={invalid} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ ...s(`position:absolute;inset:0;width:100%;border:0;background:transparent;font:400 17px/1.2 'Source Sans 3';color:#1A1730;outline:none`), padding: right ? "22px 96px 6px 16px" : "22px 16px 6px" }} />
      <label htmlFor={id} style={{ ...s(`position:absolute;left:16px;top:0;height:100%;display:flex;align-items:center;pointer-events:none;font:400 17px/1 'Source Sans 3';color:#5C5873;transform-origin:0 50%;transition:transform 180ms cubic-bezier(.22,1,.36,1)`), transform: focus || value ? "translateY(-11px) scale(.78)" : "none" }}>{label}</label>
      {right}
    </div>
  );
}

export default function LoginForm({ showLogo }: { showLogo?: boolean }) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!user || !pass) { setMissing(true); setError("Renseignez votre identifiant et votre mot de passe."); return; }
    setMissing(false);
    setLoading(true);
    try {
      const res = await fetch("/api/session/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifiant: user, password: pass }) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Connexion impossible.");
        setLoading(false);
        return;
      }
      router.push("/secretariat");
      router.refresh();
    } catch {
      setError("Impossible de se connecter. Vérifiez votre connexion.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate style={s(`width:100%;max-width:400px;display:flex;flex-direction:column;gap:20px`)}>
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="only-narrow-900" src="/brand/logo-violet.webp" alt="SUN Market" width={85} height={48} style={s(`height:48px;width:auto;align-self:flex-start`)} />
      ) : null}
      <div style={s(`display:flex;flex-direction:column;gap:8px`)}>
        <h2 style={s(`margin:0;font:700 28px/1.2 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>Connexion</h2>
        <span style={s(`font:400 16px/1.5 'Source Sans 3';color:#5C5873`)}>Utilisez vos identifiants fournis par l'administrateur.</span>
      </div>
      {error ? (
        <div role="alert" style={s(`display:flex;gap:10px;align-items:flex-start;background:#FEF3F2;color:#B42318;border-radius:6px;padding:12px 14px;font:600 15px/1.45 'Source Sans 3'`)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={s(`flex:none;margin-top:1px`)}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5" /><path d="M12 16.2v.01" /></svg>{error}
        </div>
      ) : null}
      <Field id="user" label="Identifiant" value={user} onChange={setUser} autoComplete="username" invalid={missing && !user} />
      <Field id="pass" label="Mot de passe" value={pass} onChange={setPass} type={show ? "text" : "password"} autoComplete="current-password" invalid={missing && !pass}
        right={<button type="button" onClick={() => setShow(!show)} aria-pressed={show} aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          style={s(`position:absolute;right:6px;top:6px;height:44px;padding:0 10px;border:0;background:transparent;color:#B8460E;font:600 13px/1 'Montserrat';cursor:pointer`)}>{show ? "Masquer" : "Afficher"}</button>} />
      <button type="submit" aria-busy={loading} className="hv-btn-violet"
        style={s(`height:52px;border-radius:10px;border:0;background:#261A66;color:#fff;font:600 16px/1 'Montserrat';cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:background 180ms`)}>
        {loading ? <Spinner color="#fff" /> : null}{loading ? "Connexion…" : "Se connecter"}
      </button>
      <a href={`mailto:${legal.email}?subject=${encodeURIComponent("Espace Secrétariat : mot de passe oublié")}`} style={s(`font:600 15px/1 'Montserrat';padding:14px 0;align-self:flex-start`)}>Mot de passe oublié ?</a>
      <span style={s(`display:flex;gap:8px;align-items:center;font:400 14px/1.4 'Source Sans 3';color:#5C5873`)}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={s(`flex:none`)}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        Connexion chiffrée. Déconnexion automatique après 30 min d'inactivité.
      </span>
    </form>
  );
}
