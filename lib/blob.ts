// Un document est plus tard récupéré côté serveur par le Secrétariat
// (fetch(document.blobUrl) dans la route de téléchargement protégée) : sans
// cette validation, un client malveillant pourrait soumettre une URL interne
// arbitraire et déclencher une requête SSRF au moment où le Secrétariat ouvre
// le dossier. On n'accepte que de vraies URLs Vercel Blob.
// Stockage « sun-market-documents » privé (04/10/2026) : les fichiers ne sont
// lisibles qu'avec la clé, côté serveur. On n'accepte qu'un lien vers NOTRE
// store privé (identifiant lu dans la clé vercel_blob_rw_<store>_<secret>),
// jamais vers le store d'un tiers (idée reprise de l'audit du 28/09).
function ownStoreId(): string | null {
  const storeId = process.env.BLOB_READ_WRITE_TOKEN?.split("_")[3];
  return storeId ? storeId.toLowerCase() : null;
}

export function isValidBlobUrl(url: unknown): url is string {
  const storeId = ownStoreId();
  if (!storeId || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === `${storeId}.private.blob.vercel-storage.com`;
  } catch {
    return false;
  }
}

export const DOC_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
export const DOC_MAX_BYTES = 10 * 1024 * 1024;
