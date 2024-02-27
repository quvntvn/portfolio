// Jeu de devinette

let correctNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function checkGuess() {
    const userGuess = document.getElementById('user-guess').value;
    const gameResult = document.getElementById('game-result');
    const retryButton = document.getElementById('retry-button');

    if (attempts > 1) {
        if (userGuess == correctNumber) {
            gameResult.innerHTML = `Bravo ! Vous avez trouvé le nombre en ${11 - attempts} essais.`;
            retryButton.style.display = 'inline'; 
        } else if (userGuess < correctNumber) {
            gameResult.innerHTML = `Trop bas ! Il vous reste ${attempts - 1} tentatives.`;
            attempts--;
        } else {
            gameResult.innerHTML = `Trop haut ! Il vous reste ${attempts - 1} tentatives.`;
            attempts--;
        }
    } else {
        gameResult.innerHTML = `Game Over! Le nombre était ${correctNumber}. Essayez encore !`;
        retryButton.style.display = 'inline'; 
    }
}

function retry() {
    attempts = 10; 
    correctNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById('user-guess').value = '';
    document.getElementById('game-result').innerHTML = ''; 
    document.getElementById('retry-button').style.display = 'none'; 
}


// Jeu de cowboys 

let lastReactionTime = 0; 
let currentLevel = 1;
const maxLevel = 10;
let reactionLimit = 500; 
let duelTimeout;
let countdownTimeouts = []; 


const display = document.getElementById("display");
const startDuelBtn = document.getElementById("startDuel");
const shootBtn = document.getElementById("gachette");
const levelDisplay = document.getElementById("level");


shootBtn.style.display = 'none'; 
levelDisplay.textContent = `Niveau : ${currentLevel}`;


function newDuel() {
    document.getElementById("enemi").textContent = "🤠";    
    document.getElementById("me").textContent = "🤠";
    clearTimeout(duelTimeout); 
    clearCountdownTimeouts(); 
    shootBtn.style.display = 'none'; 
    startDuelBtn.style.display = 'none'; 
    display.textContent = '3';

    setCountdown('2', 1000);
    setCountdown('1', 2000);
    setCountdown('Attention ...', 3000);

    
    duelTimeout = setTimeout(triggerShoot, 4000 + Math.random() * (3000 - 1000));
}


function setCountdown(text, delay) {
    countdownTimeouts.push(setTimeout(() => { display.textContent = text; }, delay));
}


function triggerShoot() {
    display.textContent = 'Tirez !';
    let startTime = Date.now();
    let reactionTimeout;
    shootBtn.style.display = 'block'; 

    shootBtn.onclick = () => {
        clearTimeout(reactionTimeout); 
        lastReactionTime = Date.now() - startTime; 
        if (lastReactionTime <= reactionLimit) {
            victory();
        } else {
            gameOver();
        }
    };

    
    reactionTimeout = setTimeout(() => {
        if (display.textContent === 'Tirez !') {
            lastReactionTime = reactionLimit + 1; 
            gameOver();
        }
    }, reactionLimit);
}


function victory() {
    display.innerHTML = `Victoire !<br>Vous : ${lastReactionTime} ms<br>Ennemi : ${reactionLimit} ms`;
    document.getElementById("enemi").textContent = "😵";
    updateGameAfterAction();
}


function resetGame(legend = false) {
    currentLevel = 1;
    reactionLimit = 500;
    levelDisplay.textContent = `Niveau : ${currentLevel}`;
    document.getElementById("enemi").textContent = "🤠";
    document.getElementById("me").textContent = "🤠";
    display.textContent = "Prêt ?";
    startDuelBtn.style.display = 'block';
    shootBtn.style.display = 'none';
    startDuelBtn.textContent = legend ? 'Victoire ! Recommencer' : 'Commencer le duel';
    clearAllTimeouts();
}


function gameOver() {
    clearTimeout(duelTimeout); 
    clearCountdownTimeouts(); 
    if (lastReactionTime > reactionLimit) {
        display.innerHTML = `Vous étes Mort !<br>Ennemi : ${reactionLimit} ms`;
    } else {
        display.textContent = 'Vous avez perdu !';
    }
    document.getElementById("me").textContent = "😵";
    startDuelBtn.textContent = 'Recommencer';
    startDuelBtn.style.display = 'block';
    shootBtn.style.display = 'none'; 
}


