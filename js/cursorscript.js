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
let interval = 150; // Time in milliseconds
let lastTime = 0;
let imgArray = normalGrey;
let offset = 16;

// -----
// Track Cursor
// -----

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  const x = e.clientX;
  const y = e.clientY;
  cursorDiv.style.left = `${x - offset}px`;
  cursorDiv.style.top = `${y - offset}px`;
  document.body.style.cursor = 'none';
});

// -----
// Hover Events
// -----

// Mouse Overs

const setCursor = (num, array) => {
  offset = num;
  imgArray = array;
  index = 0;
}

document.getElementById('airStrike').addEventListener("mouseover", () => setCursor(35, airStrike));
document.getElementById('attack').addEventListener("mouseover", () => setCursor(16, attack));
document.getElementById('capture').addEventListener("mouseover", () => setCursor(16, capture));
document.getElementById('defend').addEventListener("mouseover", () => setCursor(16, defend));
document.getElementById('findSite').addEventListener("mouseover", () => setCursor(16, findSite));
document.getElementById('load').addEventListener("mouseover", () => setCursor(16, load));
document.getElementById('move').addEventListener("mouseover", () => setCursor(16, move));
document.getElementById('patrol').addEventListener("mouseover", () => setCursor(16, patrol));
document.getElementById('pickUp').addEventListener("mouseover", () => setCursor(16, pickUp));
document.getElementById('protect').addEventListener("mouseover", () => setCursor(35, protect));
document.getElementById('reclaim').addEventListener("mouseover", () => setCursor(16, reclaim));
document.getElementById('repair').addEventListener("mouseover", () => setCursor(16, repair));
document.getElementById('teleport').addEventListener("mouseover", () => setCursor(16, teleport));
document.getElementById('tooFar').addEventListener("mouseover", () => setCursor(16, tooFar));
document.getElementById('unload').addEventListener("mouseover", () => setCursor(16, unload));
document.getElementById('wait').addEventListener("mouseover", () => setCursor(16, wait));

// Mouse Outs

const resetCursor = () => {
  offset = 16;
  imgArray = normalGrey;
  index = 0;
}

document.getElementById('airStrike').addEventListener("mouseout", resetCursor);
document.getElementById('attack').addEventListener("mouseout", resetCursor);
document.getElementById('capture').addEventListener("mouseout", resetCursor);
document.getElementById('defend').addEventListener("mouseout", resetCursor);
document.getElementById('findSite').addEventListener("mouseout", resetCursor);
document.getElementById('load').addEventListener("mouseout", resetCursor);
document.getElementById('move').addEventListener("mouseout", resetCursor);
document.getElementById('patrol').addEventListener("mouseout", resetCursor);
document.getElementById('pickUp').addEventListener("mouseout", resetCursor);
document.getElementById('protect').addEventListener("mouseout", resetCursor);
document.getElementById('reclaim').addEventListener("mouseout", resetCursor);
document.getElementById('repair').addEventListener("mouseout", resetCursor);
document.getElementById('teleport').addEventListener("mouseout", resetCursor);
document.getElementById('tooFar').addEventListener("mouseout", resetCursor);
document.getElementById('unload').addEventListener("mouseout", resetCursor);
document.getElementById('wait').addEventListener("mouseout", resetCursor);

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
