/* ============================================================
   PIEDRA PAPEL TIJERA — LÓGICA DEL JUEGO
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   1. ESTADO DEL JUEGO
   ───────────────────────────────────────────────────────────── */
let playerScore = 0;   // puntos acumulados del jugador
let cpuScore    = 0;   // puntos acumulados de la CPU
let usedTries   = 0;   // intentos consumidos (máx 3)

const MAX_TRIES = 3;
const choices   = ['rock', 'paper', 'scissors'];

/* ─────────────────────────────────────────────────────────────
   2. DATOS: SVGs INLINE DE LAS PATITAS
   ───────────────────────────────────────────────────────────── */
const svgMap = {
  rock: `
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="30" width="14" height="20" rx="7"  fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="44" y="25" width="14" height="20" rx="7"  fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="60" y="30" width="14" height="20" rx="7"  fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="22" y="42" width="58" height="52" rx="16" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <ellipse cx="51" cy="76" rx="16" ry="12"  fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="31" cy="60" rx="7"  ry="5.5" fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="51" cy="57" rx="7"  ry="5.5" fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="71" cy="60" rx="7"  ry="5.5" fill="#ff8ec4" opacity="0.9"/>
    </svg>`,
  paper: `
    <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="10" width="13" height="50" rx="6.5" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="39" y="5"  width="13" height="55" rx="6.5" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="54" y="8"  width="13" height="52" rx="6.5" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="18" y="50" width="65" height="62" rx="18"  fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <ellipse cx="50" cy="90" rx="18"  ry="13" fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="29" cy="72" rx="7.5" ry="6"  fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="50" cy="68" rx="7.5" ry="6"  fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="71" cy="72" rx="7.5" ry="6"  fill="#ff8ec4" opacity="0.9"/>
    </svg>`,
  scissors: `
    <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="8"  width="13" height="52" rx="6.5" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="54" y="8"  width="13" height="52" rx="6.5" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <path d="M28 8 L24 0 M36 8 L40 0" stroke="#ff65e0" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M58 8 L54 0 M66 8 L70 0" stroke="#ff65e0" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="39" y="42" width="13" height="30" rx="6.5" fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <rect x="18" y="55" width="65" height="60" rx="18"  fill="#1a1a1a" stroke="#ff65e0" stroke-width="2.5"/>
      <ellipse cx="50" cy="93" rx="18" ry="13"  fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="29" cy="74" rx="7"  ry="5.5" fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="50" cy="70" rx="7"  ry="5.5" fill="#ff8ec4" opacity="0.9"/>
      <ellipse cx="71" cy="74" rx="7"  ry="5.5" fill="#ff8ec4" opacity="0.9"/>
    </svg>`
};

/* ─────────────────────────────────────────────────────────────
   3. LÓGICA PRINCIPAL
   ───────────────────────────────────────────────────────────── */

function determineWinner(player, cpu) {
  if (player === cpu) return 'draw';
  if (
    (player === 'rock'     && cpu === 'scissors') ||
    (player === 'paper'    && cpu === 'rock')     ||
    (player === 'scissors' && cpu === 'paper')
  ) return 'win';
  return 'lose';
}

