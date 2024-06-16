/*
JackMadeThat Dice Roller Script
Rolls 2 D6 dice
*/

// Array of dice images
const dice = [
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_1.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_2.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_3.png",
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_4.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_5.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_6.png",
];

// Components
const rollBtn = document.getElementById("rollButton");
const dice01 = document.getElementById("diceimage_01");
const dice02 = document.getElementById("diceimage_02");
const readout = document.getElementById("readout");
const fluff = document.getElementById("flufftext");

// Variables
const directions = ['up', 'down', 'left', 'right'];
const nudgeAmount = 12;
let canRoll = true;

// Function called by on-screen button
const roll = () => {
    if (canRoll) {
        dice01.style.top = `0px`;
        dice01.style.left = `0px`;
        dice02.style.top = `0px`;
        dice02.style.left = `0px`;
        readout.textContent = "Rolling...";
        fluff.textContent = "";
        startCycle();
    } else {
        readout.textContent = "Wait until current roll is finished!";
    }
    canRoll = false;
}

// Functions to animate dice movement
const animateDice = () => {
        setImage();
        rotateImage();
        nudgeImage();
}

const setImage = () => {
    Dice1Val = dice[Math.floor(Math.random() * dice.length)];
    dice01.src = Dice1Val;
    Dice2Val = dice[Math.floor(Math.random() * dice.length)];
    dice02.src = Dice2Val;
}

const rotateImage = () => {
    dice01.style.transform = `rotate(${Math.floor(Math.random() * 360 - 180)}deg)`;
    dice02.style.transform = `rotate(${Math.floor(Math.random() * 360 - 180)}deg)`;
}

const nudgeImage = () => {
    const nudge = (direction, dice) => {
        switch (direction) {
            case 'up':
                dice.style.top = `${-(Math.floor(Math.random() * nudgeAmount) + 1)}px`;
            break;
            case 'down':
                dice.style.top = `${(Math.floor(Math.random() * nudgeAmount) + 1)}px`;
            break;
            case 'left':
                dice.style.left = `${-(Math.floor(Math.random() * nudgeAmount) + 1)}px`;
            break;
            case 'right':
                dice.style.left = `${(Math.floor(Math.random() * nudgeAmount) + 1)}px`;
            break;
        }
    }

    nudge(directions[Math.floor(Math.random() * directions.length)], dice01);
    nudge(directions[Math.floor(Math.random() * directions.length)], dice02);
}

// Three-stage animation starting at fast and slowing to a stop
const startCycle = () => {
    const cycle = setInterval(animateDice, 50); // Green number sets pace of animation
    const nextCycle = () => {
        clearInterval(cycle);
        stage_02();
    }
    setTimeout(nextCycle, 1000); // Next stage called after running stage for 1 second
}

const stage_02 = () => {
    const cycle = setInterval(animateDice, 100);
    const nextCycle = () => {
        clearInterval(cycle);
        stage_03();
    }
    setTimeout(nextCycle, 1000);
}

const stage_03 = () => {
    const cycle = setInterval(animateDice, 175);
    const endCycle = () => {
        clearInterval(cycle);
        setTimeout(setReadout, 500);
    }
    setTimeout(endCycle, 1000);
}

const setReadout = () => {
    canRoll = true;
    const sumDice = () => {
        return [
            (dice.indexOf(Dice1Val) + 1) + " + " + (dice.indexOf(Dice2Val) + 1) + " = " + ((dice.indexOf(Dice1Val) + 1) + (dice.indexOf(Dice2Val) + 1)), 
            (dice.indexOf(Dice1Val) + 1) + (dice.indexOf(Dice2Val) + 1),
            dice.indexOf(Dice1Val),
            dice.indexOf(Dice2Val)
        ];
    }
    console.log(sumDice());

    readout.textContent = sumDice()[0]; // Display sum equation
    if (sumDice()[2] == sumDice()[3]) { // Display fluff text for rolling doubles
        fluff.textContent = "You rolled doubles!";
    } else {
        switch(sumDice()[1]) { // Display fluff text for winning values
            case 2:
                fluff.textContent = "Snake eyes!";
            break;
            case 7:
                fluff.textContent = "Winner!";
            break;
            case 12:
                fluff.textContent = "Double Sixes!";
            break;
            default: 
                fluff.textContent = " ";   
        }
    }
}

// Set random dice on page load
setImage();

// Assign action to button in window
rollBtn.addEventListener("click", roll);