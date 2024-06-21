/*
JackMadeThat Ball Clicker Script
Click the ball to score points
*/
const container = document.getElementById('court');
const ball = document.getElementById('ball');

// Set the initial velocity with a random direction
let vx = Math.random() * 4 - 2; // horizontal velocity (-2 to 2)
let vy = Math.random() * 4 - 2; // vertical velocity (-2 to 2)

// Define the animation
function animate() {
  // Get the ball's current position
  const rect = ball.getBoundingClientRect();
  let x = rect.left;
  let y = rect.top;

  // Update the position
  x += vx;
  y += vy;

// Check if the ball has hit the container edges
if (x <= 0 || x + ball.offsetWidth >= container.offsetWidth - 2) {
  vx = -vx; // reverse horizontal direction
  x = x + vx; // update x position after bounce
}
if (y <= 0 || y + ball.offsetHeight >= container.offsetHeight - 2) {
  vy = -vy; // reverse vertical direction
  y = y + vy; // update y position after bounce
}

  // Update the ball's position within the container
  ball.style.transform = `translate(${x}px, ${y}px)`;

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
