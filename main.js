let addPlayerEl = document.getElementById("addPlayer")
let textFieldEl = document.getElementById("textField")
let playersEl = document.getElementById("players")
let highscoreEl = document.getElementById("highscore")
let timerEl = document.getElementById("timer")
let tick = 0
const re = /done(\d+)/;
timerEl.value = 60
setInterval(second, 1 * 1000)

function updateTimer(){
    timerEl.innerText = `Sekunder ${timerEl.value}`
}
function second(){
    if(timerEl.value <= 0){
        timerEl.value = 60
        minute()
    }
    else{
        timerEl.value = timerEl.value - 1
    }
    updateTimer()
}
function playSound(){
    // const audioElement = new Audio("mlg-airhorn.mp3")
    if(tick % 2 == 0){
        const audioElement = new Audio("mlg-airhorn.mp3")
        audioElement.play()
    }
    else{
        const audioElement = new Audio("take_another.mp3")
        audioElement.play()
    }
    tick++
}
function minute(){
    playSound()
    bumpUsers()
    displayUsers()
}
function sortUsers(users){
    users.sort((a, b) => b.value - a.value)
    return users
}
function bumpUsers(){
    let items = { ...localStorage };
    for (let i in items){
        if(!re.test(items[i])){
            //regner med at det er null
            localStorage.setItem(i, parseInt(items[i]) + 1)
        }

    }

}


addPlayerEl.addEventListener("click", async (e) => {
    const name = textFieldEl.value
    if (name == "") {
        alert("bruh putt inn navn a")
        return
    }
    const items = { ...localStorage };
    if (name in items) {
        alert("navnet finnes alt")
        return
    }
    localStorage.setItem(name, 0);
    displayUsers()
})
function stopUser(e){
    let user = e.target.value
    localStorage[user] = "done" + localStorage[user]
    e.target.parentElement.style.animation= "fadeOut 4s linear infinite"
    displayUsers()
}
function displayUsers(){
    const items = { ...localStorage };
    playersEl.innerHTML = ""
    let h2El = document.createElement("h2")
    h2El.innerText = "Aktive spellare"
    playersEl.appendChild(h2El);
    let doneUsers = []
    for (let i in items){
        let match = re.exec(items[i])
        if (match) {
            doneUsers.push({name: i, value: match[1]})
            continue
        }
        let divEl = document.createElement("div")
        let buttonEl = document.createElement("button")
        buttonEl.value = i
        buttonEl.id = divEl
        buttonEl.innerText = "Ferdig"
        buttonEl.addEventListener("click", stopUser)
        divEl.innerText = `${i} : ${items[i]}`
        divEl.appendChild(buttonEl)
        playersEl.appendChild(divEl)
    }

    // highscore of the finished users
    doneUsers = sortUsers(doneUsers)

    highscoreEl.innerHTML = ""
    h2El = document.createElement("h2")
    h2El.innerText = "Highscore"
    highscoreEl.appendChild(h2El);
    for (let i in doneUsers){
        let divEl = document.createElement("div")
        divEl.innerText = `${doneUsers[i].name}: ${doneUsers[i].value}`
        highscoreEl.appendChild(divEl)
    }
}
displayUsers()
updateTimer()
