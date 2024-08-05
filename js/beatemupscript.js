/*
JackMadeThat Beat 'em Up Script
*/

// -----
// Components
// -----

const fighter = document.getElementById('fighterDiv');

// -----
// Variables
// -----

let playerX = 0;
let playerY = 0;
const speed = 2;
const sprintSpeed = 5;
const keys = {};
let currentSpeed = speed;
let isShiftDown = false

// -----
// Move Character
// -----

const update = () => {

	// Keypress functionality
	if (isShiftDown) {
		currentSpeed = sprintSpeed;
	} else {
		currentSpeed = speed;
	}

	if (keys.ArrowUp || keys.w || keys.W) playerY -= currentSpeed;

	if (keys.ArrowDown || keys.s || keys.S) playerY += currentSpeed;

	if (keys.ArrowLeft || keys.a || keys.A) {
		playerX -= currentSpeed;
		fighter.style.transform = 'scaleX(-1)';
	}

	if (keys.ArrowRight || keys.d || keys.D) {
		playerX += currentSpeed;
		fighter.style.transform = 'scaleX(1)';
	}
  
	// Set the player position
	fighter.style.top = `${playerY}px`;
	fighter.style.left = `${playerX}px`;
  
	// Update frame
	requestAnimationFrame(update);
	console.log(keys);
}

// -----
// Keyboard Events
// -----

document.addEventListener('keydown', (event) => {
	keys[event.key.toLowerCase()] = true;

	isShiftDown = event.getModifierState('Shift');
});
  
document.addEventListener('keyup', (event) => {
	keys[event.key.toLowerCase()] = false;

	if (event.key === 'Shift') {
		isShiftDown = false;
	}
});
  
// -----
// Start Game Loop
// -----

update();