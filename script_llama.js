/* ═══════════════════════════════════════════════════════════════
   MOT DE PASSE v6.0 - AVEC LLAMA 3.2 INTÉGRÉ
   
   ✅ IA locale dans le navigateur (WebLLM + Llama 3.2)
   ✅ 630 mots × 15 associations prédéfinies
   ✅ L'IA comprend le contexte du jeu
   ✅ Fonctionne sur mobile (avec GPU)
   ═══════════════════════════════════════════════════════════════ */

// Importer depuis le fichier principal les données
// On garde THEMES_DATA tel quel depuis script.js

// ══════════════════════════════════════════════════════════════════
// SYSTÈME D'IA LOCALE AVEC LLAMA 3.2
// ══════════════════════════════════════════════════════════════════

let AI_ENGINE = null;
let AI_LOADING = false;
let AI_READY = false;
let AI_ENABLED = false; // Contrôlé par l'utilisateur

// Contexte du jeu pour Llama
const GAME_CONTEXT = `Tu es l'IA du jeu "Mot de Passe", un jeu de devinettes français.

RÈGLES DU JEU:
- Il y a UN mot secret à deviner dans un thème précis
- Dans le mode "Je devine": Tu donnes des INDICES courts (1-3 mots) pour faire deviner le mot secret au joueur
- Dans le mode "Je fais deviner": Le joueur te donne des indices et tu dois DEVINER le mot parmi une liste

CONSIGNES STRICTES POUR LES INDICES:
1. Donne UN SEUL mot ou expression courte (maximum 3 mots)
2. Ne dis JAMAIS le mot secret lui-même
3. Commence par des indices LARGES (catégorie, type)
4. Deviens progressivement PLUS PRÉCIS
5. Adapte-toi au thème (Géographie, Sports, Histoire, etc.)
6. Réponds UNIQUEMENT avec l'indice, sans phrase complète
7. Pas de ponctuation finale

CONSIGNES STRICTES POUR DEVINER:
1. Analyse TOUS les indices donnés
2. Réponds avec UN SEUL MOT en MAJUSCULES
3. Choisis parmi la liste des mots possibles fournis
4. Pas d'explication, juste le mot

Exemples d'indices progressifs pour "PARIS":
Indice 1: "capitale"
Indice 2: "france"
Indice 3: "tour eiffel"
Indice 4: "seine"

Tu es concis, pertinent et tu aides le joueur à s'amuser !`;

// Initialiser Llama 3.2
async function initLlamaAI(onProgress) {
  if (AI_READY) return true;
  if (AI_LOADING) {
    while (AI_LOADING) await new Promise(r => setTimeout(r, 100));
    return AI_READY;
  }

  AI_LOADING = true;
  
  try {
    console.log('🧠 Initialisation de Llama 3.2...');
    
    // Utiliser Llama 3.2 1B (plus léger, parfait pour mobile)
    AI_ENGINE = await window.CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC", {
      initProgressCallback: (progress) => {
        const percent = Math.floor(progress.progress * 100);
        console.log(`📥 Llama 3.2: ${percent}% - ${progress.text || ''}`);
        if (onProgress) onProgress(percent, progress.text);
      }
    });
    
    // Injecter le contexte initial
    await AI_ENGINE.chat.completions.create({
      messages: [{ role: "system", content: GAME_CONTEXT }],
      temperature: 0.1,
      max_tokens: 10,
    });
    
    AI_READY = true;
    AI_ENABLED = true;
    console.log('✅ Llama 3.2 prêt!');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur Llama 3.2:', error);
    AI_READY = false;
    AI_ENABLED = false;
    return false;
  } finally {
    AI_LOADING = false;
  }
}

