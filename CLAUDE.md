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

## Refonte du 04/10/2026 (paquet design_handoff_sun_market)
Le site suit désormais **à l'identique** le paquet de design fourni par Mazunda
(`design/`, non versionné : maquettes `.dc.html`, planches, cahier des charges PDF).
En cas d'écart, le cahier des charges fait foi, puis les maquettes.
- **CSS natif**, plus de Tailwind. Styles des maquettes recopiés tels quels via
  `s(\`…\`)` (`lib/css.ts`, convertit une chaîne CSS en style React) ; survols,
  points de rupture et états initiaux des animations dans `app/globals.css`.
- Polices : Montserrat 600/700 + Source Sans 3 (next/font). Logos HD détourés
  dans `public/brand/` depuis le logo officiel envoyé par Mazunda.
- Trois gabarits racine : `app/(fr)`, `app/(en)/en` (balise lang correcte), `app/(admin)`.
  Pages dans `components/pages/*Page.tsx`, chacune FR + EN.
- Animations : `components/sun/Motion.tsx` (3 niveaux complet/allégé/réduit posés
  avant affichage par `lib/motion-script.ts`, tout visible sans JavaScript).
- Contenus « à fournir » centralisés dans `lib/content.ts` (null = « [à fournir] »).
- Actualités : un fichier Markdown par article dans `content/actualites/` (voir son README).
- Travail du 26/09 (comptes membres, catalogue, investissements) abandonné le 04/10 à la
  demande de Mazunda (branche d'archive supprimée). Ses tables restent dans la base.

## Base de données : NE JAMAIS lancer `prisma db push`
La base contient aussi les tables du travail abandonné du 26/09 ; Prisma proposerait de les
supprimer. Les changements de schéma se font par SQL additif (`prisma/sql/`).

## Stack
- Next.js 16 (App Router) + TypeScript + React 19, CSS natif
- Prisma 7 (adaptateur Neon) + PostgreSQL (Neon, projet `sun-market`, id `lively-poetry-89924629`)
- Vercel Blob **privé** `sun-market-documents` (région Paris) pour les documents des dossiers ; lecture uniquement côté serveur avec la clé. `marked` pour les articles

## Espace Secrétariat
Session HMAC (`lib/session.ts`), identifiant + mot de passe (`SECRETARIAT_IDENTIFIANT`,
`SECRETARIAT_PASSWORD`), expiration après 30 min d'inactivité (renouvelée par `proxy.ts`
à chaque requête). `proxy.ts` protège pages ET routes API. Pages : dossiers, fiche
dossier (validation/refus), messages du formulaire de contact.

## Sécurité
- Documents jamais servis par leur URL de stockage : route protégée qui les streame.
- URLs Blob revérifiées (anti-SSRF) à l'enregistrement et au téléchargement.
- Limitation de débit (base) sur connexion, dépôts, abonnements, contact, envois de fichiers.
- En-têtes : X-Frame-Options DENY, nosniff, Referrer-Policy (`next.config.ts`).

## Reste à faire (au 04/10/2026)
- (Fait le 04/10) `prisma/sql/2026-10-04-refonte.sql` appliqué à la base de production.
- (Fait le 04/10) Vercel : `SECRETARIAT_IDENTIFIANT=secretariat`, `NEXT_PUBLIC_SITE_URL`, stockage Blob privé relié.
- Contenus SUN : RCCM/Id. Nat./NIF, prix (fiscal, académie), coordonnées bancaires, chiffres
  réels datés, photos d'équipe, textes des articles, coordonnées GPS, logo SVG, photos HD.
- Paiement en ligne (agrégateur Mobile Money) : `onlinePaymentEnabled` dans `lib/content.ts`.

## Ancien « Reste à faire » (avant refonte)
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
