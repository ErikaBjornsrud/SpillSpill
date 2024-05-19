//brett
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snake 
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//mat
let foodX;
let foodY;

// Scores
const score_output = document.getElementById("score");
const highscore_output = document.getElementById("highscore");
const global_highscore_output = document.getElementById("global_highscore");
let score_counter = -1;
let highscore = localStorage.getItem("highscore_snake") || 0;
getHighscore()

//generelt
board = document.getElementById("board");
board.height = rows * blockSize;
board.width = cols * blockSize;
context = board.getContext("2d"); 

let gameOver = false;

// start "side"
context.fillStyle = "black";
context.fillRect(0, 0, board.width, board.height);
context.font = "bold 48px Arial";
context.fillStyle = "red";
context.fillText("PRESS TO PLAY!", 50, 250)
context.font = "20px Arial";
context.fillText("You move around with the arrow keys", 80, 350)
context.fillText("The more apples you eat, the longer the snake grows!", 10, 400)

spill_interval = setInterval(update, 100); //100 ms
clearInterval(spill_interval)

board.addEventListener("click", start)

function start() {
    // Resetter spillerinformasjon 
    score_counter = -1;
    gameOver = false;
    snakeBody = [];
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    clearInterval(spill_interval)
    spill_interval = setInterval(update, 100); //100 ms
}

function update() {
    if (gameOver) {
        theEnd();
        return;
    }

    //brett 
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //mat
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //slangen spiser eple og blir større 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    //slangens bevegelse / oppdaterte posisjon 
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //tegner slangen og oppdaterer posisjonen til slangens hode 
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //betingelsene for game over 
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        theEnd();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            theEnd();
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
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;


    score_counter += 1;
    if (score_counter > highscore) {
        highscore = score_counter;
        localStorage.setItem("highscore_snake", highscore);
    }
    score_output.innerHTML = "Score:  " + score_counter;
    highscore_output.innerHTML = "Highscore:  " + highscore;
    global_highscore_output.innerHTML = "Global Highscore:  " + APIhighscore;
}

function theEnd() {
    context.font = "bold 48px Arial";
    context.fillStyle = "red";
    context.fillText("GAME OVER", 100, 250);
    clearInterval(spill_interval)
    if (highscore > APIhighscore) {
        postHighscore(highscore)
    }
}