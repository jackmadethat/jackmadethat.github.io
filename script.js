const rollBtn = document.getElementById("rollButton");

const dice = [
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_1.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_2.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_3.png",
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_4.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_5.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_6.png",
];

let currentIndex = 0;
let intervalId = null;
const startTime = new Date();

function rapidCycle() {
    intervalId = setInterval(() => {
      currentIndex = Math.floor(Math.random() * dice.length);
      document.getElementById("diceimage").src = dice[currentIndex];
    }, 100);
  }

function slowDown() {
    clearInterval(intervalId);
    let slowIntervalId = setInterval(() => {
      const remainingTime = 5000 - (new Date() - startTime); // Calculate remaining time
      const delay = 100 + (remainingTime / 10); // Increase delay for each remaining millisecond
      currentIndex = Math.floor(Math.random() * dice.length);
      document.getElementById("diceimage").src = dice[currentIndex];
      if (remainingTime <= 0) {
        clearInterval(slowIntervalId);
      }
    }, 25);
  }
  
function roll() {
  rapidCycle();
  setTimeout(slowDown, 5000);
}
  
rollBtn.addEventListener("click", roll);