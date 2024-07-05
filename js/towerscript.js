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
const rangeImg = document.getElementById('range-img'); 
// Game status
const level = document.getElementById('level');
const health = document.getElementById('health');
const coins = document.getElementById('coins-p');
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
let healthNum = 20;
let levelNum = 0;
let coinsNum = 0;
// Tower stats
let dmg = 1;
let rng = 180;
let atkspd = 650;
let critdmg = 2;
let critpercent = 0.02;
let coinsperlvl = 7;
// Stat upgrades
let dmgUpgrade = 1;
let rngUpgrade = 15;
let atkspdUpgrade = 25;
let critChanceUpgrade = 0.02;
let critDmgUpgrade = 0.2;
let coinsPerLvlUpgrade = 1;
// Upgrade costs
let dmgUpgradeCost = 10;
let rngUpgradeCost = 10;
let atkspdUpgradeCost = 10;
let critChanceUpgradeCost = 10;
let critDmgUpgradeCost = 10;
let coinsPerLvlUpgradeCost = 10;
// Game mechanics
const levelTime = 8500;
const enemySpawnDelay = 5500;
const enemySpeed = 1.2;
const basicDamage = 1;
const strongDamage = 2;
const bossDamage = 11;
let basicHealth = 1;
let strongHealth = 3;
let bossHealth = 1;
let game = true;
let basicToSpawn = 2;
let strongToSpawn = 0;
let allEnemies = [];
let projectiles = [];

// -----
// Handle Coins
// -----

const setCoins = (num) => {
    coinsNum += num;
    coins.innerHTML = `<img draggable="false" class="coinImg-top" src="./img/tower/coin.png"/>${Math.floor(coinsNum)}`;
}

// -----
// Handle Stats
// -----

damageTxt.textContent = `DMG: ${dmg}`;
rangeTxt.textContent = `RNG: ${rng}`;
attackSpeedTxt.textContent = `SPD: ${(1000 / atkspd).toFixed(2)}`;
critChanceTxt.textContent = `CRT%: ${critpercent * 100}%`;
critDmgTxt.textContent = `CRT: ${(critdmg / dmg).toFixed(1)}x`;
coinsPerLvlTxt.innerHTML = `<img draggable="false" class="coinImg-bottom" src="./img/tower/coin.png"/>/lvl: ${coinsperlvl}`;

// -----
// Handle Cost Box
// -----

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    costBox.style.left = `${x + 15}px`;
    costBox.style.top = `${y + 15}px`;
});

const hideCostBox = () => {
    costBox.style.display = 'none';
}

damageBtn.addEventListener('mouseover', () => {
    costBox.style.display = 'block';
    costText.textContent = `x ${Math.floor(dmgUpgradeCost)}`;
});

damageBtn.addEventListener('mouseout', hideCostBox);

rangeBtn.addEventListener('mouseover', () => {
    costBox.style.display = 'block';
    costText.textContent = `x ${Math.floor(rngUpgradeCost)}`;
});

rangeBtn.addEventListener('mouseout', hideCostBox);

attackBtn.addEventListener('mouseover', () => {
    costBox.style.display = 'block';
    costText.textContent = `x ${Math.floor(atkspdUpgradeCost)}`;
});

attackBtn.addEventListener('mouseout', hideCostBox);

critBtn.addEventListener('mouseover', () => {
    costBox.style.display = 'block';
    costText.textContent = `x ${Math.floor(critChanceUpgradeCost)}`;
});

critBtn.addEventListener('mouseout', hideCostBox);

critPercentBtn.addEventListener('mouseover', () => {
    costBox.style.display = 'block';
    costText.textContent = `x ${Math.floor(critDmgUpgradeCost)}`;
});

critPercentBtn.addEventListener('mouseout', hideCostBox);

coinPerLvlBtn.addEventListener('mouseover', () => {
    costBox.style.display = 'block';
    costText.textContent = `x ${Math.floor(coinsPerLvlUpgradeCost)}`;
});

coinPerLvlBtn.addEventListener('mouseout', hideCostBox);

// -----
// Spawn level
// -----

