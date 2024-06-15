const dice = [
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_1.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_2.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_3.png",
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_4.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_5.png", 
    "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/dice/Dice_6.png",
];

intervalId = setInterval(() => {
    currentIndex = Math.floor(Math.random() * dice.length);
    document.getElementById("diceimage").src = dice[currentIndex];
  }, 100);
 