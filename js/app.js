var tileImages = ['tile1.jpg', 'tile2.jpg', 'tile3.jpg', 'tile4.jpg', 'tile5.jpg', 'tile6.jpg'];
var gameboard = document.getElementById("gameboard");
var messageTop = document.getElementById("message");
var buttonmessage = document.getElementById("gamecontrol");
var mytime = document.getElementById("mytime");
var cardsflippedover = 0
    , lastcardpicked = -1
    , timer = ''
    , score = 0
    , mess = ''
    , seconds = 0
    , mseconds = 0
    , minutes = 0
    , hours = 0
    , t, gamescore = 100;
var solutionArray = tileImages.concat(tileImages);
document.getElementById("gamecontrol").addEventListener("click", startGame);
fliparray = new Array();
startGame();

function startGame() {
    clearInterval(timer);
    timerX();
    seconds = 0, mseconds = 0, minutes = 0, hours = 0, gamescore = 100;
    shuffleArray(solutionArray);
    score = 0;
    gameboard.innerHTML = "";
    buttonmessage.innerHTML = "Restart Game";
    messageText("Click a Tile to start");
    for (var i = 0; i <= ((solutionArray.length) - 1); i++) {
        gameboard.innerHTML += '<div class="col-md-3 col-xs-4 gametile"><img id="cardz' + i + '" src="img/back.jpg" onclick="pickCard(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="flipimage"></div>';
    }
}

function pickCard(a, b, c) {
    if (cardsflippedover < 2 && lastcardpicked != b) {
        fliparray[cardsflippedover] = solutionArray[b];
        fliparray[(cardsflippedover + 2)] = c.id;
        cardsflippedover++;
        c.src = 'img/' + solutionArray[b];
        if (cardsflippedover == 2) {
            if (fliparray[0] == fliparray[1]) {
                messageText("Match FOUND");
                console.log('same');
                pickagain();
                score++;
                if (tileImages.length <= score) {
                    console.log('END GAME');
                    gameDone();
                }
            }
            else {
                timer = setInterval(hideCard, 1000);
                console.log('different');
                messageText("No Match");
            }
        }
        lastcardpicked = b;
    }
}

function messageText(message) {
    clearInterval(mess);
    console.log('message');
    messageTop.innerHTML = message;
    if (message != 'Find a match') {
        mess = setInterval(messageText, 1000, 'Find a match');
    }
}
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
//Trying to hide stars per plays 
function checkScore() {
    if (moves === 10 || moves === 20) {
        hideStar();
    }
}

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
hideStar();
hideStar();

function addTime() {
    gamescore--;
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    mytime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timerX();
}

function timerX() {
    t = setTimeout(addTime, 1000);
}
//Trying to put this into a  congradulations modal to show stats star rating, time it took, total moves made and exit button 
function gameDone() {
    if (gamescore < 0) {
        gamescore = 0;
    }
    messageText("GAME OVER<BR>THANKS for PLAYINGM<BR>You scored = " + gamescore);
    buttonmessage.innerHTML = "Click to Play Again";
}

function pickagain() {
    cardsflippedover = 0;
    fliparray = [];
    lastcardpicked = -1;
    clearInterval(timer);
}

function hideCard() {
    console.log(fliparray);
    if (fliparray[2]) {
        document.getElementById(fliparray[2]).src = "img/back.jpg";
    }
    if (fliparray[3]) {
        document.getElementById(fliparray[3]).src = "img/back.jpg";
    }
    pickagain();
}

function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};
