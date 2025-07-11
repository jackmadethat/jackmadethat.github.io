let gameBoard = {
  top: ["", "", ""],
  middle: ["", "", ""],
  bottom: ["", "", ""]
}

let game = true; // true if game is active

let turn = true; // X is true, O is false

const selectSquare = (r, n) => {
  if (gameBoard[r][n] == "") {
    turn ? gameBoard[r][n] = "x" : gameBoard[r][n] = "o";
    turn = !turn;
    renderBoard();
    checkForWin();
  }
}

const checkForWin = () => {
  if (gameBoard.top[0] != "" && gameBoard.top[0] == gameBoard.middle[0] && gameBoard.middle[0] == gameBoard.bottom[0]) {
    console.log("WINRAR!");
  } else if (gameBoard.top[1] != "" && gameBoard.top[1] == gameBoard.middle[1] && gameBoard.middle[1] == gameBoard.bottom[1]) {

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