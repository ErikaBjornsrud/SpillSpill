// Jeg valgte å kommentere en del på javascripten for å både vise at jeg forstår/for å ha kontroll, men også for å gjøre den enklere å se gjennom :)
// Jeg sender gjerne en versjon uten kommentarer om du ønsker det!


const backgroundMusic = document.getElementById("minBakgrunnsmusikk");
const musikk_AvPaa = document.getElementById("musikk_button")

function AvPaaMusikk() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musikk_AvPaa.innerHTML = "Musikk: PÅ"
  } else {
    backgroundMusic.pause();
    musikk_AvPaa.innerHTML = "Musikk: AV"
  }
}

document.addEventListener("click", function () { // Start musikk ved spillerens første klikk
  backgroundMusic.play();
  musikk_AvPaa.innerHTML = "Musikk: PÅ"
  document.removeEventListener("click", arguments.callee); // Fjern EventListener slik at musikken ikke skrur seg på ved hvert eneste klikk
});


const start = document.querySelector(".start");
const klikkbart_omrode = document.querySelector(".klikkbart_omrode");
const melding = document.querySelector(".klikkbart_omrode .melding");
const slutt = document.querySelector(".slutt");
const reaksjonstest_resultat_p = document.querySelector(".slutt .reaksjonstest_resultat_p");
const gjennomsnittlig_rt = document.querySelector(".slutt .gjennomsnittlig_rt")
const spilligjen_button = document.querySelector(".slutt .spilligjen_button");

let timer;
let gronnDisplayed;
let timeGronnDisplayed;
let venterPaaStart;
let venterPaaGronn;
let scores;

function beforeSpillStart() { // Alt som skal være klart før spillet begynner
  gronnDisplayed = false;
  venterPaaStart = false;
  venterPaaGronn = false;
  scores = []; // "visker" vekk alle scores slik at spillet starter med nullstilte scores
};

beforeSpillStart(); // Gjør spillet klart for start

function gronnKLIKK_Displayed() { // funksjon for når skjermen skal bli grønn
  klikkbart_omrode.style.backgroundColor = "limegreen";
  melding.innerHTML = "Klikk nå!";
  melding.style.color = "black";
  gronnDisplayed = true;
  timeGronnDisplayed = Date.now(); // Husk hva klokka er når grønn ble displayed (setter på en måte en timer)
};

function startSpill() { // Starter spillet, og følgende i funksjonen skjer:
  klikkbart_omrode.style.backgroundColor = "var(--calm-red)";
  melding.innerHTML = "Vent på grønn farge.";
  melding.style.color = "white";

  let randomTall = Math.floor(Math.random() * 4000 + 3000); // Tilfeldig tid mellom 3000 og 7000 millisekunder
  timer = setTimeout(gronnKLIKK_Displayed, randomTall); // Setter en timer: skifter farge til grønn (går til funksjon: gronnKLIKK_Displayed) når tiden er over

  venterPaaStart = false;
  venterPaaGronn = true;
};

start.addEventListener("click", function () { // "Lytter" etter når spilleren klikker med musa ved start
  start.classList.remove("aktiv"); // Fjerner klassen "aktiv" fra start diven, start er ikke lenger synlig
  startSpill();
});

function sluttSpill() { // Når spillet er ferdig skal følgende i funskjonen skje: 
  slutt.classList.add("aktiv"); // Legger klassen "aktiv" til i slutt diven, slutt blir synlig 
  clearTimeout(timer); // Stopper alle timere i spillet som fortsatt går

  let total = 0;

  scores.forEach((s) => { // Går gjennom hver eneste score i spillet
    total += s; // Legger sammen alle scorene 
  });

  let gjennomsnittligScore = Math.round(total / scores.length); // Regner ut gjennomsnittlig score 

  let klikkeTiden = Date.now(); // Noterer ned tiden når spiller er over 
  let reaksjonstid = klikkeTiden - timeGronnDisplayed; // Regner ut reaksjonstid

  gjennomsnittlig_rt.innerHTML = `Gjennomsnittlig score: ${gjennomsnittligScore} ms`;
  reaksjonstest_resultat_p.innerHTML = `${reaksjonstid} ms`;
};

function visReaksjonstid(rt) { // Spilller har klikket på grønn, på tide å vise reaksjonstiden til spilleren
  klikkbart_omrode.style.backgroundColor = "var(--egg-color)";
  melding.innerHTML = `<div class='reaksjonstest_resultat_p'>${rt} ms</div>Klikk for å fortsette.`;
  gronnDisplayed = false;
  venterPaaStart = true;
  scores.push(rt); // Noter ned reaksjonstiden til spilleren i "en form for liste med alle reaksjostidene"

  if (scores.length >= 3) { // Hvis spilleren har tre noterte reaksjonstider/scores
    sluttSpill(); // Stopp spillet
  }
};

function displayTooSoon() { // Spilleren klikket før grønn/klikk ble displayed 
  klikkbart_omrode.style.backgroundColor = "var(--egg-color)";
  melding.innerHTML = "For rask. Klikk for å fortsette.";
  melding.style.color = "black";
  venterPaaStart = true; // Spilleren venter på å starte igjen
  clearTimeout(timer); // Stopper timeren som skal avgjøre når grønn/klikk blir displayed 
};

klikkbart_omrode.addEventListener("click", function () { // Når spilleren klikker på klikkbart_omrode/skjermen
  if (gronnDisplayed) { // Hvis skjermen er grønn
    let klikkeTiden = Date.now(); // Noter ned når spilleren klikket 
    let reaksjonstid = klikkeTiden - timeGronnDisplayed; // Regner ut reaksjonstiden
    visReaksjonstid(reaksjonstid); // Går til visReaksjonstid funskjonen med variabelen reaksjonstid
    return;
  }

  if (venterPaaStart) { // Hvis spillet venter på at spilleren skal klikke for å fortsette 
    startSpill();
    return;
  }

  if (venterPaaGronn) { // Hvis du klikket for fort (før grønn)
    displayTooSoon();
  }
});

spilligjen_button.addEventListener("click", function () { // Lytter etter når spilleren klikker på spill igjen knappen
  slutt.classList.remove("aktiv"); // Gjemmer slutt igjen
  beforeSpillStart(); // Gjør spillet klart for å kjøres igjen 
  startSpill(); // Starter spillet
});