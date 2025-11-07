# Guide de Configuration GitHub

Ce guide vous explique comment publier ce plugin sur GitHub avec GitHub Pages pour le rendre accessible via URL.

---

## 📋 Prérequis

- ✅ Compte GitHub (gratuit)
- ✅ Git installé localement
- ✅ Plugin buildé (dist/plugin.js)

---

## 🚀 Étapes de Publication

### Étape 1 : Créer le Repository GitHub

1. Aller sur **https://github.com/new**

2. Remplir les informations :
   ```
   Repository name: zyllio-plugin-markdown-editor
   Description: A rich text editor plugin for Zyllio Studio based on TipTap
   Visibility: ☑ Public (requis pour GitHub Pages gratuit)

   ⚠️ NE PAS initialiser avec :
   ❌ README (nous en avons déjà un)
   ❌ .gitignore (nous en avons déjà un)
   ❌ License (nous en avons déjà une)
   ```

3. Cliquer sur **"Create repository"**

4. **Copier l'URL du repository**, par exemple :
   ```
   https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor.git
   ```

---

### Étape 2 : Lier le Repository Local

Dans votre terminal :

```bash
cd "/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor"

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor.git

# Vérifier
git remote -v
```

---

### Étape 3 : Préparer les Fichiers

Le repository est déjà initialisé. Vérifions les fichiers :

```bash
# Voir les fichiers qui seront commités
git status

# Ajouter tous les fichiers
git add .

# Créer le commit initial
git commit -m "Initial commit: Zyllio Markdown Editor Plugin v1.0.0

Features:
- Rich text editor based on TipTap
- Auto-save to Zyllio database
- 15+ formatting options
- Responsive design
- Full documentation"
```

---

### Étape 4 : Pousser sur GitHub

```bash
# Pousser vers GitHub
git push -u origin main
```

**Résultat attendu :**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor.git
 * [new branch]      main -> main
```

---

### Étape 5 : Configurer GitHub Pages

#### 5.1 Via l'Interface GitHub

1. Aller sur votre repository : `https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor`

2. Cliquer sur **"Settings"** (en haut à droite)

3. Dans la barre latérale gauche, cliquer sur **"Pages"**

4. Dans la section **"Build and deployment"** :
   ```
   Source: GitHub Actions
   ```

5. **C'est tout !** Le workflow `.github/workflows/deploy.yml` va :
   - Détecter automatiquement le push
   - Installer les dépendances
   - Builder le plugin
   - Déployer sur GitHub Pages

#### 5.2 Vérifier le Déploiement

1. Aller dans l'onglet **"Actions"** de votre repository

2. Vous verrez le workflow **"Deploy to GitHub Pages"** en cours

3. Attendre qu'il soit vert ✅ (environ 1-2 minutes)

4. Une fois terminé, le plugin sera accessible à :
   ```
   https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
   ```

---

## ✅ Vérification

### Test 1 : Repository Public

```bash
# Ouvrir le repository dans le navigateur
open https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor
```

Vous devriez voir :
- ✅ Tous vos fichiers
- ✅ README_GITHUB.md affiché
- ✅ Badge vert "Public"

### Test 2 : GitHub Pages Active

```bash
# Ouvrir la page GitHub Pages
open https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
```

Vous devriez voir :
- ✅ Le contenu JavaScript du plugin
- ✅ Pas de 404

### Test 3 : Dans Zyllio Studio

1. Ouvrir Zyllio Studio
2. Designer → Plugins → Add Plugin
3. Entrer l'URL :
   ```
   https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
   ```
4. ✅ Le plugin se charge

---

## 🔄 Workflow de Mise à Jour

Quand vous modifiez le code :

```bash
# 1. Modifier le code
# Éditer src/component.ts, src/styles.css, etc.

# 2. Rebuilder localement (optionnel)
npm run build

# 3. Commiter les changements
git add .
git commit -m "Update: Description des changements"

# 4. Pousser sur GitHub
git push

