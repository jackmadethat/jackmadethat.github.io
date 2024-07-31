/*
JackMadeThat Beat 'em Up Script
*/

// -----
// Components
// -----

const fighter = document.getElementById('fighterDiv');

// -----
// Move Character
// -----

let playerX = 0;
let playerY = 0;
let velocityX = 0;
let velocityY = 0;
const speed = 2;

function update() {
  playerX += velocityX;
  playerY += velocityY;
  fighter.style.top = `${playerY}px`;
  fighter.style.left = `${playerX}px`;
  requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      velocityY = -speed;
      break;
    case 'ArrowDown':
      velocityY = speed;
      break;
    case 'ArrowLeft':
      velocityX = -speed;
      break;
    case 'ArrowRight':
      velocityX = speed;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
      velocityY = 0;
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      velocityX = 0;
      break;
  }
});

update();