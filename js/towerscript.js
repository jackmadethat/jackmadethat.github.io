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
let basicToSpawn = 10;
let strongToSpawn = 3;
const basicEnemies = [];
const strongEnemies = [];
let allEnemies = [];
let projectiles = [];

// -----
// Spawn level
// -----

const enemySpawner = (basicEnemyArray, strongEnemyArray, basicDivString, strongDivString, basicToSpawn, strongToSpawn) => {
    const spawnEngine = (enemyArray, divString, toSpawn) => {
        for (let i = 0; i < toSpawn; i++) {
            const delay = Math.random() * enemySpawnDelay;
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
                allEnemies.push(enemyArray[enemyArray.length - 1]); // Push the latest enemy to allEnemies
            }, delay);
        }
    }
    spawnEngine(basicEnemyArray, basicDivString, basicToSpawn);
    spawnEngine(strongEnemyArray, strongDivString, strongToSpawn);
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

const destroyEnemy = (enemyData) => {
    enemyData.enemy.isDead = true;
    allEnemies = allEnemies.filter(enemyData => !enemyData.enemy.isDead);
    enemyData.enemy.remove();
}

const animateEnemy = (enemyArray) => {
    enemyArray.forEach((enemyData) => {
        if (!enemyData || !enemyData.enemy) return;
        const centerX = field.offsetWidth / 2 + centerOffset;
        const centerY = field.offsetHeight / 2 + centerOffset;
        enemyData.velocity.x = (centerX - enemyData.x) * 0.01;
        enemyData.velocity.y = (centerY - enemyData.y) * 0.01;
        enemyData.x += enemyData.velocity.x;
        enemyData.y += enemyData.velocity.y;
        enemyData.enemy.style.left = `${enemyData.x}px`;
        enemyData.enemy.style.top = `${enemyData.y}px`;
        enemyData.x = enemyData.x;
        enemyData.y = enemyData.y;
        // Check for collision with tower
        const towerRect = tower.getBoundingClientRect();
        const enemyRect = enemyData.enemy.getBoundingClientRect();
        const index = enemyArray.indexOf(enemyData);
        if (checkCollision(towerRect, enemyRect)) {
            destroyEnemy(enemyData, index);
            hitTower();
        }
    });
}

const spawnEnemies = () => {
    enemySpawner(basicEnemies, strongEnemies, "enemyBasic", "enemyStrong", basicToSpawn, strongToSpawn);
}

const updateEnemies = () => {
    animateEnemy(allEnemies);
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
        console.log("Tower Hit!", healthNum);
    } else {
        health.textContent = `Game Over!`;
        console.log("Game Over!");
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
        if ((Math.abs(x - enemy.x) < 2 || Math.abs(y - enemy.y) < 2)) {
            destroyEnemy(enemy);
            console.log("Enemy Destroyed!");
        }
    });
    return nearestEnemy;
}

const destroyProjectile = (projectileData) => {
    projectileData.projectile.isHit = true;
    projectiles = projectiles.filter(projectileData => !projectileData.projectile.isHit);
    projectileData.projectile.remove();
}

const projectileHit = (projectile, x, y, enemies) => {
    enemies.forEach((enemy) => {
        const distance = Math.hypot(x - enemy.x, y - enemy.y)
        if (distance <  15) {
            destroyEnemy(enemy);
            destroyProjectile(projectile);
            console.log("Enemy Destroyed!");
        }
    })
}

const generateProjectile = () => {
    if (allEnemies.length == 0) return;
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
    projectile.style.left = `${projectile.x}px`;
    projectile.style.top = `${projectile.y}px`;
    projectiles.push({ projectile, isHit: false, x: centerX, y: centerY, velocity });
}

const animateProjectiles = (projectiles) => {
    projectiles.forEach((projectileData) => {
        const dx = projectileData.velocity.x;
        const dy = projectileData.velocity.y;
        projectileData.x += dx;
        projectileData.y += dy;
        projectileData.projectile.style.left = `${projectileData.x}px`;
        projectileData.projectile.style.top = `${projectileData.y}px`;
        if (projectileData.x < 0 || projectileData.x > field.offsetWidth || projectileData.y < 0 || projectileData.y > field.offsetHeight) {
            destroyProjectile(projectileData);
        }
        projectileHit(projectileData, projectileData.x, projectileData.y, allEnemies);
    });
}

const updateProjectiles = () => {
    animateProjectiles(projectiles);
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

const update = (timestamp) => {
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