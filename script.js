// a.	 Axe - for cutting trees
// b.	Pickaxe - for mining rocks
// c.	Shovel - for digging dirt
// 2.	Clicking on a tool followed by clicking on a tile in the world will remove the tile. (If it is of the correct type according to #1) and add it to the inventory.
// 3.	Users can click on the tile in the inventory and place it back in the world (just the last one).

// the game rules:
// 1- cannot place tiles on the cloud or remove cloud tiles from map ( like yellow squares)
// 2- cannot place tiles on each other example ( you placed a rock you cannot place soil on top)
// 3- can place only on empty spaces like SKY (blue tiles)
// 4- cannot remove tiles without the correct tool ( example axe remove wood and leaf you cannot remove rocks with axe )

const game = document.getElementById("game");
const tools = document.getElementById("tools");
const axe = document.getElementById("axe");
const pickaxe = document.getElementById("pickaxe");
const shovel = document.getElementById("shovel");
const axeSquare = document.getElementById("axe");
const pickaxeSquare = document.getElementById("pickaxe");
const shovelSquare = document.getElementById("shovel");
const resetButton = document.getElementById("reset-button");
const inv = document.getElementById("inv");
const soilSquare = document.getElementById("soil");
const woodSquare = document.getElementById("wood");
const rockSquare = document.getElementById("rock");
const grassSquare = document.getElementById("grass");
const leafSquare = document.getElementById("leaf");
const soilCounter = document.getElementById("soil-counter");
const woodCounter = document.getElementById("wood-counter");
const rockCounter = document.getElementById("rock-counter");
const grassCounter = document.getElementById("grass-counter");
const leafCounter = document.getElementById("leaf-counter");

let currentTile = null;

const inventory = {
  soil: 0,
  wood: 0,
  rock: 0,
  grass: 0,
  leaf: 0,
};

const numRows = 12; // number of rows
const numCols = 17; // number columns
const iconSize = 50; // grid-item size in pixels

function iconSizeStyle(numCols, numRows, iconSize) {
  game.style.display = "grid";
  game.style.gridTemplateColumns = `repeat(${numCols}, ${iconSize}px)`;
  game.style.gridTemplateRows = `repeat(${numRows}, ${iconSize}px)`;
}

function createDynamicIcons(numRows, numCols, iconSize) {
  const gameData = [];

  iconSizeStyle(numCols, numRows, iconSize);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const gridIcon = document.createElement("section");
      gridIcon.className = "grid-icon";
      gridIcon.id = `${i}-${j}`;
      game.appendChild(gridIcon);
      gameData.push(gridIcon);
    }
  }
  return gameData;
}

let gameData = createDynamicIcons(numRows, numCols, iconSize);

function drawGameIcons() {
  for (let g = 0; g < gameData.length; g++) {
    let [i, j] = gameData[g].getAttribute("id").split("-");
    drawSky(Number(i), Number(j), Number(g));
    drawClouds(Number(i), Number(j), Number(g));
    drawSoil(Number(i), Number(j), Number(g));
    drawWood(Number(i), Number(j), Number(g));
    drawRock(Number(i), Number(j), Number(g));
    drawGrass(Number(i), Number(j), Number(g));
    drawLeaf(Number(i), Number(j), Number(g));
  }
}

drawGameIcons();

// draw sky
function drawSky(i, j, g) {
  if (i < numRows && j < numCols) {
    gameData[g].classList.add("sky");
  }
}
// draw clouds
function drawClouds(i, j, g) {
  if ((i === 0 && j === 6) || (i === 0 && j === 7) || (i === 0 && j === 8)) {
    gameData[g].classList.add("cloud");
  }
  if (
    (i === 1 && j === 5) ||
    (i === 1 && j === 6) ||
    (i === 1 && j === 7) ||
    (i === 1 && j === 8) ||
    (i === 1 && j === 9)
  ) {
    gameData[g].classList.add("cloud");
  }
  if ((i === 2 && j === 6) || (i === 2 && j === 7) || (i === 2 && j === 3)) {
    gameData[g].classList.add("cloud");
  }

  if ((i === 3 && j === 2) || (i === 3 && j === 3) || (i === 3 && j === 4)) {
    gameData[g].classList.add("cloud");
  }
}
// draw grass
function drawGrass(i, j, g) {
  if (i === 8 && j < 19) {
    gameData[g].classList.add("grass");
  }
}
// draw soil
function drawSoil(i, j, g) {
  if (i > 8 && j < 19) {
    gameData[g].classList.add("soil");
  }
}
// draw rocks
function drawRock(i, j, g) {
  if (i === 7 && j === 2) {
    gameData[g].classList.add("rock");
  }
  if (i === 6 && j === 5) {
    gameData[g].classList.add("rock");
  }
  if (i === 7 && j === 5) {
    gameData[g].classList.add("rock");
  }
  if (i === 7 && j === 6) {
    gameData[g].classList.add("rock");
  }
  if (i === 7 && j === 12) {
    gameData[g].classList.add("rock");
  }
}

