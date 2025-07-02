let computerChoice = "";
let playerChoice = "";
let gameState = false;
let numTurns = 0;
let score = "";

const startGame = () => {
    if (gameState) {
        gameState = false;
        document.getElementById("startGame").innerText = "Start Game";
        document.getElementById("playerButtons").style.display = "none";
        document.getElementById("computerChoice").innerText = "";
        document.getElementById("playerChoice").innerText = "";
        document.getElementById("turn").innerText = "";
        document.getElementById("score").innerText = "";
        document.getElementById("result").innerText = "";
        numTurns = 0;
        console.log(gameState);
    } else {
        gameState = true;
        document.getElementById("startGame").innerText = "Reset";
        document.getElementById("playerButtons").style.display = "block";
        document.getElementById("computerChoice").innerText = "Awaiting Choice";
        document.getElementById("playerChoice").innerText = "";
        document.getElementById("turn").innerText = "";
        document.getElementById("score").innerText = "";
        document.getElementById("result").innerText = "";
        numTurns = 0;
        numTurns = 0;
        console.log(gameState);
    }
}

const getComputerChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      computerChoice = "Rock";
      break;
    case 1:
      computerChoice = "Paper";
      break;
    case 2:
      computerChoice = "Scissors";
      break;
  }
  return computerChoice;
}

const compareChoices = (player, computer) => {
  if (player === computer) {
    document.getElementById("result").innerText = "Draw!";
    document.getElementById("score").insertAdjacentText("beforeend", "D - ");
  } else if (player === "Rock" && computer === "Scissors" || player === "Scissors" && computer === "Paper" || player === "Paper" && computer === "Rock") {
    document.getElementById("result").innerText = "You Win!";
    document.getElementById("score").insertAdjacentText("beforeend", "W - ");
  } else {
    document.getElementById("result").innerText = "You Lose!";
    document.getElementById("score").insertAdjacentText("beforeend", "L - ");
  }
  if (numTurns >= 4) {
    gameState = false;
    document.getElementById("turn").innerText = "Game Over!";
    document.getElementById("startGame").innerText = "Reset";
    console.log(gameState);
  } else {
    numTurns++;
    document.getElementById("turn").innerText = "Turns: " + numTurns;
  }
}

const makeChoice = (choice) => {
  if (gameState) {
    playerChoice = choice;
    document.getElementById("playerChoice").innerText = "You picked: " + playerChoice;
    document.getElementById("computerChoice").innerText = "The computer picked: " + getComputerChoice();
    compareChoices(playerChoice, computerChoice);
  }
}

//console.log(getComputerChoice());