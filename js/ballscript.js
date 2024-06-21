/*
JackMadeThat Ball Clicker Script
Click the ball to score points
*/
const container = document.getElementById('court');
const ball = document.getElementById('ball');

// Set the initial velocity with a random direction
let vx = Math.random() * 4 - 2; // horizontal velocity (-2 to 2)
let vy = Math.random() * 4 - 2; // vertical velocity (-2 to 2)

// Calculate the ball's position relative to the container
let ballLeft = ball.offsetLeft;
let ballTop = ball.offsetTop;
let ballRight = ballLeft + ball.offsetWidth;
let ballBottom = ballTop + ball.offsetHeight;

// Define the animation
function animate() {
  // Get the ball's current position
  const rect = ball.getBoundingClientRect();
  let x = rect.left;
  let y = rect.top;

  // Update the position
  x += vx * 0.05;
  y += vy * 0.05;

// Check if the ball has hit the container edges
if (ballLeft <= 0 || ballRight >= container.offsetWidth) {
  vx = -vx; // reverse horizontal direction
}
if (ballTop <= 0 || ballBottom >= container.offsetHeight) {
  vy = -vy; // reverse vertical direction
}

  // Update the ball's position within the container
  ball.style.transform = `translate(${x}px, ${y}px)`;

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
