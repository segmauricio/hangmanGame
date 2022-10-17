// variables
const wordElement = document.getElementById("wordToGuess")
const livesElement = document.getElementById("mensaje")
const resetButton = document.getElementById("reset")
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let words = ["GITHUB", "STUDIO", "Python", "Javascript", "HTML", "Java"]
let currentWord, lives, correctGuesses, guesses

// events
document.addEventListener("DOMContentLoaded", generarPalabra)
resetButton.addEventListener("click", generarPalabra)

document.addEventListener("keyup", (event) => {
  let letterPressed = event.key.toLowerCase()

  if (letterPressed === "enter") {
    generarPalabra()
  }

  if (alphabet.includes(letterPressed)) {
    if (lives > 0) {
      updatePalabra(letterPressed)
    }
  }
})

// functions
function generarPalabra() {
  wordElement.innerHTML = ''
  lives = 5
  correctGuesses = 0
  currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  guesses = []

  for (let i = 0; i < currentWord.length; i++) {
    const guess = document.createElement("p")
    guess.innerHTML = '_'
    guess.classList.add("guess")
    wordElement.append(guess)
    guesses.push(guess)
  }

  livesElement.innerHTML = `Le quedan ${lives} vidas!`
}

function updatePalabra(letterPressed) {
  if (currentWord.includes(letterPressed)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (guesses[i].innerHTML === "_" && letterPressed === currentWord[i]) {
        guesses[i].innerHTML = letterPressed
        correctGuesses++
      }
    }
  } else {
    lives--
    livesElement.innerHTML = `Le quedan ${lives} vidas!`
  }
  if (correctGuesses === currentWord.length) {
    livesElement.innerHTML = "Felicidades 🥳 Has ganado el juego!<br>Presiona el botón de 'RESET' o la tecla ENTER para jugar de nuevo."
  }
  if (lives === 0) {
    livesElement.innerHTML = "Perdiste 😛 <br>Presiona el botón de 'RESET' o la tecla ENTER para jugar de nuevo."
  }
}