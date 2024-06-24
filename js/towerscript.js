/*
JackMadeThat Tower Defense Script
Upgrade the tower to survive
*/

// -----
// Components
// -----

// Play area
const tower = document.getElementById('tower-target');
const field = document.getElementById('field');
// Game status
const level = document.getElementById('level');
const health = document.getElementById('health');
const coins = document.getElementById('coins');
// Tower stats
const damageTxt = document.getElementById('damage');
const rangeTxt = document.getElementById('range');
const attackSpeedTxt = document.getElementById('attack-speed');
const critChanceTxt = document.getElementById('crit-chance');
const critDmgTxt = document.getElementById('crit-dmg');
const coinsPerLvlTxt = document.getElementById('coins-per-lvl');
// Buttons
const damageBtn = document.getElementById('dmgBtn');
const rangeBtn = document.getElementById('rngBtn');
const attackBtn = document.getElementById('atkBtn');
const critBtn = document.getElementById('crtBtn');
const critPercentBtn = document.getElementById('crtpBtn');
const coinPerLvlBtn = document.getElementById('coinBtn');
// Cost box
const costBox = document.getElementById('cost');
const costText = document.getElementById('upgrade-cost');

// -----
// Variables
// -----

// Game status
let healthNum = 10;
let levelNum = 1;
let coinsNum = 0;
// Tower stats
let dmg = 1;
let rng = 250;
let atkspd = 1;
let critdmg = 5;
let critpercent = 1;
let coinsperlvl = 10;
// Stat upgrades
let dmgUpgrade = 10;
let rngUpgrade = 10;
let atkspdUpgrade = 10;
let critChanceUpgrade = 10;
let critDmgUpgrade = 10;
let coinsPerLvlUpgrade = 10;
// Game mechanics
const levelTime = 5000;
const enemySpawnDelay = 2500;
let enemySpeed = 1.5;
const maxSpeed = 150;
const centerOffset = -12;
let basicToSpawn = 10;
let strongToSpawn = 5;
const basicEnemies = [];
const strongEnemies = [];
const allEnemies = [];

// -----
// Spawn level
// -----

const spawnEnemies = () => {
    for (let i = 0; i < basicToSpawn; i++) {
        const delay = Math.random() * enemySpawnDelay;
        setTimeout(() => {
        const enemyBasic = document.createElement("div");
        enemyBasic.className = "enemyBasic";
        field.appendChild(enemyBasic);
        let initialX, initialY;
        const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        if (edge === 0) { // top
            initialX = Math.random() * field.offsetWidth;
            initialY = 0;
        } else if (edge === 1) { // right
            initialX = field.offsetWidth - enemyBasic.offsetWidth;
            initialY = Math.random() * field.offsetHeight;
        } else if (edge === 2) { // bottom
            initialX = Math.random() * field.offsetWidth;
            initialY = field.offsetHeight - enemyBasic.offsetHeight;
        } else { // left
            initialX = 0;
            initialY = Math.random() * field.offsetHeight;
        }
        enemyBasic.style.position = "absolute";
        enemyBasic.style.left = `${initialX}px`;
        enemyBasic.style.top = `${initialY}px`;
        const velocity = {
            x: (field.offsetWidth / 2 - initialX) * enemySpeed,
            y: (field.offsetHeight / 2 - initialY) * enemySpeed
        };
        basicEnemies.push({ enemy: enemyBasic, initialX, initialY, x: initialX, y: initialY, velocity: { x: velocity.x, y: velocity.y } });
        }, delay);
    }

    for (let i = 0; i < strongToSpawn; i++) {
        const delay = Math.random() * enemySpawnDelay;
        setTimeout(() => {
        const enemyStrong = document.createElement("div");
        enemyStrong.className = "enemyStrong";
        field.appendChild(enemyStrong);
        let initialX, initialY;
        const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        if (edge === 0) { // top
            initialX = Math.random() * field.offsetWidth;
            initialY = 0;
        } else if (edge === 1) { // right
            initialX = field.offsetWidth - enemyStrong.offsetWidth;
            initialY = Math.random() * field.offsetHeight;
        } else if (edge === 2) { // bottom
            initialX = Math.random() * field.offsetWidth;
            initialY = field.offsetHeight - enemyStrong.offsetHeight;
        } else { // left
            initialX = 0;
            initialY = Math.random() * field.offsetHeight;
        }
        enemyStrong.style.position = "absolute";
        enemyStrong.style.left = `${initialX}px`;
        enemyStrong.style.top = `${initialY}px`;
        const velocity = {
            x: (field.offsetWidth / 2 - initialX) * enemySpeed,
            y: (field.offsetHeight / 2 - initialY) * enemySpeed
        };
        strongEnemies.push({ enemy: enemyStrong, initialX, initialY, x: initialX, y: initialY, velocity: { x: velocity.x, y: velocity.y } });
        }, delay);
    }
}
    
