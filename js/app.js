const tileImages = ['tile1.jpg', 'tile2.jpg', 'tile3.jpg', 'tile4.jpg', 'tile5.jpg', 'tile6.jpg'];
const gameboard = document.getElementById("gameboard");
var button = document.getElementById("restart");
var myTime = document.getElementById("myTime");
var cardsFlippedOver = 0;
var lastCardPicked = -1;
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

flipArray = new Array();

startGame();

function startGame() {
  clearInterval(time);
  //clearTimeout(cards);
  shuffleArray(solutionArray);
  gameboard.innerHTML = "";
  for (var i = 0; i <= ((solutionArray.length) - 1); i++) {
    gameboard.innerHTML += '<div class="col-md-3 col-xs-4 gametile"><img id="cardz' + i + '" src="img/back.jpg"  onclick="pickCard(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="flipimage"></div>';
  }

  //reset cards when starting over
  cardsFlippedOver = 0;
  lastCardPicked = -1;
  matches = 0;

  //reset moves
  moves = 0;
  movesElement.innerHTML = "Total Moves: " + moves;

  // reset star icons
  for (var i = 0; i < icons.length; i++) {
    icons[i].style.visibility = "visible";
  }

  //restart timer
  second = 0;
  //mseconds = 0;
  minute = 0;
  hour = 0;
  //mytime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  myTime.innerHTML = hour + " hrs " + minute + " mins " + second + " secs";
  startTimer();

}

function pickCard(a, b, c) {
  if (cardsFlippedOver < 2 && lastCardPicked != b) {
    flipArray[cardsFlippedOver] = solutionArray[b];
    flipArray[(cardsFlippedOver + 2)] = c.id;
    cardsFlippedOver++;
    c.src = 'img/' + solutionArray[b];
    if (cardsFlippedOver == 2) {
      if (flipArray[0] == flipArray[1]) {
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
          pickAgain();
        }
      } else {
        cards = setTimeout(hideCard, 1000);

      }
      // after 2 cards flipped over, increment moves counter
      // and update movesElement's html
      moves++;
      movesElement.innerHTML = "Total Moves: " + moves;

      // star rating based on moves
      //help provided by student on slack for star rating mucho thanks..https://www.w3schools.com/cssref/pr_class_display.asp
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
    lastCardPicked = b;
  }
}
//this picks cards again
function pickAgain() {
  cardsFlippedOver = 0;
  flipArray = [];
  lastCardPicked = -1;
  clearTimeout(cards);
}
//this hides card
function hideCard() {
  console.log(flipArray);
  if (flipArray[2]) {
    document.getElementById(flipArray[2]).src = "img/back.jpg";
  }
  if (flipArray[3]) {
    document.getElementById(flipArray[3]).src = "img/back.jpg";
  }
  pickAgain();
}
//this starts time
function startTimer() {
  time = setInterval(function () {
    myTime.innerHTML = hour + " hrs " + minute + " mins " + second + " secs";
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
  //this opens the modal
  $("#myModal").modal();
  //this shows time, and moves
  $("#stats").text(`Total Time =  ${second} secs Total Moves =  ${moves}`);
  //this allows star rating to be displayed in modal
  var stars = document.querySelector(".icons").innerHTML;
  document.getElementById("stars").innerHTML = stars;
}

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

    
                    

    
