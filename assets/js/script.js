let playerScore = 0;
let cpuScore = 0;
let usedTries = 0;
const MAX_TRIES = 3;
const choices = ['rock', 'paper', 'scissors'];
let svgMap = {};

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    svgMap = {
        rock: document.getElementById('btn-rock').innerHTML,
        paper: document.getElementById('btn-paper').innerHTML,
        scissors: document.getElementById('btn-scissors').innerHTML
    };
});

function play(playerChoice) {
    if (usedTries >= MAX_TRIES) return;

    setButtonsDisabled(true);
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
    usedTries++;

    const dpPlayer = document.getElementById('display-player');
    const dpCpu = document.getElementById('display-cpu');
    const msgEl = document.getElementById('round-msg');

    // Visualizar jugadas
    dpPlayer.innerHTML = svgMap[playerChoice];
    dpCpu.innerHTML = svgMap[cpuChoice];

    const dot = document.getElementById(`dot-${usedTries}`);
    if (dot) dot.classList.add('used');

    const result = (playerChoice === cpuChoice) ? 'draw' : 
                   ((playerChoice === 'rock' && cpuChoice === 'scissors') ||
                    (playerChoice === 'paper' && cpuChoice === 'rock') ||
                    (playerChoice === 'scissors' && cpuChoice === 'paper')) ? 'win' : 'lose';

    setTimeout(() => {
        if (result === 'win') {
            playerScore++;
            msgEl.textContent = '🐾 ¡Puntito para ti!';
        } else if (result === 'lose') {
            cpuScore++;
            msgEl.textContent = '😿 Puntito para la CPU';
        } else {
            msgEl.textContent = '🐱 ¡Empate de ronda!';
        }

        document.getElementById('score-player').textContent = playerScore;
        document.getElementById('score-cpu').textContent = cpuScore;

        if (usedTries >= MAX_TRIES) {
            setTimeout(endGame, 1000);
        } else {
            setButtonsDisabled(false);
        }
    }, 400);
}

function endGame() {
    if (playerScore > cpuScore) showScreen('screen-win');
    else if (playerScore === cpuScore) showScreen('screen-draw');
    else showScreen('screen-lose');
}

function startGame() {
    playerScore = 0; cpuScore = 0; usedTries = 0;
    document.getElementById('score-player').textContent = '0';
    document.getElementById('score-cpu').textContent = '0';
    document.getElementById('round-msg').textContent = '';
    for (let i = 1; i <= 3; i++) document.getElementById(`dot-${i}`).classList.remove('used');
    showScreen('screen-game');
    setButtonsDisabled(false);
}

function goHome() { showScreen('screen-intro'); }

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function setButtonsDisabled(state) {
    ['btn-rock', 'btn-paper', 'btn-scissors'].forEach(id => document.getElementById(id).disabled = state);
}

function initParticles() {
    const container = document.getElementById('particles');
    const colors = ['#ff65e0', '#00ffff', '#ffcdab'];
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 5 + 2;
        p.style.width = `${size}px`; p.style.height = `${size}px`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        container.appendChild(p);
    }
}

document.getElementById('current-year').textContent = new Date().getFullYear();