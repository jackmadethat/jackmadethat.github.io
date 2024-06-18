/*
JackMadeThat Tarot Deck
Handle a digital arcana
*/

// Components
const cards = document.querySelectorAll(".draggable");

// Variables
let currentlyDraggedCard = null;
let mouseX, mouseY, cardX, cardY, isDragging = false;
let backfaceImage = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/tarot/00_BackFace.png";

const doubleClick = (event) => {
  // Select card
  const card = event.currentTarget;

  // Pre-load card face
  const randomTarot = tarot[Math.floor(Math.random() * 77)];
  const newImage = randomTarot.image;
  const img = new Image();
  img.src = newImage;

  if (card.classList.contains("flipped")) {
    card.style.transition = "transform 0.4s";
    card.style.transform = `scaleX(0.01)`;
    setTimeout(() => {
      card.src = backfaceImage;
      card.style.transform = `scaleX(1)`;
    }, 400); // adjust the timeout duration to match the transition duration
    card.classList.remove("flipped");
  } else {
    card.style.transition = "transform 0.4s"; 
    card.style.transform = `scaleX(0.01)`;

    setTimeout(() => {
      console.log(card);
      card.src = img.src;

      card.style.transform = `scaleX(1)`;
      card.classList.add("flipped");
    }, 400);
  }
}

const startDrag = (event) => {
  currentlyDraggedCard = event.currentTarget;
  currentlyDraggedCard.classList.add("dragging");
  if (event.touches) {
    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;
  } else {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
  cardX = currentlyDraggedCard.offsetLeft;
  cardY = currentlyDraggedCard.offsetTop;
  isDragging = true;
}

const stopDrag = () => {
  // Deselect card
  currentlyDraggedCard.classList.remove("dragging");
  currentlyDraggedCard = null;
  isDragging = false;
}

const moveCard = (clientX, clientY) => {
  if (currentlyDraggedCard) {
    const newX = cardX + (clientX - mouseX);
    const newY = cardY + (clientY - mouseY);
    currentlyDraggedCard.style.top = `${newY}px`;
    currentlyDraggedCard.style.left = `${newX}px`;
  }
}

// Setup

cards.forEach((card) => {
  card.addEventListener("mousedown", startDrag);
  card.addEventListener("mouseup", stopDrag);
  card.addEventListener("touchstart", startDrag);
  card.addEventListener("touchend", stopDrag);
  card.addEventListener("dblclick", doubleClick);
  card.addEventListener("dblclick", doubleClick); // for desktop
  card.addEventListener("touchstart", (event) => {
    if (event.touches.length === 2) {
      doubleClick(event);
    }
  }); // for mobile
});
console.log(cards);

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    moveCard(event.clientX, event.clientY);
  }
});

document.addEventListener("touchmove", (event) => {
  if (isDragging) {
    event.preventDefault();
    moveCard(event.touches[0].clientX, event.touches[0].clientY);
  }
});

