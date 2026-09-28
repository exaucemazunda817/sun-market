@AGENTS.md

# CLAUDE.md — Site SUN Market (SUN Capital)

Contexte projet, lu automatiquement par Claude Code à chaque session dans ce dossier.
Mazunda est prestataire externe pour ce site — il pilote sans coder lui-même. Documents
source (business plan, cahier des charges, charte graphique) dans `/Volumes/Storage/Rush/`,
non copiés dans le dépôt.

## Le projet
SUN Market, plateforme fintech de SUN Capital SARL (Kinshasa/Gombe) : marché financier
simplifié (émission/achat d'actions et obligations), trading avec gestion sous mandat +
formations, conseil fiscal/administratif par abonnement pour les PME/TPE. Cahier des
charges explicite : « site simple, professionnel et évolutif » pour le lancement — ce
premier build est donc une **plateforme de collecte de dossiers avec back-office de
revue**, pas un moteur de trading/matching réel (voir plan `flickering-brewing-wolf.md`
dans `~/.claude/plans/` pour le détail des décisions).

⚠️ Point de vigilance juridique signalé à Mazunda (non traité ici, domaine de son
expertise) : l'émission/achat de titres et le trading sous mandat sont typiquement des
activités réglementées par un régulateur financier en RDC.

## Stack
- Next.js 16 (App Router) + TypeScript + React 19 + Tailwind v4
- Prisma 7 (adaptateur Neon, `prisma.config.ts`) + PostgreSQL (Neon, projet `sun-market`,
  id `lively-poetry-89924629`, org "Exaucé")
- Vercel Blob pour l'upload de documents
- Polices **Inter + Space Grotesk** en remplacement temporaire de Gotham/Neco (charte
  graphique) : aucun fichier de police fourni, et Gotham nécessite une licence web payante
  (Hoefler & Co., ~150-500$+). À remplacer si Mazunda fournit les vraies polices sous
  licence — voir `app/layout.tsx`.
- Logo : `public/brand/sun-market-logo.jpg`, recadré depuis `logos sun market.jpg`
  (fond navy inclus dans l'image, pas de version transparente demandée).

## Skills GitHub installées (premier projet à les utiliser, voir mémoire
`proactively-suggest-vetted-skill-repos.md`)
Copiées manuellement dans `.claude/skills/` (pas via `/plugin`, indisponible en session non
interactive) après audit de sécurité complet — voir `.claude/skills/SOURCES.md`.

## Design — passe du 27/09/2026 (skills `modern-web-design`, `animated-component-libraries`, `design-pro-moderne`)
Demande de Mazunda : appliquer au site tous les skills de design disponibles. Textes
**inchangés** (seuls quelques surtitres de navigation ajoutés : « Ce que nous faisons »,
« Le principe », « Notre méthode », « Abonnement », etc.) — mise en page seulement.
- **Jetons** dans `app/globals.css` (déclinaisons de la charte : `sun-navy-50/100`,
  `sun-orange-50/100`, `sun-surface`, `sun-line`, `sun-muted`, `sun-on-navy`), titres fluides
  `text-display` (40→64 px) et `text-hero` (34→52 px), ombres `--shadow-card(-hover)`. Pas de
  couleur en dur dans les composants.
- **Texte orange sur fond clair** : toujours `text-sun-orange-text` (#c2490f, 4,9:1). L'orange
  de la charte (#ef5f18) ne fait que 3,3:1 sur blanc — **point signalé, non tranché** : les
  boutons pleins gardent du texte blanc sur l'orange de la charte (3,3:1, sous le seuil AA
  pour du petit texte). À décider avec SUN Capital (orange plus sombre, ou texte marine).
- **Composants partagés** `components/ui.tsx` : `btn` (primary / outlineLight / outlineNavy,
  44 px min.), `Eyebrow`, `SectionHeading`, `CheckList` (coches, remplace les puces rondes),
  `Steps` (frise numérotée reliée), `SunRings` (soleil levant, rappel du nom SUN, rotation de
  120 s coupée avec « Réduire les animations »), `PageHero` (bandeau marine commun aux pages
  intérieures — avant, elles commençaient par un simple titre sur blanc).
- Le soleil de `PageHero` n'apparaît qu'à partir de `lg` (sur téléphone il passait sous le
  titre) ; celui du bandeau final de l'accueil à partir de `md` (il chevauchait l'adresse).
- **Accueil** : titre avec « deux besoins » en orange, soleil entouré des trois services
  (liens), cartes de services avec icône, schéma Entreprises → plateforme ← Investisseurs.
- **`Reveal` corrigé** : l'ancien filet révélait tout après 2,5 s (effet invisible en
  défilant, même bug que gospel-nation). Désormais : révélé à l'arrivée à l'écran, vérifié
  aussi à chaque défilement (bloc dépassé = révélé), aucun filet global.
- Lien « Aller au contenu » (premier Tab), contour de focus orange visible partout.
- Vérifié à 390 / 1024 / 1440 px : aucun débordement horizontal, `next build` OK (pages
  publiques toujours statiques).

