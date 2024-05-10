const stickhero = document.getElementById("stickhero")
const img = document.querySelector(".img")
const vid = document.querySelector(".vid")

stickhero.addEventListener("mouseover", hover())

function hover() {
    document.body.style.backgroundColor = "red"
    img.classList.add("hidden")
    vid.classList.remove("hidden")
}


const react = document.getElementById("react")


