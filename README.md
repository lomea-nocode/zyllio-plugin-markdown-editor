# Zyllio Markdown Editor Plugin

Un éditeur de texte riche (rich text editor) basé sur TipTap pour Zyllio Studio, inspiré du composant minimal-tiptap de shadcn. Permet d'éditer du contenu HTML avec une interface intuitive et de le sauvegarder automatiquement dans une base de données Zyllio.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Zyllio SDK](https://img.shields.io/badge/Zyllio_SDK-2.x-green)

## Fonctionnalités

### Formatage de Texte
- **Gras** (Ctrl/Cmd + B)
- *Italique* (Ctrl/Cmd + I)
- ~~Barré~~
- `Code inline`

### Structure du Contenu
- **Titres** : H1, H2, H3
- **Listes** : À puces et numérotées
- **Citations** : Blockquotes
- **Liens** : Hyperliens avec gestion de l'URL

### Fonctionnalités Avancées
- ✅ **Historique** : Undo/Redo complet
- 💾 **Sauvegarde automatique** : Enregistrement automatique dans la base de données avec debouncing
- 📊 **Indicateur de sauvegarde** : Retour visuel (Saving... / Saved / Error)
- 🎨 **Interface moderne** : Toolbar intuitive avec boutons actifs/inactifs
- 📱 **Responsive** : S'adapte aux différentes tailles d'écran

## Installation

### Prérequis
- Node.js 20+
- Zyllio Studio

### 1. Cloner ou télécharger le projet

```bash
git clone <repository-url>
cd zyllio-plugin-markdown-editor
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Builder le plugin

```bash
npm run build
```

Le fichier `dist/plugin.js` sera généré.

### 4. Installer dans Zyllio Studio

1. Ouvrir Zyllio Studio
2. Aller dans **Designer** → **Plugins**
3. Cliquer sur **Add Plugin**
4. Charger le fichier `dist/plugin.js` ou fournir l'URL hébergée

## Configuration

### Propriétés du Composant

| Propriété | Type | Description | Défaut |
|-----------|------|-------------|--------|
| `content` | text | Contenu HTML initial à afficher | `""` |
| `tableid` | text | ID de la table pour stocker le contenu | `""` |
| `rowid` | text | ID de la ligne à mettre à jour (vide = créer nouvelle ligne) | `""` |
| `fieldid` | text | ID du champ/colonne où sauvegarder le contenu | `"content"` |
| `placeholder` | text | Texte affiché quand l'éditeur est vide | `"Start typing..."` |
| `autosave` | boolean | Activer la sauvegarde automatique | `true` |
| `savedelay` | number | Délai en ms avant sauvegarde (debounce) | `1000` |

### Propriétés de Style

| Style | Description | Défaut |
|-------|-------------|--------|
| `width` | Largeur du composant | `100%` |
| `height` | Hauteur du composant | `400px` |
| `border-radius` | Rayon des coins | `8px` |
| `border-color` | Couleur de la bordure | `#e5e7eb` |
| `border-width` | Épaisseur de la bordure | `1px` |
| `background-color` | Couleur de fond | `#ffffff` |

## Usage

### Configuration de la Base de Données

Créer une table dans Zyllio avec au minimum un champ pour stocker le contenu HTML :

```
Table: articles
├── id (auto)
├── content (text/long text)
├── title (text)
└── created_at (date)
```

### Exemple 1 : Éditeur Simple avec Sauvegarde

```
Composant: Markdown Editor
Properties:
  - tableid: "articles"
  - rowid: "{{current_article_id}}"
  - fieldid: "content"
  - placeholder: "Écrivez votre article..."
  - autosave: true
  - savedelay: 1500
```

### Exemple 2 : Éditeur pour Nouvelle Entrée

Laisser `rowid` vide pour créer automatiquement une nouvelle ligne :

```
Composant: Markdown Editor
Properties:
  - tableid: "articles"
  - rowid: ""
  - fieldid: "content"
  - autosave: true
```

Le plugin créera automatiquement une nouvelle ligne et mettra à jour `rowid` avec l'ID généré.

### Exemple 3 : Éditeur Sans Sauvegarde Auto

```
Composant: Markdown Editor
Properties:
  - content: "{{article_content}}"
  - autosave: false
```

Utilisez la méthode `getContent()` pour récupérer le contenu manuellement et créez une action de sauvegarde personnalisée.

## Architecture Technique

### Technologies Utilisées

- **TipTap** : Framework d'édition riche extensible basé sur ProseMirror
  - `@tiptap/core` : Cœur de TipTap
  - `@tiptap/starter-kit` : Extensions de base (formatage, listes, etc.)
  - `@tiptap/extension-link` : Gestion des liens hypertextes
