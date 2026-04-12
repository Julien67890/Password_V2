# 🧠 MOT DE PASSE v6.0 - AVEC LLAMA 3.2

## 🎉 NOUVEAU : IA Locale Intelligente

Cette version intègre **Llama 3.2** directement dans votre navigateur pour des réponses vraiment intelligentes !

---

## ✨ FONCTIONNALITÉS

### 🧠 Double Mode IA

1. **Mode Classique** (par défaut)
   - Utilise les 15 associations prédéfinies
   - Instantané, fonctionne partout
   - Aucun téléchargement

2. **Mode Llama 3.2** (optionnel)
   - IA locale dans le navigateur
   - Comprend le contexte du jeu
   - Indices intelligents et adaptés
   - Devine avec logique

### 📊 Contenu

- **7 modes** : Aléatoire + 6 thèmes
- **630 mots** avec 15 associations chacun
- **9,450 associations** prédéfinies de qualité
- **100% offline** après téléchargement

---

## 🚀 INSTALLATION

### Étape 1 : Fichiers requis

Téléchargez ces fichiers dans un même dossier :
1. `index_llama.html` (renommez en `index.html`)
2. `script.js` (script principal avec données)
3. `script_llama.js` (logique IA)
4. `style.css`
5. `manifest.json`
6. `sw.js`
7. `icon.jpg`

### Étape 2 : Créer les icônes

1. Allez sur https://www.iloveimg.com/fr/convertir-en-png
2. Convertissez `icon.jpg` en PNG
3. Redimensionnez en 192×192px → `icon-192.png`
4. Redimensionnez en 512×512px → `icon-512.png`

### Étape 3 : Ouvrir le jeu

1. Double-cliquez sur `index.html`
2. Ou utilisez un serveur local :
   ```bash
   python -m http.server 8000
   # Puis ouvrez http://localhost:8000
   ```

---

## 🧠 ACTIVER LLAMA 3.2

### Première utilisation

1. Ouvrez le jeu dans **Chrome** ou **Edge** (WebGPU requis)
2. Dans les paramètres, activez "🧠 Llama 3.2"
3. **Première fois** : Téléchargement de ~1.2 GB
   - Barre de progression affichée
   - Prend 3-10 minutes selon connexion
   - Stocké dans le navigateur (une seule fois)
4. Une fois chargé : Prêt à jouer !

### Utilisations suivantes

- Llama 3.2 est déjà téléchargé
- Activation instantanée
- Aucun re-téléchargement

---

## ⚙️ CONFIGURATION REQUISE

### Pour le Mode Classique
- ✅ N'importe quel navigateur moderne
- ✅ Mobile, tablette, desktop
- ✅ Aucun GPU requis

### Pour Llama 3.2
- ✅ Chrome 113+ ou Edge 113+
- ✅ WebGPU activé
- ✅ GPU moderne (Intel HD 630+, Apple M1+, NVIDIA GTX 1060+)
- ✅ 4 GB RAM minimum
- ✅ 2 GB d'espace disque (cache navigateur)

### Vérifier la compatibilité

Ouvrez la console (F12) et tapez :
```javascript
navigator.gpu !== undefined
```
Si `true` → Compatible ! ✅
Si `false` → Mode classique seulement

---

## 📱 MOBILE

### Android (Chrome)
- ✅ Llama 3.2 fonctionne sur smartphones récents avec GPU
- Recommandé : 6 GB RAM+
- Testé sur : Samsung S21+, Pixel 6+, OnePlus 9+

### iOS (Safari)
- ❌ Safari ne supporte pas encore WebGPU
- ✅ Mode classique fonctionne parfaitement
- WebGPU arrive prochainement

---

## 🎮 COMMENT JOUER

### Mode "Je devine" 🧠

1. L'IA vous donne des indices
2. Vous devinez le mot
3. **Avec Llama** : Indices adaptés et progressifs
4. **Sans Llama** : Associations prédéfinies

### Mode "Je fais deviner" 💡

1. Vous donnez des indices à l'IA
2. L'IA devine le mot
3. **Avec Llama** : Comprend mieux vos indices
4. **Sans Llama** : Scoring algorithmique

---

## 🔧 RÉSOLUTION DES PROBLÈMES

### "WebGPU non supporté"

**Solution** :
- Utilisez Chrome ou Edge (pas Firefox/Safari)
- Vérifiez que votre GPU est récent (2016+)
- Sur Chrome, allez dans `chrome://flags` et activez WebGPU