function clearCountdownTimeouts() {
    countdownTimeouts.forEach(timeout => clearTimeout(timeout));
    countdownTimeouts = [];
}


startDuelBtn.addEventListener('click', newDuel);

function updateGameAfterAction() {
    if (currentLevel >= maxLevel) {
        display.textContent = "Vous êtes une légende !";
        resetGame(true);
    } else {
        currentLevel++;
        reactionLimit -= 30;
        levelDisplay.textContent = `Niveau : ${currentLevel}`;
        startDuelBtn.style.display = 'block'; 
        startDuelBtn.textContent = 'Duel suivant';
    }
    shootBtn.style.display = 'none'; 
}

// jeu de clicker

let argent = 0;
let revenuParClick = 1000;
let coutAmeliorationSalaire = 75000; 
let coutAmeliorationEpice = 100000;
let coutAmeliorationUsine = 10000000;
let coutAmeliorationCentre = 100000000;
let coutAmeliorationClub = 1000000000;

const epiceBtn = document.getElementById("epice");
const epiceUpgradeBtn = document.getElementById("epiceUpgrade");

const usineBtn = document.getElementById("usine");
const usineUpgradeBtn = document.getElementById("usineUpgrade");

const centreBtn = document.getElementById("centre");
const centreUpgradeBtn = document.getElementById("centreUpgrade");

const clubBtn = document.getElementById("club");
const clubUpgradeBtn = document.getElementById("clubUpgrade");

let revenuEpicerieParSeconde = 0;
document.getElementById('epiceUpgrade').style.display = 'none';
document.getElementById('usineUpgrade').style.display = 'none';
document.getElementById('centreUpgrade').style.display = 'none';
document.getElementById('clubUpgrade').style.display = 'none';
let revenuUsineParSeconde = 0;
let revenuCentreParSeconde = 0;
let revenuClubParSeconde = 0;

function augmenterRevenuPassif() {
  argent += revenuEpicerieParSeconde + revenuUsineParSeconde + revenuCentreParSeconde + revenuClubParSeconde;
  updateDisplay();
}


setInterval(augmenterRevenuPassif, 1000); 

document.getElementById('epice').addEventListener('click', function() {
    if (argent >= 100000) {
        argent -= 100000; 
        revenuEpicerieParSeconde = 10000; 
        this.style.display = 'none';
        const epiceRevenueDisplay = document.getElementById('epiceRevenueDisplay');
        document.getElementById('epiceUpgrade').style.display = 'block';
        epiceRevenueDisplay.textContent = "Épicerie : 10000 par seconde";
        updateDisplay(); 
    } else {
        alert("Pas assez d'argent pour acheter l'épicerie");
    }
});

epiceUpgradeBtn.addEventListener('click', function() {
    console.log("Améliorer l'épicerie");
    if (argent >= coutAmeliorationEpice) {
        argent -= coutAmeliorationEpice;
        revenuEpicerieParSeconde *= 4;
        coutAmeliorationEpice *= 4;
        document.getElementById('epiceUpgrade').textContent = "Améliorer (Coût : " + coutAmeliorationEpice + " €)";
        updateDisplay();
    } else {
        alert("Vous n'avez pas assez d'argent pour améliorer");
    }
});



function augmenterArgentParSeconde() {
  argent += revenuParSeconde;
  updateDisplay();
}


document.getElementById('salaire').addEventListener('click', () => {
  argent += revenuParClick;
  updateDisplay();
});


document.getElementById('salaireUpgrade').addEventListener('click', () => {
  if (argent >= coutAmeliorationSalaire) {
    argent -= coutAmeliorationSalaire;
    revenuParClick *= 2;
    coutAmeliorationSalaire *= 2;
    document.getElementById('salaireUpgrade').textContent = `Augmenter salaire (Coût : ${coutAmeliorationSalaire} €)`;
  }
});


