# 🚀 START HERE - Markdown Editor Plugin

Bienvenue ! Ce document vous guide pour commencer rapidement.

---

## ⚡ Installation Express (2 minutes)

```bash
# 1. Aller dans le dossier du plugin
cd "/Users/jeromeblinmacmini/Projet code IA/zyllio/zyllio-plugin-markdown-editor"

# 2. Installer les dépendances
npm install

# 3. Builder le plugin
npm run build
```

✅ Le fichier `dist/plugin.js` est maintenant prêt !

---

## 🧪 Test Rapide (Sans Zyllio)

```bash
# Ouvrir test.html dans votre navigateur
open test.html
```

Vous verrez l'éditeur fonctionner avec une toolbar complète.

**Testez :**
- Boutons de formatage (gras, italique, etc.)
- Titres H1, H2, H3
- Listes à puces et numérotées
- Ajout de liens
- Undo/Redo

---

## 🎯 Test Complet (Dans Zyllio Studio)

### Étape 1 : Créer une table

Dans Zyllio Studio :
```
Nom de table: test_articles
Champs:
  - id (auto)
  - content (long text) ← Important !
```

### Étape 2 : Charger le plugin

1. Ouvrir Zyllio Studio
2. **Designer** → **Plugins** → **Add Plugin**
3. Sélectionner : `dist/plugin.js`

### Étape 3 : Utiliser le composant

1. Créer un écran
2. Ajouter **"Markdown Editor"** (catégorie Forms)
3. Configurer :
   - **tableid** : `test_articles`
   - **rowid** : Laisser vide pour créer automatiquement
   - **fieldid** : `content`
4. Lancer et tester !

---

## 📖 Documentation Disponible

| Fichier | Description | Quand l'utiliser |
|---------|-------------|-----------------|
| **START_HERE.md** | Ce fichier - Guide de démarrage | Pour commencer |
| **QUICKSTART.md** | Guide d'installation et usage rapide | Pour installer et configurer |
| **README.md** | Documentation complète | Pour référence complète |
| **TECHNICAL_NOTES.md** | Architecture et détails techniques | Pour développer/personnaliser |
| **TESTING.md** | Guide de test complet | Pour tester toutes les fonctionnalités |

---

## 🛠️ Commandes Utiles

```bash
npm install        # Installer les dépendances
npm run build      # Build de production
npm run dev        # Build avec watch (auto-rebuild)
npm run clean      # Nettoyer dist/
npm run serve      # Serveur local (plugin accessible via URL)
```

---

## ❓ Aide Rapide

### Le plugin ne se charge pas ?
```bash
npm run clean
npm run build
# Puis recharger le plugin dans Zyllio
```

### Erreur de sauvegarde ?
- Vérifier que `tableid` existe dans Zyllio
- Vérifier que `fieldid` est bien un champ de type texte/long texte
- Ouvrir la console pour voir les erreurs détaillées

### Modifier l'apparence ?
Éditer `src/styles.css` puis rebuilder avec `npm run build`

### Ajouter un bouton ?
Voir `TECHNICAL_NOTES.md` section "Ajouter un bouton à la toolbar"

---

## ✨ Fonctionnalités Principales

- ✅ **Formatage riche** : Gras, italique, barré, code
- ✅ **Structure** : Titres H1-H3, listes, citations
- ✅ **Liens** : Hyperliens avec popup d'édition
- ✅ **Historique** : Undo/Redo complet
- ✅ **Auto-save** : Sauvegarde automatique dans la BD Zyllio
- ✅ **Indicateur** : Retour visuel "Saving..." → "Saved"
- ✅ **Raccourcis** : Markdown shortcuts (`**texte**`, `# `, etc.)
- ✅ **Responsive** : S'adapte mobile et desktop

---

## 🎓 Prochaines Étapes

1. ✅ Tester avec `test.html` (rapide)
2. ✅ Tester dans Zyllio Studio (complet)
3. 📖 Lire `QUICKSTART.md` pour des exemples d'usage
4. 🔧 Personnaliser selon vos besoins
5. 🚀 Déployer dans votre app Zyllio

---

## 📞 Support

- **Documentation** : Voir les fichiers .md dans ce dossier
- **Référence SDK Zyllio** : `../ZYLLIO_SDK_REFERENCE.md`
- **Bugs/Questions** : Ouvrir une issue sur GitHub
- **Contact Zyllio** : contact@zyllio.com

---

**Prêt à commencer ? Lancez `npm install && npm run build` ! 🚀**
