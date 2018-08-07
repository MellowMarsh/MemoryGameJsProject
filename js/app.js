var tileImages = ['tile1.jpg', 'tile2.jpg', 'tile3.jpg', 'tile4.jpg', 'tile5.jpg', 'tile6.jpg'];
var gameboard = document.getElementById("gameboard");
var button= document.getElementById("gamecontrol");
var mytime = document.getElementById("mytime");
var cardsflippedover = 0;
var lastcardpicked = -1;
var cards = '';
var second = 0;
var minute = 0;
var hour = 0;
var mytime = document.querySelector("#mytime");
var time;

    moves=0;
    moves.innerHTML=moves;

var solutionArray = tileImages.concat(tileImages);
document.getElementById("gamecontrol").addEventListener("click", startGame);
fliparray = new Array();
startGame();

function startGame() {
  clearTimeout(cards);
    shuffleArray(solutionArray);
    gameboard.innerHTML = "";
    for (var i = 0; i <= ((solutionArray.length) - 1); i++) {
        gameboard.innerHTML += '<div class="col-md-3 col-xs-4 gametile"><img id="cardz' + i + '" src="img/back.jpg" onclick="pickCard(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="flipimage"></div>';
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var mytime = document.querySelector("#mytime");
    mytime.innerHTML = "0 hrs 0 mins 0 secs";
    startTimer();

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
              //score++;
            }
            else {
                 cards= setTimeout(hideCard, 1000);

            }
        }
        lastcardpicked ===b;
    }
}


//count moves made a display them in the html

function pickagain() {
    cardsflippedover = 0;
    fliparray = [];
    lastcardpicked = -1;
    clearTimeout(cards);
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


function startTimer(){
    time = setInterval(function(){
        mytime.innerHTML =hour+ "hrs"+ minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1500);
}
function stopTimer(){

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
