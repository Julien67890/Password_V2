/* ═══════════════════════════════════════════════════════════════
   MOT DE PASSE v6.2 - LLAMA 3.2 CORRIGÉ
   
   ✅ Contexte amélioré avec exemples
   ✅ Validation stricte des réponses
   ✅ Température réduite pour cohérence
   ✅ Différenciation pays/villes/types
   ═══════════════════════════════════════════════════════════════ */

let AI_ENGINE = null;
let AI_LOADING = false;
let AI_READY = false;
let AI_ENABLED = false;

// ✅ CONTEXTE AMÉLIORÉ AVEC EXEMPLES EXPLICITES
const GAME_CONTEXT = `Tu es l'IA du jeu "Mot de Passe" en français.

RÈGLE ABSOLUE : CHOISIS UNIQUEMENT DANS LA LISTE FOURNIE !

MODE "JE DEVINE" (tu donnes des indices) :
- Donne 1 seul mot ou expression courte (max 3 mots)
- Ne dis JAMAIS le mot secret
- Progression : large → précis → très spécifique

MODE "JE FAIS DEVINER" (tu devines) :
- Analyse TOUS les indices
- Détermine le TYPE (ville? pays? personne? monument?)
- Choisis UNIQUEMENT dans la liste fournie
- Réponds avec UN SEUL MOT en MAJUSCULES

EXEMPLES CRITIQUES (différenciation types) :

Exemple 1 - Capitale
Indices : "capitale, turquie"
Liste : [ISTANBUL, ANKARA, TURQUIE]
Type recherché : VILLE (capitale)
✅ Réponse correcte : ANKARA (capitale actuelle de Turquie)
❌ FAUX : ISTANBUL (ancienne capitale)
❌ FAUX : TURQUIE (pays, pas ville)

Exemple 2 - Pays
Indices : "pays, amérique nord, froid"
Liste : [CANADA, GROENLAND, TORONTO, QUÉBEC]
Type recherché : PAYS
✅ Réponse correcte : CANADA (seul pays)
❌ FAUX : GROENLAND (territoire)
❌ FAUX : TORONTO (ville)
❌ FAUX : QUÉBEC (province)

Exemple 3 - Ville
Indices : "ville, turquie, bosphore"
Liste : [ISTANBUL, ANKARA, TURQUIE]
Type recherché : VILLE
✅ Réponse correcte : ISTANBUL (ville sur le Bosphore)
❌ FAUX : ANKARA (pas sur le Bosphore)
❌ FAUX : TURQUIE (pays)

Exemple 4 - Ville canadienne
Indices : "canada, ville, ontario"
Liste : [CANADA, TORONTO, OTTAWA, MONTRÉAL]
Type recherché : VILLE
✅ Réponse correcte : TORONTO (ville en Ontario)
❌ FAUX : CANADA (pays)
❌ FAUX : OTTAWA (capitale, mais cherche Ontario)
❌ FAUX : MONTRÉAL (au Québec, pas Ontario)

PROCESSUS :
1. Lis TOUS les indices
2. Identifie le TYPE dans les indices
3. Élimine les mauvais types de la liste
4. Choisis le mot le plus cohérent parmi ce qui reste
5. Réponds UNIQUEMENT avec ce mot`;

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
    
    AI_ENGINE = await window.CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC", {
      initProgressCallback: (progress) => {
        const percent = Math.floor(progress.progress * 100);
        console.log(`📥 Llama 3.2: ${percent}% - ${progress.text || ''}`);
        if (onProgress) onProgress(percent, progress.text);
      }
    });
    
    // Injecter le contexte
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
    console.error('❌ Erreur Llama 3.2:', error);
    AI_READY = false;
    AI_ENABLED = false;
    return false;
  } finally {
    AI_LOADING = false;
  }
}

