/*
JackMadeThat 3D Pong Script
Play a game of 3D Pong!
*/

// -----
// Components
// -----

const court = document.getElementById('court');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreBox = document.getElementById('score');
const highScoreBox = document.getElementById('highest-score');

// -----
// Variables
// -----

let score = 0;
let highestScore = 0;

// -----
// Animate the ball
// -----

