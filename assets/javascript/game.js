// the computer will pick a random word 
var userOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var computerOptions = ["buffalo", "cheetah", "elephant", "gazelle", "hippo", "leopard", "lion", "rhino", "zebra"];
var computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];

// for verifying functionality
console.log("Computer choice: " + computerChoice);

// setting up variables
var numWins = 0;
var attempts = 12;

// this array will store the letters already guessed
var guesses = [];

// this array will store the hidden word
var hiddenWord = [];

// this array will hold the computer word to check for a win
var computerWord = [];

// this function will reset the game after a win or loss
function resetGame() {
    console.log("------------------------------------------------");

    attempts = 12;
    attemptsText.textContent = attempts;

    guesses = [];
    guessesText.textContent = guesses;

    // picking a new word from the array
    computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    console.log("Computer choice: " + computerChoice);

    // resetting arrays for comparison
    hiddenWord = [];
    computerWord = [];

    for (var i = 0; i < computerChoice.length; i++) {
        hiddenWord.push("-");
    }
    wordDisplay.textContent = hiddenWord.join("");
    
    for (var i = 0; i < computerChoice.length; i++) {
        computerWord.push(computerChoice[i]);
    }

    return attempts, guesses, computerChoice, hiddenWord, computerWord;
}

// function to check if hiddenWord and computerWord are identical
function checkArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        } 
    }
    return true;
}

// function to display animal photo after a win
function displayPhoto(animal) {
    if (animal == "buffalo") {
        animalImage.src = "assets/images/buffalo.jpg"
    } else if (animal == "cheetah") {
        animalImage.src = "assets/images/cheetah.jpg"
    } else if (animal == "elephant") {
        animalImage.src = "assets/images/elephant.jpg"
    } else if (animal == "gazelle") {
        animalImage.src = "assets/images/gazelle.jpg"
    } else if (animal == "hippo") {
        animalImage.src = "assets/images/hippo.jpg"
    } else if (animal == "leopard") {
        animalImage.src = "assets/images/leopard.jpg"
    } else if (animal == "lion") {
        animalImage.src = "assets/images/lion.jpg"
    } else if (animal == "rhino") {
        animalImage.src = "assets/images/rhino.jpg"
    } else if (animal == "zebra") {
        animalImage.src = "assets/images/zebra.jpg"
    }
}

// assigning variables to the HTML elements we're changing
var winsText = document.getElementById("wins");
var wordDisplay = document.getElementById("word-display");
var attemptsText = document.getElementById("guesses-left");
var guessesText = document.getElementById("already-guessed");
var animalImage = document.getElementById("animalImg");

for (var i = 0; i < computerChoice.length; i++) {
    hiddenWord[i] = "-";
}
wordDisplay.textContent = hiddenWord.join("");

for (var i = 0; i < computerChoice.length; i++) {
    computerWord[i] = computerChoice[i];
}

document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();

    // checking that the input is a letter and has not already been guessed
    if ((userOptions.indexOf(letter) > -1) && (guesses.indexOf(letter) < 0)) {
        // checking if the input is in the computer's word
        if (computerWord.indexOf(letter) > -1) {
            // replacing the "-" in the hidden word with the correct letter
            for (var i = 0; i < computerWord.length; i++) {
                if (letter == computerWord[i]) {
                    hiddenWord[i] = letter;
                    wordDisplay.textContent = hiddenWord.join("");
                }
            }

            // updating the guessed letters
            guesses += letter;
            guessesText.textContent = guesses;
        } else {
            // lose an attempt for an incorrect guess
            attempts -= 1;
            attemptsText.textContent = attempts;

            // updating the guessed letters
            guesses += letter;
            guessesText.textContent = guesses;
        }

        // conditions for a win
        if (checkArrays(hiddenWord, computerWord)) {
            numWins += 1;
            winsText.textContent = numWins;
            displayPhoto(computerChoice);
            resetGame();
        }
        // conditions for a loss
        if (attempts === 0) {
            resetGame();
        }
    }
}