## Photos des bandeaux (28/09/2026)
Cinq images envoyées par Mazunda dans le chat (ses noms de fichiers se sont perdus à
l'envoi, répartition confirmée par lui) → `public/images/` : `accueil.jpg` (haut de
l'accueil), `financement.jpg` (Marché financier), `trading.jpg`, `conseil-fiscal.jpg`,
`a-propos.jpg` (photo principale À propos).
- **Petites images (598 à 736 px de large)** : affichées dans un cadre (`FramedPhoto`,
  `components/ui.tsx`) à droite du titre du bandeau, près de leur taille réelle, plutôt
  qu'en fond plein écran où elles seraient floues. Sous le texte sur téléphone. Si des
  versions plus grandes arrivent, remplacer le fichier **sous un nouveau nom** (cache).
- Le soleil décoratif passe en petit derrière le cadre quand il y a une photo ; l'accueil
  garde les trois services en pastilles autour de la photo (grand écran seulement).
- **À vérifier avec Mazunda** : droits d'utilisation de ces images (banques d'images /
  web ?) ; la photo À propos porte des textes américains (« SBA Loans », « Business
  Funding Solutions ») ; celle de l'accueil est verte, hors charte marine/orange.

## Modèle de données
Un seul modèle `Dossier` (+ `Document`) pour les 4 types de demandes (émission entreprise,
investisseur, formation trading, conseil fiscal) plutôt que des modèles séparés — reste
simple et extensible. `RateLimitAttempt` reprend le pattern e-classe-rdc
(`lib/rate-limit.ts`), base de données plutôt que compteur en mémoire (fiable en
serverless).

## Espace Secrétariat (admin)
Reprend exactement le pattern HMAC d'abg-rdc/gospel-nation, simplifié à un seul rôle (pas
de Clerk/NextAuth) :
- `lib/session.ts` — cookie `sm_secretariat_session`, secret `SESSION_SECRET`, mot de passe
  `SECRETARIAT_PASSWORD`.
- `proxy.ts` — protège **à la fois** les pages ET les routes API (`/secretariat/:path*` et
  `/api/secretariat/:path*`) — leçon retenue du bug historique d'abg-rdc où seules les
  pages étaient protégées au départ.
- Rate limiting sur la connexion (5 tentatives / 10 min par IP) — absent sur
  abg-rdc/gospel-nation à ce jour, mais explicitement exigé par le CLAUDE.md global de
  Mazunda pour toute app touchant à l'authentification/aux données sensibles, d'autant
  plus justifié ici (plateforme financière).

## Sécurité des documents uploadés
Les documents (bilans, états financiers...) sont uploadés en direct navigateur → Vercel
Blob, mais leur URL **n'est jamais exposée côté client** — une route protégée
(`app/api/secretariat/dossiers/[id]/document/[docId]/route.ts`) va chercher le fichier
côté serveur et le streame, une fois la session Secrétariat vérifiée. **Point de sécurité
important corrigé pendant le build** : la route de soumission de dossier (`POST
/api/dossiers`) validait au départ n'importe quelle `blobUrl` envoyée par le client — un
attaquant aurait pu y placer une URL interne arbitraire, provoquant une requête SSRF côté
serveur au moment où le Secrétariat ouvre le document. Corrigé en n'acceptant que des URLs
se terminant par `.public.blob.vercel-storage.com`. Rate limiting également ajouté sur la
soumission de dossiers et l'upload (anti-spam).

## Pièges rencontrés
- **`/secretariat` pré-rendue statique au build** : la page liste les dossiers via Prisma
  sans paramètre de route dynamique, donc Next tentait de la générer une fois pour toutes
  au build (requête exécutée contre Neon à la compilation, liste figée en production).
  Corrigé avec `export const dynamic = "force-dynamic"`.
- **`id`/`name` dupliqués entre deux formulaires sur la même page** (`/marche-financier`
  a deux `<DossierForm>` avec les mêmes noms de champs) : cassait l'association
  label↔champ du deuxième formulaire. Corrigé avec `useId()` pour préfixer chaque `id`
  par instance de formulaire.
- **Turbopack détecte un `package-lock.json` parasite** dans `/Users/mazunda/` (hors de ce
  projet) — `turbopack.root` fixé explicitement dans `next.config.ts`.
- Dépendance `ws` oubliée à l'install initiale (nécessaire au driver Neon en Node.js) —
  ajoutée après coup, penser à l'inclure d'emblée sur un futur projet Prisma+Neon.

## Reste à faire
- Contenu réel de la page À propos (vision/mission/valeurs/équipe/positionnement),
  actuellement `[À COMPLÉTER]` — rien dans les documents source ne les détaille au-delà du
  crédo.
- Vrais fichiers de police Gotham/Neco sous licence web, si Mazunda les obtient.
- PDF du modèle de contrat de gestion sous mandat à déposer dans `public/documents/`
  (lien déjà posé sur la page Trading).
- `BLOB_READ_WRITE_TOKEN` à configurer (Vercel Blob store à créer/rattacher).
- Nom de domaine + déploiement Vercel (le vrai domaine `sun-capitalsarl.com` existe déjà
  côté SUN Capital, à vérifier avant de le pointer).
- Créer le premier vrai `SECRETARIAT_PASSWORD` de production (actuellement un mot de passe
  de test en local, jamais affiché dans le chat).
