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
// Présentation, mission, vision et « Notre approche » : texte de la page À
// propos transmis par Mazunda le 26/09/2026 (repris mot pour mot). Équipe et
// positionnement restent non fournis.
export const aPropos = {
  presentationSubtitle:
    "Une plateforme au service de l'investissement, du trading et de la gestion fiscale.",
  presentationIntro: [
    "Sun Market est une entreprise financière qui développe des solutions destinées à faciliter l'accès aux opportunités d'investissement, accompagner la gestion du capital et simplifier les démarches fiscales.",
    "Notre ambition est de rapprocher les entreprises, les investisseurs, les traders et les entrepreneurs de solutions financières adaptées à leurs besoins, dans un environnement structuré et professionnel.",
  ],
  activitesIntro: "Notre activité s'articule autour de trois grands services.",
  activites: [
    {
      titre: "Marché financier",
      texte:
        "Nous développons une plateforme de marché financier simplifiée permettant de mettre en relation des entreprises éligibles à la recherche de capitaux et des investisseurs souhaitant acquérir des titres financiers. Les entreprises peuvent, selon leur éligibilité et le cadre applicable, proposer des actions ou des obligations, tandis que les particuliers et les entreprises peuvent accéder à des opportunités d'investissement et analyser les caractéristiques des titres proposés.",
    },
    {
      titre: "Trading",
      texte:
        "Notre service de trading s'adresse aux personnes qui souhaitent participer aux marchés financiers. Nous proposons deux approches : la gestion de capital dans le cadre d'un mandat de gestion formalisé pour les clients qui souhaitent déléguer la gestion de leur capital, et la formation au trading à travers notre académie pour ceux qui souhaitent développer leurs propres compétences et stratégies.",
    },
    {
      titre: "Conseil fiscal",
      texte:
        "Nous accompagnons principalement les entrepreneurs, commerçants et petites activités dans la formalisation, la compréhension et le suivi de leurs obligations fiscales. De la régularisation des situations anciennes à l'identification des dispositifs fiscaux légalement applicables, nous accompagnons nos clients dans leurs démarches auprès des administrations compétentes afin qu'ils puissent se concentrer sur le développement de leur activité.",
    },
  ],
  mission: "Rendre les services financiers et fiscaux plus accessibles, structurés et compréhensibles.",
  vision:
    "Devenir une référence africaine dans la démocratisation de l'accès aux services financiers et à l'accompagnement fiscal.",
  approcheIntro: [
    "Chez Sun Market, nous considérons que l'accès à la finance ne doit pas être réservé à une minorité.",
    "Nous cherchons à construire des solutions qui permettent à chacun de mieux comprendre, gérer et mobiliser ses ressources financières, tout en offrant aux entreprises des moyens supplémentaires de se développer.",
  ],
  approchePrincipes: ["Accessibilité", "Professionnalisme", "Transparence"],
  approcheConclusion:
    "Sun Market se construit ainsi comme un écosystème réunissant financement, investissement, gestion du capital, formation et accompagnement fiscal.",
  equipePlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
  positionnementPlaceholder: "[À COMPLÉTER — à confirmer avec Mazunda]",
};

export const difficulteOperateursEco =
  "Beaucoup de petits opérateurs économiques font face à une multiplication d'agents de l'État " +
  "venant chacun avec une taxe à payer, sans que ces opérateurs comprennent toujours leurs obligations réelles " +
  "— ce qui les expose à des extorsions régulières.";
