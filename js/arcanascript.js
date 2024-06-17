/*
JackMadeThat Tarot Deck
Handle a digital arcana
*/

const image = document.getElementById("card");

image.addEventListener("mousedown", startDrag);
image.addEventListener("mouseup", stopDrag);
image.addEventListener("touchstart", startDrag);
image.addEventListener("touchend", stopDrag);
document.addEventListener("touchmove", (event) => {
  if (isDragging) {
    event.preventDefault();
    moveImage(event.touches[0].clientX, event.touches[0].clientY);
  }
});

let mouseX, mouseY, imageX, imageY, isDragging = false;

function startDrag(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  imageX = image.offsetLeft;
  imageY = image.offsetTop;
  isDragging = true;
  console.log("test");
}

function stopDrag() {
  isDragging = false;
  console.log("test");
}

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const newX = imageX + (event.clientX - mouseX);
    const newY = imageY + (event.clientY - mouseY);
    image.style.top = `${newY}px`;
    image.style.left = `${newX}px`;
  }
});