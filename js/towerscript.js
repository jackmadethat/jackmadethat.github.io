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
let lastUpdateTime = 0;
const speed = 2;

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