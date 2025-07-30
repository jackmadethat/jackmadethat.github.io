/*
JackMadeThat Home Page Javascript
*/

// -----
// Components
// -----

const diceBtn = document.getElementById('diceBtn');
const tarotBtn = document.getElementById('tarotBtn');
const ballBtn = document.getElementById('ballBtn');
const towerBtn = document.getElementById('towerBtn');
const pongBtn = document.getElementById('pongBtn');
const beatemupBtn = document.getElementById('beatemupBtn');

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
const towerImgHover = new Image();
towerImgHover.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/tower_B.png";
const towerImgDefault = new Image();
towerImgDefault.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/tower_W.png";
const pongImgHover = new Image();
pongImgHover.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/pong_B.png";
const pongImgDefault = new Image();
pongImgDefault.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/pong_W.png";
const beatemupImgHover = new Image();
beatemupImgHover.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/beatemup_B.png";
const beatemupImgDefault = new Image();
beatemupImgDefault.src = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/gamebuttons/beatemup_W.png";


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

towerBtn.addEventListener('mouseover', () => {
  document.getElementById('towerImg').src = towerImgHover.src;
});

towerBtn.addEventListener('mouseout', () => {
  document.getElementById('towerImg').src = towerImgDefault.src;
});

pongBtn.addEventListener('mouseover', () => {
  document.getElementById('pongImg').src = pongImgHover.src;
});

pongBtn.addEventListener('mouseout', () => {
  document.getElementById('pongImg').src = pongImgDefault.src;
});

beatemupBtn.addEventListener('mouseover', () => {
  document.getElementById('beatemupImg').src = beatemupImgHover.src;
});

beatemupBtn.addEventListener('mouseout', () => {
  document.getElementById('beatemupImg').src = beatemupImgDefault.src;
});