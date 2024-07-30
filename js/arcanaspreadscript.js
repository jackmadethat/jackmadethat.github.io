/*
JackMadeThat Tarot Deck
Arcana spread
*/

// -----
// Components
// -----

const cards = document.querySelectorAll('.card');

// -----
// Flip Cards
// -----

const animateCards = () => {
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        const img = card.querySelector('img');
        img.src = tarot[78].image;
        setTimeout(() => {
            img.src = tarot[(index) % tarot.length].image;
        }, index * 100 + 100); // change image at 50% point
    });
}

animateCards();
