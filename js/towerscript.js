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
let atkspd = 500;
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
let lastTimestamp = 0;
const enemySpawnDelay = 2500;
const enemySpeed = 1.5;
const maxSpeed = 150;
const centerOffset = -12;
const projectileSpeed = 10;
let basicToSpawn = 4;
let strongToSpawn = 0;
const basicEnemies = [];
const strongEnemies = [];
let allEnemies = [];
let projectiles = [];

// -----
// Spawn level
// -----

const enemySpawner = (enemyArray, divString, toSpawn) => {
    for (let i = 0; i < toSpawn; i++) {
        // const delay = Math.random() * enemySpawnDelay;
        const delay = 1;
        setTimeout(() => {
        enemyType = document.createElement("div");
        enemyType.className = divString;
        field.appendChild(enemyType);
        let initialX, initialY;
        const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        if (edge === 0) { // top
            initialX = Math.random() * field.offsetWidth;
            initialY = 0;
        } else if (edge === 1) { // right
            initialX = field.offsetWidth - enemyType.offsetWidth;
            initialY = Math.random() * field.offsetHeight;
        } else if (edge === 2) { // bottom
            initialX = Math.random() * field.offsetWidth;
            initialY = field.offsetHeight - enemyType.offsetHeight;
        } else { // left
            initialX = 0;
            initialY = Math.random() * field.offsetHeight;
        }
        enemyType.style.position = "absolute";
        enemyType.style.left = `${initialX}px`;
        enemyType.style.top = `${initialY}px`;
        const velocity = {
            x: (field.offsetWidth / 2 - initialX) * enemySpeed,
            y: (field.offsetHeight / 2 - initialY) * enemySpeed
        };
        enemyArray.push({ enemy: enemyType, isDead: false, width: 20, height: 20, initialX, initialY, x: initialX, y: initialY, velocity: { x: velocity.x, y: velocity.y } });
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

const animateEnemy = (enemyArray) => {
    enemyArray.forEach((enemyData) => {
        if (!enemyData || !enemyData.enemy) return;
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
        const index = enemyArray.indexOf(enemyData);
        if (checkCollision(towerRect, enemyRect)) {
            enemy.isDead = true;
            console.log(enemy.isDead);
            console.log(allEnemies);
            allEnemies = allEnemies.filter(enemy => !enemy.isDead);
            console.log(allEnemies);
            enemyArray.splice(index, 1);
            enemy.remove();
            hitTower();
        }
    });
}

const spawnEnemies = () => {
    enemySpawner(basicEnemies, "enemyBasic", basicToSpawn);
    //enemySpawner(strongEnemies, "enemyStrong", strongToSpawn);
}

const updateEnemies = () => {
    allEnemies = basicEnemies.concat(strongEnemies);
    animateEnemy(allEnemies);
  }

spawnEnemies();

// setInterval(spawnEnemies, levelTime);

// -----
// Damage Tower
// -----

const hitTower = () => {
    if (healthNum > 0) {
        healthNum -= 1;
        health.textContent = `Health: ${healthNum}`;
        // console.log("Tower Hit!", healthNum);
    } else {
        health.textContent = `Game Over!`;
        // console.log("Game Over!");
    }
}

// -----
// Tower Shooting
// -----

const getNearestEnemy = (x, y, enemies) => {
    let nearestEnemy = null;
    let minDistance = Infinity;
    enemies.forEach((enemy) => {
      const distance = Math.hypot(x - enemy.x, y - enemy.y);
      if (!enemy.isDead) 
      if (distance < minDistance) {
        minDistance = distance;
        nearestEnemy = enemy;
      }
    });
    // console.log(nearestEnemy);
    return nearestEnemy;
}

const generateProjectile = () => {
    const centerX = 245;
    const centerY = 246;
    const nearestEnemy = getNearestEnemy(centerX, centerY, allEnemies);
    if (!nearestEnemy) return;
    const projectile = document.createElement('div');
    projectile.className = 'projectile';
    field.appendChild(projectile);
    const directionX = nearestEnemy.x + (nearestEnemy.height / 2) - centerX;
    const directionY = nearestEnemy.y + (nearestEnemy.width / 2) - centerY;
    const velocity = { x: directionX / Math.hypot(directionX, directionY) * projectileSpeed, y: directionY / Math.hypot(directionX, directionY) * projectileSpeed };
    projectile.style.left = `${centerX}px`;
    projectile.style.top = `${centerY}px`;
    projectiles.push({ projectile, x: centerX, y: centerY, velocity, target: nearestEnemy });
}

const animateProjectiles = () => {
    projectiles.forEach((projectile, index) => {
        const dx = projectile.velocity.x;
        const dy = projectile.velocity.y;
        projectile.x += dx;
        projectile.y += dy;
        projectile.projectile.style.left = `${projectile.x}px`;
        projectile.projectile.style.top = `${projectile.y}px`;
        if (projectile.x < 0 || projectile.x > field.offsetWidth || projectile.y < 0 || projectile.y > field.offsetHeight) {
          projectiles.splice(index, 1);
          projectile.projectile.remove();
        }
    });
}

const updateProjectiles = () => {
    animateProjectiles();
}

setInterval(generateProjectile, atkspd);

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

damageBtn.addEventListener('click', upgradeDamage);
rangeBtn.addEventListener('click', upgradeRange);
attackBtn.addEventListener('click', upgradeAttackSpeed);
critBtn.addEventListener('click', upgradeCriticalChance);
critPercentBtn.addEventListener('click', upgradeCriticalPercent);
coinPerLvlBtn.addEventListener('click', upgradeCoinsPerLvl);

// -----
// Render frame
// -----

const checkCollisions = () => {
    // console.log(projectiles);
    // console.log(allEnemies);
    projectiles.forEach((projectile, projectileIndex) => {
      allEnemies.forEach((enemy, enemyIndex) => {
        if (!enemy) return; // Skip if enemy doesn't exist
        const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
        if (distance < 10) {
          projectile.projectile.remove();
          enemy.enemy.remove();
          enemy.isDead = true;
          console.log("Enemy Destroyed!");
          console.log(allEnemies);
          projectiles = projectiles.filter(projectile => projectile !== null);
        }
      });
    });
}

const update = (timestamp) => {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    const render = () => {
        //checkCollisions();
        updateEnemies();
        updateProjectiles();
    }

render();
requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);