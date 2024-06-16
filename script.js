/*

JackMadeThat Dice Roller Script
Rolls 2 D6 dice

*/

const dice = [
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_1.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_2.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_3.png",
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_4.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_5.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_6.png",
];

const rollBtn = document.getElementById("rollButton");
const diceImage01 = document.getElementById("diceimage_01");
const diceImage02 = document.getElementById("diceimage_02");

let currentIndex = 0;
let currentIndex2 = 0;
let intervalId = null;

const angles = [0, -5, 10, -15, 20, -25, 30, -35, 40, -45, 60, -75, 90, -90];
let randomAngle = 0;
let randomAngle2 = 0;

const directions = ['up', 'down', 'left', 'right'];
const nudgeAmount = Math.floor(Math.random() * 5) + 1;
const nudgeAmount2 = Math.floor(Math.random() * 5) + 1;

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
        const remainingTime = 1500 - (new Date() - startTime); // Calculate remaining time
        const delay = (Math.max(1, remainingTime / 20) / 100); // Calculate delay (WIP)

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
    
    diceImage01.style.top = `0px`;
    diceImage01.style.left = `0px`;
    diceImage02.style.top = `0px`;
    diceImage02.style.left = `0px`;
}

const switchImage = () => {
    currentIndex = Math.floor(Math.random() * dice.length);
    currentIndex2 = Math.floor(Math.random() * dice.length);

    diceImage01.src = dice[currentIndex];
    diceImage02.src = dice[currentIndex2];
}

const rotateImage = () => {
    randomAngle = angles[Math.floor(Math.random() * angles.length)];
    randomAngle2 = angles[Math.floor(Math.random() * angles.length)];

    diceImage01.style.transform = `rotate(${randomAngle}deg)`;
    diceImage02.style.transform = `rotate(${randomAngle2}deg)`;
}

const nudgeImage = () => {
    const randomDirection1 = directions[Math.floor(Math.random() * directions.length)];
    const randomDirection2 = directions[Math.floor(Math.random() * directions.length)];

    const nudge = (direction, dice) => {
        switch (direction) {
            case 'up':
                dice.style.top = `${-nudgeAmount}px`;
            break;
            case 'down':
                dice.style.top = `${nudgeAmount}px`;
            break;
            case 'left':
                dice.style.left = `${-nudgeAmount}px`;
            break;
            case 'right':
                dice.style.left = `${nudgeAmount}px`;
            break;
        }
    }

    nudge(randomDirection1, diceImage01);
    nudge(randomDirection2, diceImage02);
}

switchImage();

rollBtn.addEventListener("click", roll);