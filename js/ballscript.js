/*
JackMadeThat Ball Clicker Script
Click the ball to score points
*/

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

  // Bounce off edges
  if (x + ball.offsetWidth >= window.innerWidth || x <= 0) {
    vx = -vx; // reverse horizontal direction
  }
  if (y + ball.offsetHeight >= window.innerHeight || y <= 0) {
    vy = -vy; // reverse vertical direction
  }

  // Update the ball's position
  ball.style.transform = `translate(${x}px, ${y}px)`;
  console.log(ball.style.transform);

  // Request the next animation frame
  window.requestAnimationFrame(animate);
}

// Start the animation
window.requestAnimationFrame(animate);
