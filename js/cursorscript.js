/*
JackMadeThat Custom Cursor Set
*/

// -----
// Components
// -----

const cursorDiv = document.getElementById('cursorImg');
const cursorImg = document.getElementById('cursorImg');

// -----
// Variables
// -----

let index = 0;
let interval = 100;
let lastTime = 0;
let imgArray = [];

// -----
// Track Cursor
// -----

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  const x = e.clientX;
  const y = e.clientY;
  cursorDiv.style.left = `${x - 16}px`;
  cursorDiv.style.top = `${y - 16}px`;
  document.body.style.cursor = 'none';
});

// -----
// Hover Events
// -----

imgArray = move; // This sets the cursor type

// -----
// Animate Cursor
// -----

const animate = (timestamp) => {
  if (timestamp - lastTime >= interval) {
    cursorImg.src = imgArray[index];
    index = (index + 1) % imgArray.length;
    if (index === 0) { // reset index when reaching the end
      index = 0;
    }
    lastTime = timestamp;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
