var tileImages = ['tile1.jpg', 'tile2.jpg', 'tile3.jpg', 'tile4.jpg', 'tile5.jpg', 'tile6.jpg'];
var gameboard = document.getElementById("gameboard");
var button = document.getElementById("restart");
var mytime = document.getElementById("mytime");
var cardsflippedover = 0;
var lastcardpicked = -1;
var matches = 0;
var cards = '';

var second = 0;
var minute = 0;
var hour = 0;
var time;

var moves = 0;
var movesElement = document.querySelector(".moves");
movesElement.innerHTML = "Total Moves: " + moves;

var icons = document.querySelectorAll(".fa-star");

var solutionArray = tileImages.concat(tileImages);
document.getElementById("restart").addEventListener("click", startGame);

fliparray = new Array();

startGame();

function startGame() {
    clearTimeout(cards);
    shuffleArray(solutionArray);
    gameboard.innerHTML = "";
    for (var i = 0; i <= ((solutionArray.length) - 1); i++) {
        gameboard.innerHTML += '<div class="col-md-3 col-xs-4 gametile"><img id="cardz' + i + '" src="img/back.jpg" onclick="pickCard(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="flipimage"></div>';
    }

    // reset these when starting over
    cardsflippedover = 0;
    lastcardpicked = -1;
    matches = 0;

    //reset moves
    moves = 0;
    movesElement.innerHTML = "Total Moves: " + moves;

    for (var i = 0; i < icons.length; i++) {
        icons[i].style.visibility = "visible";
    }

    //restart timer
    second = 0;
    //mseconds = 0;
    minute = 0;
    hour = 0;
    //mytime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    mytime.innerHTML = hour + " hrs " + minute + " mins " + second + " secs";
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
                matches++; // increment matches when they find one
                if (matches >= tileImages.length) {
                    // found all matches
                    // stop timer
                    stopTimer();
                    // game over.. update modal and open it from here.
                    endGame();
                    //alert('game over')
                } else {
                    pickagain();
                }
            } else {
                cards = setTimeout(hideCard, 1000);

            }
            // after 2 cards flipped over, increment moves counter
            // and update movesElement's html
            moves++;
            movesElement.innerHTML = "Total Moves: " + moves;
           // star rating based on moves
            if (moves > 9 && moves < 13) {
                for (i = 0; i < 3; i++) {
                    if (i > 1) {
                        icons[i].style.visibility = "hidden";
                    }
                }
            } else if (moves > 14) {
                for (i = 0; i < 3; i++) {
                    if (i > 0) {
                        icons[i].style.visibility = "hidden";
                    }
                }
            }
        }
        lastcardpicked = b;
    }
}

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

function startTimer() {
    time = setInterval(function() {
        mytime.innerHTML = hour + " hrs " + minute + " mins " + second + " secs";
        //mytime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        second++;
        if (second >= 60) {
            second = 0;
            minute++;
        }
        if (minute >= 60) {
            minute = 0;
            hour++;
        }
    }, 1000);
}
//stop Timer function
function stopTimer() {
    clearInterval(time);
}

//Modal showing the total time, total moves, and star rating. has two restart options.
function endGame() {
    $("#myModal").modal();
    $("#stats").text(`Total Time =  ${second} secs      Total Moves =  ${moves}`);
}

    var stars = document.querySelector(".icons").innerHTML;
    document.getElementById("stars").innerHTML = stars;


//shuffle function
function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};
