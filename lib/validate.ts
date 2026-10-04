// Validations partagées navigateur / serveur (cahier §6).

/** Téléphone RDC : retire les non-chiffres, le préfixe 243 ou 0, exige 9 chiffres. */
export function normalizeDrcPhone(v: string): string | null {
  const d = v.replace(/\D/g, "").replace(/^243/, "").replace(/^0/, "");
  return d.length === 9 ? `+243${d}` : null;
}

export const phoneError = (v: string, lang: "fr" | "en" = "fr") =>
  normalizeDrcPhone(v) ? "" : lang === "en" ? "Incomplete number: 9 digits after +243." : "Numéro incomplet : 9 chiffres après +243.";

/** Montant saisi avec séparateurs → chiffres seuls. */
export const digitsOnly = (v: string) => v.replace(/\D/g, "");

export const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
