// Tableau de bord du Secrétariat (12 Espace Secretariat.dc.html, cahier §15) :
// 4 indicateurs et tableau des dossiers, avec les vraies données de la base.
import Link from "next/link";
import { prisma } from "@/lib/db";
import { s } from "@/lib/css";
import { fmtDate, STEP, TITRE_LABELS, TYPE_LABELS } from "@/lib/labels";

// Toujours lu à la visite (jamais figé au moment de la construction du site).
export const dynamic = "force-dynamic";

const th = `padding:12px 16px;font:700 12px/1 'Montserrat';letter-spacing:.08em;text-transform:uppercase;color:#5C5873;text-align:left`;

export default async function SecretariatDashboard() {
  const [enAnalyse, messages, abonnes, dossiers] = await Promise.all([
    prisma.dossier.count({ where: { status: "PENDING", type: "ENTREPRISE_EMISSION" } }),
    prisma.contactMessage.count({ where: { traite: false } }),
    prisma.dossier.count({ where: { type: "CONSEIL_FISCAL", status: "VALIDATED", abonnementFin: { gte: new Date() } } }),
    prisma.dossier.findMany({ orderBy: { createdAt: "desc" }, take: 100, select: { id: true, reference: true, type: true, status: true, entrepriseNom: true, contactNom: true, contactTelephone: true, typeTitre: true, dureeMois: true, createdAt: true } }),
  ]);
  const kpis: [string, string][] = [
    ["Dossiers en analyse", String(enAnalyse)],
    ["Demandes de contact", String(messages)],
    ["Abonnés conseil fiscal", String(abonnes)],
    // Les inscriptions à l'académie passent aujourd'hui par WhatsApp : pas encore comptées ici.
    ["Inscrits académie", "—"],
  ];

  return (
    <>
      <h1 style={s(`margin:0;font:700 clamp(26px,3vw,34px)/1.15 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>Bonjour<span style={s(`color:#EF5F18`)}>.</span></h1>
      <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:16px`)}>
        {kpis.map(([l, v]) => (
          <div key={l} style={s(`background:#fff;border-radius:16px;padding:20px 22px;display:flex;flex-direction:column;gap:8px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`)}>
            <span style={s(`font:600 14px/1.3 'Source Sans 3';color:#5C5873`)}>{l}</span>
            <span style={s(`font:700 36px/1 'Montserrat';letter-spacing:-.03em;color:#261A66;font-variant-numeric:tabular-nums`)}>{v}</span>
          </div>
        ))}
      </div>
      <div style={s(`background:#fff;border-radius:16px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05);overflow:hidden`)}>
        <div style={s(`display:flex;justify-content:space-between;align-items:center;gap:12px;padding:20px 24px;flex-wrap:wrap`)}>
          <h2 style={s(`margin:0;font:600 18px/1.3 'Montserrat';color:#261A66`)}>Dossiers récents</h2>
          <span style={s(`font:400 14px/1 'Source Sans 3';color:#5C5873`)}>{dossiers.length} dossier{dossiers.length > 1 ? "s" : ""}</span>
        </div>
        <div style={s(`overflow-x:auto`)}>
          <table style={s(`width:100%;min-width:720px;border-collapse:collapse;font:400 15px/1.4 'Source Sans 3'`)}>
            <thead><tr style={s(`background:#FAF8F5`)}>
              <th style={s(th + ";padding-left:24px")}>Référence</th><th style={s(th)}>Entreprise / contact</th><th style={s(th)}>Type</th><th style={s(th)}>Étape</th><th style={s(th + ";padding-right:24px")}>Reçu le</th>
            </tr></thead>
            <tbody>
              {dossiers.map((d) => {
                const st = STEP[d.status];
                const type = d.type === "ENTREPRISE_EMISSION" && d.typeTitre ? TITRE_LABELS[d.typeTitre] : d.type === "CONSEIL_FISCAL" && d.dureeMois ? `Conseil fiscal · ${d.dureeMois} mois` : TYPE_LABELS[d.type] ?? d.type;
                return (
                  <tr key={d.id} className="sun-row-link" style={s(`box-shadow:inset 0 1px 0 #E6E6E6`)}>
                    <td style={s(`padding:16px 24px;font:600 14px/1 ui-monospace,Menlo,monospace;color:#261A66`)}>
                      <Link href={`/secretariat/${d.id}`} style={s(`color:#261A66`)}>{d.reference ?? "Voir"}</Link>
                    </td>
                    <td style={s(`padding:16px`)}>{d.entrepriseNom ?? d.contactNom}<div style={s(`font-size:13px;color:#5C5873`)}>{d.contactTelephone}</div></td>
                    <td style={s(`padding:16px;color:#5C5873`)}>{type}</td>
                    <td style={s(`padding:16px`)}>
                      <span style={s(`display:inline-flex;align-items:center;gap:8px;font:600 13px/1 'Montserrat';color:#261A66;background:#EEEBFB;padding:7px 10px;border-radius:999px`)}>
                        <span style={{ ...s(`width:7px;height:7px;border-radius:50%`), background: st.dot }} />{st.label}
                      </span>
                    </td>
                    <td style={s(`padding:16px 24px;color:#5C5873`)}>{fmtDate(d.createdAt)}</td>
                  </tr>
                );
              })}
              {dossiers.length === 0 ? <tr><td colSpan={5} style={s(`padding:32px 24px;text-align:center;color:#5C5873`)}>Aucun dossier reçu pour l&apos;instant.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
