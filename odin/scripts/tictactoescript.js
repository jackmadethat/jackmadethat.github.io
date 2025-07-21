let gameBoard = {
  top: ["", "", ""],
  middle: ["", "", ""],
  bottom: ["", "", ""]
}

let game = true; // true if game is active
let turn = true; // X is true, O is false

const reset = () => {
  location.reload();
}

const selectSquare = (r, n) => {
  if (gameBoard[r][n] == "" && game) {
    turn ? gameBoard[r][n] = "x" : gameBoard[r][n] = "o";
    turn = !turn;
    renderBoard();
    checkForWin();
  }
}

const checkForWin = () => {
  if (gameBoard.top[0] != "" && gameBoard.top[0] == gameBoard.middle[0] && gameBoard.middle[0] == gameBoard.bottom[0]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("topLeft").style.backgroundColor = "red";
    document.getElementById("middleLeft").style.backgroundColor = "red";
    document.getElementById("bottomLeft").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.top[1] != "" && gameBoard.top[1] == gameBoard.middle[1] && gameBoard.middle[1] == gameBoard.bottom[1]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("topMiddle").style.backgroundColor = "red";
    document.getElementById("middleMiddle").style.backgroundColor = "red";
    document.getElementById("bottomMiddle").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.top[2] != "" && gameBoard.top[2] == gameBoard.middle[2] && gameBoard.middle[2] == gameBoard.bottom[2]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("topRight").style.backgroundColor = "red";
    document.getElementById("middleRight").style.backgroundColor = "red";
    document.getElementById("bottomRight").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.top[0] != "" && gameBoard.middle[1] == gameBoard.top[0] && gameBoard.middle[1] == gameBoard.bottom[2]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("topLeft").style.backgroundColor = "red";
    document.getElementById("middleMiddle").style.backgroundColor = "red";
    document.getElementById("bottomRight").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.top[2] != "" && gameBoard.top[2] == gameBoard.middle[1] && gameBoard.middle[1] == gameBoard.bottom[0]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("topRight").style.backgroundColor = "red";
    document.getElementById("middleMiddle").style.backgroundColor = "red";
    document.getElementById("bottomLeft").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.top[0] != "" && gameBoard.top[0] == gameBoard.top[1] && gameBoard.top[1] == gameBoard.top[2]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("topRow").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.middle[0] != "" && gameBoard.middle[0] == gameBoard.middle[1] && gameBoard.middle[1] == gameBoard.middle[2]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("middleRow").style.backgroundColor = "red";
    game = false;
  } else if (gameBoard.bottom[0] != "" && gameBoard.bottom[0] == gameBoard.bottom[1] && gameBoard.bottom[1] == gameBoard.bottom[2]) {
    document.getElementById("playerPrompt").innerText = (turn ? "O" : "X") + " Wins!";
    document.getElementById("bottomRow").style.backgroundColor = "red";
    game = false;
  }
}

const renderBoard = () => {
  console.log(gameBoard);

  document.getElementById("playerPrompt").innerText = turn ? "X to move" : "O to move";

  document.getElementById("topLeft").innerHTML = gameBoard.top[0];
  document.getElementById("topMiddle").innerHTML = gameBoard.top[1];
  document.getElementById("topRight").innerHTML = gameBoard.top[2];

  document.getElementById("middleLeft").innerHTML = gameBoard.middle[0];
  document.getElementById("middleMiddle").innerHTML = gameBoard.middle[1];
  document.getElementById("middleRight").innerHTML = gameBoard.middle[2];

  document.getElementById("bottomLeft").innerHTML = gameBoard.bottom[0];
  document.getElementById("bottomMiddle").innerHTML = gameBoard.bottom[1];
  document.getElementById("bottomRight").innerHTML = gameBoard.bottom[2];
}

// renderBoard();