const dice = [
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_1.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_2.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_3.png",
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_4.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_5.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_6.png",
];

const rollBtn = document.getElementById("rollButton");
const diceImage = document.getElementById("diceimage_01");

let currentIndex = 0;
let intervalId = null;

const angles = [0, -5, 10, -15, 20, -25, 30, -35, 40, -45];
let randomAngle = 0;

const directions = ['up', 'down', 'left', 'right'];
const nudgeAmount = Math.floor(Math.random() * 10) + 1;

const rapidCycle = () => {
    intervalId = setInterval(() => {

        switchImage();
        rotateImage();
        nudgeImage();

    }, 10000);
  }

const slowDown = () => {
    clearInterval(intervalId);
    let slowIntervalId = setInterval(() => {
        const remainingTime = 2500 - (new Date() - startTime); // Calculate remaining time
        const delay = (Math.max(1, remainingTime / 20) / 100);

        // console.log(`Remaining time: ${remainingTime}, Delay: ${delay}`); 
        currentIndex = Math.floor(Math.random() * dice.length);

        switchImage();
        rotateImage();
        nudgeImage();

        if (remainingTime <= 0) {
            clearInterval(slowIntervalId);
        } else {
            setTimeout(() => {
              slowDown();
            }, delay);
          }
        }, 25);
}
  
const roll = () => {
    startTime = Date.now();
    rapidCycle();
    setTimeout(slowDown, 0);
    diceImage.style.top = `0px`;
    diceImage.style.left = `0px`;
}

const switchImage = () => {
    currentIndex = Math.floor(Math.random() * dice.length);
    diceImage.src = dice[currentIndex];
}

const rotateImage = () => {
    randomAngle = angles[Math.floor(Math.random() * angles.length)];
    diceImage.style.transform = `rotate(${randomAngle}deg)`;
}

const nudgeImage = () => {
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];;

  switch (randomDirection) {
    case 'up':
      diceImage.style.top = `${-nudgeAmount}px`;
      break;
    case 'down':
      diceImage.style.top = `${nudgeAmount}px`;
      break;
    case 'left':
      diceImage.style.left = `${-nudgeAmount}px`;
      break;
    case 'right':
      diceImage.style.left = `${nudgeAmount}px`;
      break;
  }
}
  
rollBtn.addEventListener("click", roll);