// Demander un indice à Llama 3.2
async function getLlamaClue(word, clueNumber, theme, previousClues = []) {
  if (!AI_READY || !AI_ENABLED) {
    // Fallback sur associations prédéfinies
    const wordData = getWordData(STATE.resolvedTheme, word);
    return wordData?.assocs[clueNumber - 1] || "indice";
  }

  try {
    const cluesContext = previousClues.length > 0 
      ? `\nIndices déjà donnés: ${previousClues.join(', ')}`
      : '';
    
    const prompt = `Mot secret: ${word}
Thème: ${theme}
Numéro d'indice: ${clueNumber}/15${cluesContext}

Donne l'indice #${clueNumber} (${clueNumber <= 3 ? 'large et général' : clueNumber <= 8 ? 'plus précis' : 'très spécifique'}):`;

    const response = await AI_ENGINE.chat.completions.create({
      messages: [
        { role: "system", content: GAME_CONTEXT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 15,
    });

    let clue = response.choices[0].message.content.trim();
    
    // Nettoyer la réponse
    clue = clue.replace(/^(Indice|L'indice|Voici|Je dirais?)[\s:]+/i, '');
    clue = clue.replace(/[.!?;]$/g, '');
    clue = clue.split('\n')[0];
    clue = clue.replace(/^["']|["']$/g, '');
    
    // Si trop long ou vide, fallback
    if (clue.length > 30 || clue.length < 2) {
      const wordData = getWordData(STATE.resolvedTheme, word);
      return wordData?.assocs[clueNumber - 1] || "indice";
    }
    
    return clue.toLowerCase();
  } catch (error) {
    console.error('Erreur Llama clue:', error);
    const wordData = getWordData(STATE.resolvedTheme, word);
    return wordData?.assocs[clueNumber - 1] || "indice";
  }
}

// Demander à Llama de deviner
async function getLlamaGuess(hints, theme, possibleWords, previousGuesses = []) {
  if (!AI_READY || !AI_ENABLED) {
    // Fallback sur algo de scoring
    return { guess: possibleWords[0], temp: 'CHAUD' };
  }

  try {
    const wordsList = possibleWords.slice(0, 15).join(', ');
    const prevGuesses = previousGuesses.length > 0 
      ? `\nDéjà proposé (ne répète PAS): ${previousGuesses.join(', ')}`
      : '';
    
    const prompt = `Thème: ${theme}
Indices reçus: ${hints.join(', ')}${prevGuesses}

Mots possibles: ${wordsList}

Quel est LE mot ? Réponds UNIQUEMENT avec le mot en MAJUSCULES, rien d'autre:`;

    const response = await AI_ENGINE.chat.completions.create({
      messages: [
        { role: "system", content: GAME_CONTEXT },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 5,
    });

    let guess = response.choices[0].message.content.trim().toUpperCase();
    
    // Nettoyer
    guess = guess.split('\n')[0];
    guess = guess.replace(/[^A-ZÀ-Ÿ-]/g, '');
    guess = guess.replace(/^(LE |LA |L'|UN |UNE )/i, '');
    
    // Vérifier que c'est dans la liste
    const validGuess = possibleWords.find(w => normalize(w) === normalize(guess));
    
    if (validGuess) {
      return { guess: validGuess, temp: 'CHAUD' };
    } else {
      // Si pas dans la liste, prendre le meilleur du scoring
      console.log(`⚠️  Llama a proposé "${guess}" qui n'est pas dans la liste`);
      return { guess: possibleWords[0], temp: 'CHAUD' };
    }
  } catch (error) {
    console.error('Erreur Llama guess:', error);
    return { guess: possibleWords[0], temp: 'CHAUD' };
  }
}

// ══════════════════════════════════════════════════════════════════
// INTERFACE UTILISATEUR POUR L'IA
// ══════════════════════════════════════════════════════════════════

function showAILoadingModal() {
  const modal = document.createElement('div');
  modal.id = 'ai-loading-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
  `;
  
  modal.innerHTML = `
    <div style="text-align: center; max-width: 400px;">
      <h2 style="color: #fff; margin-bottom: 20px;">🧠 Initialisation de Llama 3.2</h2>
      <p style="color: #aaa; margin-bottom: 30px;">Téléchargement du modèle IA (~1.2 GB)<br>Cette opération ne se fait qu'une seule fois</p>
      <div style="background: #222; border-radius: 10px; padding: 4px; margin-bottom: 15px;">
        <div id="ai-progress-bar" style="height: 30px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 8px; width: 0%; transition: width 0.3s;"></div>
      </div>
      <p id="ai-progress-text" style="color: #667eea; font-size: 18px; font-weight: bold;">0%</p>
      <p id="ai-progress-status" style="color: #888; font-size: 14px; margin-top: 10px;"></p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  return {
    update: (percent, text) => {
      const bar = document.getElementById('ai-progress-bar');
      const percentText = document.getElementById('ai-progress-text');
      const statusText = document.getElementById('ai-progress-status');
      
      if (bar) bar.style.width = percent + '%';
      if (percentText) percentText.textContent = percent + '%';
      if (statusText && text) statusText.textContent = text;
    },
    close: () => {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }
  };
}

// ══════════════════════════════════════════════════════════════════
// MODIFIER LES FONCTIONS DU JEU POUR UTILISER LLAMA
// ══════════════════════════════════════════════════════════════════

// Stocker les indices déjà donnés
STATE.previousClues = [];

// FONCTION: Donner un indice (mode "Je devine")
async function giveNextClue() {
  if (STATE.gameOver || STATE.mancheOver) return;

  const word = STATE.currentWordName;
  const data = STATE.currentWordData;
  
  if (!data || STATE.clueIndex >= 15) {
    iaClueTextEl.textContent = "Plus d'indices disponibles!";
    return;
  }

  // Afficher le loader
  iaClueTextEl.textContent = AI_ENABLED ? "🧠 Llama réfléchit..." : "💭 Réflexion...";
  
  // Obtenir l'indice (Llama ou fallback)
  const clue = await getLlamaClue(
    word, 
    STATE.clueIndex + 1, 
    STATE.resolvedTheme,
    STATE.previousClues
  );
  
  STATE.clueIndex++;
  STATE.wordClueCount++;
  STATE.givenClues.push(STATE.wordClueCount - 1);
  STATE.previousClues.push(clue);

  iaClueTextEl.textContent = clue.toUpperCase();
  addHistory('IA', clue.toUpperCase(), null, `Indice ${STATE.wordClueCount}`);

  if (STATE.voiceEnabled && STATE.autoListen) {
    setTimeout(() => listenOnce(w => handleGuessWord(w)), 900);
  }
}

// FONCTION: L'IA devine (mode "Je fais deviner")
async function handleHint() {
  const hint = inputHintEl.value.trim();
  if (!hint || STATE.gameOver || STATE.mancheOver) return;

  inputHintEl.value = '';
  addHistory('Vous', hint);

  // Afficher le loader
  iaGuessWordEl.textContent = AI_ENABLED ? "🧠 Llama devine..." : "💭 Analyse...";
  iaGuessTempEl.textContent = "";

  // Ajouter l'indice à l'historique
  STATE.hinterHints.push(normalize(hint));

  // Calculer les scores pour obtenir les meilleurs candidats
  const themeWords = THEME_WORDS[STATE.resolvedTheme];
  const wordScores = themeWords.map(w => {
    const wd = getWordData(STATE.resolvedTheme, w);
    if (!wd) return { w, total: 0 };
    let total = 0;
    for (const h of STATE.hinterHints) {
      total += hintScore(h, w, wd);
    }
    return { w, total };
  }).sort((a, b) => b.total - a.total);

  const topWords = wordScores.slice(0, 20).map(ws => ws.w);

  // Demander à Llama de deviner
  const result = await getLlamaGuess(
    STATE.hinterHints.map(h => {
      // Retrouver le mot original (pas normalisé)
      return hint; // On envoie le dernier indice original
    }),
    STATE.resolvedTheme,
    topWords,
    STATE.iaGuesses
  );

  const guessWord = result.guess;
  const temp = computeTemperature(hint, STATE.currentWordData, STATE.currentWordName);

  STATE.iaGuesses.push(normalize(guessWord));

  iaGuessWordEl.textContent = guessWord;
  iaGuessTempEl.textContent = rand(temp);

  if (normalize(guessWord) === normalize(STATE.currentWordName)) {
    handleCorrectGuess();
  }
}

// ══════════════════════════════════════════════════════════════════
// BOUTON D'ACTIVATION LLAMA DANS L'INTERFACE
// ══════════════════════════════════════════════════════════════════

function initAIToggle() {
  const aiToggle = document.getElementById('ai-toggle');
  const aiStatus = document.getElementById('ai-status');
  
  if (!aiToggle) return;
  
  aiToggle.addEventListener('change', async () => {
    if (aiToggle.checked) {
      // Activer Llama
      aiStatus.textContent = 'Initialisation...';
      
      const modal = showAILoadingModal();
      
      const success = await initLlamaAI((percent, text) => {
        modal.update(percent, text);
      });
      
      if (success) {
        setTimeout(() => {
          modal.close();
          aiStatus.textContent = '✓ Llama 3.2 actif';
          showToast('🧠 Llama 3.2 activé!', 2000);
        }, 500);
      } else {
        modal.close();
        aiStatus.textContent = '✗ Erreur';
        aiToggle.checked = false;
        showToast('❌ Erreur d\'initialisation', 3000);
      }
    } else {
      // Désactiver Llama (mais garder en mémoire)
      AI_ENABLED = false;
      aiStatus.textContent = 'Désactivé';
      showToast('Mode classique activé', 2000);
    }
  });
  
  // Afficher si WebGPU est supporté
  if (!navigator.gpu) {
    aiToggle.disabled = true;
    aiStatus.textContent = '✗ WebGPU requis';
    aiStatus.title = 'Votre navigateur ne supporte pas WebGPU';
  }
}

// ══════════════════════════════════════════════════════════════════
// INITIALISATION MODIFIÉE
// ══════════════════════════════════════════════════════════════════

// Ajouter à la fonction init() existante
const originalInit = init;
function init() {
  originalInit();
  initAIToggle();
  
  // Message de bienvenue
  console.log('%c🧠 Llama 3.2 disponible!', 'color: #667eea; font-size: 16px; font-weight: bold;');
  console.log('%cActivez-le dans les paramètres pour une IA intelligente', 'color: #888;');
}

// Réinitialiser les indices à chaque nouveau mot
const originalLoadCurrentWord = loadCurrentWord;
function loadCurrentWord() {
  STATE.previousClues = [];
  originalLoadCurrentWord();
}
