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
let ballVx = 0; // Defaults until I figure out the maths
let ballVy = 0;
const velocity = Math.max(Math.abs(ballVx), Math.abs(ballVy));
let currentTime = 0;
let duration = 4000; // Time in ms for a full bounce from floor to ceiling and back
const defaultDuration = 4000;
const maxDuration = 8000;
const minDuration = 2500;
let marginLeft, marginTop, width, height, ballWidth, ballHeight;
let leftEdge, rightEdge, topEdge, bottomEdge;
let hitFloor, hitCeiling = false;
let lastHitEdge = null;
let lastScale = 1;

let paddleX;
let paddleY;
let collisionOffsetX;
let collisionOffsetY;
let relativeCollisionPositionX = 0;
let relativeCollisionPositionY = 0;

// -----
// Setup Events
// -----

court.addEventListener('mousemove', (event) => {
    paddleX = event.clientX - court.offsetLeft - paddle.offsetWidth / 2;
    paddleY = event.clientY - court.offsetTop - paddle.offsetHeight / 2;
    const paddleMaxX = court.offsetWidth - paddle.offsetWidth;
    const paddleMaxY = court.offsetHeight - paddle.offsetHeight;
    paddle.style.transform = `translate(${Math.min(Math.max(paddleX, 0), paddleMaxX)}px, ${Math.min(Math.max(paddleY, 0), paddleMaxY)}px)`;
}); // for desktop

court.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const paddleX = touch.clientX - court.offsetLeft - paddle.offsetWidth / 2;
    const paddleY = touch.clientY - court.offsetTop - paddle.offsetHeight / 2;
    paddle.style.transform = `translate(${paddleX}px, ${paddleY}px)`;
}); // for mobile

court.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    paddleX = touch.clientX - court.offsetLeft - paddle.offsetWidth / 2;
    paddleY = touch.clientY - court.offsetTop - paddle.offsetHeight / 2;
    const paddleMaxX = court.offsetWidth - paddle.offsetWidth;
    const paddleMaxY = court.offsetHeight - paddle.offsetHeight;
    paddle.style.transform = `translate(${Math.min(Math.max(paddleX, 0), paddleMaxX)}px, ${Math.min(Math.max(paddleY, 0), paddleMaxY)}px)`;
}); // for mobile

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
    ball.classList.remove('hitBallAnim');
});

// -----
// Handle Collisions
// -----

const floorHit = () => {
    console.log("Hit Floor");
    hitFloor = false;
    floor.classList.add('scorePointAnim');
    ball.classList.add('hitBallAnim');
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
        collisionOffsetX = (ball.getBoundingClientRect().x + ball.getBoundingClientRect().width / 2) - (paddle.getBoundingClientRect().x + paddle.getBoundingClientRect().width / 2);
        collisionOffsetY = (ball.getBoundingClientRect().y + ball.getBoundingClientRect().height / 2) - (paddle.getBoundingClientRect().y + paddle.getBoundingClientRect().height / 2);
        relativeCollisionPositionX = collisionOffsetX / (paddle.getBoundingClientRect().width / 2) * 2;
        relativeCollisionPositionY = collisionOffsetY / (paddle.getBoundingClientRect().height / 2) * 2;

        console.log("Hit paddle!");
        paddle.classList.add('hitPaddleAnim');
        ball.classList.add('hitBallAnim');
    } else {
        console.log("Hit Ceiling");
        court.classList.add('losePointAnim');
        ball.classList.add('hitBallAnim');
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

        const progressPerSecond = 1 / duration;
        edgeClosureRateX = ((width - 266) * progressPerSecond) * 4;
        edgeClosureRateY = ((height - 200) * progressPerSecond) * 4;

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
            ballX = leftEdge + 5;
            ballVx = -Math.abs(ballVx) + edgeClosureRateX; // move away from left edge
            ballVy = ballVy + edgeClosureRateY; // add edgeClosureRateY to ballVy
            lastHitEdge = 'left';
            ball.classList.add('hitBallAnim');
        } else if (ballX + 10 >= rightEdge - ballWidth) {
            ballX = rightEdge - ballWidth - 10;
            ballVx = Math.abs(ballVx) + edgeClosureRateX; // move away from right edge
            ballVy = ballVy + edgeClosureRateY; // add edgeClosureRateY to ballVy
            lastHitEdge = 'right';
            ball.classList.add('hitBallAnim');
        }
        if (ballY <= topEdge + 5) {
            ballY = topEdge + 5;
            ballVx = ballVx + edgeClosureRateX; // add edgeClosureRateX to ballVx
            ballVy = -Math.abs(ballVy) + edgeClosureRateY; // move away from top edge
            lastHitEdge = 'top';
            ball.classList.add('hitBallAnim');
        } else if (ballY + 10 >= bottomEdge - ballWidth) {
            ballY = bottomEdge - ballWidth - 10;
            ballVx = ballVx + edgeClosureRateX; // add edgeClosureRateX to ballVx
            ballVy = Math.abs(ballVy) + edgeClosureRateY; // move away from bottom edge
            lastHitEdge = 'bottom';
            ball.classList.add('hitBallAnim');
        }

        // Calculate ball movement

        /*
        const ballOffsetX = (width - ballWidth) / 2;
        const ballOffsetY = (height - ballHeight) / 2;

        ballX = marginLeft + ballOffsetX + ballVx;
        ballY = marginTop + ballOffsetY + ballVy; 
        */
        
        ballVx = relativeCollisionPositionX;
        ballVy = relativeCollisionPositionY;
        console.log(ballVx);
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

// -----
// Start Game Loop
// -----

requestAnimationFrame(update);