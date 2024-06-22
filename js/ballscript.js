/*
JackMadeThat Ball Clicker Script
Click the ball to score points
*/

// -----
// Components
// -----

const court = document.getElementById('court');
const ball = document.getElementById('ball');
const ballTarget = document.getElementById('ball-target');
const scoreBox = document.getElementById('score');

// -----
// Variables
// -----

let x = court.offsetWidth / 2 - ball.offsetWidth / 2;
let y = court.offsetHeight / 2 - ball.offsetHeight / 2;
let vx = Math.random() * 2 - 1;
let vy = Math.sqrt(1 - vx ** 2);
let speed = 100;
let interpFactor = 5;
const growFactor = 4;
const speedFactor = 0.2;
let score = 0;
let ballSize = 150;
if (Math.random() < 0.5) vy = -vy; // Random start position

// -----
// Animate the ball
// -----

const animate = (timestamp) => {
  const elapsed = timestamp - (animate.lastTimestamp || timestamp);
  animate.lastTimestamp = timestamp;

  // Calculate the desired position based on the elapsed time and speed
  const desiredX = x + vx * speed * elapsed / 1000;
  const desiredY = y + vy * speed * elapsed / 1000;

  // Interpolate between the current position and the desired position
  x += (desiredX - x) * interpFactor;
  y += (desiredY - y) * interpFactor;

  // Check for collision
  if (x + ball.offsetWidth > court.offsetWidth || x < 0) {
    vx = -vx;
    collide();
    x = Math.max(0, Math.min(x, court.offsetWidth - ball.offsetWidth)); // Ensure the ball doesn't go out of bounds
  }
  if (y + ball.offsetHeight > court.offsetHeight || y < 0) {
    vy = -vy;
    collide();
    y = Math.max(0, Math.min(y, court.offsetHeight - ball.offsetHeight)); // Ensure the ball doesn't go out of bounds
  }

  // Update the ball position
  ball.style.transform = `translate(${x}px, ${y}px)`;

  // Request the next animation frame
  window.requestAnimationFrame(animate);
}

// -----
// Start animation
// -----

window.requestAnimationFrame(animate);

// -----
// Click the ball
// -----

const ballClicked = () => {
  let newX, newY;

  // Find random position not too close to an edge
  do {
    newX = Math.random() * (court.offsetWidth - ball.offsetWidth);
    newY = Math.random() * (court.offsetHeight - ball.offsetHeight);
  } while (
    newX < 100 || // too close to left edge
    newY < 100 || // too close to top edge
    newX > court.offsetWidth - 100 - ball.offsetWidth || // too close to right edge
    newY > court.offsetHeight - 100 - ball.offsetHeight // too close to bottom edge
  );
  x = newX;
  y = newY;

  // Set the direction vector to move away from the nearest edge
  const dx = Math.min(x, court.offsetWidth - x - ball.offsetWidth);
  const dy = Math.min(y, court.offsetHeight - y - ball.offsetHeight);
  if (dx < dy) {
    const angle = (x < court.offsetWidth / 2 ? 1 : -1) * (Math.PI / 2 - Math.random() * 0.5);
    vx = Math.cos(angle);
    vy = Math.sin(angle);
  } else {
    const angle = (y < court.offsetHeight / 2 ? 1 : -1) * (Math.PI / 2 - Math.random() * 0.5);
    vx = Math.sin(angle);
    vy = Math.cos(angle);
  }

  // Shrink ball
  if (ballSize >= 20) {
  ballSize -= growFactor;
  ball.style.width = `${ballSize}px`;
  ball.style.height = `${ballSize}px`;
  }

  // Gain a point
  score++;
  setScore();
  court.classList.add('scorePointAnim');

  // Ball speeds up
  interpFactor += speedFactor;

  console.log('Ball clicked! ' + score);
}

// -----
// Ball hits the wall
// -----

const collide = () => {
  // Grow ball
  if (ballSize <= 150) {
    ballSize += growFactor;
    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;
    }

  // Lose a point
  if (score >= 1) {
    score--;
    setScore();
    court.classList.add('losePointAnim');
  }

  // Ball slows down
  if (interpFactor >= 5) {
    interpFactor -= speedFactor;
  }

  console.log('Ball collided! ' + score);
}

// -----
// Set score
// -----

const setScore = () => {
  scoreBox.textContent = `Score: ${score}`;
}

// -----
// Reset court animation
// -----

court.addEventListener('animationend', () => {
  court.classList.remove('scorePointAnim');
  court.classList.remove('losePointAnim');
});

// -----
// Setup mouse/touch events
// -----

ballTarget.addEventListener('mousedown', ballClicked);
ballTarget.addEventListener('touchstart', ballClicked);