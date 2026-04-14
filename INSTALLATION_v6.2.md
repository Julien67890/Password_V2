# 🎮 MOT DE PASSE v6.2 FINAL - INSTALLATION

## ✨ FICHIERS GÉNÉRÉS (8 fichiers)

### 📦 Téléchargez ces fichiers :

1. **script_v6.2_final.js** → Renommez en `script.js`
   - Jeu complet avec 219 mots simplifiés
   - Tous les bugs corrigés
   - Mode classique (sans IA)

2. **script_llama_v6.2.js** → Gardez ce nom
   - Intégration Llama 3.2
   - Contexte amélioré avec exemples
   - Validation stricte des réponses

3. **index_llama.html** → Renommez en `index.html`
   - Interface avec toggle Llama
   - SDK WebLLM intégré

4. **style.css** - Inchangé

5. **manifest.json** - Configuration PWA

6. **sw.js** - Service Worker

7. **icon.jpg** - Logo

8. **README_LLAMA.md** - Documentation complète

---

## 🚀 INSTALLATION RAPIDE

### Étape 1 : Télécharger

Téléchargez les 8 fichiers dans un même dossier

### Étape 2 : Renommer

```
index_llama.html    → index.html
script_v6.2_final.js → script.js
```

Gardez `script_llama_v6.2.js` tel quel

### Étape 3 : Créer les icônes PNG

1. Allez sur https://www.iloveimg.com/fr/convertir-en-png
2. Uploadez `icon.jpg`
3. Convertissez et redimensionnez :
   - 192×192px → `icon-192.png`
   - 512×512px → `icon-512.png`

### Étape 4 : Ouvrir

Double-cliquez sur `index.html` ou ouvrez avec Chrome/Edge

---

## 📊 CONTENU

### Mots par thème (219 mots simplifiés)

- 🌍 **Géographie** : 47 mots (PARIS, TOKYO, CANADA, etc.)
- 🎬 **Divertissement** : 24 mots (CINÉMA, DISNEY, NETFLIX, etc.)
- 🏛️ **Histoire** : 13 mots (CÉSAR, NAPOLÉON, PYRAMIDE, etc.)
- 🎨 **Arts & Littérature** : 31 mots (MOZART, PICASSO, HUGO, etc.)
- 🔬 **Sciences & Nature** : 48 mots (ADN, DARWIN, GALAXIE, etc.)
- ⚽ **Sports & Loisirs** : 56 mots (FOOTBALL, TENNIS, YOGA, etc.)

**Total : 219 mots** (tous simples et jouables)

Chaque mot a 10 associations de qualité.

---

## 🐛 BUGS CORRIGÉS

### ✅ Bug 1 : Affichage résultats
**Avant** : Affichait SYMBIOSE, ESPÈCE au lieu des vrais mots
**Après** : Affiche les mots corrects du thème joué

### ✅ Bug 2 : IA incohérente
**Avant** : Proposait PYONGYANG pour TORONTO
**Après** : Force le choix parmi la liste avec numéros

### ✅ Bug 3 : Confusion pays/ville
**Avant** : Proposait TURQUIE au lieu d'ISTANBUL
**Après** : Contexte avec exemples de différenciation

### ✅ Bug 4 : Mots complexes
**Avant** : PHOTOSYNTHÈSE, MICRO-ORGANISME
**Après** : Tous les mots sont simples (<12 lettres)

---

## 🧠 LLAMA 3.2 (OPTIONNEL)

### Activer l'IA locale

1. Ouvrez le jeu dans Chrome ou Edge
2. Dans les paramètres, activez "🧠 Llama 3.2"
3. **Première fois** : Téléchargement ~1.2 GB (5-10 min)
4. Barre de progression affichée
5. Une fois chargé : Prêt !

### Configuration requise

- ✅ Chrome 113+ ou Edge 113+
- ✅ WebGPU activé
- ✅ GPU moderne (Intel HD 630+, Apple M1+, GTX 1060+)
- ✅ 4 GB RAM minimum
- ✅ 2 GB d'espace disque

