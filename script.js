var elems = [];
var state = false;
var player1Name = "";
var player2Name = "";
var player1Score = 0;
var player2Score = 0;
var winThreshold = 5; // Number of points needed to win

function loadGame() {
    elems = [];

    for (let i = 1; i < 7; i++) {
        const element = document.getElementById("op-" + String(i));
        elems.push(element);
        element.style.display = "none";
    }
    
    // Hide congrats message initially
    document.getElementById("congrats-message").style.display = "none";
}

function startGame() {
    player1Name = document.getElementById("player1").value || "Player 1";
    player2Name = document.getElementById("player2").value || "Player 2";
    
    document.getElementById("player1-name").textContent = player1Name;
    document.getElementById("player2-name").textContent = player2Name;
    
    // Reset scores when starting a new game
    player1Score = 0;
    player2Score = 0;
    updateScores();
    
    document.getElementById("player-names").style.display = "none";
    document.getElementById("game-container").style.display = "flex";
    document.querySelector(".bottom").style.display = "flex";
    
    // Hide congrats message if it was showing
    document.getElementById("congrats-message").style.display = "none";
}

function updateScores() {
    document.getElementById("player1-score").textContent = "Score: " + player1Score;
    document.getElementById("player2-score").textContent = "Score: " + player2Score;
    
    // Check if someone won
    checkWinner();
}

function checkWinner() {
    if (player1Score >= winThreshold || player2Score >= winThreshold) {
        let winnerName = player1Score >= winThreshold ? player1Name : player2Name;
        showCongratulations(winnerName);
    }
}

function showCongratulations(winnerName) {
    const congratsMessage = document.getElementById("congrats-message");
    const winnerText = document.getElementById("winner-text");
    const winnerNameElement = document.getElementById("winner-name");
    
    winnerText.textContent = "🎉 Congratulations! 🎉";
    winnerNameElement.textContent = winnerName + " wins the game!";
    
    // Hide game elements
    document.getElementById("game-container").style.display = "none";
    document.querySelector(".bottom").style.display = "none";
    
    // Show congratulation message with delay for transition effect
    setTimeout(() => {
        congratsMessage.style.display = "flex";
        setTimeout(() => {
            congratsMessage.style.opacity = "1";
            congratsMessage.style.transform = "scale(1)";
        }, 50);
    }, 1000);
}

function resetGame() {
    // Hide congrats message with transition
    const congratsMessage = document.getElementById("congrats-message");
    congratsMessage.style.opacity = "0";
    congratsMessage.style.transform = "scale(0.5)";
    
    setTimeout(() => {
        congratsMessage.style.display = "none";
        // Show player names screen to start new game
        document.getElementById("player-names").style.display = "flex";
        document.getElementById("player1").value = "";
        document.getElementById("player2").value = "";
    }, 500);
}

function play() {
    // Don't allow playing if someone already won
    if (player1Score >= winThreshold || player2Score >= winThreshold) {
        return;
    }
    
    var left = Math.floor(Math.random() * 3);
    var right = Math.floor(Math.random() * 3) + 3;

    for (let i = 1; i < 7; i++) {
        const element = document.getElementById("op-" + String(i));
        element.style.display = "none";
        element.style.backgroundColor = "";
    }

    elems[left].style.display = "inline";
    elems[right].style.display = "inline";
    
    startRepeat();
    state = true;
}

function startRepeat() {
    if (!state) {
        var rep = setInterval(() => {
            play();
        }, 100);

        endGame(rep);
    }
}

function endGame(rep) {
    setTimeout(() => {
        state = false;
        clearInterval(rep);
        showResult();
    }, 4000);
}

function showResult() {
    var result = [];
    var indexes = [];
    for (let i = 0; i < elems.length; i++) {
        const element = elems[i];
        
        if (element.style.display == "inline") {
            result.push(element);
            indexes.push(i % 3);
        }
    }
    
    if(indexes[0] == indexes[1]){
        result[0].style.backgroundColor = "#ffff00";
        result[1].style.backgroundColor = "#ffff00";
    }
    else if (indexes[0] == 0 && indexes[1] == 1) {
        result[1].style.backgroundColor = "#00ff00";
        player2Score++;
    }
    else if (indexes[0] == 0 && indexes[1] == 2) {
        result[0].style.backgroundColor = "#00ff00";
        player1Score++;
    }
    else if (indexes[0] == 1 && indexes[1] == 0) {
        result[0].style.backgroundColor = "#00ff00";
        player1Score++;
    }
    else if (indexes[0] == 1 && indexes[1] == 2) {
        result[1].style.backgroundColor = "#00ff00";
        player2Score++;
    }
    else if (indexes[0] == 2 && indexes[1] == 0) {
        result[1].style.backgroundColor = "#00ff00";
        player2Score++;
    }
    else if (indexes[0] == 2 && indexes[1] == 1) {
        result[0].style.backgroundColor = "#00ff00";
        player1Score++;
    }
    
    updateScores();
}