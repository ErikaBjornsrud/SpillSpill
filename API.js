const URL = "https://rasmusweb.no/hs.php"
const GameID = "ErikaSnake"

let APIhighscore = 0

async function getHighscore() {

    const apiCallPromise = await fetch(URL + "?id=" + GameID, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    })

    // Getting the json from the response (NOTE: Also await!)
    const json = await apiCallPromise.json()
    console.log(json)
    //appendPElm(htmlObj, "hs: " + json.hs)
    //appendPElm(htmlObj, "player: " + json.player)
    if (typeof json == "object") {
        APIhighscore = json.hs;
    }
}

// Poster ny HS til php backend
async function postHighscore(highscore) {
   
    postBody = {}
    postBody.id = GameID
    postBody.hs = highscore
    postBody.player = prompt("Gratulerer du satt en ny global highscore! Hva er navnet ditt?")

    const apiCallPromise = await fetch(URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(postBody),
    })

    // Getting the json from the response:
    const responseJson = await apiCallPromise.json()
    console.log(responseJson)
}


// resethighscore 
// postHighscore(1)


// ny

const GameID_2 = "ErikaSpace"

let APIhighscore_2 = 0

async function getHighscore2() {

    const apiCallPromise = await fetch(URL + "?id=" + GameID_2, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    })

    // Getting the json from the response (NOTE: Also await!)
    const json = await apiCallPromise.json()
    console.log(json)
    //appendPElm(htmlObj, "hs: " + json.hs)
    //appendPElm(htmlObj, "player: " + json.player)
    if (typeof json == "object") {
        APIhighscore_2 = json.hs;
    }
}

// Poster ny HS til php backend
async function postHighscore2(highscore) {
   
    postBody = {}
    postBody.id = GameID_2
    postBody.hs = highscore
    postBody.player = prompt("Gratulerer du satt en ny global highscore! Hva er navnet ditt?")

    const apiCallPromise = await fetch(URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(postBody),
    })

    // Getting the json from the response:
    const responseJson = await apiCallPromise.json()
    console.log(responseJson)
}