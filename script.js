const mobBlock2 = document.getElementById('mob-block-2');
const mobImage = document.getElementById('mob-image');
const mobHealthContainer = document.getElementById('mob-health');
const mobHealthBlock = document.getElementById("mob-health-block")
const boxFoundBlock = document.getElementById('box-found-block')
const miningBLock = document.getElementById('mining-block')
const expeditionBlock = document.getElementById('expedition-block')

const goldContainer = document.getElementById('gold');
const goldMultiplierContainer = document.getElementById('gold-multiplier');

const contaminationBLock = document.getElementById('contamination')
const proteineBlock = document.getElementById('proteine')
const nextMob1Block = document.getElementById('next-cost-1')
const nextMob2Block = document.getElementById('next-cost-2')
const nextMob3Block = document.getElementById('next-cost-3')
const nextMob4Block = document.getElementById('next-cost-4')
const mobLevelBlock = document.getElementById('mob-level-block');
const mobLevelContainer = document.getElementById('mob-level');
const mobLevelCostContainer = document.getElementById('mob-next-level-cost');
const buyMobLevelButtonContainer = document.getElementById('buy-mob-level');
const buyProtForGoldButton = document.getElementById('buy-prot-for-gold');
const protCount = document.getElementById('prot-count');
const buyClicForProt = document.getElementById('buy-clic-for-prot')
const clicPowerContainer = document.getElementById('clic-power')
const x10LevelButtonContainer = document.getElementById('x10-level-button')
const buyDotForGold = document.getElementById('buy-dot-for-gold')
const dotCount = document.getElementById('dot-count')
const x10ProtButtonContainer = document.getElementById('x10-prot-button')
const x100ProtButtonContainer = document.getElementById('x100-prot-button')
const x1000ProtButtonContainer = document.getElementById('x1000-prot-button')
const buyDiamondForGold = document.getElementById('buy-diamond-for-gold')
const diamondCount = document.getElementById('diamond-count')
const nextWorldButton1 = document.getElementById('next-world-button-1')
const minerRecruit = document.getElementById('miner-recruit')
const minersCount = document.getElementById('miners')
const countdownContainer = document.getElementById('countdown')
const diamondPercentageContainer = document.getElementById('diamond-percentage')
const endExpeditionCostContainer = document.getElementById('end-expedition-cost')
const endExpeditionContainer = document.getElementById('end-expedition-button')

mobImage.addEventListener('click', attackMob);
buyMobLevelButtonContainer.addEventListener('click', buyMobLevel);
buyProtForGoldButton.addEventListener('click', buyProt)
buyClicForProt.addEventListener('click', buyClic)
x10LevelButtonContainer.addEventListener('click', buy10Level)
buyDotForGold.addEventListener('click', buyDot)
x10ProtButtonContainer.addEventListener('click', buyProtx10)
x100ProtButtonContainer.addEventListener('click', buyProtx100)
x1000ProtButtonContainer.addEventListener('click', buyProtx1000)
nextWorldButton1.addEventListener('click', goToNextWorld1)
minerRecruit.addEventListener('click', recruitMiner)
endExpeditionContainer.addEventListener('click', endExpedition)

let baseMobGold = 1;
let baseMobHealth = 5;
let baseMobLevelCost = 10;
let baseDiamondCountDown = 30;
let diamondChance = 0;
let minerPercentage = 0;
let baseEndExpeditionCost = 3000;


let mobHealth = baseMobHealth;
let gold = 0;
let mobLevel = 1;
let protStock = 0;
let damage = 1;
let dot = 0;
let miner = 0;
let diamond = 0;
let timer = 0

let mobIsBoss = false;
let mobIsBox = false;

let diamondCountDownTime = baseDiamondCountDown;



function attackMob() {
  mobHealth -= damage;
  if (mobHealth <= 0) {
    killMob();
  }
  updateData();
};

function killMob() {
  gold += getMobGold();
  goToNextMob();
  updateData();
}

function goToNextMob() {
  rollForBoss();
  // rollForBox();
  mobHealth = getMobFullHealth();
  updateData();
}

function buyMobLevel() {
  const mobLevelCost = getMobLevelCost();
  if (gold >= mobLevelCost) {
    gold -= mobLevelCost;
    mobLevel += 1;
    goToNextMob();
    updateData();
  }
}

function buyProt() {
  if (gold >= 10) {
    protStock++
    gold -= 10
    updateData();
  }
}

function buyClic() {
  if (protStock >= 5) {
    damage++;
    protStock -= 5;
    updateData()
  }
}

function recruitMiner() {
  if (gold >= 1000) {
    gold -= 1000;
    miner++;
    expeditionBlock.style.display = 'block';
    searchForDiamond()
    updateData()
  }
  }

function endExpedition() {
  if (gold >= 3000) {
    gold -= 3000
    resetTimer()
    updateData()
  }
}

function getDiamondChancePercentage() {
  minerPercentage = miner * 5;
  diamondChance = 100 - minerPercentage;
  return 100 - diamondChance;
}



function searchForDiamond() {
  if (miner > 0) {
  clearInterval(timer)
  }
  timer = setInterval(diamondTimer, 1000)
  updateData()
}


function resetTimer() {
  searchForDiamond()
  rollForDiamond()
  diamondCountDownTime = 30
}


function diamondTimer() {
  diamondCountDownTime--
  if (diamondCountDownTime < 0) {
    resetTimer()
  }
  updateData()
}

function diamondFound() {
  alert('Vous avez trouvé un diamant !')
  diamond++
}


function getHealthPercentage() {
  return mobHealth / getMobFullHealth () * 100;
}


