// Contenu du site — centralisé ici comme sur abg-rdc/gospel-nation.
// Tout ce qui n'est pas repris mot pour mot des documents fournis par Mazunda
// (business plan + cahier des charges, /Volumes/Storage/Rush/, 17/09/2026) est
// marqué [À COMPLÉTER] : ne jamais transformer un placeholder en contenu
// définitif sans confirmation explicite, il s'agit d'une vraie société financière.

export const company = {
  nomCommercial: "SUN Market",
  raisonSociale: "SUN Capital SARL",
  credo: "La sécurité financière, c'est notre crédo",
  tagline: "Equity & investment marketplace",
  email: "suncapitalsarl@gmail.com",
  telephone: "+243 840 922 275",
  adresse: "5ème Niveau, Immeuble 130B, Avenue Kwango, Kinshasa/Gombe",
  siteWeb: "www.sun-capitalsarl.com",
};

export type ServiceKey = "MARCHE_FINANCIER" | "TRADING" | "CONSEIL_FISCAL";

export const services: Record<
  ServiceKey,
  { titre: string; resume: string; description: string }
> = {
  MARCHE_FINANCIER: {
    titre: "Marché financier simplifié",
    resume: "Mettre en relation entreprises en recherche de financement et investisseurs.",
    description:
      "La plateforme permet aux entreprises éligibles d'émettre des actions et obligations, " +
      "et aux particuliers ou entreprises d'acquérir ces titres. Cible des entreprises émettrices : " +
      "secteur technologique, plus de deux années d'existence, bilans et états financiers disponibles. " +
      "Cible des investisseurs : cadres d'entreprises, investisseurs particuliers, entreprises souhaitant " +
      "investir ou racheter une participation, personnes intéressées par l'acquisition de titres financiers.",
  },
  TRADING: {
    titre: "Trading et formation",
    resume: "Gestion de portefeuille sous mandat, et formations pour apprendre à trader.",
    description:
      "Service de trading pour le compte de particuliers dans le cadre d'un contrat de gestion sous mandat, " +
      "incluant une clause de garantie et de remboursement d'une partie du capital en cas de pertes résultant " +
      "de facteurs dépendant de la volonté ou de la gestion du prestataire, selon les conditions contractuelles. " +
      "Un second volet propose des formations en trading pour les personnes souhaitant apprendre et se perfectionner.",
  },
  CONSEIL_FISCAL: {
    titre: "Conseil fiscal et accompagnement administratif",
    resume: "Un abonnement mensuel pour accompagner les petits opérateurs économiques.",
    description:
      "Accompagnement par abonnement mensuel pour les boutiques, commerces, comptoirs et autres petites " +
      "activités générant suffisamment de revenus pour être régulièrement confrontées aux obligations fiscales " +
      "et administratives : aide à la préparation et au classement des documents, suivi des démarches, " +
      "accompagnement fiscal, rappels d'obligations, assistance dans les relations administratives.",
  },
};

// Vision/mission/valeurs/équipe/positionnement : non détaillés dans les documents
// fournis (business plan + cahier des charges) au-delà du crédo ci-dessus.
export const aPropos = {
  visionPlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
  missionPlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
  valeursPlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
  equipePlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
  positionnementPlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
};

export const difficulteOperateursEco =
  "Beaucoup de petits opérateurs économiques font face à une multiplication d'agents de l'État " +
  "venant chacun avec une taxe à payer, sans que ces opérateurs comprennent toujours leurs obligations réelles " +
  "— ce qui les expose à des extorsions régulières.";
