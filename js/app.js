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
var mytime = document.querySelector("#mytime");
var time;

var moves = 0;
var movesElement = document.querySelector('.moves');
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
    minute = 0;
    hour = 0;
    var mytime = document.querySelector("#mytime");
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
            // after 2 cards flipped over, increment moves counter,
            // and update movesElement's html
            moves++;
            movesElement.innerHTML = "Total Moves: " + moves;

            //pulled the star icons out into a function

            iconRate();

        }
        lastcardpicked = b;
    }
}

//star icon rating function
function iconRate() {
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                icons[i].style.visibility = "hidden";
            }
        }
    } else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                icons[i].style.visibility = "hidden";
            }
        }
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

        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1100);
}

function stopTimer() {
    clearInterval(time);
}

//The star rating is not showing the correct rate.
function endGame() {
    $("#myModal").modal();
    $("#stats").text(`Total Time:  ${second}  seconds   |   Total Moves:  ${moves}`);

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
