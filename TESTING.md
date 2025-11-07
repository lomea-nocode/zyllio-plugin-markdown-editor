# Guide de Test - Markdown Editor Plugin

Ce guide vous explique comment tester le plugin dans différentes configurations.

---

## 🚀 Méthode 1 : Test Standalone avec test.html (Rapide)

**Avantages :** Rapide, pas besoin de Zyllio, teste l'UI et les fonctionnalités de base
**Limitations :** Ne teste pas la sauvegarde en base de données

### Étapes :

```bash
# 1. Builder le plugin
cd "/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor"
npm install
npm run build

# 2. Ouvrir test.html dans votre navigateur
open test.html
```

### Ce que vous pouvez tester :

✅ Toolbar (tous les boutons)
✅ Formatage du texte (gras, italique, barré, code)
✅ Titres (H1, H2, H3)
✅ Listes (puces et numérotées)
✅ Liens (popup pour URL)
✅ Citations
✅ Undo/Redo
✅ Méthodes publiques (getContent, setContent)
✅ Raccourcis markdown (`**texte**`, `# `, etc.)

❌ Auto-save (désactivé en mode standalone)
❌ Chargement depuis BD
❌ Intégration avec dictionnaire Zyllio

### Utilisation des boutons de test :

1. **"Obtenir le contenu HTML"** : Affiche le HTML généré
2. **"Définir du contenu test"** : Remplit l'éditeur avec du contenu exemple
3. **"Vider l'éditeur"** : Réinitialise l'éditeur

---

## 🎯 Méthode 2 : Test dans Zyllio Studio (Complet)

**Avantages :** Test complet avec toutes les fonctionnalités (y compris la BD)
**Limitations :** Nécessite Zyllio Studio configuré

### Étapes :

#### 1. Builder le plugin

```bash
cd "/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor"
npm install
npm run build
```

Le fichier `dist/plugin.js` est maintenant prêt.

#### 2. Créer une table de test

Dans Zyllio Studio, créer une table :

```
Nom : test_editor
Champs :
  - id (auto-generated)
  - title (text) - Optionnel
  - content (long text) ← IMPORTANT
  - created_at (date) - Optionnel
```

#### 3. Charger le plugin

1. Ouvrir Zyllio Studio
2. Aller dans **Designer** → **Plugins**
3. Cliquer sur **"Add Plugin"**
4. Sélectionner : `/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor/dist/plugin.js`
5. Vérifier le message de succès dans la console

#### 4. Créer un écran de test

**Écran simple :**

1. Créer un nouvel écran "Test Editor"
2. Ajouter le composant **"Markdown Editor"** (catégorie Forms)
3. Configurer :

```
Properties:
  ✓ Table ID: "test_editor"
  ✓ Row ID: "" (vide pour créer automatiquement)
  ✓ Field ID: "content"
  ✓ Placeholder: "Testez l'éditeur..."
  ✓ Auto-save: true
  ✓ Save Delay: 1000

Styles:
  ✓ Width: 100%
  ✓ Height: 500px
  ✓ Border Radius: 8px
```

**Écran avec édition d'entrée existante :**

1. Créer un écran avec :
   - Liste des articles (List component)
   - Au clic sur un article → Navigate vers écran d'édition avec `article_id`
   - Écran d'édition avec Markdown Editor

2. Configurer l'éditeur :
```
Properties:
  ✓ Table ID: "test_editor"
  ✓ Row ID: "{{article_id}}" ← Variable du dictionnaire
  ✓ Field ID: "content"
  ✓ Auto-save: true
```

#### 5. Lancer les tests

1. Cliquer sur **Preview** / **Run**
2. Tester toutes les fonctionnalités (voir checklist ci-dessous)

---

## ✅ Checklist de Test Complète

### Interface Utilisateur

- [ ] La toolbar s'affiche correctement
- [ ] Tous les boutons (12) sont visibles
- [ ] Les séparateurs (4) sont présents
- [ ] Le placeholder s'affiche quand l'éditeur est vide
- [ ] L'éditeur a la bonne taille (width/height)
- [ ] Le design est responsive (tester sur mobile)

### Formatage de Texte

- [ ] **Gras** : Cliquer sur B ou Ctrl/Cmd + B
  - Le texte sélectionné devient gras
  - Le bouton B devient bleu (actif)
- [ ] **Italique** : Cliquer sur I ou Ctrl/Cmd + I
  - Le texte devient italique
  - Le bouton I devient bleu
- [ ] **Barré** : Cliquer sur le bouton barré
  - Le texte est barré
  - Le bouton devient bleu
- [ ] **Code inline** : Cliquer sur `</>`
  - Le texte a un fond gris avec police monospace
  - Le bouton devient bleu

### Titres

- [ ] **H1** : Cliquer sur H1
  - Le paragraphe devient un titre niveau 1 (très grand)
  - Le bouton H1 devient bleu
- [ ] **H2** : Cliquer sur H2
  - Le paragraphe devient un titre niveau 2
