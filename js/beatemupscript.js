/*
JackMadeThat Beat 'em Up Script
*/

// -----
// Components
// -----

const fighter = document.getElementById('fighterDiv');

// -----
// Move Character
// -----

let posTop = parseInt(fighter.style.top) || 0; // default to 0 if not set
let posLeft = parseInt(fighter.style.left) || 0; // default to 0 if not set

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            fighter.style.top = `${posTop - 10}px`;
            console.log("Up");
            break;
        case 'ArrowDown':
            fighter.style.top = `${posTop + 10}px`;
            console.log("Down");
            break;
        case 'ArrowLeft':
            fighter.style.left = `${posLeft - 10}px`;
            console.log("Left");
            break;
        case 'ArrowRight':
            fighter.style.left = `${posLeft + 10}px`;
            console.log("Right");
            break;
    }
});