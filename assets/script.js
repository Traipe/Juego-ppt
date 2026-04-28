let playerScore = 0;
let cpuScore = 0;
let usedTries = 0;
const MAX_TRIES = 3;
const choices = ['rock', 'paper', 'scissors'];

const svgMap = {
    rock: document.getElementById('btn-rock').querySelector('svg').innerHTML,
    paper: document.getElementById('btn-paper').querySelector('svg').innerHTML,
    scissors: document.getElementById('btn-scissors').querySelector('svg').innerHTML
};

function play(playerChoice) {
    if (usedTries >= MAX_TRIES) return;

    setButtonsDisabled(true);
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
    usedTries++;

    const dpPlayer = document.getElementById('display-player');
    const dpCpu = document.getElementById('display-cpu');
    const msgEl = document.getElementById('round-msg');

    // Limpiar clases de animación
    dpPlayer.classList.remove('reveal', 'bounce', 'shake');
    dpCpu.classList.remove('reveal');
    void dpPlayer.offsetWidth; // Force reflow

    // Mostrar selecciones
    dpPlayer.innerHTML = `<svg viewBox="0 0 100 120">${svgMap[playerChoice]}</svg>`;
    dpCpu.innerHTML = `<svg viewBox="0 0 100 120">${svgMap[cpuChoice]}</svg>`;
    dpPlayer.classList.add('reveal');
    dpCpu.classList.add('reveal');

    // Marcar punto usado
    document.getElementById(`dot-${usedTries}`).classList.add('used');

    const result = (playerChoice === cpuChoice) ? 'draw' : 
                   ((playerChoice === 'rock' && cpuChoice === 'scissors') ||
                    (playerChoice === 'paper' && cpuChoice === 'rock') ||
                    (playerChoice === 'scissors' && cpuChoice === 'paper')) ? 'win' : 'lose';

    msgEl.className = 'round-msg';
    if (result === 'win') {
        playerScore++;
        msgEl.textContent = '🐾 ¡Ganaste la ronda!';
        msgEl.classList.add('win');
        dpPlayer.classList.add('bounce');
    } else if (result === 'lose') {
        cpuScore++;
        msgEl.textContent = '😿 La CPU ganó la ronda';
        msgEl.classList.add('lose');
        dpPlayer.classList.add('shake');
    } else {
        msgEl.textContent = '🐱 Empate';
        msgEl.classList.add('draw');
    }

    document.getElementById('score-player').textContent = playerScore;
    document.getElementById('score-cpu').textContent = cpuScore;

    setTimeout(() => {
        if (usedTries >= MAX_TRIES) {
            endGame();
        } else {
            setButtonsDisabled(false);
        }
    }, 1200);
}

function endGame() {
    let screenId = 'screen-draw';
    let msg = `Final: ${playerScore} vs ${cpuScore}`;

    if (playerScore > cpuScore) {
        screenId = 'screen-win';
        msg = `¡Dominas el mundo gatuno! 🎉 (${playerScore} de ${MAX_TRIES})`;
        launchStars();
    } else if (cpuScore > playerScore) {
        screenId = 'screen-lose';
        msg = `La CPU fue más ágil esta vez 😿`;
    }

    showScreen(screenId);
    const scoreDisplay = document.getElementById(screenId.replace('screen-', '') + '-score');
    if (scoreDisplay) scoreDisplay.textContent = msg;
}

function startGame() {
    playerScore = 0; cpuScore = 0; usedTries = 0;
    document.getElementById('score-player').textContent = '0';
    document.getElementById('score-cpu').textContent = '0';
    document.getElementById('round-msg').textContent = '';
    
    for (let i = 1; i <= 3; i++) document.getElementById(`dot-${i}`).classList.remove('used');
    
    const placeholder = `<svg viewBox="0 0 100 100"><text x="50" y="65" text-anchor="middle" font-size="40">❓</text></svg>`;
    document.getElementById('display-player').innerHTML = placeholder;
    document.getElementById('display-cpu').innerHTML = placeholder;
    
    setButtonsDisabled(false);
    showScreen('screen-game');
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function setButtonsDisabled(state) {
    ['btn-rock', 'btn-paper', 'btn-scissors'].forEach(id => document.getElementById(id).disabled = state);
}

function goHome() { showScreen('screen-intro'); }

function initParticles() {
    const container = document.getElementById('particles');
    const colors = ['#ff65e0', '#ff8ec4', '#ffcdab'];
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 8 + 4;
        p.style.width = p.style.height = `${size}px`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        container.appendChild(p);
    }
}

function launchStars() {
    const container = document.getElementById('stars');
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.textContent = '🐾';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(s);
    }
}

document.addEventListener('DOMContentLoaded', initParticles);