# 5. Attendre le déploiement automatique (1-2 min)
# Le workflow GitHub Actions rebuildera et redéploiera
```

**Le plugin sera automatiquement mis à jour à la même URL !**

---

## 📝 Personnalisation du README

Le fichier `README_GITHUB.md` sera affiché sur GitHub. Pensez à :

1. **Remplacer `YOUR_USERNAME`** par votre vrai username GitHub

2. Mettre à jour les URLs :
   ```markdown
   # Avant
   https://YOUR_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js

   # Après
   https://jeromeblin.github.io/zyllio-plugin-markdown-editor/plugin.js
   ```

3. Renommer le fichier pour qu'il soit affiché :
   ```bash
   mv README.md README_FULL.md
   mv README_GITHUB.md README.md
   git add .
   git commit -m "Update README for GitHub"
   git push
   ```

---

## 🎨 Badges (Optionnel)

Ajouter des badges au README :

```markdown
![Build](https://github.com/VOTRE_USERNAME/zyllio-plugin-markdown-editor/actions/workflows/deploy.yml/badge.svg)
![GitHub release](https://img.shields.io/github/v/release/VOTRE_USERNAME/zyllio-plugin-markdown-editor)
![GitHub stars](https://img.shields.io/github/stars/VOTRE_USERNAME/zyllio-plugin-markdown-editor)
```

---

## 🏷️ Releases (Optionnel)

Pour créer une release :

```bash
# Créer un tag
git tag -a v1.0.0 -m "Release v1.0.0: Initial release"

# Pousser le tag
git push origin v1.0.0
```

Puis sur GitHub :
1. Aller dans **"Releases"**
2. Cliquer **"Create a new release"**
3. Sélectionner le tag `v1.0.0`
4. Ajouter des notes de release
5. Publier

---

## 🐛 Dépannage

### Le workflow GitHub Actions échoue

**Vérifier :**

1. **package-lock.json** existe :
   ```bash
   # S'il n'existe pas, le générer
   npm install
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```

2. **Permissions GitHub Actions** :
   - Settings → Actions → General
   - Workflow permissions → ☑ "Read and write permissions"

3. **Pages activées** :
   - Settings → Pages
   - Source: "GitHub Actions"

### Le plugin ne se charge pas dans Zyllio

**Vérifier :**

1. **URL correcte** :
   ```
   https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
   ```

2. **GitHub Pages déployé** :
   - Vérifier l'onglet Actions (workflow vert ✅)
   - Tester l'URL dans le navigateur (doit afficher du JS)

3. **CORS** :
   - GitHub Pages active CORS automatiquement
   - Pas de configuration nécessaire

### 404 sur l'URL du plugin

**Solutions :**

1. Attendre 1-2 minutes après le déploiement

2. Vérifier que le workflow a terminé :
   ```
   Repository → Actions → Dernier workflow → ✅
   ```

3. Essayer de rafraîchir la page :
   ```bash
   # Forcer le rafraîchissement
   Cmd + Shift + R (Mac)
   Ctrl + Shift + R (Windows)
   ```

---

## 📊 Structure Finale du Repository

```
zyllio-plugin-markdown-editor/
├── .github/
│   └── workflows/
│       └── deploy.yml          # ✅ Workflow de déploiement
├── dist/
│   └── plugin.js               # ✅ Généré par le build
├── src/
│   ├── component.ts
│   ├── metadata.ts
│   ├── icons.ts
│   ├── styles.css
│   └── index.ts
├── README.md                   # ✅ Affiché sur GitHub
├── README_FULL.md              # Documentation complète
├── QUICKSTART.md
├── TECHNICAL_NOTES.md
├── TESTING.md
├── START_HERE.md
├── GITHUB_SETUP.md             # Ce fichier
├── package.json
├── tsconfig.json
├── webpack.config.js
├── .gitignore
└── LICENSE
```

---

## ✅ Checklist Finale

Avant de publier :

- [ ] Repository créé sur GitHub
- [ ] Remote origin configuré
- [ ] Commit initial créé
- [ ] Push vers GitHub réussi
- [ ] GitHub Actions configuré (Settings → Pages)
- [ ] Workflow exécuté avec succès (onglet Actions)
- [ ] URL du plugin accessible : `https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js`
- [ ] Plugin testé dans Zyllio Studio
- [ ] README mis à jour avec votre username
- [ ] LICENSE présent

---

## 🎉 Félicitations !

Votre plugin est maintenant :
- ✅ Hébergé sur GitHub
- ✅ Versionné avec Git
- ✅ Accessible via URL publique
- ✅ Déployé automatiquement via GitHub Actions
- ✅ Prêt à être partagé avec la communauté Zyllio !

---

**URL finale du plugin :**
```
https://VOTRE_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
```

**Utilisez cette URL dans Zyllio Studio pour installer le plugin ! 🚀**
