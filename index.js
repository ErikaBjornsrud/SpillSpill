const vid = document.getElementById("video")

// Konstanter 
const react_hover = document.getElementById("react_hover");
const snake_hover = document.getElementById("snake_hover");

// When hover, change color to black 
snake_hover.addEventListener("mouseover", function() {
    hover(snake_hover);
});

react_hover.addEventListener("mouseover", function() {
    hover(react_hover);
});

function hover(hoverElm) {
    hoverElm.style.color = "black";
    console.log("hei");
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