function getMobFullHealth() {
  let normalMobFullHealth = Math.round(baseMobHealth * (mobLevel ** 1.25));
  if (mobIsBoss) {
    return normalMobFullHealth * 4
  } else if (mobIsBox) {
    return normalMobFullHealth = 2
  } else {
    return normalMobFullHealth
  };
}

function getMobGold() {
  let normalMobGold = baseMobGold * getGoldMultiplier();
  if (mobIsBoss) {
    return normalMobGold * 10
  } else if (mobIsBox) {
    return normalMobGold * 20
  } else {
    return normalMobGold
  }
}

function getGoldMultiplier() {
  return mobLevel;
}

function getMobLevelCost() {
  return baseMobLevelCost * mobLevel;
}

function rollForBoss() {
  const bossRollResult = Math.floor(Math.random() * 9);
  if (bossRollResult === 0) {
    mobIsBoss = true;
  } else {
    mobIsBoss = false;
  }
}

function rollForBox() {
  const boxRollResult = Math.floor(Math.random() * 39);
  console.log(mobIsBox)
  if (boxRollResult === 0) {
    mobIsBox = true;
  } else {
    mobIsBox = false;
  }
}

//refaire le roll//

function rollForDiamond() {
  // let numberArray = [];
  // let arrayIndex = [];
  // for (let i = 0; i < 100; i++) {
  //   numberArray.push(i)
  // }
  // console.log(numberArray)
  let diamondRollResult = Math.floor(Math.random() * 100);
  console.log(diamondRollResult)
  for (let j = 0; j < getDiamondChancePercentage(); j++) {
  if (diamondRollResult === j) {
    diamondFound()
  }
  console.log(j)
  }
    // else {
  //   alert("vous n'avez rien trouvé ...")
  // }
}

// function get10MobLevelCost() {
//   // for (let i = 0; i < 10; i++) {
//   //   getMobLevelCost
//   //   updateData()
//   // }
//   return getMobLevelCost
// }

function buy10Level() {
  for (let i = 0; i < 10; i++) {
    buyMobLevel()
  }
}

function buyDot() {
  if (gold >= 200) {
    dot++;
    gold -= 200;
    updateData()
  }
}

function applyDot() {
  mobHealth -= dot;
  if (mobHealth <= 0) {
    killMob();
  }
  updateData()
}



function buyProtx10() {
  if (gold >= 100) {
  for (let i = 0; i < 10; i++) {
    buyProt()
    }
  }
}

function buyProtx100() {
  if (gold >= 1000) {
  for (let i = 0; i < 100; i++) {
    buyProt()
    }
  }
}

function buyProtx1000() {
  if (gold >= 10000) {
  for (let i = 0; i < 1000; i++) {
    buyProt()
    }
  }
}

// function buyProtx(multiNumber) {
//   if (gold >= multiNumber * 10) {
//     for (let i = 0; i < multiNumber; i++) {
//       buyProt()
//     }
//   }
// }



function spawnBox () {
  mobImage.src = 'mob/close-box.png';
  // mobHealthBlock.style.display = 'none';
  // boxFoundBlock.style.display = 'block';
  // mobImage.addEventListener('click', openBox)
}
function openBox () {
  mobImage.src = 'mob/open-box.png'
}

function goToNextWorld1 () {
  if (diamond >= 5) {
  mobBlock2.style.display = 'block';
  nextWorldButton1.style.display = 'none';
  }
}

function updateData() {
  mobHealthContainer.textContent = mobHealth;
  goldContainer.textContent = gold;
  goldMultiplierContainer.textContent = getGoldMultiplier();
  mobLevelContainer.textContent = mobLevel;
  mobLevelCostContainer.textContent = getMobLevelCost();
  protCount.textContent = protStock;
  clicPowerContainer.textContent = damage;
  dotCount.textContent = dot;
  minersCount.textContent = miner;
  diamondCount.textContent = diamond;
  countdownContainer.textContent = diamondCountDownTime;
  diamondPercentageContainer.textContent = getDiamondChancePercentage();
  endExpeditionCostContainer.textContent = baseEndExpeditionCost;


  if (gold >= getMobLevelCost() && proteineBlock.style.display === 'none') {
    mobLevelBlock.style.display = 'block';
    nextMob1Block.style.display = "none";
    nextMob2Block.style.display = 'block'
  }

  if (gold >= 50 && contaminationBLock.style.display === 'none') {
    proteineBlock.style.display = 'block';
    nextMob2Block.style.display = 'none';
    nextMob3Block.style.display = 'block'
  }

  if (gold >= 200) {
    contaminationBLock.style.display = 'block';
    nextMob3Block.style.display = 'none';
    nextMob4Block.style.display = 'block';
  }

  if (gold >= 1000) {
    miningBLock.style.display = 'block';
    nextMob4Block.style.display = 'none';
  }

  healthPercentage = getHealthPercentage();


  // else if (mobIsBox) {
  //   spawnBox()
  // }


  if (mobIsBoss) {
    if (healthPercentage <= 100 && healthPercentage > 67) {
        mobImage.src = 'mob/mob-boss-A.png';
    } else if (healthPercentage <= 67 && healthPercentage > 34) {
        mobImage.src = 'mob/mob-boss-B.png';
    } else if (healthPercentage <= 34 && healthPercentage>= 0) {
        mobImage.src = 'mob/mob-boss-C.png';
    }
  } else {
    if (healthPercentage <= 100 && healthPercentage > 67) {
      mobImage.src = 'mob/mob-A.png';
    } else if (healthPercentage <= 67 && healthPercentage > 34) {
      mobImage.src = 'mob/mob-B.png';
    } else if (healthPercentage <= 34 && healthPercentage>= 0) {
      mobImage.src = 'mob/mob-C.png';
    }
  }
}


updateData();

setInterval(applyDot, 100)