function play(playerChoice) {
  if (usedTries >= MAX_TRIES) return;

  setButtonsDisabled(true);

  const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
  usedTries++;

  const dpPlayer = document.getElementById('display-player');
  const dpCpu    = document.getElementById('display-cpu');
  const msgEl    = document.getElementById('round-msg');

  // Reiniciar animaciones (truco de reflow para que el navegador reinicie CSS)
  dpPlayer.classList.remove('reveal', 'bounce', 'shake');
  dpCpu.classList.remove('reveal');
  void dpPlayer.offsetWidth; 

  // Mostrar elecciones
  dpPlayer.innerHTML = svgMap[playerChoice];
  dpCpu.innerHTML    = svgMap[cpuChoice];
  dpPlayer.classList.add('reveal');
  dpCpu.classList.add('reveal');

  // Marcar el intento usado
  document.getElementById('dot-' + usedTries).classList.add('used');

  const result = determineWinner(playerChoice, cpuChoice);
  msgEl.className = 'round-msg';

  if (result === 'win') {
    playerScore++;
    msgEl.textContent = '🐾 ¡Tu patita ganó!';
    msgEl.classList.add('win');
    dpPlayer.classList.add('bounce');
  } else if (result === 'lose') {
    cpuScore++;
    msgEl.textContent = '😿 La CPU te venció...';
    msgEl.classList.add('lose');
    dpPlayer.classList.add('shake');
  } else {
    msgEl.textContent = '🐱 ¡Empate de ronda!';
    msgEl.classList.add('draw');
  }

  // Actualizar marcadores en pantalla
  document.getElementById('score-player').textContent = playerScore;
  document.getElementById('score-cpu').textContent    = cpuScore;

  setTimeout(() => {
    if (usedTries >= MAX_TRIES) {
      endGame();
    } else {
      setButtonsDisabled(false);
    }
  }, 1000);
}

/* ─────────────────────────────────────────────────────────────
   4. CONTROL DEL JUEGO
   ───────────────────────────────────────────────────────────── */

function endGame() {
  if (playerScore > cpuScore) {
    showScreen('screen-win');
    document.getElementById('win-score').textContent = `Ganaste ${playerScore} de ${MAX_TRIES} rondas 🎉`;
    launchStars();
  } else if (playerScore === cpuScore) {
    showScreen('screen-draw');
    document.getElementById('draw-score').textContent = `Ambos ganaron ${playerScore} rondas — ¡está parejo!`;
  } else {
    showScreen('screen-lose');
    document.getElementById('lose-score').textContent = `Ganaste ${playerScore} de ${MAX_TRIES} rondas`;
  }
}

function startGame() {
  playerScore = 0;
  cpuScore    = 0;
  usedTries   = 0;

  document.getElementById('score-player').textContent = '0';
  document.getElementById('score-cpu').textContent    = '0';
  document.getElementById('round-msg').textContent    = '';
  document.getElementById('round-msg').className      = 'round-msg';

  ['dot-1', 'dot-2', 'dot-3'].forEach(id => {
    document.getElementById(id).classList.remove('used');
  });

  const placeholder = `<svg viewBox="0 0 100 100" fill="none"><text x="50" y="60" text-anchor="middle" font-size="40">❓</text></svg>`;
  document.getElementById('display-player').innerHTML = placeholder;
  document.getElementById('display-cpu').innerHTML    = placeholder;
  document.getElementById('display-player').classList.remove('reveal', 'bounce', 'shake');
  document.getElementById('display-cpu').classList.remove('reveal');

  setButtonsDisabled(false);
  showScreen('screen-game');
}

function goHome() {
  const starsEl = document.getElementById('stars');
  if (starsEl) starsEl.innerHTML = '';
  showScreen('screen-intro');
}

/* ─────────────────────────────────────────────────────────────
   5. UTILIDADES DE UI
   ───────────────────────────────────────────────────────────── */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function setButtonsDisabled(state) {
  ['btn-rock', 'btn-paper', 'btn-scissors'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = state;
  });
}

/* ─────────────────────────────────────────────────────────────
   6. EFECTOS VISUALES
   ───────────────────────────────────────────────────────────── */

function launchStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  container.innerHTML = '';
  const symbols = ['✦', '✧', '⋆', '✩', '🐾'];

  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className   = 'star';
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    star.style.left  = Math.random() * 100 + 'vw';
    star.style.top   = Math.random() * 60  + 'vh';
    star.style.animationDelay = (Math.random() * 1.5) + 's';
    star.style.fontSize = (14 + Math.random() * 16) + 'px';
    container.appendChild(star);
  }
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors    = ['#ff65e0', '#ff8ec4', '#ffcdab', '#004d3c'];

  for (let i = 0; i < 20; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = 4 + Math.random() * 8;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: float ${8 + Math.random() * 12}s linear infinite;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// Inicializar efectos al cargar
document.addEventListener('DOMContentLoaded', initParticles);