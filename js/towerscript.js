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
let lastTimestamp = 0;
const enemySpawnDelay = 2500;
const enemySpeed = 1.5;
const maxSpeed = 150;
const centerOffset = -12;
const projectileSpeed = 10;
let basicToSpawn = 10;
let strongToSpawn = 3;
const basicEnemies = [];
const strongEnemies = [];
let allEnemies = [];
let projectiles = [];

// -----
// Spawn level
// -----

const enemySpawner = (enemyArray, divString, toSpawn) => {
    for (let i = 0; i < toSpawn; i++) {
        const delay = Math.random() * enemySpawnDelay;
        setTimeout(() => {
        enemyType = document.createElement("div");
        enemyType.className = divString;
        field.appendChild(enemyType);
        let enemyNum = i;
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
        enemyArray.push({ enemy: enemyType, index: enemyNum, width: 20, height: 20, initialX, initialY, x: initialX, y: initialY, velocity: { x: velocity.x, y: velocity.y } });
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
            enemyArray.splice(index, 1);
            enemy.remove();
            hitTower();
        }
    });
}

const spawnEnemies = () => {
    enemySpawner(basicEnemies, "enemyBasic", basicToSpawn);
    enemySpawner(strongEnemies, "enemyStrong", strongToSpawn);
}

const updateEnemies = () => {
    animateEnemy(basicEnemies);
    animateEnemy(strongEnemies);
    allEnemies = basicEnemies.concat(strongEnemies);
    // console.log(allEnemies.length);
  }

spawnEnemies();

setInterval(spawnEnemies, levelTime);

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
      if (distance < minDistance) {
        minDistance = distance;
        nearestEnemy = enemy;
      }
    });
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
    console.log(nearestEnemy);
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

        let enemyIndex;
        const hasCollidedWithEnemy = allEnemies.some((enemy, index) => {
            enemyIndex = index;
            const dx = Math.abs(projectile.x - (enemy.x + enemy.width / 2));
            const dy = Math.abs(projectile.y - (enemy.y + enemy.height / 2));
            if (dx < 5 && dy < 5) {
                return true;
            }
            return false;
        });
    
        if (hasCollidedWithEnemy) {
            projectiles.splice(index, 1);
            projectile.projectile.remove();
        }
    });
}

const updateProjectiles = () => {
    animateProjectiles();
}

setInterval(generateProjectile, 500);

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

// -----
// Render frame
// -----

const update = (timestamp) => {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    const render = () => {
        updateEnemies();
        updateProjectiles();
    }

render();
requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);