- **TypeScript** : Type safety et meilleure DX
- **Webpack** : Bundling et build
- **CSS personnalisé** : Styling moderne sans dépendances

### Structure des Fichiers

```
zyllio-plugin-markdown-editor/
├── src/
│   ├── index.ts              # Point d'entrée et enregistrement
│   ├── component.ts          # Implémentation du composant
│   ├── metadata.ts           # Métadonnées Zyllio
│   ├── icons.ts             # Icônes SVG
│   └── styles.css           # Styles CSS
├── dist/
│   └── plugin.js            # Fichier généré
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

### Cycle de Vie du Composant

1. **Initialisation** (`connectedCallback`)
   - Récupération des propriétés
   - Chargement du contenu depuis la BD (si `tableid` et `rowid` fournis)
   - Création de l'interface (toolbar + éditeur)
   - Initialisation de TipTap

2. **Édition**
   - L'utilisateur édite le contenu
   - Les boutons de la toolbar reflètent l'état actif
   - L'événement `onUpdate` est déclenché

3. **Sauvegarde**
   - Debouncing avec délai configurable
   - Indicateur visuel du statut
   - Sauvegarde dans la BD via Storage API

4. **Nettoyage** (`disconnectedCallback`)
   - Destruction de l'éditeur TipTap
   - Annulation des timeouts en cours

## API du Composant

### Méthodes Publiques

```typescript
// Obtenir le contenu HTML actuel
const content = editorComponent.getContent();

// Définir le contenu HTML
editorComponent.setContent('<p>Nouveau contenu</p>');
```

### Événements

Le composant utilise le système de callback de TipTap :
- `onUpdate` : Déclenché à chaque modification du contenu

## Développement

### Mode Développement avec Watch

```bash
npm run dev
```

Le plugin sera rebuilder automatiquement à chaque modification.

### Scripts Disponibles

```bash
npm run build    # Build de production
npm run dev      # Build de développement avec watch
npm run clean    # Nettoyer le dossier dist
```

### Personnalisation

#### Ajouter de Nouvelles Extensions TipTap

Modifier `src/component.ts` :

```typescript
import CustomExtension from '@tiptap/extension-custom';

this.editor = new Editor({
  extensions: [
    StarterKit,
    Link,
    CustomExtension.configure({
      // options
    }),
  ],
  // ...
});
```

#### Ajouter des Boutons à la Toolbar

Modifier la méthode `createToolbar()` dans `src/component.ts` :

```typescript
const buttons = [
  // ... boutons existants
  {
    icon: 'myIcon',
    action: () => this.editor?.chain().focus().myCommand().run(),
    isActive: () => this.editor?.isActive('myMark')
  },
];
```

Ajouter l'icône dans `src/icons.ts` :

```typescript
export const icons = {
  // ... icônes existantes
  myIcon: `<svg>...</svg>`,
};
```

## Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| Ctrl/Cmd + B | Gras |
| Ctrl/Cmd + I | Italique |
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Shift + Z | Redo |
| `**text**` | Gras (markdown shortcut) |
| `*text*` | Italique (markdown shortcut) |
| `# ` | H1 (markdown shortcut) |
| `## ` | H2 (markdown shortcut) |
| `### ` | H3 (markdown shortcut) |

## Dépannage

### Le plugin ne se charge pas

1. Vérifier que le fichier `dist/plugin.js` existe
2. Vérifier la console pour les erreurs
3. S'assurer que la version du SDK Zyllio est compatible

### La sauvegarde ne fonctionne pas

1. Vérifier que `tableid` est bien défini
2. Vérifier que la table existe dans Zyllio
3. Vérifier que le champ `fieldid` existe dans la table
4. Consulter la console pour les erreurs de l'API Storage

### Les styles ne s'appliquent pas

1. Vérifier que `styles.css` est bien importé dans `component.ts`
2. Vérifier que webpack est configuré pour charger les CSS (css-loader + style-loader)

## Compatibilité

- **Zyllio SDK** : 2.x
- **TipTap** : 2.1.13+
- **Navigateurs** : Tous les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- **Appareils** : Desktop et Mobile (responsive)

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## Licence

MIT License - voir le fichier LICENSE pour plus de détails

## Auteur

Créé avec ❤️ pour la communauté Zyllio

## Liens Utiles

- [Zyllio SDK Documentation](https://github.com/zyllio/zyllio-sdk)
- [TipTap Documentation](https://tiptap.dev/)
- [Shadcn minimal-tiptap](https://www.shadcn.io/components/forms/minimal-tiptap)
- [Zyllio Website](https://www.zyllio.com)

## Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter : contact@zyllio.com
- Twitter/X : @zyllio
