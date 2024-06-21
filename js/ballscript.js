const court = document.getElementById('court');
const ball = document.getElementById('ball');

// Get the ball's radius
const ballRadius = ball.offsetWidth / 2;

// Get the court's dimensions
const courtWidth = court.offsetWidth;
const courtHeight = court.offsetHeight;

// Calculate the maximum x and y positions
const maxX = courtWidth - ballRadius;
const maxY = courtHeight - ballRadius;

// Set the initial position at the center of the screen
let x = courtWidth / 2;
let y = courtHeight / 2;

// Set the initial velocity
let vx = 2;
let vy = 2;

// Define the animation
function animate() {
  // Update the position
  x += vx;
  y += vy;

  // Check for collisions with the screen edges
  if (x + ballRadius > maxX || x - ballRadius < 0) {
    vx = -vx;
  }
  if (y + ballRadius > maxY || y - ballRadius < 0) {
    vy = -vy;
  }

  // Update the div position
  ball.style.transform = `translate(${x}px, ${y}px)`;

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
