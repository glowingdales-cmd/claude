# Flowbase — Landing page SaaS

Landing page statique (HTML/CSS/JS, sans dépendance de build) pour un produit
SaaS fictif de gestion de travail d'équipe. Conçue autour d'un système de
design cohérent plutôt que de styles ad hoc par section.

## Aperçu

Ouvrez `index.html` directement dans un navigateur, ou servez le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
index.html        Structure sémantique de la page (nav, hero, features,
                   how-it-works, testimonials, pricing, FAQ, CTA, footer)
css/styles.css     Design system (tokens) + composants
js/main.js         Menu mobile, toggle mensuel/annuel, reveal au scroll
```

## Système de design

### Couleurs

Palette indigo/émeraude sur fond neutre légèrement violet, choisie pour se
démarquer du bleu générique tout en restant lisible et professionnelle.
Toutes les couleurs de composants passent par des **tokens sémantiques**
(`--color-*`) définis dans `:root`, eux-mêmes dérivés de primitives
(`--indigo-*`, `--emerald-*`, `--ink-*`) — aucune couleur brute n'est codée
en dur dans un composant.

| Rôle | Token | Valeur |
|---|---|---|
| Marque / actions principales | `--color-primary` | `#5B4FE8` |
| Survol marque | `--color-primary-hover` | `#4A3FCC` |
| Accent / succès / signaux positifs | `--color-accent` | `#10B981` |
| Fond de page | `--color-bg` | `#FCFBFF` |
| Surface (cartes) | `--color-surface` | `#FFFFFF` |
| Texte principal | `--color-text` | `#191534` |
| Texte secondaire | `--color-text-muted` | `#635E85` |
| Bordure | `--color-border` | `#E7E4F7` |

Contraste vérifié ≥ 4.5:1 pour le texte de corps et les libellés de bouton
sur leurs fonds respectifs (texte foncé sur fond clair, texte blanc sur
`--color-primary`).

### Typographie

Deux polices Google Fonts, chacune avec un rôle fixe :

- **Outfit** (`--font-display`) — titres, boutons, badges, éléments de marque.
  Géométrique et distinctive, pour donner du caractère aux points d'accroche.
- **Work Sans** (`--font-body`) — texte courant, très lisible en paragraphes longs.

Échelle de type à ratio ~1.25, base 16px (`--text-xs` → `--text-4xl`),
définie une seule fois et réutilisée partout — aucune taille de police en
dur dans les composants.

### Espacement, rayons, ombres

Échelle d'espacement en base 4px (`--space-1` à `--space-32`), rayons
harmonisés (`--radius-sm/md/lg/full`) et trois niveaux d'ombre
(`--shadow-sm/md/lg`) pour une hiérarchie de profondeur cohérente entre
cartes, boutons et éléments flottants.

## Accessibilité & qualité

- Zones cliquables ≥ 44px de hauteur (`.btn`, `.nav-toggle`).
- `:focus-visible` visible sur tous les éléments interactifs.
- FAQ en `<details>/<summary>` natif (clavier et lecteur d'écran sans JS).
- Icônes SVG (pas d'emoji) avec `aria-hidden` quand décoratives.
- `prefers-reduced-motion` respecté (anime désactivées, contenu visible directement).
- Responsive testé pour 375px, 768px, 1024px, 1440px.
