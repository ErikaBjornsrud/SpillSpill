const stickhero = document.getElementById("stickhero")
const img = document.querySelector(".img")
const vid = document.querySelector(".vid")

stickhero.addEventListener("mouseover", hover())

function hover() {
    img.classList.remove("aktiv")
    img.classList.add("uaktiv")
    vid.classList.remove("uaktiv")
    vid.classList.add("aktiv")
}


const react = document.getElementById("react")


