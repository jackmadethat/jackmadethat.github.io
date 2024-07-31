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
const speed = 2;
const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowLeft: false,
	ArrowRight: false
};

function update() {
	if (keys.ArrowUp) playerY -= speed;
	if (keys.ArrowDown) playerY += speed;
	if (keys.ArrowLeft) playerX -= speed;
	if (keys.ArrowRight) playerX += speed;

	fighter.style.top = `${playerY}px`;
	fighter.style.left = `${playerX}px`;
	
	requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
	keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
	keys[event.key] = false;
});

update();