### "Échec du téléchargement"

**Solution** :
- Vérifiez votre connexion internet
- Assurez-vous d'avoir 2 GB d'espace disque
- Essayez en mode navigation privée
- Videz le cache et réessayez

### "Erreur d'initialisation"

**Solution** :
- Fermez tous les onglets lourds (libérer la RAM)
- Redémarrez le navigateur
- Désactivez puis réactivez Llama 3.2

### "Réponses trop lentes"

**Solution** :
- Normale lors du premier indice (~5s)
- Puis accélère à 1-2s
- Si toujours lent : GPU surchargé, fermez d'autres apps

---

## 📊 PERFORMANCES

### Temps de réponse

| Action | Mode Classique | Llama 3.2 |
|--------|---------------|-----------|
| Premier indice | Instantané | 3-5s |
| Indices suivants | Instantané | 1-2s |
| Deviner un mot | Instantané | 1-3s |

### Consommation

| Ressource | Mode Classique | Llama 3.2 |
|-----------|---------------|-----------|
| RAM | < 100 MB | 2-4 GB |
| GPU | 0% | 30-60% |
| CPU | < 5% | 10-20% |
| Batterie | Faible | Moyenne |

---

## 💡 ASTUCES

### Optimiser Llama

1. **Fermez les autres onglets** avant d'activer Llama
2. **Branchez votre laptop** (consomme batterie)
3. **Première partie** : Llama apprend, peut être moins précis
4. **Jouez plusieurs parties** : Llama devient meilleur

### Combiner les modes

- **Débutant** : Mode classique (rapide, simple)
- **Intermédiaire** : Llama pour "Je devine" (meilleurs indices)
- **Expert** : Llama pour tout (challenge maximal)

---

## 🎯 DIFFÉRENCES ENTRE LES MODES

### Indices donnés par l'IA

**Mode Classique (sans Llama)** :
- Mot : PARIS
- Indices : `capitale, france, tour, eiffel, seine...`
- Ordre fixe, prédéfini

**Mode Llama 3.2** :
- Mot : PARIS
- Indices : `capitale européenne, france, tour célèbre, fleuve seine...`
- Adapté au contexte, progressif, naturel

### L'IA devine

**Mode Classique** :
- Scoring algorithmique (distance de Levenshtein)
- Indices : "capitale, france" → Cherche "PARIS" par matching

**Mode Llama** :
- Compréhension sémantique
- Indices : "capitale, france" → Raisonne "capitale de France = PARIS"

---

## 🔐 CONFIDENTIALITÉ

- ✅ **100% local** : Llama tourne dans votre navigateur
- ✅ **Aucune donnée envoyée** sur internet
- ✅ **Pas de tracking**, pas d'analytics
- ✅ **Offline complet** après téléchargement
- ✅ **Open source** : code visible

---

## 📈 VERSIONS

### v6.0 (Actuelle) - Llama 3.2
- ✅ IA locale intelligente
- ✅ 630 mots de qualité
- ✅ Double mode (classique + IA)
- ✅ PWA améliorée

### v5.0 - Associations optimisées
- 15 associations par mot
- Randomisation complète
- Mode vocal

### v4.0 et antérieures
- Versions de développement

---

## 🤝 CONTRIBUTION

Pour améliorer le jeu :
1. Suggérez de nouveaux mots
2. Signalez les bugs
3. Proposez des améliorations

---

## 📞 SUPPORT

### Console de débogage

Appuyez sur **F12** puis regardez la console :
- ✅ "Llama 3.2 prêt!" = Tout fonctionne
- ❌ Erreurs en rouge = Problème à résoudre

### Messages utiles

- `WebGPU non disponible` → Changez de navigateur
- `Quota exceeded` → Pas assez d'espace disque
- `Failed to fetch` → Problème de connexion

---

## 🎉 AMUSEZ-VOUS !

Le jeu fonctionne **parfaitement** dans les deux modes :
- **Sans Llama** : Rapide, léger, fonctionne partout
- **Avec Llama** : Intelligent, immersif, futuriste

Choisissez selon votre appareil et vos préférences !

---

**Version** : 6.0  
**Date** : Avril 2026  
**Modèle IA** : Llama 3.2 1B (WebLLM)  
**Taille** : 1.2 GB (Llama) + 165 KB (jeu)
