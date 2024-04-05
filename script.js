(function main() {
  //   Global Varibles
  //   references to HTML
  const items = document.querySelectorAll(".item");
  const playerTurn = document.getElementById("turnStatus");
  const restartGame = document.getElementById("restartButton");

  //  Global varibles that will not change
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // variables that will change
  let isGameOver = false;
  let currentPlayer = "X";
  let currentBoard = ["", "", "", "", "", "", "", "", ""];

  // Event Listenenrs
  items.forEach((box, index) => {
    box.addEventListener("click", (event) => {
      handleClick(event, index);
    });
  });

  restartGame.addEventListener("click", function (event) {
    event.preventDefault();
    restart();
  });

  //   Functions
  function restart() {
    currentPlayer = "X";
    currentBoard = ["", "", "", "", "", "", "", "", ""];
    items.forEach((box) => (box.textContent = ""));
    playerTurn.textContent = "It's " + currentPlayer + "'s turn";
    isGameOver = false;
  }

  function checkIfWon() {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        currentBoard[a] != "" &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        playerTurn.textContent = "Player " + currentPlayer + " has won!";
        isGameOver = true;
      }
    }
    if (currentBoard.every((item) => item !== "")) {
      playerTurn.textContent = "Game ended up as a draw";
      isGameOver = true;
    }
  }

  function handleClick(event, index) {
    if (currentBoard[index] == "" && isGameOver == false) {
      currentBoard[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkIfWon();
      if (isGameOver == true) {
        return;
      }
      if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
      playerTurn.textContent = "It's " + currentPlayer + "'s turn";
    }
  }
})();
