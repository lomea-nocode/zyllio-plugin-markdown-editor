# Checklist de Publication GitHub

## ✅ Ce qui est déjà fait

- [x] Repository Git initialisé localement
- [x] Tous les fichiers ajoutés au repository
- [x] Commit initial créé avec message descriptif
- [x] Workflow GitHub Actions configuré (`.github/workflows/deploy.yml`)
- [x] Documentation complète créée
- [x] Plugin buildé et testé localement
- [x] .gitignore configuré
- [x] LICENSE (MIT) ajouté

## 📋 À faire maintenant (sur GitHub.com)

### Étape 1 : Créer le Repository GitHub
- [ ] Aller sur https://github.com/new
- [ ] Nom du repository : `zyllio-plugin-markdown-editor`
- [ ] Description : `A rich text editor plugin for Zyllio Studio based on TipTap`
- [ ] Visibilité : **Public** (requis pour GitHub Pages gratuit)
- [ ] **NE PAS** initialiser avec README, .gitignore ou License
- [ ] Cliquer sur "Create repository"
- [ ] Copier l'URL du repository

### Étape 2 : Configurer le Remote
```bash
cd "/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor"
git remote add origin https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor.git
```

### Étape 3 : Push vers GitHub
```bash
git push -u origin main
```

### Étape 4 : Activer GitHub Pages
- [ ] Aller sur le repository GitHub
- [ ] Cliquer sur "Settings"
- [ ] Menu latéral → "Pages"
- [ ] Source : Sélectionner **"GitHub Actions"**
- [ ] Sauvegarder si demandé

### Étape 5 : Vérifier le Déploiement
- [ ] Aller dans l'onglet "Actions"
- [ ] Attendre que le workflow "Deploy to GitHub Pages" soit vert ✅
- [ ] Durée estimée : 1-2 minutes

### Étape 6 : Tester l'URL du Plugin
- [ ] Ouvrir dans un navigateur :
  ```
  https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
  ```
- [ ] Doit afficher du code JavaScript (pas de 404)

### Étape 7 : Tester dans Zyllio Studio
- [ ] Ouvrir Zyllio Studio
- [ ] Designer → Plugins → Add Plugin
- [ ] Entrer l'URL du plugin
- [ ] Vérifier que le composant "Markdown Editor" apparaît

## 📝 Après Publication

### Mettre à jour le README
- [ ] Remplacer `YOUR_USERNAME` par votre vrai username dans README_GITHUB.md
- [ ] Optionnel : Renommer README_GITHUB.md → README.md
- [ ] Commit et push les changements

### Créer une Release (Optionnel)
```bash
git tag -a v1.0.0 -m "Release v1.0.0: Initial release"
git push origin v1.0.0
```

Puis sur GitHub :
- [ ] Aller dans "Releases"
- [ ] "Create a new release"
- [ ] Sélectionner tag v1.0.0
- [ ] Ajouter notes de release
- [ ] Publier

## 🎯 URL Finale du Plugin

Une fois publié, votre plugin sera accessible à :

```
https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
```

**Utilisez cette URL dans Zyllio Studio pour installer le plugin !**

## 🔄 Workflow de Mise à Jour

Pour les futures mises à jour :

```bash
# 1. Modifier le code
vim src/component.ts

# 2. Tester localement
npm run build
open test.html

# 3. Commiter
git add .
git commit -m "Update: Description"

# 4. Pousser
git push

# 5. Attendre le déploiement automatique (1-2 min)
```

Le plugin sera automatiquement rebuilder et redéployer à la même URL !

## 🐛 Problèmes Courants

### Le workflow échoue
- Vérifier que `package-lock.json` existe
- Settings → Actions → General → Permissions : "Read and write"

### 404 sur l'URL du plugin
- Attendre 2-3 minutes après le premier déploiement
- Vérifier que le workflow est terminé (Actions → ✅)
- Vider le cache du navigateur

### Le plugin ne charge pas dans Zyllio
- Ouvrir la console (F12) pour voir les erreurs
- Vérifier l'URL (github.io, pas github.com)
- Tester l'URL dans le navigateur directement

## 📚 Documentation de Référence

- **GITHUB_SETUP.md** - Guide complet étape par étape
- **GITHUB_INSTRUCTIONS.txt** - Guide visuel
- **README.md** - Documentation du plugin
- **QUICKSTART.md** - Guide d'utilisation rapide

## ✅ Statut Final

Une fois tout terminé, vous devriez avoir :

- ✅ Repository public sur GitHub
- ✅ Code versionné avec Git
- ✅ GitHub Pages activé
- ✅ Workflow GitHub Actions fonctionnel
- ✅ Plugin accessible via URL publique
- ✅ Plugin testable dans Zyllio Studio
- ✅ Documentation complète
- ✅ Prêt à partager avec la communauté !

---

**Bon courage pour la publication ! 🚀**

Si vous rencontrez des problèmes, consultez **GITHUB_SETUP.md** pour plus de détails.
