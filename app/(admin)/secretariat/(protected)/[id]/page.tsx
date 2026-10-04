// Fiche d'un dossier : toutes les réponses du formulaire, documents (servis par
// une route protégée, jamais par leur URL de stockage), validation ou refus.
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { s } from "@/lib/css";
import { fmtDate, STEP, TITRE_LABELS, TYPE_LABELS } from "@/lib/labels";
import DossierActions from "@/components/secretariat/DossierActions";

export const dynamic = "force-dynamic";

const card = `background:#fff;border-radius:16px;padding:24px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`;

export default async function DossierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await prisma.dossier.findUnique({ where: { id }, include: { documents: true } });
  if (!d) notFound();
  const st = STEP[d.status];

  const rows: [string, string | null | undefined][] = [
    ["Référence", d.reference],
    ["Contact", d.contactNom],
    ["Téléphone", d.contactTelephone],
    ["E-mail", d.contactEmail],
    ["N° RCCM", d.rccm],
    ["Secteur", d.secteur],
    ["Ancienneté", d.anciennete],
    ["Type d'émission", d.typeTitre ? TITRE_LABELS[d.typeTitre] : null],
    ["Montant recherché", d.montantRecherche],
    ["Durée d'abonnement", d.dureeMois ? `${d.dureeMois} mois` : null],
    ["Moyen de paiement annoncé", d.moyenPaiement],
    ["Abonnement", d.abonnementDebut ? `du ${fmtDate(d.abonnementDebut)} au ${fmtDate(d.abonnementFin)}` : null],
    ["Reçu le", fmtDate(d.createdAt)],
    ["Motif du refus", d.rejectReason],
  ];

  return (
    <>
      <Link href="/secretariat" style={s(`font:600 15px/1 'Montserrat';text-decoration:none;align-self:flex-start;padding:10px 0`)}>← Tous les dossiers</Link>
      <div style={s(`display:flex;flex-direction:column;gap:10px`)}>
        <span style={s(`font:700 13px/1 'Montserrat';letter-spacing:.14em;text-transform:uppercase;color:#B8460E`)}>{TYPE_LABELS[d.type] ?? d.type}</span>
        <h1 style={s(`margin:0;font:700 clamp(26px,3vw,34px)/1.15 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>{d.entrepriseNom || d.contactNom}</h1>
        <span style={s(`align-self:flex-start;display:inline-flex;align-items:center;gap:8px;font:600 13px/1 'Montserrat';color:#261A66;background:#EEEBFB;padding:7px 10px;border-radius:999px`)}>
          <span style={{ ...s(`width:7px;height:7px;border-radius:50%`), background: st.dot }} />{st.label}
        </span>
      </div>
      <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px;align-items:start`)}>
        <dl style={s(card + `;margin:0;display:grid;grid-template-columns:minmax(140px,auto) minmax(0,1fr);gap:10px 20px;font:400 16px/1.45 'Source Sans 3'`)}>
          {rows.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} style={s(`display:contents`)}>
              <dt style={s(`font:700 13px/1.6 'Montserrat';color:#5C5873`)}>{k}</dt>
              <dd style={s(`margin:0`)}>{v}</dd>
            </div>
          ))}
        </dl>
        <div style={s(`display:flex;flex-direction:column;gap:24px`)}>
          {d.usageFonds || d.message ? (
            <div style={s(card + `;display:flex;flex-direction:column;gap:8px`)}>
              <h2 style={s(`margin:0;font:600 17px/1.3 'Montserrat';color:#261A66`)}>{d.usageFonds ? "Usage des fonds" : "Message"}</h2>
              <p style={s(`margin:0;white-space:pre-wrap;font:400 16px/1.55 'Source Sans 3'`)}>{d.usageFonds ?? d.message}</p>
            </div>
          ) : null}
          {d.documents.length > 0 ? (
            <div style={s(card + `;display:flex;flex-direction:column;gap:10px`)}>
              <h2 style={s(`margin:0;font:600 17px/1.3 'Montserrat';color:#261A66`)}>Documents joints</h2>
              {d.documents.map((doc) => (
                <a key={doc.id} href={`/api/secretariat/dossiers/${d.id}/document/${doc.id}`} style={s(`font:600 15px/1.4 'Source Sans 3';padding:6px 0`)}>
                  {doc.filename} <span style={s(`color:#5C5873;font-weight:400`)}>· {Math.round(doc.size / 1024)} Ko</span>
                </a>
              ))}
            </div>
          ) : null}
          <DossierActions dossierId={d.id} status={d.status} />
        </div>
      </div>
    </>
  );
}
