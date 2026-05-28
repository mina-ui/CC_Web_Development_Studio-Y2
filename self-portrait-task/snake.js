//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 
//snake 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
//food
var foodX;
var foodY;
var gameOver = false;
var gameInterval;
//scores
var currentScore = 0;
var highScore = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    const scoreDisplay = document.createElement("div");
    scoreDisplay.id = "scoreDisplay";
    scoreDisplay.style.marginBottom = "10px";
    scoreDisplay.innerHTML = `Score: <span id="currentScore">0</span> | High Score: <span id="highScore">0</span>`;
    
    document.querySelector("div").insertAdjacentElement("beforebegin", scoreDisplay);
    
    document.getElementById("restartButton").addEventListener("click", restartGame);
    
    startGame();
}

function startGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    currentScore = 0;
    updateScoreDisplay();
    
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    gameInterval = setInterval(update, 1000/10);
}

function updateScoreDisplay() {
    document.getElementById("currentScore").textContent = currentScore;
    document.getElementById("highScore").textContent = highScore;
}

function restartGame() {
    startGame();
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        currentScore += 10;
        if (currentScore > highScore) {
            highScore = currentScore;
        }
        updateScoreDisplay();
    }
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert(`Game Over! Final Score: ${currentScore}`);
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert(`Game Over! Final Score: ${currentScore}`);
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}