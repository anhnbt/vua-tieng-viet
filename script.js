'use strict';

// List of words for the game
const words = ['nhỏ giọt', 'sao chổi', 'tinh dầu', 'mát lòng', 'thiện cảm', 'đoan trang', 'phất trần','công tử', 'đài trang', 'chăm chút','trống vắng'];

// State variables
let currentWord = '';
let scrambledWord = '';
let timer; // Timer variable
let timeLeft = 40; // Countdown time in seconds
// Khởi tạo đối tượng Audio cho nhạc nền
const backgroundMusic = new Audio('vuatiengviet.m4a');
backgroundMusic.loop = true; // Lặp lại nhạc
backgroundMusic.volume = 0.5; // Đặt âm lượng từ 0.0 đến 1.0

// Hàm bật nhạc nền
const playMusic = () => {
    backgroundMusic.play();
};

// Hàm tắt nhạc nền
const stopMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Đặt lại về đầu
};

// Function to shuffle letters of a word
const shuffleWord = (word) => {
    const shuffled = word.split('').sort(() => Math.random() - 0.5);
    return shuffled.join('');
};

// Function to start the countdown timer
const startTimer = () => {
    timeLeft = 40;
    document.querySelector('.timer').textContent = `Time left: ${timeLeft}s`;
    playMusic();
    // Clear any existing timer to avoid overlap
    clearInterval(timer);

    // Start a new timer
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector('.timer').textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.querySelector('.message').textContent = '⏰ Thời gian đã hết! Hãy cố gắng lên!';
            document.querySelector('.guess-input').disabled = true; // Disable input
            document.querySelector('.check-button').disabled = true; // Disable check button
            stopMusic();
        }
    }, 1000);
};

// Function to reset the game state
const resetGame = () => {
    document.querySelector('.guess-input').disabled = false;
    document.querySelector('.check-button').disabled = false;
    startTimer();

};

// Function to pick a new word and scramble it
const generateNewWord = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = shuffleWord(currentWord);
    document.querySelector('.scrambled-word').textContent = scrambledWord;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.guess-input').value = '';
    document.querySelector('.container').style.backgroundColor = '#fff';
    resetGame();
};

// Function to check the player's guess
const checkGuess = () => {
    const playerGuess = document.querySelector('.guess-input').value.toLowerCase();
    if (!playerGuess) {
        document.querySelector('.message').textContent = '⛔ Enter a word!';
        return;
    }
    if (playerGuess === currentWord) {
        document.querySelector('.message').textContent = '🎉 Correct!';
        document.querySelector('.container').style.backgroundColor = '#60b347';
        clearInterval(timer);
        stopMusic()
        // Fireworks effect with Canvas Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {x: 0.5, y: 0.5}
        });

        clearInterval(timer); // Stop the timer when player wins
        document.querySelector('.guess-input').disabled = true;
        document.querySelector('.check-button').disabled = true;
    } else {
        document.querySelector('.message').textContent = '❌ Try again!';
    }
};

// Event listeners for buttons
document.querySelector('.check-button').addEventListener('click', checkGuess);
document.querySelector('.new-word-button').addEventListener('click', generateNewWord);

// Event listener for pressing Enter in the input field
document.querySelector('.guess-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Initialize the game
generateNewWord();
