/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName("card");
let cardArray = [...cards];
let cardDeck = document.querySelector(".deck");
let reset = document.querySelector(".fa-repeat");
let moves = document.querySelector(".moves");
let numMoves = 0;

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
  moves.innerHTML = numMoves;
  let shuffled = shuffle(cardArray);
  cardDeck.innerHTML = "";
  for(let i = 0; i<cardArray.length; i++){
    cardDeck.appendChild(shuffled[i]);
  }
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
  let yellow = document.getElementsByClassName("yellow");
  while (yellow.length){
    yellow[0].classList.remove("yellow");
  }
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