const enemySpawner = (basicToSpawn, strongToSpawn) => {
    const spawnEngine = (enemyArray, divString, toSpawn, enemyHealth, enemyDamage) => {
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
                enemyType.style.left = `${initialX}px`;
                enemyType.style.top = `${initialY}px`;
                const velocity = {
                    x: (field.offsetWidth / 2 - initialX) * enemySpeed,
                    y: (field.offsetHeight / 2 - initialY) * enemySpeed
                };
                enemyArray.push({ 
                    enemy: enemyType, 
                    isDead: false, 
                    health: enemyHealth, 
                    damage: enemyDamage, 
                    width: 20, 
                    height: 20, 
                    x: initialX, 
                    y: initialY, 
                    velocity: { x: velocity.x, y: velocity.y } 
                });
                allEnemies.push(enemyArray[enemyArray.length - 1]); // Push the latest enemy to allEnemies
            }, delay);
        }
    }
    if (levelNum % 10 === 0 && levelNum != 0) {
        // Spawn a boss enemy
        spawnEngine([], "enemyBoss", 1, bossHealth, bossDamage);
    } else {
        spawnEngine([], "enemyBasic", basicToSpawn, basicHealth, basicDamage);
        spawnEngine([], "enemyStrong", strongToSpawn, strongHealth, strongDamage);
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
        const centerX = field.offsetWidth / 2 + -12;
        const centerY = field.offsetHeight / 2 + -12;
        const dx = centerX - enemyData.x;
        const dy = centerY - enemyData.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const velocityX = (dx / dist) * enemySpeed;
        const velocityY = (dy / dist) * enemySpeed;
        enemyData.x += velocityX;
        enemyData.y += velocityY;
        enemyData.enemy.style.left = `${enemyData.x}px`;
        enemyData.enemy.style.top = `${enemyData.y}px`;
        // Check for collision with tower
        const towerRect = tower.getBoundingClientRect();
        const enemyRect = enemyData.enemy.getBoundingClientRect();
        if (checkCollision(towerRect, enemyRect)) {
            hitEnemy(enemyData, 50, 0);
            hitTower(enemyData.damage, enemyData);
        }
    });
}

const spawnWave = () => {
    if (game) {
        if (levelNum % 10 === 0 && levelNum != 0) {
            enemySpawner(basicToSpawn, strongToSpawn);
            levelNum++;
            basicHealth += 2;
            strongHealth += 4;
            bossHealth += 10;
            enemySpeed += 0.3;
            level.textContent = `Level: ${levelNum}`;
        } else {
            // Spawn enemies
            enemySpawner(basicToSpawn, strongToSpawn);
            levelNum++;
            level.textContent = `Level: ${levelNum}`;
            basicToSpawn++;
            // Increase number of strong enemies to spawn every third wave
            if (levelNum % 3 === 0) {
                strongToSpawn++;
            }
            setCoins(coinsperlvl);
        }
        console.log("Level ", levelNum);
    }
}

const updateEnemies = () => {
    animateEnemy(allEnemies);
}

spawnWave();

setInterval(spawnWave, levelTime);

// -----
// Damage
// -----

const hitTower = (enemyDmg, enemyData) => {
    if (healthNum > 0) {
        healthNum -= enemyDmg;
        hitEnemy(enemyData, 50, 0);
        health.textContent = `Health: ${healthNum}`;
        console.log("Tower Hit!", healthNum, "Damage Dealt: ", enemyDmg);
    } else {
        game = false;
        health.textContent = `Game Over!`;
        console.log("Game Over!");
        field.classList.add('loseGameAnim');
    }
}

const hitEnemy = (enemyData, dmg, prize) => {
    if (Math.random() < critpercent) {
        dmg *= critdmg;
        enemyData.health -= dmg;
        console.log("Critical Hit!! Damage: ", dmg);
    } else {
        enemyData.health -= dmg;
        console.log("Enemy Health: ", enemyData.health);
    }
    if (enemyData.health <= 0) {
        enemyData.enemy.isDead = true;
        allEnemies = allEnemies.filter(enemyData => !enemyData.enemy.isDead);
        enemyData.enemy.remove();
        setCoins(prize);
    }
}

const checkTower = () => {
    if (!game) {
        allEnemies.forEach((enemyData) => {
            hitEnemy(enemyData, 50, 0);
        });
    }
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
            hitEnemy(enemy, dmg, 2);
            destroyProjectile(projectile);
        }
    });
}

// -----
// Tower Shooting
// -----

const getNearestEnemy = (x, y, enemies) => {
    let nearestEnemy = null;
    let minDistance = rng;
    enemies.forEach((enemy) => {
        const distance = Math.hypot(x - enemy.x, y - enemy.y);
        if (!enemy.isDead) 
        if (distance < minDistance) {
            minDistance = distance;
            nearestEnemy = enemy;
        }
        if ((Math.abs(x - enemy.x) < 2 || Math.abs(y - enemy.y) < 2)) {
            hitEnemy(enemy, dmg, 2);
            console.log("Enemy Destroyed!");
        }
    });
    return nearestEnemy;
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
    const velocity = { x: directionX / Math.hypot(directionX, directionY) * 10, y: directionY / Math.hypot(directionX, directionY) * 10 };
    projectile.style.left = `${projectile.x}px`;
    projectile.style.top = `${projectile.y}px`;
    projectiles.push({ 
        projectile, 
        isHit: false, 
        x: centerX, 
        y: centerY, 
        velocity 
    });
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
    if (coinsNum - dmgUpgradeCost >= 0 && game) {
        setCoins(-dmgUpgradeCost);
        dmgUpgradeCost += dmgUpgradeCost/2;
        dmg += dmgUpgrade;
        dmgUpgradeCost == Math.floor(dmgUpgradeCost/2);
        damageTxt.textContent = `DMG: ${dmg}`;
        costText.textContent = `x ${Math.floor(dmgUpgradeCost)}`;
        console.log("Upgraded Tower Damage!");
    }
}

