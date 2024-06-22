/*
JackMadeThat Home Page Javascript
*/

const diceBtn = document.getElementById('diceBtn');
const tarotBtn = document.getElementById('tarotBtn');
const ballBtn = document.getElementById('ballBtn');

diceBtn.addEventListener('mouseover', () => {
    document.getElementById('diceImg').src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/dice_B.png";
});

diceBtn.addEventListener('mouseout', () => {
    document.getElementById('diceImg').src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/dice_W.png";
});

tarotBtn.addEventListener('mouseover', () => {
    document.getElementById('tarotImg').src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/arcana_B.png";
});

tarotBtn.addEventListener('mouseout', () => {
    document.getElementById('tarotImg').src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/arcana_W.png";
});

ballBtn.addEventListener('mouseover', () => {
    document.getElementById('ballImg').src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/ball_B.png";
});

ballBtn.addEventListener('mouseout', () => {
    document.getElementById('ballImg').src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/ball_W.png";
});