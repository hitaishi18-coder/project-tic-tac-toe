
  const boxes = document.querySelectorAll(".box");
  const resetBtn = document.querySelector("#reset-btn");
  const newGameBtn = document.querySelector("#new-btn");
  const msgContainer = document.querySelector("#msg-container");
  const msg = document.querySelector("#msg");

  let currentPlayer = "X";
  let gameActive = true;

// win pattern
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


  const checkWinner = () => {
    for (let pattern of winPatterns) {
      let [a, b, c] = pattern;
      if (
        boxes[a].innerText !== "" &&
        boxes[a].innerText === boxes[b].innerText &&
        boxes[a].innerText === boxes[c].innerText
      ) {
        
        showWinner(boxes[a].innerText);
        return true;
      }
    }
    return false;
  };

  
  const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
  };
  
  const showWinner = (player) => {
    msg.innerText = `Congratulations! Player ${player} wins 🎉`;
    msgContainer.classList.remove("d-none");
    gameActive = false;
  };

  
  const handleClick = (box) => {
    if (box.innerText === "" && gameActive) {
      box.innerText = currentPlayer;
      let winnerFound = checkWinner();

      if (!winnerFound) {
        if (checkDraw()) {
          msg.innerText = "It's a Draw!";
          msgContainer.classList.remove("d-none");
          gameActive = false;
        } else {
          
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  };

  
  boxes.forEach(box => {
    box.addEventListener("click", () => handleClick(box));
  });


  const resetGame = () => {
    boxes.forEach(box => box.innerText = "");
    currentPlayer = "X";
    gameActive = true;
    msgContainer.classList.add("d-none");
  };

  resetBtn.addEventListener("click", resetGame);
  newGameBtn.addEventListener("click", resetGame);
