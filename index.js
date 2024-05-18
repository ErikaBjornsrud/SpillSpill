// const vid = document.getElementById("video").src;

// Konstanter 
const space_hover = document.getElementById("space_hover");
const snake_hover = document.getElementById("snake_hover");
const pong_hover = document.getElementById("pong_hover");

// When hover, change color to black 
snake_hover.addEventListener("mouseover", function() {
    hover(snake_hover);
    snakeVideo();
});

space_hover.addEventListener("mouseover", function() {
    hover(space_hover);
    spaceVideo();
});

pong_hover.addEventListener("mouseover", function() {
    hover(pong_hover);
    pongVideo();
});

function hover(hoverElm) {
    hoverElm.style.color = "black";
}


// Brings back the white color 
snake_hover.addEventListener("mouseout", function() {
    out(snake_hover);
});

space_hover.addEventListener("mouseout", function() {
    out(space_hover);
});

pong_hover.addEventListener("mouseout", function() {
    out(pong_hover);
});

function out(outElm) {
    outElm.style.color = "white";
}


// Video functions 

function snakeVideo() {
    document.getElementById("video").src = "Bilder og videoer/stickhero.mp4"
}
function spaceVideo() {
    document.getElementById("video").src = "Bilder og videoer/React.mp4"
}
function pongVideo() {
    document.getElementById("video").src = "Bilder og videoer/React.mp4"
}