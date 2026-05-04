/* ═══════════════════════════════════════════════════════════════
   MOT DE PASSE v6.3 - LLAMA 3.2 PARFAIT
   
   ✅ Contexte amélioré avec exemples explicites
   ✅ Validation stricte (choix forcé par numéros)
   ✅ Anti-leak (vérification que l'indice ne contient pas le mot)
   ✅ Température optimisée
   ✅ Logging complet pour debug
   ═══════════════════════════════════════════════════════════════ */

let AI_ENGINE = null;
let AI_LOADING = false;
let AI_READY = false;
let AI_ENABLED = false;

// ✅ CONTEXTE PARFAIT avec exemples de différenciation
const GAME_CONTEXT = `Tu es l'IA du jeu "Mot de Passe" en français.

RÈGLE ABSOLUE : CHOISIS UNIQUEMENT DANS LA LISTE FOURNIE !

MODE "JE DEVINE" (tu donnes des indices) :
- Donne 1 seul mot ou expression courte (max 3 mots)
- NE DIS JAMAIS le mot secret ou une partie du mot
- Progression : large → précis → très spécifique
- Adapte-toi au thème

MODE "JE FAIS DEVINER" (tu devines) :
- Analyse TOUS les indices donnés
- Identifie le TYPE recherché (ville? pays? monument? personne?)
- Choisis UNIQUEMENT parmi la liste fournie
- Réponds avec le NUMÉRO suivi du MOT

EXEMPLES CRITIQUES (différenciation pays/villes) :

Exemple 1 - Capitale actuelle
Indices : "capitale, turquie"
Liste : [ISTANBUL, ANKARA, TURQUIE]
Type : VILLE (capitale)
Analyse : La capitale actuelle de la Turquie est ANKARA (depuis 1923)
✅ Réponse : "2. ANKARA"
❌ FAUX : ISTANBUL (ancienne capitale, pas actuelle)
❌ FAUX : TURQUIE (pays, pas ville)

Exemple 2 - Pays d'Amérique du Nord
Indices : "pays, amérique nord, froid"
Liste : [CANADA, GROENLAND, TORONTO, QUÉBEC, ALASKA]
Type : PAYS
Analyse : Seul CANADA est un pays, les autres sont villes/territoires
✅ Réponse : "1. CANADA"
❌ FAUX : GROENLAND (territoire autonome, pas pays indépendant)
❌ FAUX : TORONTO (ville au Canada)
❌ FAUX : QUÉBEC (province du Canada)
❌ FAUX : ALASKA (état américain)

Exemple 3 - Ville sur le Bosphore
Indices : "ville, turquie, bosphore"
Liste : [ISTANBUL, ANKARA, TURQUIE, IZMIR]
Type : VILLE
Analyse : Seule ISTANBUL est sur le Bosphore
✅ Réponse : "1. ISTANBUL"
❌ FAUX : ANKARA (capitale mais pas sur le Bosphore)
❌ FAUX : TURQUIE (pays)
❌ FAUX : IZMIR (ville côtière mais pas sur le Bosphore)

Exemple 4 - Ville en Ontario
Indices : "canada, ville, ontario"
Liste : [CANADA, TORONTO, OTTAWA, MONTRÉAL]
Type : VILLE en Ontario
Analyse : TORONTO est en Ontario, OTTAWA aussi, MONTRÉAL au Québec
✅ Réponse : "2. TORONTO" (ou "3. OTTAWA")
❌ FAUX : CANADA (pays)
❌ FAUX : MONTRÉAL (au Québec, pas Ontario)

PROCESSUS DE RÉFLEXION :
1. Lis TOUS les indices
2. Identifie le TYPE dans les indices (pays/ville/monument/personne/etc.)
3. Élimine les candidats du mauvais type
4. Parmi ceux qui restent, choisis le plus cohérent
5. Réponds UNIQUEMENT avec "NUMÉRO. MOT"`;

// Initialiser Llama 3.2
async function initLlamaAI(onProgress) {
  if (AI_READY) return true;
  if (AI_LOADING) {
    while (AI_LOADING) await new Promise(r => setTimeout(r, 100));
    return AI_READY;
  }

  AI_LOADING = true;
  
  try {
    console.log('🧠 Initialisation de Llama 3.2 1B...');
    
    AI_ENGINE = await window.CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC", {
      initProgressCallback: (progress) => {
        const percent = Math.floor(progress.progress * 100);
        console.log(`📥 Llama: ${percent}% - ${progress.text || ''}`);
        if (onProgress) onProgress(percent, progress.text);
      }
    });
    
    // Test avec contexte
    await AI_ENGINE.chat.completions.create({
      messages: [{ role: "system", content: GAME_CONTEXT }],
      temperature: 0.1,
      max_tokens: 5,
    });
    
    AI_READY = true;
    AI_ENABLED = true;
    console.log('✅ Llama 3.2 prêt!');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur Llama:', error);
    AI_READY = false;
    AI_ENABLED = false;
    return false;
  } finally {
    AI_LOADING = false;
  }
}

