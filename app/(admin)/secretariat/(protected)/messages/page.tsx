// Messages du formulaire de contact (page Contact du site).
import { prisma } from "@/lib/db";
import { s } from "@/lib/css";
import { fmtDate } from "@/lib/labels";
import MessageToggle from "@/components/secretariat/MessageToggle";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: [{ traite: "asc" }, { createdAt: "desc" }], take: 200 });
  return (
    <>
      <h1 style={s(`margin:0;font:700 clamp(26px,3vw,34px)/1.15 'Montserrat';letter-spacing:-.02em;color:#261A66`)}>Messages<span style={s(`color:#EF5F18`)}>.</span></h1>
      <div style={s(`display:flex;flex-direction:column;gap:12px`)}>
        {messages.map((m) => (
          <article key={m.id} style={{ ...s(`background:#fff;border-radius:16px;padding:20px 24px;display:flex;flex-direction:column;gap:10px;box-shadow:0 1px 2px rgba(38,26,102,.06),0 8px 24px rgba(38,26,102,.05)`), opacity: m.traite ? 0.65 : 1 }}>
            <div style={s(`display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center`)}>
              <div style={s(`display:flex;gap:10px;align-items:center;flex-wrap:wrap`)}>
                <span style={s(`font:700 12px/1 'Montserrat';letter-spacing:.04em;color:#261A66;background:#EEEBFB;padding:7px 10px;border-radius:999px`)}>{m.sujet}</span>
                <strong style={s(`font:600 16px/1.3 'Montserrat';color:#261A66`)}>{m.nom}</strong>
                <a href={`https://wa.me/${m.telephone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={s(`font:400 15px/1 'Source Sans 3'`)}>{m.telephone}</a>
              </div>
              <span style={s(`font:400 14px/1 'Source Sans 3';color:#5C5873`)}>{fmtDate(m.createdAt)}</span>
            </div>
            <p style={s(`margin:0;font:400 16px/1.55 'Source Sans 3';white-space:pre-wrap`)}>{m.message}</p>
            <MessageToggle id={m.id} traite={m.traite} />
          </article>
        ))}
        {messages.length === 0 ? <p style={s(`margin:0;color:#5C5873`)}>Aucun message pour l&apos;instant.</p> : null}
      </div>
    </>
  );
}
