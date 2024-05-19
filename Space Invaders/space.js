// Board settings
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// Ship settings
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
};

let shipImg;
let shipVelocityX = tileSize; // Ship moving speed

// Alien settings
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; // Number of aliens to defeat
let alienVelocityX = 1; // Alien moving speed

// Bullet settings
let bulletArray = [];
let bulletVelocityY = -10; // Bullet moving speed

let score = 0;
let highscore = localStorage.getItem("highscore_space") || 0;
const highscore_output = document.getElementById("highscore");
const global_highscore_output = document.getElementById("global_highscore");
getHighscore();

let requestAnimationFrameID;
let gameOver = false;

initializeBoard();

function initializeBoard() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); // Used for drawing on the board

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    context.font = "bold 48px Arial";
    context.fillStyle = "limegreen";
    context.fillText("PRESS TO PLAY!", 50, 250);
    context.font = ("20px Arial")
    context.fillText("Shoot aliens by pressing the space key", 80, 350)
    context.fillText("and move to the left and right with the arrow keys", 40, 400)

    board.addEventListener("click", start);
}

function start() {
    resetGame();

    // Load images
    shipImg = new Image();
    shipImg.src = "./ship.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    };

    alienImg = new Image();
    alienImg.src = "./alien.png";
    alienImg.onload = function () {
        createAliens();
        requestAnimationFrame(update);
    };

    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
}

function resetGame() {
    gameOver = false;
    score = 0;
    alienArray = [];
    bulletArray = [];
    ship.x = shipX;
    ship.y = shipY;
    alienRows = 2;
    alienColumns = 3;
    alienVelocityX = 1;

    context.clearRect(0, 0, board.width, board.height);
}

function update() {
    if (gameOver) {
        theEnd();
        return;
    }

    requestAnimationFrameID = requestAnimationFrame(update);

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Draw ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    // Move and draw aliens
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;

            // If alien touches the borders
            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;

                // Move all aliens down by one row
                for (let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            if (alien.y >= ship.y) {
                gameOver = true;
                theEnd();
            }
        }
    }

    // Move and draw bullets
    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Bullet collision with aliens
        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
            }
        }
    }

    // Clear used bullets
    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    // Next level
    if (alienCount == 0) {
        score += alienColumns * alienRows * 100; // Bonus points
        alienColumns = Math.min(alienColumns + 1, columns / 2 - 2); // Cap at 6
        alienRows = Math.min(alienRows + 1, rows - 4); // Cap at 12
        if (alienVelocityX > 0) {
            alienVelocityX += 0.2;
        } else {
            alienVelocityX -= 0.2;
        }
        createAliens();
    }

    // Draw score
    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText(score, 5, 20);
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore_space", highscore);
    }
    highscore_output.innerHTML = "Highscore:  " + highscore;
    global_highscore_output.innerHTML = "Global Highscore:  " + APIhighscore;
}

function moveShip(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX; // Move left one tile
    } else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX; // Move right one tile
    }
}

function createAliens() {
    alienArray = []; // Ensure alienArray is empty before creating new aliens
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img: alienImg,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            };
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

function shoot(e) {
    if (gameOver) {
        theEnd;
        return;
    }

    if (e.code == "Space") {
        let bullet = {
            x: ship.x + shipWidth * 15 / 32,
            y: ship.y,
            width: tileSize / 8,
            height: tileSize / 2,
            used: false
        };
        bulletArray.push(bullet);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   // a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&   // a's top right corner passes b's top left corner
        a.y < b.y + b.height &&  // a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;    // a's bottom left corner passes b's top left corner
}

function theEnd() {
    cancelAnimationFrame(requestAnimationFrameID);
    context.font = "bold 48px Arial";
    context.fillStyle = "red";
    context.fillText("GAME OVER", 100, 250);
    board.addEventListener("click", start);
    if (highscore > APIhighscore) {
        postHighscore(highscore);
    }
}