// ✅ DONNER UN INDICE (avec anti-leak)
async function getLlamaClue(word, clueNumber, theme, previousClues = []) {
  if (!AI_READY || !AI_ENABLED) {
    // Fallback : associations prédéfinies
    const wordData = getWordData(STATE.resolvedTheme, word);
    if (wordData && wordData.assocs && wordData.assocs[clueNumber - 1]) {
      return wordData.assocs[clueNumber - 1];
    }
    return "indice";
  }

  try {
    const strategy = clueNumber <= 2 
      ? "très général (catégorie large, thème)"
      : clueNumber <= 5
      ? "moyen (caractéristique notable)"
      : "précis (détail spécifique)";
    
    const prevContext = previousClues.length > 0
      ? `\nIndices déjà donnés : ${previousClues.join(', ')}\n⚠️  NE RÉPÈTE PAS ces indices !`
      : '';
    
    const prompt = `Mot secret : ${word}
Thème : ${theme}
Indice #${clueNumber}/10 - ${strategy}${prevContext}

RÈGLE CRITIQUE : L'indice NE DOIT PAS contenir le mot secret ou une partie du mot secret !

Exemples pour "MUSIQUE" :
Indice 1 : "son" ✅ (général)
Indice 2 : "mélodie" ✅ (moyen)
Indice 3 : "concert" ✅ (précis)
❌ INTERDIT : "musique", "musical", "musi"

Donne UN SEUL mot ou expression courte (max 3 mots) :`;

    const response = await AI_ENGINE.chat.completions.create({
      messages: [
        { role: "system", content: GAME_CONTEXT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 10,
    });

    let clue = response.choices[0].message.content.trim();
    clue = clue.replace(/^(Indice|L'indice|Voici|Réponse)[\s:]+/i, '');
    clue = clue.replace(/[.!?;]$/g, '');
    clue = clue.split('\n')[0];
    clue = clue.replace(/^["']|["']$/g, '');
    clue = clue.toLowerCase();
    
    // ✅ ANTI-LEAK : Vérifier que le mot secret n'est PAS dans l'indice
    const normalizedClue = normalize(clue);
    const normalizedWord = normalize(word);
    
    if (normalizedClue.includes(normalizedWord) || normalizedWord.includes(normalizedClue)) {
      console.warn(`⚠️  ANTI-LEAK: "${clue}" contient "${word}" ! Fallback.`);
      const wordData = getWordData(STATE.resolvedTheme, word);
      return wordData?.assocs[clueNumber - 1] || "thème";
    }
    
    // Vérifier longueur
    if (clue.length > 20 || clue.length < 2) {
      console.warn(`⚠️  Indice trop ${clue.length > 20 ? 'long' : 'court'}: "${clue}"`);
      const wordData = getWordData(STATE.resolvedTheme, word);
      return wordData?.assocs[clueNumber - 1] || "concept";
    }
    
    console.log(`✅ Llama indice #${clueNumber}: "${clue}"`);
    return clue;
  } catch (error) {
    console.error('❌ Erreur getLlamaClue:', error);
    const wordData = getWordData(STATE.resolvedTheme, word);
    return wordData?.assocs[clueNumber - 1] || "indice";
  }
}

// ✅ DEVINER LE MOT (avec choix forcé par numéros)
async function getLlamaGuess(hints, theme, possibleWords, previousGuesses = []) {
  if (!AI_READY || !AI_ENABLED) {
    return { guess: possibleWords[0], temp: 'CHAUD' };
  }

  try {
    // Top 8 mots pour précision
    const topWords = possibleWords.slice(0, 8);
    
    const prompt = `Thème : ${theme}

Indices donnés par le joueur :
${hints.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Mots possibles (choisis UNIQUEMENT parmi eux) :
${topWords.map((w, i) => `${i + 1}. ${w}`).join('\n')}
${previousGuesses.length > 0 ? `\n❌ Déjà proposés (NE PAS répéter) : ${previousGuesses.join(', ')}` : ''}

Analyse :
1. Identifie le TYPE recherché (pays/ville/monument/personne/etc.)
2. Élimine les mauvais types
3. Choisis le plus cohérent

Réponds UNIQUEMENT avec "NUMÉRO. MOT" (exemple : "3. PARIS") :`;

    const response = await AI_ENGINE.chat.completions.create({
      messages: [
        { role: "system", content: GAME_CONTEXT },
        { role: "user", content: prompt }
      ],
      temperature: 0.2, // Très déterministe
      max_tokens: 10,
    });

    let answer = response.choices[0].message.content.trim();
    console.log('🤖 Llama devine:', answer);
    
    // Extraire "NUMÉRO. MOT"
    let match = answer.match(/(\d+)\.\s*([A-ZÀ-Ÿ-]+)/i);
    
    if (match) {
      const num = parseInt(match[1]) - 1;
      const word = match[2].toUpperCase();
      
      // Vérifier numéro valide
      if (num >= 0 && num < topWords.length) {
        console.log(`✅ Llama choisit #${num + 1}: ${topWords[num]}`);
        return { guess: topWords[num], temp: 'CHAUD' };
      }
      
      // Numéro invalide mais mot dans la liste
      const validWord = topWords.find(w => normalize(w) === normalize(word));
      if (validWord) {
        console.log(`✅ Llama trouve (par nom): ${validWord}`);
        return { guess: validWord, temp: 'CHAUD' };
      }
    }
    
    // Essayer d'extraire juste le mot
    let guess = answer.replace(/^\d+\.\s*/, '').toUpperCase();
    guess = guess.split('\n')[0].split(' ')[0];
    guess = guess.replace(/[^A-ZÀ-Ÿ-]/g, '');
    
    const validGuess = topWords.find(w => normalize(w) === normalize(guess));
    
    if (validGuess) {
      console.log(`✅ Llama propose (extraction): ${validGuess}`);
      return { guess: validGuess, temp: 'CHAUD' };
    }
    
    console.warn(`⚠️  Llama réponse invalide: "${answer}" - Fallback au meilleur score`);
    return { guess: topWords[0], temp: 'CHAUD' };
    
  } catch (error) {
    console.error('❌ Erreur getLlamaGuess:', error);
    return { guess: possibleWords[0], temp: 'CHAUD' };
  }
}

// Interface de chargement
function showAILoadingModal() {
  const modal = document.createElement('div');
  modal.id = 'ai-loading-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95); display: flex; flex-direction: column;
    align-items: center; justify-content: center; z-index: 10000; padding: 20px;
  `;
  
  modal.innerHTML = `
    <div style="text-align: center; max-width: 400px;">
      <h2 style="color: #fff; margin-bottom: 10px; font-size: 28px;">🧠 Llama 3.2</h2>
      <p style="color: #aaa; margin-bottom: 30px;">Téléchargement du modèle IA<br>~1.2 GB · Une seule fois</p>
      <div style="background: #222; border-radius: 10px; padding: 4px; margin-bottom: 15px;">
        <div id="ai-progress-bar" style="height: 30px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 8px; width: 0%; transition: width 0.3s;"></div>
      </div>
      <p id="ai-progress-text" style="color: #667eea; font-size: 24px; font-weight: bold; margin-bottom: 10px;">0%</p>
      <p id="ai-progress-status" style="color: #888; font-size: 13px;"></p>
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

// Toggle IA
function initAIToggle() {
  const aiToggle = document.getElementById('ai-toggle');
  const aiStatus = document.getElementById('ai-status');
  
  if (!aiToggle) {
    console.warn('⚠️  Toggle IA non trouvé dans le HTML');
    return;
  }
  
  aiToggle.addEventListener('change', async () => {
    if (aiToggle.checked) {
      aiStatus.textContent = 'Initialisation...';
      const modal = showAILoadingModal();
      
      const success = await initLlamaAI((percent, text) => {
        modal.update(percent, text);
      });
      
      if (success) {
        setTimeout(() => {
          modal.close();
          aiStatus.textContent = '✓ Actif';
          if (typeof showToast === 'function') {
            showToast('🧠 Llama 3.2 activé!', 2000);
          }
        }, 500);
      } else {
        modal.close();
        aiStatus.textContent = '✗ Erreur';
        aiToggle.checked = false;
        if (typeof showToast === 'function') {
          showToast('❌ Erreur d\'initialisation', 3000);
        }
      }
    } else {
      AI_ENABLED = false;
      aiStatus.textContent = 'Désactivé';
      if (typeof showToast === 'function') {
        showToast('Mode classique activé', 2000);
      }
    }
  });
  
  // Vérifier WebGPU
  if (!navigator.gpu) {
    aiToggle.disabled = true;
    aiStatus.textContent = '✗ WebGPU requis';
    aiStatus.title = 'Votre navigateur ne supporte pas WebGPU (requis pour Llama 3.2)';
    console.warn('⚠️  WebGPU non disponible - Llama désactivé');
  }
}

// Hook dans init()
if (typeof window !== 'undefined') {
  const originalInit = window.init;
  window.init = function() {
    if (originalInit) originalInit();
    initAIToggle();
    console.log('%c🧠 Llama 3.2 disponible!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cActivez-le dans les paramètres pour une IA vraiment intelligente', 'color: #888;');
  };
}

console.log('✅ Script Llama v6.3 chargé');
