// Libellés du Secrétariat (statuts et types de dossiers).
export const TYPE_LABELS: Record<string, string> = {
  ENTREPRISE_EMISSION: "Demande d'émission",
  INVESTISSEUR: "Investisseur",
  FORMATION_TRADING: "Académie de trading",
  CONSEIL_FISCAL: "Abonnement conseil fiscal",
};

/** Étape affichée en pilule (maquette 12) : point orange = en cours, violet = fait, lavande = refusé. */
export const STEP: Record<string, { label: string; dot: string }> = {
  PENDING: { label: "En analyse", dot: "#EF5F18" },
  VALIDATED: { label: "Validé", dot: "#261A66" },
  REJECTED: { label: "Refusé", dot: "#C9C3F0" },
};

export const TITRE_LABELS: Record<string, string> = { ACTIONS: "Actions", OBLIGATIONS: "Obligations" };

export const fmtDate = (d: Date | null | undefined) =>
  d ? d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Kinshasa" }) : "—";