- [ ] **H3** : Cliquer sur H3
  - Le paragraphe devient un titre niveau 3
- [ ] Cliquer à nouveau désactive le titre (retour en paragraphe)

### Listes

- [ ] **Liste à puces** : Cliquer sur le bouton liste
  - Une liste à puces est créée
  - Presser Entrée crée un nouvel élément
  - Le formatage est conservé dans les éléments
- [ ] **Liste numérotée** : Cliquer sur le bouton liste numérotée
  - Une liste numérotée est créée (1, 2, 3...)
  - Les numéros s'incrémentent automatiquement

### Liens

- [ ] **Créer un lien** :
  - Sélectionner du texte
  - Cliquer sur le bouton lien
  - Une popup apparaît demandant l'URL
  - Entrer une URL (ex: https://zyllio.com)
  - Le texte devient un lien bleu souligné
- [ ] **Éditer un lien** :
  - Placer le curseur dans un lien
  - Cliquer sur le bouton lien
  - La popup affiche l'URL actuelle
  - Modifier et valider
- [ ] **Supprimer un lien** :
  - Placer le curseur dans un lien
  - Cliquer sur le bouton lien
  - Laisser le champ vide et valider

### Citations et Autres

- [ ] **Blockquote** : Cliquer sur le bouton quote
  - Le paragraphe devient une citation avec bordure gauche
  - Le texte est en italique grisé

### Historique

- [ ] **Undo** : Cliquer sur ↶ ou Ctrl/Cmd + Z
  - La dernière action est annulée
  - Le bouton est désactivé quand il n'y a rien à annuler
- [ ] **Redo** : Cliquer sur ↷ ou Ctrl/Cmd + Shift + Z
  - L'action annulée est rétablie
  - Le bouton est désactivé quand il n'y a rien à rétablir

### Raccourcis Markdown

- [ ] Taper `**texte**` puis espace → Le texte devient gras
- [ ] Taper `*texte*` puis espace → Le texte devient italique
- [ ] Taper `# ` → Le paragraphe devient H1
- [ ] Taper `## ` → Le paragraphe devient H2
- [ ] Taper `### ` → Le paragraphe devient H3

### États des Boutons

- [ ] Les boutons s'activent (bleu) quand le format est appliqué
- [ ] Les boutons se désactivent (gris) quand l'action n'est pas possible
- [ ] Le hover change la couleur de fond

### Persistance (Test Zyllio uniquement)

- [ ] **Sauvegarde automatique** :
  - Taper du texte
  - Observer "Saving..." en bas à droite
  - Après 1 seconde, voir "Saved" en vert
  - Vérifier dans la table que le contenu est sauvegardé
- [ ] **Création de nouvelle entrée** :
  - Configurer `rowid` vide
  - Taper du contenu
  - Une nouvelle ligne est créée dans la table
  - Le rowid est automatiquement mis à jour
- [ ] **Édition d'entrée existante** :
  - Configurer `rowid` avec un ID valide
  - L'éditeur charge le contenu existant
  - Les modifications mettent à jour la ligne
- [ ] **Pas de sauvegarde si inchangé** :
  - Charger un contenu
  - Ne rien modifier
  - Pas de "Saving..." affiché

### Gestion d'Erreurs

- [ ] **Table inexistante** :
  - Configurer un `tableid` invalide
  - Vérifier le message d'erreur dans la console
  - L'indicateur affiche "Error saving"
- [ ] **Row inexistante** :
  - Configurer un `rowid` invalide
  - Vérifier que l'éditeur reste vide
  - Pas d'erreur bloquante

### Performance

- [ ] L'éditeur se charge en moins de 500ms
- [ ] Pas de lag lors de la frappe
- [ ] Les boutons répondent instantanément
- [ ] L'auto-save ne ralentit pas l'édition

### Responsive

- [ ] Desktop (>1024px) : Toolbar sur une ligne
- [ ] Tablet (768-1024px) : Toolbar reste lisible
- [ ] Mobile (<768px) : Toolbar se réorganise, boutons plus petits

---

## 🔧 Méthode 3 : Test en Mode Développement

Pour itérer rapidement pendant le développement :

### Terminal 1 : Mode Watch

```bash
cd "/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor"
npm run dev
```

Le plugin sera rebuilder à chaque modification de fichier.

### Terminal 2 : Serveur Local (optionnel)

```bash
npm run serve
```

Utiliser `http://localhost:8080/plugin.js` dans Zyllio.

### Workflow :

1. Modifier le code source (component.ts, styles.css, etc.)
2. Le build se lance automatiquement (terminal 1)
3. Dans Zyllio Studio :
   - Remove le plugin
   - Add le plugin (recharger dist/plugin.js ou l'URL)
4. Tester les modifications
5. Répéter

---

## 🐛 Debugging

### Ouvrir la Console du Navigateur

Dans Zyllio Studio (ou le navigateur de test) :
- **Chrome/Edge** : F12 ou Cmd+Option+I (Mac)
- **Firefox** : F12 ou Cmd+Option+K (Mac)
- **Safari** : Cmd+Option+C (Mac, après activation dans Préférences)

### Logs Importants

Le plugin affiche des logs utiles :

```javascript
// Au chargement
"Markdown Editor Plugin loaded successfully"

// Lors de la sauvegarde
"=== SAVE START ==="
"Table: test_editor"
"Row: abc123"
"Content length: 234"
"✅ Save successful"
"=== SAVE END ==="

// En cas d'erreur
"❌ Error saving content: [détails]"
```

### Vérifier l'État du Composant

Dans la console :

```javascript
// Récupérer le composant
const editor = document.querySelector('markdown-editor');

// Obtenir le contenu
editor.getContent();

// Vérifier l'instance TipTap
editor.editor;

// Voir l'état
editor.editor.state;
```

### Problèmes Courants

**Le plugin ne se charge pas :**
```bash
# Solution 1 : Rebuilder
npm run clean
npm run build

# Solution 2 : Vérifier les erreurs
# Ouvrir la console et chercher les erreurs en rouge
```

**La toolbar ne s'affiche pas :**
- Vérifier que styles.css est bien importé dans component.ts
- Vérifier les erreurs CSS dans la console
- Tester avec test.html pour isoler le problème

**La sauvegarde ne fonctionne pas :**
- Vérifier que tableid, rowid, fieldid sont corrects
- Vérifier que la table existe dans Zyllio
- Vérifier la console pour les erreurs de l'API Storage
- Tester avec autosave: false et observer les logs

**Les boutons ne répondent pas :**
- Vérifier que les event listeners sont bien attachés
- Vérifier dans createToolbar() que les boutons ont bien action()
- Tester updateToolbarState() manuellement

---

## 📊 Tests de Cas d'Usage Réels

### Cas 1 : Blog Personnel

**Setup :**
- Table : `blog_posts` (id, title, content, published_at)
- Écran liste des articles
- Écran édition avec Markdown Editor

**Test :**
1. Créer un nouvel article
2. Écrire un long contenu avec images, titres, listes
3. Vérifier l'auto-save
4. Recharger la page → Vérifier que le contenu est toujours là
5. Publier l'article

### Cas 2 : Système de Notes

**Setup :**
- Table : `notes` (id, title, body, folder_id)
- Navigation rapide entre notes
- Markdown Editor avec savedelay court (500ms)

**Test :**
1. Créer plusieurs notes
2. Passer rapidement d'une note à l'autre
3. Vérifier que chaque note charge son contenu
4. Vérifier que les modifications sont sauvegardées

### Cas 3 : Documentation Wiki

**Setup :**
- Table : `wiki_pages` (id, slug, content, version)
- Éditeur avec formatage riche
- Gestion des liens internes

**Test :**
1. Créer une page de documentation
2. Utiliser tous les formats (titres, listes, citations, code)
3. Ajouter des liens vers d'autres pages
4. Vérifier le rendu HTML final

---

## ✅ Critères de Succès

Le plugin est prêt pour la production si :

- [ ] Tous les tests de la checklist passent
- [ ] Aucune erreur dans la console
- [ ] Auto-save fonctionne dans Zyllio
- [ ] Performance acceptable (pas de lag)
- [ ] Responsive sur mobile
- [ ] Gestion d'erreurs robuste
- [ ] Documentation claire

---

## 📝 Rapport de Test Template

Utilisez ce template pour documenter vos tests :

```markdown
# Rapport de Test - Markdown Editor Plugin

**Date :** [Date]
**Version :** 1.0.0
**Testeur :** [Nom]
**Environnement :** [Zyllio Studio version / Navigateur]

## Résumé
- Tests passés : XX/XX
- Bugs trouvés : XX
- Critiques : XX
- Mineurs : XX

## Détails

### Test 1 : Interface Utilisateur
- [ ] Passé / [ ] Échoué
- Commentaires : ...

### Test 2 : Formatage
- [ ] Passé / [ ] Échoué
- Commentaires : ...

[...]

## Bugs Identifiés

### Bug #1 : [Titre]
- **Sévérité :** Critique / Majeur / Mineur
- **Description :** ...
- **Reproduction :** ...
- **Capture d'écran :** [lien]

## Recommandations

1. ...
2. ...

## Conclusion

✅ Prêt pour la production / ⚠️ Nécessite corrections
```

---

## 🚀 Prochaines Étapes Après les Tests

Si tous les tests passent :

1. ✅ Tag une version release : `git tag v1.0.0`
2. ✅ Créer un build optimisé : `npm run build`
3. ✅ Déployer sur un serveur (optionnel) pour héberger le plugin.js
4. ✅ Distribuer le plugin à votre équipe
5. ✅ Documenter les bugs connus (si applicable)
6. ✅ Planifier les améliorations futures

---

**Happy Testing! 🧪✨**
