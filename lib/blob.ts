// Un document est plus tard récupéré côté serveur par le Secrétariat
// (fetch(document.blobUrl) dans la route de téléchargement protégée) : sans
// cette validation, un client malveillant pourrait soumettre une URL interne
// arbitraire et déclencher une requête SSRF au moment où le Secrétariat ouvre
// le dossier. On n'accepte que de vraies URLs Vercel Blob.
export function isValidBlobUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export const DOC_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
export const DOC_MAX_BYTES = 10 * 1024 * 1024;
