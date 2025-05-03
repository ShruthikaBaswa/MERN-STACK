let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
updateScoreDisplay();

let isAutoPlaying = false;
let intervalId;
document.querySelectorAll('.move-button').forEach(button => {
    button.addEventListener('click', () => {
        playGame(button.dataset.move);
    });
});
document.querySelector('.reset-score-button').addEventListener('click', resetScore);

document.querySelector('.auto-play-button').addEventListener('click', toggleAutoPlay);

function playGame(playerMove) {
    const computerMove = getRandomMove();
    const result = determineResult(playerMove, computerMove);
    updateScore(result);
    displayResult(result, playerMove, computerMove);
}

function getRandomMove() {
    const moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function determineResult(playerMove, computerMove) {
    if (playerMove === computerMove) return 'Tie';
    if ((playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')) {
        return 'You win.';
    }
    return 'You lose.';
}
function updateScore(result) {
    if (result === 'You win.') score.wins++;
    else if (result === 'You lose.') score.losses++;
    else score.ties++;
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.querySelector('.js-score').textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function displayResult(result, playerMove, computerMove) {
    document.querySelector('.js-result').textContent = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon"> <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
}
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreDisplay();
}
function toggleAutoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = getRandomMove(); 
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}
