// Données de SUN Capital SARL affichées sur le site.
// Règle (cahier des charges §1 et §18) : rien d'inventé. Tant qu'une donnée
// n'a pas été fournie par SUN Capital, elle vaut null et le site affiche
// « [à fournir] » à sa place.

export const legal = {
  raisonSociale: "SUN Capital SARL",
  forme: "Société à responsabilité limitée (SARL)",
  rccm: null as string | null,
  idNat: null as string | null,
  nif: null as string | null,
  email: "suncapitalsarl@gmail.com",
};

/** Date d'arrêt des chiffres d'impact (format libre, ex. « 30 septembre 2026 »). */
export const impactDate: string | null = null;

/** Chiffres d'impact de l'accueil. Valeurs d'exemple reprises des maquettes :
 *  isSample: true affiche la mention « à titre d'exemple ». À remplacer par
 *  les chiffres réels et datés de SUN Capital avant la mise en ligne publique. */
export const impact = {
  isSample: true,
  values: [64, 18, 420, 1250] as [number, number, number, number],
};

/** Prix de l'abonnement conseil fiscal, en USD par mois (null = « [montant] »). */
export const fiscalPriceUsd: number | null = null;

/** Coordonnées bancaires pour le virement (null = « [à fournir] »). */
export const bank = { banque: null as string | null, compte: null as string | null };

/** Paiement en ligne (Mobile Money / carte) branché sur un agrégateur ?
 *  Tant que non, l'abonnement est envoyé comme demande et le Secrétariat
 *  rappelle le client pour encaisser (aucun faux écran de paiement). */
export const onlinePaymentEnabled = false;

/** Académie de trading : durée (en semaines) et prix en USD (null = à fournir). */
export const academy = { weeks: null as number | null, priceUsd: null as number | null };

/** Date de mise à jour de la page Cadre et transparence (null = « [date] »). */
export const legalUpdatedAt: string | null = null;
