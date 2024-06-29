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
let topMarginLeft = 0;
let topMarginTop = 0;
let topWidth = 800;
let topHeight = 600;
let bottomMarginLeft = 266;
let bottomMarginTop = 200;
let bottomWidth = 266;
let bottomHeight = 200;
let ballTopWidth = 60;
let ballTopHeight = 60;
let ballBottomWidth = 15;
let ballBottomHeight = 15;
let duration = 4000;

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

let hitFloor = false;
let hitCeiling = false;

const floorHit = () => {
  console.log("Hit Floor");
  hitFloor = false;
}

const ceilingHit = () => {
  console.log("Hit Ceiling");
  hitCeiling = false;
}

const animate = () => {
  const initialMarginLeft = 0;
  const initialMarginTop = 0;
  const initialWidth = 800;
  const initialHeight = 600;
  const middleMarginLeft = 266;
  const middleMarginTop = 200;
  const middleWidth = 266;
  const middleHeight = 200;
  const finalMarginLeft = 0;
  const finalMarginTop = 0;
  const finalWidth = 800;
  const finalHeight = 600;
  const ballInitialWidth = 60;
  const ballInitialHeight = 60;
  const ballMiddleWidth = 15;
  const ballMiddleHeight = 15;
  const duration = 4000;
  let lastHitEdge = null;
  let lastScale = 1;
  let currentTime = 0;

  const animateStep = () => {
    const progress = currentTime / duration;
    let marginLeft, marginTop, width, height, ballWidth, ballHeight;
    let leftEdge, rightEdge, topEdge, bottomEdge;
  
    if (progress < 0.5) {
      // First half of the animation
      marginLeft = initialMarginLeft + (middleMarginLeft - initialMarginLeft) * progress * 2;
      marginTop = initialMarginTop + (middleMarginTop - initialMarginTop) * progress * 2;
      width = initialWidth + (middleWidth - initialWidth) * progress * 2;
      height = initialHeight + (middleHeight - initialHeight) * progress * 2;
      ballWidth = ballInitialWidth + (ballMiddleWidth - ballInitialWidth) * progress * 2;
      ballHeight = ballInitialHeight + (ballMiddleHeight - ballInitialHeight) * progress * 2;
    } else {
      // Second half of the animation
      marginLeft = middleMarginLeft + (finalMarginLeft - middleMarginLeft) * (progress - 0.5) * 2;
      marginTop = middleMarginTop + (finalMarginTop - middleMarginTop) * (progress - 0.5) * 2;
      width = middleWidth + (finalWidth - middleWidth) * (progress - 0.5) * 2;
      height = middleHeight + (finalHeight - middleHeight) * (progress - 0.5) * 2;
      ballWidth = ballMiddleWidth + (ballInitialWidth - ballMiddleWidth) * (progress - 0.5) * 2;
      ballHeight = ballMiddleHeight + (ballInitialHeight - ballMiddleHeight) * (progress - 0.5) * 2;
    }
  
    // Calculate edges
    leftEdge = marginLeft;
    rightEdge = marginLeft + width;
    topEdge = marginTop;
    bottomEdge = marginTop + height;
  
    depthMarker.style.marginLeft = `${marginLeft}px`;
    depthMarker.style.marginTop = `${marginTop}px`;
    depthMarker.style.width = `${width}px`;
    depthMarker.style.height = `${height}px`;
  
    ball.style.width = `${ballWidth}px`;
    ball.style.height = `${ballHeight}px`;
  
    const scale = (width / initialWidth) * 1.2;
    if (scale !== lastScale) {
      ballVx *= scale / lastScale;
      ballVy *= scale / lastScale;
      lastScale = scale;
    }
  
    if (ballX <= leftEdge + 5) {
      if (lastHitEdge !== 'left') {
        ballVx = -ballVx; // reverse x direction
        lastHitEdge = 'left';
      }
    } else if (ballX + 10 >= rightEdge - ballWidth) {
      if (lastHitEdge !== 'right') {
        ballVx = -ballVx; // reverse x direction
        lastHitEdge = 'right';
      }
    }
  
    if (ballY <= topEdge + 5) {
      if (lastHitEdge !== 'top') {
        ballVy = -ballVy; // reverse y direction
        lastHitEdge = 'top';
      }
    } else if (ballY + 10 >= bottomEdge - ballWidth) {
      if (lastHitEdge !== 'bottom') {
        ballVy = -ballVy; // reverse y direction
        lastHitEdge = 'bottom';
      }
    }
  
    ballX += ballVx;
    ballY += ballVy;
    ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
  
    currentTime += 20; // increment time by 20ms

    if (currentTime >= duration) {
      currentTime = 0; // reset time
    }

    if (progress === 0.5 && !hitFloor) {
      hitFloor = true;
      floorHit(); // call function when animation reaches middle point
    }
  
    if (progress >= 0.995 && !hitCeiling) {
      hitCeiling = true;
      ceilingHit(); // call function when animation restarts
    }
  
    requestAnimationFrame(animateStep);
  };

animateStep();
};

animate();

// -----
// Animate ball
// -----

// -----
// Handle collision
// -----


// -----
// Render frame
// -----

const update = () => {
const render = () => {

}
render();
requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);