/*
JackMadeThat Tarot Deck
Handle a digital arcana
*/

// Components

const cards = document.querySelectorAll(".draggable");
const backfaceImage = "https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/main/img/tarot/00_BackFace.png";

// Variables

let currentlyDraggedCard = null;
let mouseX, mouseY; 
let cardX, cardY; 
let isDragging = false;

// Flip card

const doubleClick = (event) => {
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

// Move card around screen

const startDrag = (event) => {
  // Select card
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
  currentlyDraggedCard.style.transition = 'transform 0.4s';
  currentlyDraggedCard.style.transform = 'none';
  currentlyDraggedCard = null;
  isDragging = false;
}

const moveCard = (clientX, clientY) => {
  // Move card
  if (isDragging && currentlyDraggedCard) {
    const newX = cardX + (clientX - mouseX);
    const newY = cardY + (clientY - mouseY);
    currentlyDraggedCard.style.top = `${newY}px`;
    currentlyDraggedCard.style.left = `${newX}px`;
  }
}

// Animate card motion

const updateAnim = () => {
  
  let pos = {x: 0, y: 0};
  let delta = {x: 0, y: 0};
  let prevPos = {x: 0, y: 0};
  let rotateY, rotateX, transform;

  const setCardRotation = function() {
    if (isDragging && currentlyDraggedCard) {
    delta.x = pos.x - prevPos.x;
    delta.y = pos.y - prevPos.y;
    prevPos = pos;
    rotateY = 'rotateY(' + Math.max(Math.min(delta.x * 1.4, 35), -35) + 'deg)';
    rotateX = 'rotateX(' + (Math.max(Math.min(delta.y * 1.4, 35), -35) * -1) + 'deg)';
    transform = [rotateY, rotateX];
    currentlyDraggedCard.style.transform = transform.join(' ')
    }
  }

  document.addEventListener("mousemove", (event) => {
    pos = {x: event.pageX, y: event.pageY};
    top = pos.y + 'px';
    left = pos.x + 'px';
    if (isDragging) {
      moveCard(event.clientX, event.clientY);
    }
  });

  document.addEventListener("touchmove", (event) => {
    if (isDragging) {
      event.preventDefault();
      pos = {x: event.touches[0].pageX, y: event.touches[0].pageY};
      top = pos.y + 'px';
      left = pos.x + 'px';
      moveCard(event.touches[0].clientX, event.touches[0].clientY);
    }
  });
  
  function step() {
    // Use requestAnimationFrame for buttery smooth animations
    setCardRotation();
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

// Setup mouse/touch events

cards.forEach((card) => {
  card.addEventListener("mousedown", startDrag);
  card.addEventListener("mouseup", stopDrag);
  card.addEventListener("touchstart", startDrag);
  card.addEventListener("touchend", stopDrag);
  card.addEventListener("dblclick", doubleClick);
  card.addEventListener("dblclick", doubleClick); // Mouse double-click
  card.addEventListener("touchstart", (event) => {
    if (event.touches.length === 2) {
      doubleClick(event);
    }
  }); // Touchscreen double-tap
});

// Log cards on screen

console.log(cards);

// Call function to initialize

updateAnim();