const checkCollision = (rect1, rect2) => {
    if (rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y) {
    return true;
    }
    return false;
}

const updateEnemies = () => {
    basicEnemies.forEach((enemyData) => {
        let { enemy, x, y, velocity } = enemyData;
        const centerX = field.offsetWidth / 2 + centerOffset;
        const centerY = field.offsetHeight / 2 + centerOffset;
        velocity.x = (centerX - x) * 0.01;
        velocity.y = (centerY - y) * 0.01;
        x += velocity.x;
        y += velocity.y;
        enemy.style.left = `${x}px`;
        enemy.style.top = `${y}px`;
        enemyData.x = x;
        enemyData.y = y;
        // Check for collision with tower
        const towerRect = tower.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();
        const index = basicEnemies.indexOf(enemyData);
        if (checkCollision(towerRect, enemyRect)) {
            basicEnemies.splice(index, 1);
            enemy.remove();
            hitTower();
        }
    });
    strongEnemies.forEach((enemyData) => {
        let { enemy, x, y, velocity } = enemyData;
        const centerX = field.offsetWidth / 2 + centerOffset;
        const centerY = field.offsetHeight / 2 + centerOffset;
        velocity.x = (centerX - x) * 0.01;
        velocity.y = (centerY - y) * 0.01;
        x += velocity.x;
        y += velocity.y;
        enemy.style.left = `${x}px`;
        enemy.style.top = `${y}px`;
        enemyData.x = x;
        enemyData.y = y;
        // Check for collision with tower
        const towerRect = tower.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();
        const index = strongEnemies.indexOf(enemyData);
        if (checkCollision(towerRect, enemyRect)) {
            strongEnemies.splice(index, 1);
            enemy.remove();
            hitTower();
        }
    });
  }

const animate = () => {
    updateEnemies();
    requestAnimationFrame(animate);
}
animate();
spawnEnemies();
setInterval(spawnEnemies, levelTime);

// -----
// Damage Tower
// -----

const hitTower = () => {
    if (healthNum > 0) {
        healthNum -= 1;
        health.textContent = `Health: ${healthNum}`;
        console.log("Tower Hit!", healthNum);
    } else {
        health.textContent = `Game Over!`;
        console.log("Game Over!");
    }
}

// -----
// Upgrade Damage
// -----

const upgradeDamage = () => {
    console.log("Upgraded Tower Damage!");
}

// -----
// Upgrade Range
// -----

const upgradeRange = () => {
    console.log("Upgraded Tower Range!");
}

// -----
// Upgrade Attack Speed
// -----

const upgradeAttackSpeed = () => {
    console.log("Upgraded Tower Attack Speed!");
}

// -----
// Upgrade Critical Chance
// -----

const upgradeCriticalChance = () => {
    console.log("Upgraded Tower Critical Chance!");
}

// -----
// Upgrade Critical Percentage
// -----

const upgradeCriticalPercent = () => {
    console.log("Upgraded Tower Critical Damage!");
}

// -----
// Upgrade Coins per Level
// -----

const upgradeCoinsPerLvl = () => {
    console.log("Upgraded Coins Earned per Level!");
}

// -----
// Setup button events
// -----

damageBtn.addEventListener('mousedown', upgradeDamage);
rangeBtn.addEventListener('mousedown', upgradeRange);
attackBtn.addEventListener('mousedown', upgradeAttackSpeed);
critBtn.addEventListener('mousedown', upgradeCriticalChance);
critPercentBtn.addEventListener('mousedown', upgradeCriticalPercent);
coinPerLvlBtn.addEventListener('mousedown', upgradeCoinsPerLvl);