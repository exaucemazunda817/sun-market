"use client";

import { useId, useState, type FormEvent } from "react";
import { upload } from "@vercel/blob/client";

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
        for (const file of files) {
          const blob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/dossiers/upload",
          });
          documents.push({
            blobUrl: blob.url,
            filename: file.name,
            mimeType: file.type || "application/octet-stream",
            size: file.size,
          });
        }
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

  if (status === "done") {
    return (
      <div className="rounded-xl border border-sun-navy/20 bg-sun-gray p-6 text-sun-navy">
        <p className="font-display font-semibold">Demande envoyée avec succès.</p>
        <p className="mt-1 text-sm">
          Notre équipe reviendra vers vous après étude de votre dossier.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-sun-navy/10 p-6">
      <h3 className="font-display text-lg font-semibold text-sun-navy">{title}</h3>

      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-foreground/80" htmlFor={`${formId}-${field.name}`}>
            {field.label}
            {field.required && <span className="text-sun-orange"> *</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={`${formId}-${field.name}`}
              name={field.name}
              required={field.required}
              rows={4}
              className="mt-1 w-full rounded-lg border border-sun-navy/20 px-3 py-2 text-sm focus:border-sun-navy focus:outline-none"
            />
          ) : (
            <input
              id={`${formId}-${field.name}`}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              className="mt-1 w-full rounded-lg border border-sun-navy/20 px-3 py-2 text-sm focus:border-sun-navy focus:outline-none"
            />
          )}
        </div>
      ))}

      {withDocuments && (
        <div>
          <label className="block text-sm font-medium text-foreground/80" htmlFor={`${formId}-documents`}>
            Documents (bilans, états financiers...)
          </label>
          <input
            id={`${formId}-documents`}
            name="documents"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            className="mt-1 w-full text-sm"
          />
        </div>
      )}

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-sun-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sun-orange-dark disabled:opacity-60"
      >
        {status === "loading" ? "Envoi en cours..." : submitLabel}
      </button>
    </form>
  );
}