// -----
// Upgrade Range
// -----

const upgradeRange = () => {
    if (coinsNum - rngUpgradeCost >= 0 && game) {
        setCoins(-rngUpgradeCost);
        rngUpgradeCost += rngUpgradeCost/2;
        rng += rngUpgrade;
        rngUpgradeCost == Math.floor(rngUpgradeCost/2);
        rangeTxt.textContent = `RNG: ${rng}`;
        costText.textContent = `x ${Math.floor(rngUpgradeCost)}`;
        rangeImg.style.width = `${rng + 50}px`;
        rangeImg.style.height = `${rng + 50}px`;
        console.log("Upgraded Tower Range!");
    }
}

// -----
// Upgrade Attack Speed
// -----

const upgradeAttackSpeed = () => {
    if (coinsNum - atkspdUpgradeCost >= 0 && game) {
        setCoins(-atkspdUpgradeCost);
        atkspdUpgradeCost += atkspdUpgradeCost/2;
        atkspd -= atkspdUpgrade;
        atkspdUpgradeCost == Math.floor(atkspdUpgradeCost/2);
        attackSpeedTxt.textContent = `SPD: ${(1000 / atkspd).toFixed(2)}`;
        costText.textContent = `x ${Math.floor(atkspdUpgradeCost)}`;
        console.log("Upgraded Tower Attack Speed!");
    }
}

// -----
// Upgrade Critical Chance
// -----

const upgradeCriticalChance = () => {
    if (coinsNum - critChanceUpgradeCost >= 0 && game) {
        setCoins(-critChanceUpgradeCost);
        critChanceUpgradeCost += critChanceUpgradeCost/2;
        critpercent += critChanceUpgrade;
        critChanceUpgradeCost == Math.floor(critChanceUpgradeCost/2);
        critChanceTxt.textContent = `CRT%: ${critpercent * 100}%`;
        costText.textContent = `x ${Math.floor(critChanceUpgradeCost)}`;
        console.log("Upgraded Tower Critical Chance!");
    }
}

// -----
// Upgrade Critical Percentage
// -----

const upgradeCriticalPercent = () => {
    if (coinsNum - critDmgUpgradeCost >= 0 && game) {
        setCoins(-critDmgUpgradeCost);
        critDmgUpgradeCost += critDmgUpgradeCost/2;
        critdmg += critDmgUpgrade;
        critDmgUpgradeCost == Math.floor(critDmgUpgradeCost/2);
        critDmgTxt.textContent = `CRT: ${(critdmg / dmg).toFixed(1)}x`;
        costText.textContent = `x ${Math.floor(critDmgUpgradeCost)}`;
        console.log("Upgraded Tower Critical Damage!");
    }
}

// -----
// Upgrade Coins per Level
// -----

const upgradeCoinsPerLvl = () => {
    if (coinsNum - coinsPerLvlUpgradeCost >= 0 && game) {
        setCoins(-coinsPerLvlUpgradeCost);
        coinsperlvl += coinsPerLvlUpgrade;
        coinsPerLvlUpgradeCost += coinsPerLvlUpgradeCost/2;
        coinsPerLvlUpgradeCost == Math.floor(coinsPerLvlUpgradeCost/2);
        costText.textContent = `x ${Math.floor(coinsPerLvlUpgradeCost)}`;
        coinsPerLvlTxt.innerHTML = `<img draggable="false" class="coinImg-bottom" src="./img/tower/coin.png"/>/lvl: ${coinsperlvl}`;
    }
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
// Field animations
// -----

field.addEventListener('animationend', () => {
    field.classList.remove('clearLevelAnim');
    // field.style.backgroundColor = 'rgba(255, 0, 0, 0.2';
    // field.classList.remove('loseGameAnim');
});

// -----
// Render frame
// -----

const update = () => {
    const render = () => {
        checkTower();
        updateEnemies();
        updateProjectiles();
    }
    render();
    requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);