// draw tree leaves
function drawLeaf(i, j, g) {
  if ((i === 3 && j === 9) || (i === 3 && j === 10) || (i === 3 && j === 11)) {
    gameData[g].classList.add("leaf");
  }
  if (
    (i === 4 && j === 10) ||
    (i === 4 && j === 11) ||
    (i === 4 && j === 9) ||
    (i === 4 && j === 14)
  ) {
    gameData[g].classList.add("leaf");
  }
  if ((i === 5 && j === 13) || (i === 5 && j === 14) || (i === 5 && j === 15)) {
    gameData[g].classList.add("leaf");
  }
}
// draw tree wood
function drawWood(i, j, g) {
  if (i === 5 && j === 10) {
    gameData[g].classList.add("wood");
  }
  if (i === 6 && j === 10) {
    gameData[g].classList.add("wood");
  }
  if (i === 7 && j === 10) {
    gameData[g].classList.add("wood");
  }
  if (i === 6 && j === 14) {
    gameData[g].classList.add("wood");
  }
  if (i === 7 && j === 14) {
    gameData[g].classList.add("wood");
  }
}

// set the icons for the tools and the inventory
axeSquare.classList.add("axe");
pickaxeSquare.classList.add("pickaxe");
shovelSquare.classList.add("shovel");
soilSquare.classList.add("soil");
rockSquare.classList.add("rock");
woodSquare.classList.add("wood");
grassSquare.classList.add("grass");
leafSquare.classList.add("leaf");

// update the inventory counters
function updateInventoryCounters() {
  soilCounter.textContent = inventory.soil;
  woodCounter.textContent = inventory.wood;
  rockCounter.textContent = inventory.rock;
  grassCounter.textContent = inventory.grass;
  leafCounter.textContent = inventory.leaf;
}

function highlightSelection(element) {
  element.style.border = "red";
  element.style.borderStyle = "solid";
  element.style.borderWidth = "2px";
}

function removeHighlightSelection(element) {
  element.style.border = "white";
  element.style.borderStyle = "solid";
  element.style.borderWidth = "1px";
}

function select(target, appropiateElement, inventoryTile) {
  // should remove whatever is selected because of redundancy
  removeHighlightSelection(soilSquare);
  removeHighlightSelection(grassSquare);
  removeHighlightSelection(woodSquare);
  removeHighlightSelection(rockSquare);
  removeHighlightSelection(leafSquare);
  removeHighlightSelection(axe);
  removeHighlightSelection(pickaxe);
  removeHighlightSelection(shovel);

  // Highlight the selected tool
  if (appropiateElement) highlightSelection(appropiateElement);
  if (inventoryTile > 0) {
    currentTile = target;
  }
}

// add an event listener for the tools
tools.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target === "axe") {
    currentTile = "axe";
    select("axe", axe, tools.axe);
  }
  if (target === "pickaxe") {
    currentTile = "pickaxe";
    select("pickaxe", pickaxe, tools.pickaxe);
  }
  if (target === "shovel") {
    currentTile = "shovel";
    select("shovel", shovel, tools.shovel);
  }
});

let currentInv = "";
// add event listener to the inventory
inv.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target === "soil") {
    select("soil", soilSquare, inventory.soil);
    currentInv = "soil";
  } else if (target === "grass") {
    select("grass", grassSquare, inventory.grass);
    currentInv = "grass";
  } else if (target === "rock") {
    select("rock", rockSquare, inventory.rock);
    currentInv = "rock";
  } else if (target === "wood") {
    select("wood", woodSquare, inventory.wood);
    currentInv = "wood";
  } else if (target === "leaf") {
    select("leaf", leafSquare, inventory.leaf);
    currentInv = "leaf";
  }
  console.log(currentInv);
});

// placing items at the game
game.addEventListener("click", (e) => {
  const gameItem = e.target;
  console.log(gameItem);
  const itemTile = gameItem.classList[2];
  // Check if the tool matches the tile type
  if (currentTile === "axe" && (itemTile === "wood" || itemTile === "leaf")) {
    // remove it
    gameItem.classList.remove(itemTile);
    inventory[itemTile]++;
  } else if (currentTile === "pickaxe" && itemTile === "rock") {
    gameItem.classList.remove(itemTile);
    inventory[itemTile]++;
  } else if (
    currentTile === "shovel" &&
    (itemTile === "soil" || itemTile === "grass")
  ) {
    gameItem.classList.remove(itemTile);
    inventory[itemTile]++;
  }
  //   else if (currentTile) {
  //     if (itemTile === undefined) {
  // if (inventory[currentTile] > 0) {
  //   gameItem.classList.add(itemTile);
  //   inventory[currentTile]--;
  // }
  //   }
  // }
  else if (gameItem.classList.length == 2 && inventory[currentInv] > 0) {
    gameItem.classList.add(currentInv);
    inventory[currentInv]--;
  }
  updateInventoryCounters();
});

// Function to reset the game:
function resetGame() {
  // Clear the game container and recreate icons
  game.innerText = "";
  gameData = createDynamicIcons(numRows, numCols, iconSize);
  drawGameIcons();

  // Reset inventory
  inventory.soil = 0;
  inventory.wood = 0;
  inventory.rock = 0;
  inventory.grass = 0;
  inventory.leaf = 0;

  // Update counters and reset currentTile
  updateInventoryCounters();
  currentTile = null;
  select();
  removeHighlightSelection(axe);
  removeHighlightSelection(pickaxe);
  removeHighlightSelection(shovel);
}

updateInventoryCounters();
resetButton.addEventListener("click", resetGame);
