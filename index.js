// const vid = document.getElementById("video").src;

// Konstanter 
const react_hover = document.getElementById("react_hover");
const snake_hover = document.getElementById("snake_hover");

// When hover, change color to black 
snake_hover.addEventListener("mouseover", function() {
    hover(snake_hover);
    snakeVideo();
});

react_hover.addEventListener("mouseover", function() {
    hover(react_hover);
    reactVideo();
});

function hover(hoverElm) {
    hoverElm.style.color = "black";
}


// Brings back the white color 
snake_hover.addEventListener("mouseout", function() {
    out(snake_hover);
});

react_hover.addEventListener("mouseout", function() {
    out(react_hover);
});

function out(outElm) {
    outElm.style.color = "white";
}


// Video functions 

function snakeVideo() {
    document.getElementById("video").src = "Bilder og videoer/stickhero.mp4"
}
function reactVideo() {
    document.getElementById("video").src = "Bilder og videoer/React.mp4"
}