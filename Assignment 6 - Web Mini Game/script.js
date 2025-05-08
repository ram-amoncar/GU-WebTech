const colors = ["Red", "Cyan", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "White", "Gray", "Black"];

const guessInput = document.getElementById("guess");
const roundsInput = document.getElementById("rounds");
const colorBox = document.getElementById("color-box");
const colorName = document.getElementById("color-name");
const resultText = document.getElementById("result");
const timeText = document.getElementById("time");
const wpmText = document.getElementById("wpm");
const correctGuessesText = document.getElementById("correct-guesses");

let currentColor = "";
let startTime, timer, countdown, gameStartTime;
let correctGuesses = 0, totalGuesses = 0;
let totalRounds = 5, currentRound = 0;

function startGame() {
    guessInput.focus();
    clearTimeout(timer);
    clearInterval(countdown);

    correctGuesses = 0;
    totalGuesses = 0;
    gameStartTime = new Date().getTime();
    
    // Get the number of rounds from user input
    totalRounds = parseInt(roundsInput.value, 10) || 5;
    currentRound = 0;

    showNextColor();
}

function showNextColor() {
    clearTimeout(timer);
    clearInterval(countdown);

    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    currentRound++;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const colorsWithoutRandom = colors.filter(color => color !== randomColor);
    const randomText = colors[Math.floor(Math.random() * colors.length)];

    colorBox.style.backgroundColor = randomColor;
    colorName.textContent = randomText;
    colorName.style.color = colorsWithoutRandom[Math.floor(Math.random() * colorsWithoutRandom.length)];
    resultText.textContent = "";
    guessInput.value = "";

    currentColor = randomColor;
    startTime = new Date().getTime();

    let timeLeft = 5;
    timeText.textContent = `${timeLeft}s left`;

    countdown = setInterval(() => {
        timeLeft -= 0.1;
        timeText.textContent = `${timeLeft.toFixed(2)}s left`;
        if (timeLeft <= 0) {
            timeText.textContent = `0s left`;
            clearInterval(countdown);
            showNextColor();
        }
    }, 100);

    timer = setTimeout(() => {
        resultText.textContent = "Time's up! You didn't guess in time.";
        resetInput();
        clearInterval(countdown);
        showNextColor();
    }, 5000);
}

function submitGuess() {
    clearTimeout(timer);
    clearInterval(countdown);
    
    const guess = guessInput.value.trim().toLowerCase();
    const timeTaken = ((new Date().getTime() - startTime) / 1000).toFixed(2);

    totalGuesses++;

    if (guess === currentColor.toLowerCase()) {
        correctGuesses++;
        resultText.textContent = `Correct! You took ${timeTaken} seconds.`;
    } else {
        resultText.textContent = `Wrong! The correct color was ${currentColor}.`;
    }

    updateStats();
    resetInput();
    showNextColor();
}

function updateStats() {
    const elapsedMinutes = (new Date().getTime() - gameStartTime) / 1000 / 60;
    const wordsPerMinute = elapsedMinutes > 0 ? (totalGuesses / elapsedMinutes).toFixed(1) : 0;

    wpmText.textContent = `WPM: ${wordsPerMinute}`;
    correctGuessesText.textContent = `Correct Guesses: ${correctGuesses}`;
}

function resetInput() {
    guessInput.style.background = 'white';
    guessInput.value = '';
}

// Input field listener for automatic checking
guessInput.addEventListener('input', () => {
    guessInput.style.backgroundColor = guessInput.value.toLowerCase() === currentColor.toLowerCase() ? 'lightgreen' : 'crimson';
    if (guessInput.value.toLowerCase() === currentColor.toLowerCase()) {
        submitGuess();
    }
});

function endGame() {
    resultText.textContent = `Game Over! You guessed ${correctGuesses} out of ${totalRounds} correctly.`;
    timeText.textContent = "";
    guessInput.disabled = true;
}
