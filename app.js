// Select all the game boxes and buttons
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Indicates which player's turn it is (true for 'O', false for 'X')
let count = 0; // To track the number of moves made

// Define winning patterns
const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Diagonal from top-right to bottom-left
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

// Function to reset the game state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes(); // Enable all boxes
  msgContainer.classList.add("hide"); // Hide message container
};

// Add event listener to each box for click actions
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player 'O' turn
      box.innerText = "O";
      turnO = false;
    } else {
      // Player 'X' turn
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; // Disable the clicked box
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      // If all boxes are filled and there's no winner, it's a draw
      gameDraw();
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide"); // Show message container
  disableBoxes(); // Disable all boxes
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and clear their content
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide"); // Show message container
  disableBoxes(); // Disable all boxes
};

// Function to check if there's a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Show winner if found
        return true;
      }
    }
  }
};

// Add event listeners for the New Game and Reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
