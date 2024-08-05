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

const guard = [
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Guard_01.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Guard_01.png",  
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Guard_01.png", 
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Guard_02.png",
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Guard_02.png", 
	"https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/fighterchar/Fighter_Guard_02.png"
];

const preloadImages = (imageArrays) => {
	imageArrays.forEach((array) => {
		array.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	});	
}
  
window.addEventListener("load", () => {
	const imageArrays = [idle, walk, run, guard];
	preloadImages(imageArrays);
});

// -----
// Variables
// -----

let playerX = 0;
let playerY = 0;
const keys = {};

let isMoving = false;
const speed = 1;
const sprintSpeed = 2;
let currentSpeed = speed;
let isShiftDown = false;

let interval = 150;
let lastTime = 0;
let imgArray = idle;
let index = 0;

let isControlDown = false;

// -----
// Move Character
// -----

const update = (timestamp) => {

	// Set states like running, guarding, etc
	if (isShiftDown) {
		currentSpeed = sprintSpeed;
		if (keys.arrowup || keys.w || keys.W ||
			keys.arrowdown || keys.s || keys.S ||
			keys.arrowleft || keys.a || keys.A ||
			keys.arrowright || keys.d || keys.D) {
			imgArray = run; // Set imgArray to run when Shift is down and moving
		} else {
			imgArray = idle; // Set imgArray to idle when Shift is down but not moving
		}
	} else if (isControlDown) {
		imgArray = guard; // Set imgArray to guard when Control is down
		currentSpeed = 0; // Prevent movement when guarding
	} else {
		currentSpeed = speed;
		if (keys.arrowup || keys.w || keys.W ||
			keys.arrowdown || keys.s || keys.S ||
			keys.arrowleft || keys.a || keys.A ||
			keys.arrowright || keys.d || keys.D) {
			imgArray = walk; // Set imgArray to walk when moving without Shift
			isMoving = true;
		} else {
			imgArray = idle;
			isMoving = false;
		}
	}

	// Guarding
	if (!isControlDown) {
		if (keys.arrowup || keys.w || keys.W) playerY -= currentSpeed / 2;
		if (keys.arrowdown || keys.s || keys.S) playerY += currentSpeed / 2;
		if (keys.arrowleft || keys.a || keys.A) {
			playerX -= currentSpeed;
			fighter.style.transform = 'scaleX(-1)';
		}
		if (keys.arrowright || keys.d || keys.D) {
			playerX += currentSpeed;
			fighter.style.transform = 'scaleX(1)';
		}
	}

	// Directional movement
	if (keys.arrowup || keys.w || keys.W) {
		playerY -= currentSpeed;
	}
	if (keys.arrowdown || keys.s || keys.S) {
		playerY += currentSpeed;
	}
	if (keys.arrowleft || keys.a || keys.A) {
		playerX -= currentSpeed;
		fighter.style.transform = 'scaleX(-1)';
	}
	if (keys.arrowright || keys.d || keys.D) {
		playerX += currentSpeed;
		fighter.style.transform = 'scaleX(1)';
	}

	// Set to idle if opposite directions are pushed
	if ((keys.arrowleft || keys.a || keys.A) && (keys.arrowright || keys.d || keys.D)) {
		imgArray = idle;
	} else if ((keys.arrowup || keys.w || keys.W) && (keys.arrowdown || keys.s || keys.S)) {
		imgArray = idle;
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
	isControlDown = event.getModifierState('Control');

	if (isControlDown) {
		switch (event.key) {
			case 'a':
			case 's':
			case 'd':
			case 'w':
			event.preventDefault();
			break;
		}
	}
});
  
document.addEventListener('keyup', (event) => {
	keys[event.key.toLowerCase()] = false;

	if (event.key === 'Shift') {
		isShiftDown = false;
	}
	if (event.key === 'Control') {
		isControlDown = false;
	}
});
  
// -----
// Start Game Loop
// -----

update();