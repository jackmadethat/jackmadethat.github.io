/*
JackMadeThat 3D Pong Script
Play a game of 3D Pong!
*/

// -----
// Components
// -----

const court = document.getElementById('court');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreBox = document.getElementById('score');
const depthMarker = document.getElementById('depth-marker');
const highScoreBox = document.getElementById('highest-score');

// -----
// Variables
// -----

let score = 0;
let highestScore = 0;
let ballX = 400;
let ballY = 300;
let ballVx = 4;
let ballVy = 4;
let ballSpeed = 4;
let ballDirection = 45;
let depth = 0;
let depthDir = 1;
let width = 10;
let height = 10;
let x = 100;
let y = 100;

// -----
// Setup paddle
// -----

court.addEventListener('mousemove', (event) => {
  const paddleX = event.clientX - court.offsetLeft - paddle.offsetWidth / 2;
  const paddleY = event.clientY - court.offsetTop - paddle.offsetHeight / 2;
  const paddleMaxX = court.offsetWidth - paddle.offsetWidth;
  const paddleMaxY = court.offsetHeight - paddle.offsetHeight;
  paddle.style.transform = `translate(${Math.min(Math.max(paddleX, 0), paddleMaxX)}px, ${Math.min(Math.max(paddleY, 0), paddleMaxY)}px)`;
});

// -----
// Handle depth
// -----

const animate = () => {
  const topMarginLeft = 0;
  const topMarginTop = 0;
  const topWidth = 800;
  const topHeight = 600;
  const bottomMarginLeft = 266;
  const bottomMarginTop = 200;
  const bottomWidth = 266;
  const bottomHeight = 200;
  const ballTopWidth = 60;
  const ballTopHeight = 60;
  const ballBottomWidth = 15;
  const ballBottomHeight = 15;
  const duration = 4000;

  let currentTime = 0;

  const animateStep = () => {
    const progress = currentTime / duration;
    let marginLeft, marginTop, width, height, ballWidth, ballHeight, ballOffsetX, ballOffsetY;

    if (progress < 0.5) {
		// Ball goes down
		depthMarker.style.marginLeft = `${topMarginLeft + (bottomMarginLeft - topMarginLeft) * progress * 2}px`;
		depthMarker.style.marginTop = `${topMarginTop + (bottomMarginTop - topMarginTop) * progress * 2}px`;
		depthMarker.style.width = `${topWidth + (bottomWidth - topWidth) * progress * 2}px`;
		depthMarker.style.height = `${topHeight + (bottomHeight - topHeight) * progress * 2}px`;
		ball.style.width = `${ballTopWidth + (ballBottomWidth - ballTopWidth) * progress * 2}px`;
		ball.style.height = `${ballTopHeight + (ballBottomHeight - ballTopHeight) * progress * 2}px`;
		ballOffsetX = ((ballTopWidth - ballWidth) / 2) + 370;
		ballOffsetY = ((ballTopHeight - ballHeight) / 2) + 270;
		ball.style.transform = `translate(${ballOffsetX}px, ${ballOffsetY}px)`;
    } else {
		// Ball comes up
		depthMarker.style.marginLeft = `${bottomMarginLeft + (topMarginLeft - bottomMarginLeft) * (progress - 0.5) * 2}px`;
		depthMarker.style.marginTop = `${bottomMarginTop + (topMarginTop - bottomMarginTop) * (progress - 0.5) * 2}px`;
		depthMarker.style.width = `${bottomWidth + (topWidth - bottomWidth) * (progress - 0.5) * 2}px`;
		depthMarker.style.height = `${bottomHeight + (topHeight - bottomHeight) * (progress - 0.5) * 2}px`;
		ball.style.width = `${ballBottomWidth + (ballTopWidth - ballBottomWidth) * (progress - 0.5) * 2}px`;
		ball.style.height = `${ballBottomHeight + (ballTopHeight - ballBottomHeight) * (progress - 0.5) * 2}px`;
		ballOffsetX = ((ballBottomWidth - ballWidth) / 2) + 370;
		ballOffsetY = ((ballBottomHeight - ballHeight) / 2) + 270;
		ball.style.transform = `translate(${ballOffsetX}px, ${ballOffsetY}px)`;
    }

    currentTime += 20; // increment time by 20ms

    if (currentTime >= duration) {
      currentTime = 0; // reset time
    }

    requestAnimationFrame(animateStep);
  };

  animateStep();
};

animate();

// -----
// Animate ball
// -----
/*
const updateBallPosition = () => {
  ballX += ballVx;
  ballY += ballVy;
}

const updateBallDirection = () => {
  if (ballX <= 0 || ballX + 10 >= (court.offsetWidth - 30)) {
    ballVx = -ballVx; // reverse x direction
  }
  if (ballY <= 0 || ballY + 10 >= (court.offsetHeight - 30)) {
    ballVy = -ballVy; // reverse y direction
  }
}

const animateBall = () => {
  updateBallPosition();
  updateBallDirection();
  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
  requestAnimationFrame(animateBall);
}

animateBall();
*/

// -----
// Handle collision
// -----

