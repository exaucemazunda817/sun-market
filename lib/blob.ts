// Documents des dossiers (bilans, états financiers…) : stockés en PRIVÉ dans
// Vercel Blob depuis l'audit de sécurité du 28/09/2026. Le Blob store doit donc
// être créé en mode « Private » sur Vercel (voir CLAUDE.md).

export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024; // 10 Mo
export const MAX_DOCUMENTS = 10;

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export function isAllowedDocumentType(value: unknown): value is (typeof ALLOWED_DOCUMENT_TYPES)[number] {
  return typeof value === "string" && (ALLOWED_DOCUMENT_TYPES as readonly string[]).includes(value);
}

// Identifiant du Blob store du site, lu dans le jeton (vercel_blob_rw_<store>_<secret>).
function ownStoreId(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = token?.split("_")[3];
  return storeId ? storeId.toLowerCase() : null;
}

// N'accepte qu'un lien vers le store PRIVÉ du site. Avant, tout lien
// « *.public.blob.vercel-storage.com » passait — y compris vers le store d'un
// tiers, qui pouvait ainsi glisser un fichier de son choix dans un dossier.
export function isOwnPrivateBlobUrl(url: unknown): url is string {
  const storeId = ownStoreId();
  if (!storeId || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === `${storeId}.private.blob.vercel-storage.com`;
  } catch {
    return false;
  }
}
