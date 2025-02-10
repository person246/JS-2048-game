let gameBoard = document.getElementById("gameboard");
let scoreEl = document.getElementById("score");

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    slideLeft();
    showRandomTiles();
  } else if (event.key === "ArrowRight") {
    slideRight();
    showRandomTiles();
  } else if (event.key === "ArrowUp") {
    slideUp();
    showRandomTiles();
  } else if (event.key === "ArrowDown") {
    slideDown();
    showRandomTiles();
  }
});

let game = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
// let game = [
//   [2, 2, 0, 2],
//   [4, 2, 0, 2],
//   [0, 2, 0, 0],
//   [2048, 2048, 4, 8],
// ];

let rows = game.length;
let columns = game[0].length;
let score = 0;

showRandomTiles();
showRandomTiles();

for (let r = 0; r < game.length; r++) {
  for (let c = 0; c < game[r].length; c++) {
    let tile = document.createElement("div");
    tile.id = `${r}-${c}`;
    let num = game[r][c];
    updateTile(tile, num);
    gameBoard.appendChild(tile);
  }
}

function updateTile(tile, num) {
  tile.classList.value = "";
  tile.textContent = "";
  tile.classList.add(`tile`);
  if (num <= 4096) {
    tile.classList.add(`x${num}`);
  } else {
    tile.classList.add("x8192");
  }
  if (num > 0) {
    tile.textContent = num;
  }
}

function filterZero(row) {
  row = row.filter((eachNum) => {
    if (eachNum > 0) {
      return true;
    }
  });
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let curRow = game[r];
    curRow = compressSides(curRow);
    game[r] = curRow;
    for (let c = 0; c < columns; c++) {
      let curTile = document.getElementById(`${r}-${c}`);
      updateTile(curTile, game[r][c]);
    }
  }
}

function slideRight() {
  //[2,4,4,2]
  for (let r = 0; r < rows; r++) {
    let curRow = game[r];
    curRow.reverse(); //[2,4,4,2]
    curRow = compressSides(curRow); //[2,8,2,0]
    curRow.reverse();
    game[r] = curRow;
    for (let c = 0; c < columns; c++) {
      let curTile = document.getElementById(`${r}-${c}`);
      updateTile(curTile, game[r][c]);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let curCol = [game[0][c], game[1][c], game[2][c], game[3][c]];
    curCol = compressSides(curCol);
    for (let r = 0; r < rows; r++) {
      game[r][c] = curCol[r];
      let curTile = document.getElementById(`${r}-${c}`);
      updateTile(curTile, game[r][c]);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let curCol = [game[0][c], game[1][c], game[2][c], game[3][c]];
    curCol.reverse();
    curCol = compressSides(curCol);
    curCol.reverse();
    for (let r = 0; r < rows; r++) {
      game[r][c] = curCol[r];
      let curTile = document.getElementById(`${r}-${c}`);
      updateTile(curTile, game[r][c]);
    }
  }
}

function compressSides(row) {
  //[2,2,0,2]
  row = filterZero(row); //[2,2,2]
  for (let i = 0; i < row.length - 1; i++) {
    //i=0 to i=1
    if (row[i] == row[i + 1]) {
      row[i] = row[i] * 2; // 2 and 2 are equal; [4,2,2]
      row[i + 1] = 0; //make integrated number zero; [4,0,2]
      score = score + row[i];
    }
  }
  row = filterZero(row); //remove zeroes again; [4,2]
  while (row.length < columns) {
    row.push(0);
  }
  //add zeroes untill row.length=4; [4,2,0,0]
  scoreEl.textContent = score;
  return row;
}

function gameOver() {
  for (let r = 0; r < rows; i++) {
    for (let c = 0; c < columns; c++) {
      if ((game[r][c] = 0)) {
        return false;
      }
    }
  }
  return true;
}

function showRandomTiles() {
  if (gameOver()) {
    alert("Game Over! Your board is full!");
    return;
  }
  let isFound = false;
  while (!isFound) {
    let randRow = Math.floor(Math.random() * rows);
    let randCol = Math.floor(Math.random * columns);
    if (game[randRow][randCol] === 0) {
      let randTile = document.getElementById(`${randRow}-${randCol}`);
      let numDecision = Math.floor(Math.random * 2);
      numDecision == 0
        ? (game[randRow][randCol] = 2)
        : (game[randRow][randCol] = 4);
      updateTile(randTile, numDecision);
      isFound = true;
    }
  }
}
