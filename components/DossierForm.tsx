"use client";

import { useId, useState, type FormEvent } from "react";
import { upload } from "@vercel/blob/client";
import { CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ALLOWED_DOCUMENT_TYPES } from "@/lib/blob";
import { EASE_OUT_SOFT } from "@/lib/motion";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
};

type DossierFormProps = {
  dossierType: "ENTREPRISE_EMISSION" | "INVESTISSEUR" | "FORMATION_TRADING" | "CONSEIL_FISCAL";
  title: string;
  fields: Field[];
  withDocuments?: boolean;
  submitLabel?: string;
};

export default function DossierForm({
  dossierType,
  title,
  fields,
  withDocuments = false,
  submitLabel = "Envoyer ma demande",
}: DossierFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const documents: { blobUrl: string; filename: string; mimeType: string; size: number }[] = [];

      if (withDocuments) {
        const fileInput = form.elements.namedItem("documents") as HTMLInputElement | null;
        const files = fileInput?.files ? Array.from(fileInput.files) : [];
        // Envois en parallèle : sur une connexion lente, plusieurs bilans ne
        // s'attendent plus les uns les autres.
        documents.push(
          ...(await Promise.all(
            files.map(async (file) => {
              const blob = await upload(file.name, file, {
                // Privé : un bilan ne doit jamais être lisible par simple lien.
                access: "private",
                handleUploadUrl: "/api/dossiers/upload",
              });
              return {
                blobUrl: blob.url,
                filename: file.name,
                mimeType: file.type || "application/octet-stream",
                size: file.size,
              };
            })
          ))
        );
      }

      const payload = {
        type: dossierType,
        contactNom: formData.get("contactNom"),
        contactEmail: formData.get("contactEmail"),
        contactTelephone: formData.get("contactTelephone"),
        entrepriseNom: formData.get("entrepriseNom") || undefined,
        message: formData.get("message") || undefined,
        documents,
      };

      const res = await fetch("/api/dossiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Échec de l'envoi");

      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Merci de réessayer ou de nous contacter directement.");
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-sun-line bg-sun-surface px-4 text-[15px] text-foreground transition-colors placeholder:text-sun-muted/60 focus:border-sun-navy focus:bg-white focus:outline-none focus:ring-4 focus:ring-sun-navy-100";

  // Le formulaire s'efface et laisse place à la confirmation (coche qui
  // apparaît), plutôt qu'un remplacement sec.
  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
          className="flex gap-4 rounded-2xl bg-sun-navy-50 p-6 text-sun-navy ring-1 ring-sun-navy-100"
        >
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.15 }}
            className="shrink-0"
          >
            <CheckCircle2 className="h-7 w-7 text-sun-orange" aria-hidden />
          </motion.span>
          <div>
            <p className="font-display font-semibold">Demande envoyée avec succès.</p>
            <p className="mt-1 text-sm text-sun-muted">Notre équipe reviendra vers vous après étude de votre dossier.</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-sun-line sm:p-8"
        >
          <h3 className="font-display text-xl font-bold text-sun-navy">{title}</h3>

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-sun-navy" htmlFor={`${formId}-${field.name}`}>
                {field.label}
                {field.required && <span className="text-sun-orange-text"> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  required={field.required}
                  rows={4}
                  className={`${fieldClass} py-3`}
                />
              ) : (
                <input
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  className={`${fieldClass} h-12`}
                />
              )}
            </div>
          ))}

          {withDocuments && (
            <div>
              <label className="block text-sm font-medium text-sun-navy" htmlFor={`${formId}-documents`}>
                Documents (bilans, états financiers...)
              </label>
              <input
                id={`${formId}-documents`}
                name="documents"
                type="file"
                multiple
                accept={ALLOWED_DOCUMENT_TYPES.join(",")}
                className="mt-1.5 w-full rounded-xl border border-dashed border-sun-navy/25 bg-sun-surface p-3 text-sm text-sun-muted file:mr-4 file:inline-flex file:min-h-10 file:cursor-pointer file:rounded-full file:border-0 file:bg-sun-navy file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-sun-navy-dark"
              />
            </div>
          )}

          <AnimatePresence>
            {errorMessage && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm text-red-700"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-12 w-full rounded-full bg-sun-orange px-6 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_var(--sun-orange)] transition-all hover:bg-sun-orange-dark active:scale-[0.98] disabled:opacity-60"
          >
            {status === "loading" ? "Envoi en cours..." : submitLabel}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
