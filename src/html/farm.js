const ROWS = 4;
const COLUMNS = 6;

function handleTileClick(event) {
  const tile = event.currentTarget;

  const row = Number(tile.dataset.row);
  const column = Number(tile.dataset.column);

  const previousTile = document.querySelector(".farm-tile.selected");

  previousTile?.classList.remove("selected");

  tile.classList.add("selected");

  const selectedTile = document.getElementById("selected-tile");

  if (!selectedTile) {
    return;
  }

  selectedTile.textContent = `Selected: row = ${row}, column = ${column}`;

  console.log(`Click at tile : row = ${row} column = ${column}`);
}

function createFarmGrid() {
  const farmGrid = document.getElementById("farm-grid");

  if (!farmGrid) {
    return;
  }

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const tile = document.createElement("button");

      tile.className = "farm-tile";
      tile.type = "button";

      tile.dataset.row = row;
      tile.dataset.column = column;

      tile.addEventListener("click", handleTileClick);

      farmGrid.appendChild(tile);
    }
  }
}

createFarmGrid();
