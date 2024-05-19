//brettet 
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//spillere
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: 0
}

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: 0
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
}

let player1Score = 0;
let player2Score = 0;


//generelt 
board = document.getElementById("board");
board.height = boardHeight;
board.width = boardWidth;
context = board.getContext("2d"); //for å tegne på brettet 

//start "siden"
context.font = "bold 48px Arial";
context.fillStyle = "skyblue";
context.fillText("PRESS TO PLAY!", 50, 250)
context.font = "20px Arial";
context.fillText("player 1 moves up with W and down with S", 50, 350)
context.fillText("player 2 moves up and down with the arrow keys", 30, 400)
context.font = ("bold 20px Arial")
context.fillText("The first player who reach 10 points wins!", 45, 450)

//trykk for å starte
board.addEventListener("click", start)

function start() {
    // default settings
    gameOver = false;
    player1Score = 0;
    player2Score = 0;
    player1.y = boardHeight / 2;
    player2.y = boardHeight / 2;
    player1.velocityY = 0;
    player2.velocityY = 0;
    ball.velocityX = 1;
    ball.velocityY = 2;

    //tegn spiller én 
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer); //lytter etter tastaturtrykk 
}

function update() {
    if (gameOver) {
        theEnd()
        return;
    }

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // spiller én
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // spiller to
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) {
        //hvis ballen treffer toppen eller bunnen av brettet
        ball.velocityY *= -1; //endrer retning på ballen
        increaseBallSpeed();
    }

    //ballen spretter tilbake 
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { //ball treffer spiller én (med venstre side av ballen)
            ball.velocityX *= -1;   //bytter ballens retning 
            increaseBallSpeed();
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { //ball treffer spiller to (med høyre side av ballen)
            ball.velocityX *= -1;   //bytter ballens retning 
            increaseBallSpeed();
        }
    }

    //game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    // tegner skille på midten 
    for (let i = 10; i < board.height; i += 25) { //i = startende y posisjon, tegner en firkant etter 25px med mellomrom 
        context.fillRect(board.width / 2 - 10, i, 5, 5);
    }

    //score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);

    //vinner betingelser 
    if (player1Score === 10) {
        context.font = "bold 48px Arial";
        context.fillStyle = "green";
        context.fillText("SPILLER 1", 120, 300);
        context.fillText("HAR VUNNET", 80, 350);
        gameOver = true;
    }
    if (player2Score === 10) {
        context.font = "bold 48px Arial";
        context.fillStyle = "green";
        context.fillText("SPILLER 2", 120, 300);
        context.fillText("HAR VUNNET", 80, 350);
        gameOver = true;
    }
}

//sjekker om spilleren er utenfor banen
function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    //spiller én
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //spiller to
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

//øker ballens fart etter hver kollisjon 
function increaseBallSpeed() {
    if (ball.velocityX > 0) {
        ball.velocityX += 0.05;
    }
    else {
        ball.velocityX -= 0.05;
    }
    if (ball.velocityY > 0) {
        ball.velocityY += 0.05;
    }
    else {
        ball.velocityY -= 0.05;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's øvre venstre hjørne når ikke b's øvre høyre hjørne
        a.x + a.width > b.x &&   //a's øvre høyre hjørne passerer b's øverste venstre hjørne
        a.y < b.y + b.height &&  //a's øvre venstre hjørne når ikke b's nedre venstre hjørne
        a.y + a.height > b.y;    //a's nedre venstre hjørne passerer b's øvre venstre hjørne
}

//reseter ballen for hver gang noen har fått poeng 
function resetGame(direction) {
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2
    }
}

function theEnd() {
    context.font = "bold 48px Arial";
    context.fillStyle = "red";
    context.fillText("GAME OVER", 100, 200);
    addEventListener("click", start)
}