function updateDisplay() {
  document.getElementById('moneyDisplay').textContent = `Solde disponible : ${argent} €`;
  document.getElementById('salairebyClick').textContent = `${revenuParClick} € par click`;
  document.getElementById('salaireUpgrade').disabled = argent < coutAmeliorationSalaire;
  if(revenuEpicerieParSeconde > 0){
    epiceRevenueDisplay.textContent = `Épicerie : ${revenuEpicerieParSeconde} par seconde`;
  }
    if(revenuUsineParSeconde > 0){
        usineRevenueDisplay.textContent = `Usine : ${revenuUsineParSeconde} par seconde`;
    }
    if(revenuCentreParSeconde > 0){
        centreRevenueDisplay.textContent = `Centre-commercial : ${revenuCentreParSeconde} par seconde`;
    }
    if(revenuClubParSeconde > 0){
        clubRevenueDisplay.textContent = `Club de football : ${revenuClubParSeconde} par seconde`;
    }
}

updateDisplay();

document.getElementById('usine').addEventListener('click', function() {
    if (argent >= 10000000) {
        argent -= 10000000;
        revenuUsineParSeconde = 50000;
        hasUsine = true;
        this.style.display = 'none';
        const usineRevenueDisplay = document.getElementById('usineRevenueDisplay');
        document.getElementById('usineUpgrade').style.display = 'block';
        updateDisplay(); 
    } else {
        alert("Pas assez d'argent pour acheter l'usine");
    }
});

usineUpgradeBtn.addEventListener('click', function() {
    if (argent >= coutAmeliorationUsine) {
        argent -= coutAmeliorationUsine;
        revenuUsineParSeconde *= 2;
        coutAmeliorationUsine *= 2;
        document.getElementById('usineUpgrade').textContent = "Améliorer (Coût : " + coutAmeliorationUsine + " €)"
        updateDisplay();
    } else {
        alert("Vous n'avez pas assez d'argent pour améliorer");
    }
});

document.getElementById('centre').addEventListener('click', function() {
    if (argent >= 100000000) {
        argent -= 100000000;
        revenuCentreParSeconde = 100000;
        hasCentre = true;
        this.style.display = 'none'; 
        const centreRevenueDisplay = document.getElementById('centreRevenueDisplay');
        document.getElementById('centreUpgrade').style.display = 'block'; 
        updateDisplay(); 
    } else {
        alert("Pas assez d'argent pour acheter le centre");
    }
});

centreUpgradeBtn.addEventListener('click', function() {
    if (argent >= coutAmeliorationCentre) {
        argent -= coutAmeliorationCentre;
        revenuCentreParSeconde *= 2;
        coutAmeliorationCentre *= 2;
        document.getElementById('centreUpgrade').textContent = "Améliorer (Coût : " + coutAmeliorationCentre + " €)"
        updateDisplay();
    } else {
        alert("Vous n'avez pas assez d'argent pour améliorer");
    }
});

document.getElementById('club').addEventListener('click', function() {
    if (argent >= 1000000000) {
        argent -= 1000000000;
        revenuClubParSeconde = 500000; 
        hasClub = true;
        this.style.display = 'none';
        const clubRevenueDisplay = document.getElementById('clubRevenueDisplay');
        document.getElementById('clubUpgrade').style.display = 'block';
        updateDisplay();
    } else {
        alert("Pas assez d'argent pour acheter le club");
    }
});

clubUpgradeBtn.addEventListener('click', function() {
    if (argent >= coutAmeliorationClub) {
        argent -= coutAmeliorationClub;
        revenuClubParSeconde *= 2;
        coutAmeliorationClub *= 2;
        document.getElementById('clubUpgrade').textContent = "Améliorer (Coût : " + coutAmeliorationClub + " €)"
        updateDisplay();
    } else {
        alert("Vous n'avez pas assez d'argent pour améliorer");
    }
});

let hasTerre = false;

document.getElementById('terre').addEventListener('click', function() {
    if (argent >= 1000000000000) {
        argent -= 1000000000000;
        revenuClubParSeconde = 500000; 
        hasTerre = true;
        this.style.display = 'none';
        document.getElementById('victory').style.display = 'block';
        document.getElementById('victory').textContent = "Vous avez acheté la terre entiere, fin du jeu.";
        updateDisplay();
    } else {
        alert("Pas assez d'argent pour acheter la terre");
    }
});