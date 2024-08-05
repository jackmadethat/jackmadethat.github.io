/*
JackMadeThat Beat 'em Up Script
*/

// -----
// Components
// -----

const fighter = document.getElementById('fighterDiv');
const fighterImg = document.getElementById('fighterImg');

// -----
// Fighter Sprites
// -----

const idle = [
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Idle_01.png", 
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Idle_02.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Idle_03.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Idle_04.png"
];

const walk = [
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Walk_01.png", 
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Walk_02.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Walk_03.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Walk_04.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Walk_03.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Walk_02.png"
];

const run = [
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Run_01.png", 
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Run_02.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Run_03.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Run_02.png"
];

// -----
// Variables
// -----

let playerX = 0;
let playerY = 0;
const keys = {};

let isMoving = false;
const speed = 2;
const sprintSpeed = 5;
let currentSpeed = speed;
let isShiftDown = false;

let interval = 150;
let lastTime = 0;
let imgArray = idle;
let index = 0;

// -----
// Move Character
// -----

const update = (timestamp) => {

	// Keypress functionality
	if (isShiftDown) {
		currentSpeed = sprintSpeed;
		if (keys.ArrowUp || keys.w || keys.W ||
			keys.ArrowDown || keys.s || keys.S ||
			keys.ArrowLeft || keys.a || keys.A ||
			keys.ArrowRight || keys.d || keys.D) {
			imgArray = run; // Set imgArray to run when Shift is down and moving
		} else {
			imgArray = idle; // Set imgArray to idle when Shift is down but not moving
		}
	} else {
		currentSpeed = speed;
		if (keys.ArrowUp || keys.w || keys.W ||
			keys.ArrowDown || keys.s || keys.S ||
			keys.ArrowLeft || keys.a || keys.A ||
			keys.ArrowRight || keys.d || keys.D) {
			imgArray = walk; // Set imgArray to walk when moving without Shift
			isMoving = true;
		} else {
			imgArray = idle;
			isMoving = false;
		}
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

	// Animate sprites
	if (timestamp - lastTime >= interval) {
		fighterImg.src = imgArray[index];
		index = (index + 1) % imgArray.length;
		if (index === 0) {
			index = 0;
		}
		lastTime = timestamp;
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