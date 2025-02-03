let gameBoard = document.getElementById("gameboard");

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    slideLeft();
  }
});

let game = [
  [2, 2, 0, 2],
  [1024, 1024, 1024, 1024],
  [64, 64, 128, 128],
  [64, 64, 128, 128],
];

let rows = game.length;
let columns = game[0].length;
let score = 0;

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
    console.log(curRow);
    for (let c = 0; c < columns; c++) {
      let curTile = document.getElementById(`${r}-${c}`);
      updateTile(curTile, game[r][c]);
      console.log(curTile);
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
  return row;
}
