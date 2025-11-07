# Quick Start Guide - Markdown Editor Plugin

## Installation Rapide

### 1. Installer les dépendances

```bash
cd zyllio-plugin-markdown-editor
npm install
```

### 2. Builder le plugin

```bash
npm run build
```

Le fichier `dist/plugin.js` est maintenant prêt à être utilisé !

## Utilisation dans Zyllio Studio

### Étape 1 : Charger le Plugin

1. Ouvrir **Zyllio Studio**
2. Aller dans **Designer** → **Plugins**
3. Cliquer sur **Add Plugin**
4. Sélectionner le fichier `dist/plugin.js`

### Étape 2 : Préparer la Base de Données

Créer une table pour stocker vos contenus :

```
Table: articles
Champs:
  - id (auto-generated)
  - title (text)
  - content (long text) ← Le champ pour le HTML de l'éditeur
  - created_at (date)
```

### Étape 3 : Ajouter le Composant à un Écran

1. Créer ou ouvrir un écran dans Zyllio Studio
2. Dans la bibliothèque de composants, chercher **"Markdown Editor"** (catégorie Forms)
3. Glisser-déposer sur votre écran

### Étape 4 : Configurer le Composant

**Configuration Simple :**

```
Properties:
  ✓ Table ID: "articles"
  ✓ Row ID: "{{selected_article_id}}"
  ✓ Field ID: "content"
  ✓ Placeholder: "Écrivez votre article..."
  ✓ Auto-save: true
  ✓ Save Delay: 1000

Styles:
  ✓ Width: 100%
  ✓ Height: 500px
```

**Explication :**
- `Table ID` : Le nom de votre table
- `Row ID` : L'ID de la ligne à éditer (utiliser une variable du dictionnaire)
- `Field ID` : Le nom du champ où sauvegarder le HTML
- `Auto-save` : Sauvegarder automatiquement
- `Save Delay` : Attendre 1000ms après la dernière frappe avant de sauvegarder

### Étape 5 : Tester !

1. Lancer l'aperçu de votre app
2. Commencer à taper dans l'éditeur
3. Utiliser les boutons de la toolbar pour formater
4. Observer l'indicateur "Saving..." puis "Saved" en bas à droite
5. Vérifier dans votre table que le contenu est bien sauvegardé

## Exemples de Cas d'Usage

### Cas 1 : Éditeur de Blog

```
Écran: Article Editor
Composants:
  1. Input (title)
  2. Markdown Editor (content)
  3. Button (Publier)

Configuration de l'éditeur:
  - tableid: "blog_posts"
  - rowid: "{{current_post_id}}"
  - fieldid: "content"
  - autosave: true
```

### Cas 2 : Système de Notes

```
Écran: Note Editor
Composants:
  1. List (notes) → au clic charge note_id
  2. Markdown Editor

Configuration de l'éditeur:
  - tableid: "notes"
  - rowid: "{{note_id}}"
  - fieldid: "body"
  - placeholder: "Prenez vos notes..."
  - autosave: true
  - savedelay: 500
```

### Cas 3 : Création de Nouvelle Entrée

```
Écran: New Article
Composants:
  1. Input (title)
  2. Markdown Editor (laissez rowid vide !)
  3. Button (Créer)

Configuration de l'éditeur:
  - tableid: "articles"
  - rowid: "" ← VIDE pour créer automatiquement
  - fieldid: "content"
  - autosave: false ← Désactiver l'auto-save

Action du bouton "Créer":
  1. Créer nouvelle ligne avec title
  2. Récupérer l'ID créé
  3. Mettre à jour rowid de l'éditeur
  4. Sauvegarder le contenu de l'éditeur
```

## Fonctionnalités Disponibles

### Formatage
- **Gras** : Cliquer sur B ou Ctrl/Cmd + B
- **Italique** : Cliquer sur I ou Ctrl/Cmd + I
- **Barré** : Cliquer sur l'icône barrée
- **Code** : Cliquer sur l'icône `<>`

### Titres
- **H1** : Titre principal
- **H2** : Sous-titre
- **H3** : Titre de section

### Listes
- **Liste à puces** : Créer des listes non ordonnées
- **Liste numérotée** : Créer des listes ordonnées

### Autres
- **Lien** : Créer un lien hypertexte (popup pour l'URL)
- **Citation** : Ajouter une blockquote
- **Undo/Redo** : Annuler/Refaire les actions

### Raccourcis Markdown
Taper ces séquences directement dans l'éditeur :

- `**texte**` → **texte** (gras)
- `*texte*` → *texte* (italique)
- `# ` → Titre H1
- `## ` → Titre H2
- `### ` → Titre H3

## Dépannage Rapide

### ❌ "Le plugin ne se charge pas"

**Solution :**
1. Vérifier que `dist/plugin.js` existe
2. Rebuilder : `npm run build`
3. Recharger le plugin dans Zyllio Studio

### ❌ "La sauvegarde ne fonctionne pas"

**Solutions :**
1. Vérifier que `tableid` correspond bien au nom de votre table
2. Vérifier que `fieldid` correspond à un champ de type texte/long texte
3. Vérifier que `rowid` est bien renseigné avec un ID valide
4. Ouvrir la console pour voir les erreurs détaillées

### ❌ "Erreur au build"

**Solution :**
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### ❌ "L'éditeur est vide alors qu'il y a du contenu"

**Solutions :**
1. Vérifier que `rowid` est bien la bonne valeur
2. Vérifier que le champ `fieldid` contient bien du HTML
3. Essayer de recharger l'écran

## Développement et Personnalisation

### Mode Watch (développement)

```bash
npm run dev
```

Les changements seront automatiquement recompilés.

### Ajouter un Bouton à la Toolbar

Éditer `src/component.ts`, méthode `createToolbar()` :

```typescript
const buttons = [
  // ... boutons existants ...
  {
    icon: 'monIcone',
    action: () => this.editor?.chain().focus().maCommande().run(),
    isActive: () => this.editor?.isActive('monMark')
  },
];
```

Ajouter l'icône dans `src/icons.ts`.

### Modifier les Styles

Éditer `src/styles.css` pour personnaliser l'apparence.

## Support

- **Documentation complète** : Voir `README.md`
- **Référence SDK Zyllio** : Voir `../ZYLLIO_SDK_REFERENCE.md`
- **Issues** : Ouvrir une issue sur GitHub
- **Contact Zyllio** : contact@zyllio.com

## Checklist Avant de Commencer

- [ ] Node.js 20+ installé
- [ ] Zyllio Studio ouvert
- [ ] Table de base de données créée
- [ ] Champ de type "long text" pour stocker le HTML
- [ ] Plugin buildé (`npm run build`)
- [ ] Plugin chargé dans Zyllio Studio
- [ ] Composant ajouté à un écran
- [ ] Properties configurées (tableid, rowid, fieldid)

**Vous êtes prêt à utiliser l'éditeur ! 🎉**
