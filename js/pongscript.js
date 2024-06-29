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
const depthMarker = document.getElementById('depth-marker');
const highScoreBox = document.getElementById('highest-score');

// -----
// Variables
// -----

let score = 0;
let highestScore = 0;
let ballX = 400;
let ballY = 300;
let ballVx = 4;
let ballVy = 4;
let currentTime = 0;
const duration = 4000;
let marginLeft, marginTop, width, height, ballWidth, ballHeight;
let leftEdge, rightEdge, topEdge, bottomEdge;
let hitFloor = false;
let hitCeiling = false;
let lastHitEdge = null;
let lastScale = 1;

// -----
// Setup Events
// -----

court.addEventListener('mousemove', (event) => {
    const paddleX = event.clientX - court.offsetLeft - paddle.offsetWidth / 2;
    const paddleY = event.clientY - court.offsetTop - paddle.offsetHeight / 2;
    const paddleMaxX = court.offsetWidth - paddle.offsetWidth;
    const paddleMaxY = court.offsetHeight - paddle.offsetHeight;
    paddle.style.transform = `translate(${Math.min(Math.max(paddleX, 0), paddleMaxX)}px, ${Math.min(Math.max(paddleY, 0), paddleMaxY)}px)`;
});

floor.addEventListener('animationend', () => {
    floor.classList.remove('losePointAnim');
    floor.classList.remove('scorePointAnim');
});

court.addEventListener('animationend', () => {
    court.classList.remove('losePointAnim');
});

paddle.addEventListener('animationend', () => {
    paddle.classList.remove('hitPaddleAnim');
});

ball.addEventListener('animationend', () => {
    ball.classList.remove('hitPaddleAnim');
});

// -----
// Handle Collisions
// -----

const floorHit = () => {
    console.log("Hit Floor");
    hitFloor = false;
    floor.classList.add('scorePointAnim');
    ball.classList.add('hitPaddleAnim');
}

const ceilingHit = () => {
    const checkCollision = () => {
        if (
        paddle.getBoundingClientRect().x <= ball.getBoundingClientRect().x + ball.getBoundingClientRect().width &&
        paddle.getBoundingClientRect().x + paddle.getBoundingClientRect().width >= ball.getBoundingClientRect().x &&
        paddle.getBoundingClientRect().y <= ball.getBoundingClientRect().y + ball.getBoundingClientRect().height &&
        paddle.getBoundingClientRect().y + paddle.getBoundingClientRect().height >= ball.getBoundingClientRect().y
        ) {
            return true;
        }
        return false;
    }

    if (checkCollision()) {
        console.log("Hit paddle!");
        paddle.classList.add('hitPaddleAnim');
        ball.classList.add('hitPaddleAnim');
    } else {
        console.log("Hit Ceiling");
        court.classList.add('losePointAnim');
        ball.classList.add('hitPaddleAnim');
    }
    hitCeiling = false;
}

// -----
// Render Frame
// -----

const update = () => {
    const animateStep = () => {
        const progress = currentTime / duration;
        
        // Animate ball bouncing from ceiling to floor and back
        if (progress < 0.5) {
            // Ball goes down
            marginLeft = 266 * progress * 2;
            marginTop = 200 * progress * 2;
            width = 800 + (266 - 800) * progress * 2;
            height = 600 + (200 - 600) * progress * 2;
            ballWidth = 60 + (15 - 60) * progress * 2;
            ballHeight = 60 + (15 - 60) * progress * 2;
        } else {
            // Ball comes up
            marginLeft = 266 + -266 * (progress - 0.5) * 2;
            marginTop = 200 + -200 * (progress - 0.5) * 2;
            width = 266 + (800 - 266) * (progress - 0.5) * 2;
            height = 200 + (600 - 200) * (progress - 0.5) * 2;
            ballWidth = 15 + 45 * (progress - 0.5) * 2;
            ballHeight = 15 + 45 * (progress - 0.5) * 2;
        }

        // Calculate boundary
        leftEdge = marginLeft;
        rightEdge = marginLeft + width;
        topEdge = marginTop;
        bottomEdge = marginTop + height;

        // Calculate speed of ball based on 'depth'
        const scale = (width / 800) * 1.2;
        if (scale !== lastScale) {
            ballVx *= scale / lastScale;
            ballVy *= scale / lastScale;
            lastScale = scale;
        }
        // Detect if ball hits edges
        if (ballX <= leftEdge + 5) {
            if (lastHitEdge !== 'left') {
                ballVx = -ballVx; // reverse x direction
                lastHitEdge = 'left';
            }
        } else if (ballX + 10 >= rightEdge - ballWidth) {
            if (lastHitEdge !== 'right') {
                ballVx = -ballVx; // reverse x direction
                lastHitEdge = 'right';
            }
        }
        if (ballY <= topEdge + 5) {
            if (lastHitEdge !== 'top') {
                ballVy = -ballVy; // reverse y direction
                lastHitEdge = 'top';
            }
        } else if (ballY + 10 >= bottomEdge - ballWidth) {
            if (lastHitEdge !== 'bottom') {
                ballVy = -ballVy; // reverse y direction
                lastHitEdge = 'bottom';
            }
        }

        // Calculate ball movement
        ballX += ballVx;
        ballY += ballVy;

        // Detect if ball hits floor or ceiling
        if (progress === 0.5 && !hitFloor) {
            hitFloor = true;
            floorHit();
        }
        if (progress >= 0.995 && !hitCeiling) {
            hitCeiling = true;
            ceilingHit();
        }

        // Handle time
        currentTime += 20;
        if (currentTime >= duration) {
            currentTime = 0; 
        }
    };

    animateStep();

    const render = () => {
        depthMarker.style.marginLeft = `${marginLeft}px`;
        depthMarker.style.marginTop = `${marginTop}px`;
        depthMarker.style.width = `${width}px`;
        depthMarker.style.height = `${height}px`;
        ball.style.width = `${ballWidth}px`;
        ball.style.height = `${ballHeight}px`;
        ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
    }

    render();
    
    requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);