/*
JackMadeThat Tarot Deck
Arcana spread
*/

// -----
// Components
// -----

const cards = document.querySelectorAll('.card');
const descriptionBox = document.getElementById('descriptionBox');
const cardTitle = document.getElementById('cardtitle');
const cardDescription = document.getElementById('carddescription');

// -----
// Description Box
// -----

document.addEventListener('mousemove', (e) => {
    const x = e.clientX + window.pageXOffset;
    const y = e.clientY + window.pageYOffset;
    descriptionBox.style.left = `${x - 100}px`;
    descriptionBox.style.top = `${y + 15}px`;
});

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

        // Create hover events
        card.addEventListener('mouseover', () => {
            cardTitle.innerText = tarot[index].name;
            cardDescription.innerText = tarot[index].text;
            console.log(`Mouseover on card ${index}: ${tarot[index].name}`);
            descriptionBox.style.display = 'block';
        });

        card.addEventListener('mouseout', () => {
            descriptionBox.style.display = 'none';
        });
    });
}

animateCards();
