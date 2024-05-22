document.addEventListener("DOMContentLoaded", function() {

    // Function to toggle visibility of content for each box
    function toggleBoxContent(buttonId, contentId) {
        var button = document.getElementById(buttonId);
        var content = document.getElementById(contentId);
        var originalText = button.textContent; 

        button.addEventListener("click", function() {
            if (content.style.display === "none") {
                content.style.display = "block";
                button.textContent = "X"; 
                button.classList.add("absolute"); 
            } else {
                content.style.display = "none";
                button.textContent = originalText; 
                button.classList.remove("absolute"); 
            }
        });
    }

    // Toggle visibility for each box
    toggleBoxContent("about-me-btn", "about-me-text");
    toggleBoxContent("personal-details-btn", "personal-details-text");
    toggleBoxContent("interests-btn", "interests-text");
    toggleBoxContent("final-note-btn", "final-note-text");
    toggleBoxContent("box5-btn", "box5-text");
    toggleBoxContent("box6-btn", "box6-text");
    toggleBoxContent("box7-btn", "box7-text");
    toggleBoxContent("box8-btn", "box8-text");

    // Lamp toggling function
    function toggleLamp() {
        var lampImage = document.getElementById("lamp-image");
        var body = document.body;
        var h1 = document.querySelector("h1");
        var h2 = document.querySelector("h2");
        var boxButtons = document.querySelectorAll(".box-button");
        var boxContents = document.querySelectorAll(".box p"); 

        if (lampImage.src.endsWith("bulb-off.png")) {
            lampImage.src = "https://i.postimg.cc/6QyTynzr/bulb-on.png";
            body.style.backgroundImage = "url('ImageDark.png')"; 
            boxButtons.forEach(function(button) {
                button.style.color = "red";
            });
            // Change text color to red
            boxContents.forEach(function(content) {
                content.style.color = "red";
            });
            // Change "Duality of Insanity" text color to red
            h1.style.color = "red";
        } else {
            lampImage.src = "https://i.postimg.cc/KjK1wL3c/bulb-off.png";
            body.style.backgroundImage = "url('ImageLight.png')"; 
            boxButtons.forEach(function(button) {
                button.style.color = "#fff";
            });
            // Revert text color to white
            boxContents.forEach(function(content) {
                content.style.color = "#fff";
            });
            // Revert "Duality of Insanity" text color to white
            h1.style.color = "#fff";
        }
    }

    document.getElementById("lamp-image").addEventListener("click", toggleLamp);

    // Tic Tac Toe game logic with AI
    const cells = document.querySelectorAll(".cell");
    const resetBtn = document.getElementById("reset-btn");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-index"));

        if (gameState[cellIndex] !== "" || checkWinner()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            setTimeout(() => alert(currentPlayer + " wins!"), 100);
            return;
        }

        currentPlayer = "O"; 
        setTimeout(makeAIMove, 500); 
    }

    function makeAIMove() {
        let availableCells = gameState.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        if (availableCells.length === 0) return;

        let aiMove = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[aiMove] = "O";
        document.querySelector(`.cell[data-index='${aiMove}']`).textContent = "O";

        if (checkWinner()) {
            setTimeout(() => alert("O wins!"), 100);
            return;
        }

        currentPlayer = "X"; 
    }

    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetBtn.addEventListener("click", resetGame);

    // Guess the Number game logic
    const guessInput = document.getElementById("guess-input");
    const submitGuessBtn = document.getElementById("submit-guess-btn");
    const feedback = document.getElementById("feedback");
    const resetGuessBtn = document.getElementById("reset-guess-btn");
    const instructions = document.getElementById("instructions");

    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    submitGuessBtn.addEventListener("click", function() {
        const userGuess = parseInt(guessInput.value);
        attempts++;
        if (userGuess === randomNumber) {
            feedback.textContent = `Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`;
            feedback.style.color = "green";
        } else if (userGuess > randomNumber) {
            feedback.textContent = "Too high! Try again.";
            feedback.style.color = "red";
        } else {
            feedback.textContent = "Too low! Try again.";
            feedback.style.color = "red";
        }
    });

    resetGuessBtn.addEventListener("click", function() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        feedback.textContent = "";
        guessInput.value = "";
        instructions.textContent = "Guess a number between 1 and 100:";
    });

    // Wordle game logic
    const wordleGrid = document.getElementById("wordle-grid");
    const wordleInput = document.getElementById("wordle-input");
    const submitWordleBtn = document.getElementById("submit-wordle-btn");
    const resetWordleBtn = document.getElementById("reset-wordle-btn");
    const wordleFeedback = document.getElementById("wordle-feedback");

    const wordleWords = ["apple", "bread", "candy", "dance", "eagle"];
    let selectedWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
    let currentRow = 0;
    const maxAttempts = 6;

    submitWordleBtn.addEventListener("click", function() {
        const userGuess = wordleInput.value.toLowerCase();
        if (userGuess.length !== 5 || currentRow >= maxAttempts) {
            return;
        }

        const currentRowDivs = document.querySelectorAll(`.wordle-row-${currentRow} div`);
        let feedbackText = "";
        for (let i = 0; i < 5; i++) {
            currentRowDivs[i].textContent = userGuess[i];
            if (userGuess[i] === selectedWord[i]) {
                currentRowDivs[i].style.backgroundColor = "green";
            } else if (selectedWord.includes(userGuess[i])) {
                currentRowDivs[i].style.backgroundColor = "orange";
            } else {
                currentRowDivs[i].style.backgroundColor = "red";
            }
        }

        if (userGuess === selectedWord) {
            wordleFeedback.textContent = "Congratulations! You've guessed the word!";
            wordleFeedback.style.color = "green";
        } else {
            currentRow++;
            if (currentRow === maxAttempts) {
                wordleFeedback.textContent = `Game over! The word was: ${selectedWord}`;
                wordleFeedback.style.color = "red";
            }
        }

        wordleInput.value = "";
    });

    resetWordleBtn.addEventListener("click", function() {
        selectedWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
        currentRow = 0;
        wordleFeedback.textContent = "";
        wordleInput.value = "";
        for (let i = 0; i < maxAttempts; i++) {
            const rowDivs = document.querySelectorAll(`.wordle-row-${i} div`);
            rowDivs.forEach(div => {
                div.textContent = "";
                div.style.backgroundColor = "#333";
            });
        }
    });
});