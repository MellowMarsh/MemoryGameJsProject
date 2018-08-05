var tileImages = ['tile1.jpg', 'tile2.jpg', 'tile3.jpg', 'tile4.jpg', 'tile5.jpg', 'tile6.jpg'];
var gameboard = document.getElementById("gameboard");
var buttonmessage = document.getElementById("gamecontrol");
var mytime = document.getElementById("mytime");

var cardsflippedover = 0;
var lastcardpicked = -1;
var timer = '';
var score=0;
var seconds = 0;
var mseconds = 0;
var minutes = 0;
var hours = 0;

var solutionArray = tileImages.concat(tileImages);
document.getElementById("gamecontrol").addEventListener("click", startGame);
fliparray = new Array();
startGame();

function startGame() {
    clearInterval(timer);
    timerX();
    seconds = 0, mseconds = 0, minutes = 0, hours = 0;
    shuffleArray(solutionArray);
    score = 0;
    gameboard.innerHTML = "";

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
                console.log('same');
                pickagain();
                score++;
                if(tileImages.length >=score){
                  console.log('END GAME');
                }
            }
            else {
                timer = setInterval(hideCard, 1000);
                //console.log('different');
                //messageText("NO MATCH");
            }
        }
        lastcardpicked = b;
    }
}
//I am trying to count moves made and display TOTAL MOVES and collapse the stars.

//Add move
function addMoves(i){
    moves++;
    countmoves.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
       seconds = 0;
      mseconds = 0;
       minutes = 0;
       hours = 0;
        startTimer();
    }
    // setting hide stars based on moves 
    if (moves > 6 && moves < 12){
        for( var i= 0; i < 3; i++){
            if(i > 1){
                stars.innerHTML(collapse);
            }
        }
    }
    else if (moves > 12){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


function addTime() {
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
    t = setTimeout(addTime, 1100);
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
