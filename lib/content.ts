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
    // Formules réelles : trimestrielle, semestrielle, annuelle (voir
    // pageContent.conseilFiscal.formules) — aucune formule mensuelle n'est
    // proposée, contrairement à ce qu'affirmait ce résumé avant le 26/09/2026.
    resume: "Un abonnement pour accompagner les petits opérateurs économiques dans leur fiscalité.",
    description:
      "Accompagnement par abonnement pour les boutiques, commerces, comptoirs et autres petites " +
      "activités générant suffisamment de revenus pour être régulièrement confrontées aux obligations fiscales " +
      "et administratives : aide à la préparation et au classement des documents, suivi des démarches, " +
      "accompagnement fiscal, rappels d'obligations, assistance dans les relations administratives.",
  },
};

// Textes des pages Accueil / Financement / Trading / Conseil fiscal, repris
// mot pour mot du dossier de structuration du site fourni par Mazunda
// (« Sun market site.pdf », 26/09/2026 — arborescence, parcours utilisateurs
// et textes des pages). Deux adaptations volontaires par rapport au PDF,
// signalées à Mazunda :
// 1. Le PDF décrit des parcours avec compte investisseur, agenda de
//    rendez-vous, catalogue filtrable et tunnel de souscription — aucune de
//    ces fonctionnalités n'existe sur ce site v1 (collecte de dossiers +
//    back-office Secrétariat, pas de compte utilisateur ni de paiement en
//    ligne). Les boutons correspondants pointent donc vers le formulaire de
//    dépôt de dossier réel de la page, ou vers les coordonnées de contact.
// 2. « Aperçu du catalogue » (2-3 cartes d'exemple d'entreprises) n'a pas été
//    ajouté : ce seraient des dossiers d'entreprises inventés, sur un vrai
//    site financier — à construire plus tard avec de vrais dossiers publiés.
export const pageContent = {
  accueil: {
    heroTitle: "Sun Market, l'entreprise qui rapproche deux besoins",
    heroSubtitle:
      "Financement, trading et fiscalité : trois services pensés pour faire avancer votre activité ou vos capitaux, dans un cadre structuré et accompagné.",
    heroCta: "Découvrir nos services",
    services: [
      {
        titre: "Financement",
        accroche: "Financez votre croissance ou investissez dans des opportunités qualifiées",
        texte:
          "Mise en relation entre entreprises en recherche de capitaux et investisseurs professionnels, en actions ou en obligations.",
        cta: "Explorer le financement",
        href: "/marche-financier",
      },
      {
        titre: "Trading",
        accroche: "Déléguez la gestion. Ou apprenez à trader.",
        texte:
          "Confiez votre capital à une équipe spécialisée dans le cadre d'un contrat notarié, ou formez-vous à l'académie de trading.",
        cta: "Découvrir le trading",
        href: "/trading",
      },
      {
        titre: "Conseil fiscal",
        accroche: "Comprendre, régulariser et suivre votre fiscalité",
        texte:
          "Un accompagnement structuré, de la formalisation de votre activité jusqu'à l'identification des avantages fiscaux auxquels vous avez droit.",
        cta: "Voir l'accompagnement fiscal",
        href: "/conseil-fiscal",
      },
    ],
    coupDoeil: [
      { qui: "Entreprises", besoin: "besoin de capitaux", texte: "financer leur croissance et leurs projets" },
      {
        qui: "Investisseurs professionnels",
        besoin: "recherche d'opportunités",
        texte: "acquérir des titres correspondant à leurs critères",
      },
      { qui: "Notre plateforme", besoin: "facilite la rencontre entre les deux", texte: "" },
    ],
    reassurance: [
      "Des dossiers analysés dans un cadre défini",
      "Un accompagnement à chaque étape",
      "Des contrats formalisés (notariés pour la gestion de capital)",
    ],
    cloture:
      "Votre capital peut être géré. Vos compétences peuvent être développées. Votre décision d'investir vous appartient.",
    bandeauFinalTitre: "Prêt à commencer ?",
  },
  financementInvestisseurs: {
    titre: "Investissez dans les entreprises de demain",
    sousTitre:
      "Accédez à une sélection d'opportunités d'investissement qualifiées — actions ou obligations — et participez au financement d'entreprises en croissance.",
    pourquoi: [
      "Des opportunités vérifiées et analysées avant publication",
      "Un choix entre actions (participation au capital) et obligations (rendement fixe)",
      "Un suivi transparent de votre portefeuille, à tout moment",
    ],
    etapes: [
      {
        titre: "L'entreprise présente son besoin",
        texte: "elle renseigne son activité, sa situation financière et son projet de financement",
      },
      {
        titre: "Les informations sont examinées",
        texte: "la plateforme analyse le dossier et les documents selon ses critères d'éligibilité",
      },
      {
        titre: "Le titre est proposé aux investisseurs",
        texte: "une fois éligible, l'offre est publiée : type de titre, montant recherché, prix d'émission, durée, conditions",
      },
      {
        titre: "Vous étudiez l'opportunité",
        texte: "consultez les informations disponibles et évaluez si l'opération correspond à vos objectifs et critères d'investissement",
      },
      {
        titre: "L'investissement est réalisé",
        texte: "l'acquisition des titres s'effectue selon les conditions et procédures prévues pour l'opération",
      },
    ],
    reassurance: [
      "Dossiers analysés avant publication",
      "Suivi personnalisé de votre investissement",
      "Accompagnement à chaque étape",
    ],
  },
  financementEntreprises: {
    titre: "Financez votre croissance",
    sousTitre:
      "Présentez votre projet à des investisseurs professionnels et obtenez les capitaux nécessaires au développement de votre activité — en actions ou en obligations.",
    pourquoi: [
      "Un accès direct à des investisseurs professionnels qualifiés",
      "Deux types de financement possibles selon votre besoin : actions ou obligations",
      "Un accompagnement structuré, de la présentation du projet jusqu'à la réalisation de l'opération",
    ],
    titresProposables: [
      {
        titre: "Actions",
        texte:
          "Ouvrez une partie de votre capital à de nouveaux investisseurs. L'investisseur devient actionnaire selon sa participation, avec les droits prévus par vos statuts et, le cas échéant, un pacte d'actionnaires.",
      },
      {
        titre: "Obligations",
        texte:
          "Recherchez un financement sous forme d'emprunt. L'investisseur vous prête des fonds selon des conditions définies à l'émission : maturité, rémunération, garanties éventuelles, modalités de remboursement.",
      },
    ],
    etapes: [
      { titre: "Vous présentez votre besoin", texte: "activité, situation financière, projet de financement" },
      { titre: "Vos informations sont examinées par la plateforme", texte: "" },
      { titre: "Si votre dossier est éligible, votre titre est proposé aux investisseurs", texte: "" },
      { titre: "Les investisseurs étudient votre opportunité", texte: "" },
      { titre: "L'investissement est réalisé selon les conditions de l'offre", texte: "" },
    ],
    reassurance: [
      "Un cadre défini et documenté pour votre opération",
      "Une mise en relation avec des investisseurs professionnels, pas de démarchage à l'aveugle",
      "Un accompagnement à chaque étape, de l'analyse jusqu'à la réalisation",
    ],
  },
  trading: {
    titre: "Investir sur les marchés. Déléguer la gestion. Se former.",
    sousTitre:
      "Confiez la gestion de votre capital à une équipe spécialisée, ou apprenez à trader vous-même et développez vos propres compétences.",
    deuxFacons: [
      {
        question: "Vous souhaitez investir sans trader vous-même ?",
        reponse: "Confiez la gestion de votre capital dans le cadre d'un contrat de gestion formalisé",
      },
      {
        question: "Vous souhaitez apprendre à trader vous-même ?",
        reponse: "Rejoignez notre académie et développez progressivement vos compétences",
      },
    ],
    gestion: {
      titre: "Nous tradons pour vous",
      texte:
        "Vous souhaitez investir sur les marchés financiers, mais vous ne disposez pas du temps, de l'expérience ou des connaissances nécessaires ? Confiez votre capital à notre équipe, selon les conditions définies dans un contrat de gestion.",
      contratTitre: "Un contrat de gestion notarié — encadré par un contrat formalisé et notarié précisant notamment :",
      contratPoints: [
        "le montant du capital confié et la durée du mandat",
        "les modalités de gestion et de rémunération",
        "les conditions de suivi, de reporting et de retrait des fonds",
        "les responsabilités de chaque partie, y compris en cas de perte",
      ],
      suiviTitre: "Suivi des performances",
      suiviTexte:
        "Bénéficiez d'un suivi de votre investissement et des résultats de la gestion selon les modalités prévues au contrat.",
    },
    academie: {
      titre: "Apprendre à comprendre et à maîtriser les marchés",
      apprentissage: [
        "Les fondamentaux des marchés financiers et le fonctionnement du trading",
        "L'analyse technique et l'analyse fondamentale",
        "La gestion du risque et la gestion du capital",
        "La psychologie du trader et la discipline",
        "La construction et le test d'une stratégie",
      ],
      objectifTitre: "Notre objectif",
      objectifTexte:
        "Ne pas simplement apprendre à passer des ordres, mais comprendre les mécanismes du marché, mesurer les risques et développer une approche disciplinée.",
    },
    cloture:
      "Votre capital peut être géré. Vos compétences peuvent être développées. Votre décision d'investir vous appartient.",
  },
  conseilFiscal: {
    accroche: "Les agents de l'État viennent vous parler de taxes et d'impôts que vous ne maîtrisez pas ?",
    intro:
      "Lorsqu'on dirige une boutique, un commerce ou une petite activité, la fiscalité peut vite devenir complexe. Taxes, impôts, déclarations, échéances... il n'est pas toujours facile de savoir ce que vous devez réellement payer, à quel moment et selon quelles règles. Une mauvaise compréhension de vos obligations peut entraîner des erreurs, des retards ou des pénalités.",
    positionnement:
      "Nous vous accompagnons dans vos relations et démarches fiscales, en votre compte et, lorsque le mandat le permet, en votre nom — pour que vous puissiez vous concentrer sur votre métier.",
    etapes: [
      { titre: "Formalisation de l'activité", texte: "mise en conformité selon la nature de votre activité" },
      {
        titre: "Mise à niveau de l'entrepreneur",
        texte: "comprendre vos obligations, échéances et documents à conserver",
      },
      {
        titre: "Résolution des anciens litiges fiscaux",
        texte: "régulariser une dette, un contentieux ou un dossier en attente",
      },
      {
        titre: "Défense de vos intérêts et négociation",
        texte: "rechercher les solutions les plus favorables légalement",
      },
      {
        titre: "Identification des exonérations et avantages fiscaux",
        texte: "selon votre secteur et votre situation",
      },
    ],
    niveaux:
      "Des structures administratives locales (maisons communales) jusqu'aux instances fiscales compétentes de niveau supérieur, selon la nature du dossier.",
    formules: [
      { nom: "Trimestriel", pourQui: "Accompagnement régulier sur 3 mois" },
      { nom: "Semestriel", pourQui: "Suivi fiscal sur 6 mois" },
      { nom: "Annuel", pourQui: "Délégation complète du suivi fiscal sur l'année" },
    ],
    cloture: "Votre activité, votre priorité. Votre fiscalité, notre accompagnement.",
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

// ─────────────────────────────────────────────────────────────────────────────
// [À COMPLÉTER] CHIFFRES D'EXEMPLE — INVENTÉS à la demande de Mazunda
// (28/09/2026) pour mettre en place les graphiques ; il les remplacera par les
// vrais chiffres de SUN Capital. Tant que `exemple` vaut true, une étiquette
// « Chiffres d'exemple » s'affiche à côté sur le site. Une fois les vrais
// chiffres saisis : passer `exemple` à false. Volontairement AUCUNE
// performance ni rendement financier (ce serait trompeur pour un investisseur).
// ─────────────────────────────────────────────────────────────────────────────
export const chiffres = {
  exemple: true,
  titre: "SUN Market en chiffres",
  cles: [
    { valeur: 48, suffixe: "", label: "dossiers d'entreprises étudiés" },
    { valeur: 12, suffixe: "", label: "entreprises accompagnées" },
    { valeur: 150, suffixe: "+", label: "investisseurs inscrits" },
    { valeur: 85, suffixe: "", label: "personnes formées à l'académie" },
  ],
  academie: {
    titre: "Personnes formées à l'académie, par trimestre",
    unite: "personnes",
    periodes: [
      { label: "T1 2026", valeur: 12 },
      { label: "T2 2026", valeur: 18 },
      { label: "T3 2026", valeur: 24 },
      { label: "T4 2026", valeur: 31 },
    ],
  },
};
