/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName("card");
let cardArray = [...cards];
let cardDeck = document.querySelector(".deck");
let reset = document.querySelector(".fa-repeat");
let moves = document.querySelector(".moves");
let stars = document.querySelector(".stars");
let winGame = document.getElementById('all-matched');
let modalMovesText = document.querySelector(".moves-text");
let modalStarText = document.querySelector(".star-rating");
let modalTimeText = document.querySelector(".time");
let closeModal = document.getElementsByClassName("close")[0];
let yellow = document.getElementsByClassName("yellow");
let star3 = document.getElementById(3);
let star2 = document.getElementById(2);
let numMoves = 0;
let cardsOpen = 0;
let matchCounter = 0;
let seconds = 0;
let endStars = 0;
let timer = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
window.onload = displayDeck();
reset.addEventListener('click', function () {
  displayDeck();
});


function displayDeck() {
  resetClasses();
  numMoves = 0;
  moves.innerHTML = numMoves;
  let shuffled = shuffle(cardArray);
  cardDeck.innerHTML = "";
  for(let i = 0; i<cardArray.length; i++){
    cardDeck.appendChild(shuffled[i]);
  }
  matchCounter = 0;
  stopTimer();
  startTimer();
  cardDeck.addEventListener('click', gamePlay);
}

function resetClasses() {
  let open = document.getElementsByClassName("open");
  while (open.length){
    open[0].classList.remove("open");
  }
  let show = document.getElementsByClassName("show");
  while (show.length){
    show[0].classList.remove("show");
  }
  let match = document.getElementsByClassName("match");
  while (match.length){
    match[0].classList.remove("match");
  }
  star3.classList.add("yellow");
  star2.classList.add("yellow");
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function gamePlay(event){
  if (cardsOpen < 2 && !event.target.classList.contains("open") && !event.target.classList.contains("deck")) {
    cardsOpen++;
    displayCard(event);
    checkMatch(event);
    removeStar();
    if(matchCounter === 8){
      endGame();
    }
  }
}

function startTimer(){
  seconds = 0;
  timer = setInterval(function(){
    seconds++;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);
}

function stopTimer(){
  clearInterval(timer);
}

function endGame(){
    modalMovesText.innerHTML = numMoves;
    modalTimeText.innerText = seconds;
    if(endStars === 2){
      modalStarText.innerText = "two stars";
    }
    if(endStars === 1){
      modalStarText.innerText = "one star";
    }
    stopTimer();
    winGame.style.display = "block";
    closeModal.onclick = function(){
      winGame.style.display = "none";
    displayDeck();
  }
}

function displayCard(event){
  event.target.classList.add("open");
  event.target.classList.add("show");

}

function checkMatch(event){
  let cardOpen = document.getElementsByClassName("open");

    if(cardOpen.length == 2){
      numMoves++;
      moves.innerHTML = numMoves;
      if(cardOpen.item(0).firstElementChild.classList[1] == cardOpen.item(1).firstElementChild.classList[1]){
        matchCounter++;
        while(cardOpen.length){
          cardOpen[0].classList.add("match");
          cardOpen[0].classList.remove("show");
          cardOpen[0].classList.remove("open")
          cardsOpen = 0;
        }
      }else{
        setTimeout(function(){flipBack(cardOpen);}, 1000);
      };


  };
}

function flipBack(cardOpen){
  while(cardOpen.length){
    cardOpen[0].classList.remove("show");
    cardOpen[0].classList.remove("open");
    cardsOpen = 0;
  }
}

function removeStar(){
  if(numMoves >= 8){
    star3.classList.remove("yellow");
    endStars = 2;
  }
  if(numMoves >= 16){
    star2.classList.remove("yellow");
    endStars = 1;
  }
}
