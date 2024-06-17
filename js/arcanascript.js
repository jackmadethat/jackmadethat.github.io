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
    if (event.touches) {
      mouseX = event.touches[0].clientX;
      mouseY = event.touches[0].clientY;
    } else {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
    imageX = image.offsetLeft;
    imageY = image.offsetTop;
    isDragging = true;
  }

/*
function startDrag(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  imageX = image.offsetLeft;
  imageY = image.offsetTop;
  isDragging = true;
}
  */

function stopDrag() {
  isDragging = false;
}

function moveImage(clientX, clientY) {
    const newX = imageX + (clientX - mouseX);
    const newY = imageY + (clientY - mouseY);
    image.style.top = `${newY}px`;
    image.style.left = `${newX}px`;
  }

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const newX = imageX + (event.clientX - mouseX);
    const newY = imageY + (event.clientY - mouseY);
    image.style.top = `${newY}px`;
    image.style.left = `${newX}px`;
  }
});