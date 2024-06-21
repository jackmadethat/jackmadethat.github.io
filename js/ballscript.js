/*
JackMadeThat Ball Clicker Script
Click the ball to score points
*/
const court = document.getElementById('court');
const ball = document.getElementById('ball');

// Set the initial velocity with a random direction
let x = 0;
let y = 0;
let vx = 2;
let vy = 2;

// Define the animation
function animate() {
  // Update the position
  x += vx;
  y += vy;

  // Check for collisions with the screen edges
  if (x + ball.offsetWidth > court.innerWidth || x < 0) {
    vx = -vx;
  }
  if (y + ball.offsetHeight > court.innerHeight || y < 0) {
    vy = -vy;
  }

  // Update the div position
  ball.style.transform = `translate(${x}px, ${y}px)`;

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
