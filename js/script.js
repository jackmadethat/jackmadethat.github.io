/*
JackMadeThat Home Page Javascript
*/

// -----
// Components
// -----

const diceBtn = document.getElementById('diceBtn');
const tarotBtn = document.getElementById('tarotBtn');
const ballBtn = document.getElementById('ballBtn');

// -----
// Pre-load images
// -----

const diceImgHover = new Image();
diceImgHover.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/dice_B.png";
const diceImgDefault = new Image();
diceImgDefault.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/dice_W.png";
const tarotImgHover = new Image();
tarotImgHover.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/arcana_B.png";
const tarotImgDefault = new Image();
tarotImgDefault.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/arcana_W.png";
const ballImgHover = new Image();
ballImgHover.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/ball_B.png";
const ballImgDefault = new Image();
ballImgDefault.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/ball_W.png";

// -----
// Hover events
// -----

diceBtn.addEventListener('mouseover', () => {
  document.getElementById('diceImg').src = diceImgHover.src;
});

diceBtn.addEventListener('mouseout', () => {
  document.getElementById('diceImg').src = diceImgDefault.src;
});

tarotBtn.addEventListener('mouseover', () => {
  document.getElementById('tarotImg').src = tarotImgHover.src;
});

tarotBtn.addEventListener('mouseout', () => {
  document.getElementById('tarotImg').src = tarotImgDefault.src;
});

ballBtn.addEventListener('mouseover', () => {
  document.getElementById('ballImg').src = ballImgHover.src;
});

ballBtn.addEventListener('mouseout', () => {
  document.getElementById('ballImg').src = ballImgDefault.src;
});