// ✅ AMÉLIORATION : Donner un indice avec validation
async function getLlamaClue(word, clueNumber, theme, previousClues = []) {
  if (!AI_READY || !AI_ENABLED) {
    const wordData = getWordData(STATE.resolvedTheme, word);
    if (wordData && wordData.assocs && wordData.assocs[clueNumber - 1]) {
      return wordData.assocs[clueNumber - 1];
    }
    return "indice";
  }

  try {
    const strategy = clueNumber <= 3 
      ? "très général (catégorie large)"
      : clueNumber <= 6
      ? "précis (caractéristique)"
      : "très spécifique (détail unique)";
    
    const prevContext = previousClues.length > 0
      ? `\nIndices déjà donnés : ${previousClues.join(', ')}\n⚠️  Donne un indice DIFFÉRENT !`
      : '';
    
    const prompt = `Mot secret : ${word}
Thème : ${theme}
Indice #${clueNumber}/10 (${strategy})${prevContext}

Donne UN SEUL mot ou expression courte (max 3 mots) :`;

    const response = await AI_ENGINE.chat.completions.create({
      messages: [
        { role: "system", content: GAME_CONTEXT },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 10,
    });

    let clue = response.choices[0].message.content.trim();
    clue = clue.replace(/^(Indice|L'indice|Voici|Réponse)[\s:]+/i, '');
    clue = clue.replace(/[.!?;]$/g, '');
    clue = clue.split('\n')[0];
    clue = clue.replace(/^["']|["']$/g, '');
    clue = clue.toLowerCase();
    
    // ✅ Vérifier que le mot secret n'est pas dans l'indice
    if (normalize(clue).includes(normalize(word))) {
      console.warn(`⚠️  Llama a donné le mot secret ! Fallback.`);
      const wordData = getWordData(STATE.resolvedTheme, word);
      return wordData?.assocs[clueNumber - 1] || "indice";
    }
    
    // Vérifier longueur
    if (clue.length > 25 || clue.length < 2) {
      const wordData = getWordData(STATE.resolvedTheme, word);
      return wordData?.assocs[clueNumber - 1] || "indice";
    }
    
    console.log(`✅ Llama indice #${clueNumber}:`, clue);
    return clue;
  } catch (error) {
    console.error('❌ Erreur Llama clue:', error);
    const wordData = getWordData(STATE.resolvedTheme, word);
    return wordData?.assocs[clueNumber - 1] || "indice";
  }
}

// ✅ AMÉLIORATION MAJEURE : Forcer le choix avec numéros
async function getLlamaGuess(hints, theme, possibleWords, previousGuesses = []) {
  if (!AI_READY || !AI_ENABLED) {
    return { guess: possibleWords[0], temp: 'CHAUD' };
  }

  try {
    // Limiter à 8 mots pour meilleure précision
    const topWords = possibleWords.slice(0, 8);
    
    const prompt = `Thème : ${theme}

Indices donnés par le joueur :
${hints.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Mots possibles (choisis UNIQUEMENT parmi eux) :
${topWords.map((w, i) => `${i + 1}. ${w}`).join('\n')}
${previousGuesses.length > 0 ? `\nDéjà proposés (NE PAS répéter) : ${previousGuesses.join(', ')}` : ''}

Analyse les indices, identifie le TYPE recherché, choisis le mot le plus cohérent.
Réponds avec le NUMÉRO suivi du MOT (exemple : "3. PARIS") :`;

    const response = await AI_ENGINE.chat.completions.create({
      messages: [
        { role: "system", content: GAME_CONTEXT },
        { role: "user", content: prompt }
      ],
      temperature: 0.2, // ✅ Très bas pour déterminisme
      max_tokens: 10,
    });

    let answer = response.choices[0].message.content.trim();
    console.log('🤖 Llama répond:', answer);
    
    // Extraire le numéro ET le mot
    let match = answer.match(/(\d+)\.\s*([A-ZÀ-Ÿ-]+)/);
    
    if (match) {
      const num = parseInt(match[1]) - 1;
      const word = match[2].toUpperCase();
      
      // Vérifier que le numéro est valide
      if (num >= 0 && num < topWords.length) {
        console.log(`✅ Llama choisit #${num + 1}: ${topWords[num]}`);
        return { guess: topWords[num], temp: 'CHAUD' };
      }
      
      // Si numéro invalide mais mot dans la liste
      const validWord = topWords.find(w => normalize(w) === normalize(word));
      if (validWord) {
        console.log(`✅ Llama trouve: ${validWord}`);
        return { guess: validWord, temp: 'CHAUD' };
      }
    }
    
    // Sinon essayer d'extraire juste le mot
    let guess = answer.replace(/^\d+\.\s*/, '').toUpperCase();
    guess = guess.split('\n')[0];
    guess = guess.replace(/[^A-ZÀ-Ÿ-]/g, '');
    
    const validGuess = topWords.find(w => normalize(w) === normalize(guess));
    
    if (validGuess) {
      console.log(`✅ Llama propose: ${validGuess}`);
      return { guess: validGuess, temp: 'CHAUD' };
    } else {
      console.warn(`⚠️  Llama a proposé "${guess}" hors liste. Fallback au meilleur score.`);
      return { guess: topWords[0], temp: 'CHAUD' };
    }
  } catch (error) {
    console.error('❌ Erreur Llama guess:', error);
    return { guess: possibleWords[0], temp: 'CHAUD' };
  }
}

// Interface de chargement
function showAILoadingModal() {
  const modal = document.createElement('div');
  modal.id = 'ai-loading-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); display: flex; flex-direction: column;
    align-items: center; justify-content: center; z-index: 10000; padding: 20px;
  `;
  
  modal.innerHTML = `
    <div style="text-align: center; max-width: 400px;">
      <h2 style="color: #fff; margin-bottom: 20px;">🧠 Llama 3.2</h2>
      <p style="color: #aaa; margin-bottom: 30px;">Téléchargement (~1.2 GB)<br>Une seule fois</p>
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

// Initialiser le toggle IA
function initAIToggle() {
  const aiToggle = document.getElementById('ai-toggle');
  const aiStatus = document.getElementById('ai-status');
  
  if (!aiToggle) return;
  
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
          showToast('🧠 Llama 3.2 activé!', 2000);
        }, 500);
      } else {
        modal.close();
        aiStatus.textContent = '✗ Erreur';
        aiToggle.checked = false;
        showToast('❌ Erreur', 3000);
      }
    } else {
      AI_ENABLED = false;
      aiStatus.textContent = 'Désactivé';
      showToast('Mode classique', 2000);
    }
  });
  
  if (!navigator.gpu) {
    aiToggle.disabled = true;
    aiStatus.textContent = '✗ WebGPU requis';
  }
}

// Hook dans init
if (typeof init === 'function') {
  const originalInit = init;
  window.init = function() {
    originalInit();
    initAIToggle();
    console.log('%c🧠 Llama 3.2 disponible!', 'color: #667eea; font-size: 16px; font-weight: bold;');
  };
}

console.log('✅ Script Llama v6.2 chargé');
