# Actualités SUN Market

Un fichier `.md` par article et par langue (`fr-…md`, `en-…md`). En-tête entre `---` :

- `slug` : adresse de l'article (identique en FR et en EN)
- `lang` : fr ou en
- `title`, `summary` : titre et chapeau
- `category` : education | fiscalite | trading | sunmarket
- `date` : AAAA-MM-JJ (vide = pas encore publié)
- `readMinutes` : durée de lecture
- `image` : chemin dans /public (vide = cadre photo provisoire), `imageNote` : sujet de la photo attendue
- `order` : position dans la liste (tant que les articles ne sont pas datés)
- `featured` : true pour l'article « À la une »
- `risk` : true si l'article parle d'investissement (ajoute l'encadré de risque)

Le texte de l'article suit l'en-tête, en Markdown. **Un article n'est cliquable
que s'il a une date et un texte.** Les fichiers ci-dessous reprennent les titres
des maquettes : leurs textes sont à rédiger et à faire valider par SUN Capital.
