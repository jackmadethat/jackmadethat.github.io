/*
JackMadeThat Home Page Javascript
*/

// -----
// Components
// -----

const cursorImg = document.getElementById('cursorImg');

// -----
// Hover events
// -----

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  const x = e.clientX;
  const y = e.clientY;
  cursorImg.style.left = `${x - 16}px`;
  cursorImg.style.top = `${y - 16}px`;
  document.body.style.cursor = 'none';
});