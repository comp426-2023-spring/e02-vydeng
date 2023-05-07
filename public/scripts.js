// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver
var hasOpponent = false;
var rpsVersion = true;

// let opponent = document.getElementById("opponent");
// opponent.addEventListener("change", opponentChange)

// Get the button that opens the modal
async function closepopup() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}


async function play() {
    var player = document.getElementById("playerMove");
    var opponent = document.getElementById("opponentMove");
    var winner = document.getElementById("winner");
    var rand_move = document.getElementById("rand_move")
    var opponentGame = document.getElementById("opponentGame")
    var rules = document.getElementById("rules")
    if (rpsVersion && hasOpponent) {
        var move;
        var radios = document.getElementsByName("move");
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                move = radios[i].value;
                break;
            }
        }
        const response = await fetch(`/app/rps/play/${move}`);
        const data = await response.json();
        player.innerHTML = `Player move: ${data.player}`;
        opponent.innerHTML = `Opponent move: ${data.opponent}`;
        winner.innerHTML = `Result: ${data.result}`;
        opponentGame.className = "active";
        rand_move.className = "inactive";
        rules.className = "inactive";
    }
    else if (rpsVersion) {
        const response = await fetch(`/app/rps/play`);
        const data = await response.json();
        rand_move.innerHTML = `Move: ${data.player}`;
        opponentGame.className = "inactive"
        rand_move.className = "active"
        rules.className = "inactive";
    }
    else if (hasOpponent) {
        var move;
        var radios = document.getElementsByName("move");
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                move = radios[i].value;
                break;
            }
        }
        const response = await fetch(`/app/rpsls/play/${move}`);
        const data = await response.json();
        player.innerHTML = `Player move: ${data.player}`;
        opponent.innerHTML = `Opponent move: ${data.opponent}`;
        winner.innerHTML = `Result: ${data.result}`;
        opponentGame.className = "active"
        rand_move.className = "inactive"
        rules.className = "inactive";
    }
    else {
        const response = await fetch(`/app/rpsls/play`);
        const data = await response.json();
        rand_move.innerHTML = `Move: ${data.player}`;
        opponentGame.className = "inactive"
        rand_move.className = "active"
        rules.className = "inactive";
    }
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

async function openRules() {
    var rand_move = document.getElementById("rand_move");
    var opponentGame = document.getElementById("opponentGame");
    var rules = document.getElementById("rules");
    rand_move.className = "inactive";
    opponentGame.className = "inactive";
    rules.className = "active";
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

async function reset() {
    location.reload();
}

async function rpslsSelected() {
    rpsVersion = false;
    opponentChange();
    console.log(rpsVersion);
}

async function rpsSelected() {
    rpsVersion = true;
    opponentChange();
    console.log(rpsVersion);
}

async function opponentChange() {
    const opponentCheck = document.querySelector('#opponent');
    const rpsSection = document.getElementById("rps");
    const rpslsSection = document.getElementById("rpsls")
    console.log(opponentCheck.checked)
    rpsSection.className = "active";
    if (opponentCheck.checked && rpsVersion) {
        rpsSection.className = "active";
        rpslsSection.className = "inactive";
        hasOpponent = true;
    }
    else if (opponentCheck.checked && !rpsVersion) {
        rpsSection.className = "active";
        rpslsSection.className = "active";
        hasOpponent = true;
    }
    else {
        rpsSection.className = "inactive";
        rpslsSection.className = "inactive";
        hasOpponent = false;
    }

}