### Vérifier compatibilité

Ouvrez la console (F12) et tapez :
```javascript
navigator.gpu !== undefined
```
Si `true` → Compatible ✅

### Performances

| Métrique | Mode Classique | Llama 3.2 |
|----------|---------------|-----------|
| Téléchargement | 0 MB | 1.2 GB (1×) |
| Premier indice | Instant | 3-5s |
| Indices suivants | Instant | 1-2s |
| RAM | <100 MB | 2-4 GB |
| Qualité IA | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 DIFFÉRENCES MODES

### Mode Classique (sans Llama)

**Mot : PARIS**
- Indices : capitale, france, tour, eiffel, seine...
- Ordre fixe, prédéfini
- Instantané

### Mode Llama 3.2

**Mot : PARIS**
- Indices : capitale européenne, france, monument de fer, fleuve seine...
- Adapté au contexte, progressif
- 1-3 secondes par indice

---

## ✅ TESTS À FAIRE

### Test 1 : Affichage résultats
1. Jouez une manche
2. Passez tous les mots
3. ✅ Les mots affichés doivent correspondre au thème joué

### Test 2 : Cohérence IA (mode Llama)
1. Mot secret : PARIS
2. Donnez indices : "capitale", "france"
3. ✅ L'IA doit proposer PARIS ou ville française
4. ❌ L'IA ne doit PAS proposer CANADA, TURQUIE

### Test 3 : Différenciation types
1. Mot secret : ISTANBUL
2. Donnez indices : "ville", "turquie"
3. ✅ L'IA doit proposer ISTANBUL
4. ❌ L'IA ne doit PAS proposer TURQUIE (pays)

---

## 🔧 DÉPANNAGE

### Problème : Les thèmes ne s'affichent pas

**Solution** :
- Videz le cache (CTRL+SHIFT+DELETE)
- Rechargez la page (F5)

### Problème : Le jeu se termine immédiatement

**Solution** :
- Vérifiez que `script.js` fait bien ~70 KB
- Si plus petit, re-téléchargez `script_v6.2_final.js`

### Problème : "WebGPU non supporté"

**Solution** :
- Utilisez Chrome ou Edge (pas Firefox/Safari)
- Vérifiez que votre GPU est récent (2016+)

### Problème : Llama ne charge pas

**Solution** :
- Vérifiez votre connexion internet (1.2 GB)
- Assurez-vous d'avoir 2 GB d'espace disque
- Fermez les autres onglets (libérer RAM)

---

## 📱 INSTALLATION MOBILE

### iOS (Safari)
❌ Llama 3.2 non compatible (WebGPU pas supporté)
✅ Mode classique fonctionne parfaitement

### Android (Chrome)
✅ Llama 3.2 fonctionne sur smartphones récents
- Recommandé : 6 GB RAM+
- GPU moderne requis

---

## 📄 STRUCTURE DES FICHIERS

```
mon-jeu/
├── index.html (renommé depuis index_llama.html)
├── script.js (renommé depuis script_v6.2_final.js)
├── script_llama_v6.2.js
├── style.css
├── manifest.json
├── sw.js
├── icon.jpg
├── icon-192.png (à créer)
└── icon-512.png (à créer)
```

---

## 🎉 C'EST PRÊT !

Le jeu fonctionne en deux modes :

**Mode 1 : Classique** (par défaut)
- Rapide, léger
- Fonctionne partout
- 219 mots de qualité

**Mode 2 : Llama 3.2** (optionnel)
- IA intelligente
- Contexte adaptatif
- Réponses cohérentes

Choisissez selon votre appareil ! 🚀

---

**Version** : 6.2 FINAL  
**Date** : Avril 2026  
**Mots** : 219 simplifiés  
**Associations** : 2,190 de qualité  
**Bugs** : Tous corrigés ✅
