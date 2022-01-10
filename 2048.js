let counter = document.querySelector(".counter");

let tiles = [
  ".tile11",
  ".tile12",
  ".tile13",
  ".tile14",
  ".tile21",
  ".tile22",
  ".tile23",
  ".tile24",
  ".tile31",
  ".tile32",
  ".tile33",
  ".tile34",
  ".tile41",
  ".tile42",
  ".tile43",
  ".tile44",
];

let field = [
  [".tile11", ".tile12", ".tile13", ".tile14"],
  [".tile21", ".tile22", ".tile23", ".tile24"],
  [".tile31", ".tile32", ".tile33", ".tile34"],
  [".tile41", ".tile42", ".tile43", ".tile44"],
];

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

function isfree(tile) {
  if (tile.textContent) {
    return false;
  } else return true;
}

function freePlaces() {
  let free = [];
  for (let tile of tiles) {
    if (isfree(document.querySelector(tile))) {
      free.push(tile);
    }
  }
  return free;
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomChoice(choice) {
  return choice[getRandom(0, choice.length - 1)];
}

function addTile(free) {
  if (free.length > 0) {
    let tile = document.querySelector(randomChoice(free));
    tile.textContent = randomChoice([2, 2, 2, 2, 2, 2, 2, 2, 2, 4]);
    changeStyle(tile);
  }
}

function clearTile(tile) {
  tile = document.querySelector(tile);
  tile.style.backgroundColor = ""; // '#cdc1b4'
  tile.textContent = "";
}

function replaceTile(i, j, a, b) {
  let newTile = document.querySelector(field[i + a][j + b]);
  let oldTile = document.querySelector(field[i][j]);
  newTile.textContent = oldTile.textContent;
  newTile.style.fontSize = oldTile.style.fontSize;
  changeStyle(newTile);
  clearTile(field[i][j]);
}

function changeStyle(tile) {
  num = Number(tile.textContent);
  if (num <= 4) {
    tile.style.color = "#776E65";
  } else {
    tile.style.color = "#f9f6f2";
  }

  len = num.toString().length;

  if (len < 3) {
    tile.style.fontSize = "55px";
    tile.style.height = "85px";
    tile.style.paddingTop = '25px'
  }
  if (len == 3) {
    tile.style.fontSize = "45px";
    tile.style.height = "80px"
    tile.style.paddingTop = "30px"
  }
  if (len == 4) {
    tile.style.fontSize = "35px";
    tile.style.height = "75px"
    tile.style.paddingTop = "35px"
  }

  if (num == 2) {
    tile.style.backgroundColor = "#eee4da";
  }
  if (num == 4) {
    tile.style.backgroundColor = "#eee1c9";
  }
  if (num == 8) {
    tile.style.backgroundColor = "#f3b27a";
  }
  if (num == 16) {
    tile.style.backgroundColor = "#f69664";
  }
  if (num == 32) {
    tile.style.backgroundColor = "#f77c5f";
  }
  if (num == 64) {
    tile.style.backgroundColor = "#f75f3b";
  }
  if (num == 128) {
    tile.style.backgroundColor = "#edd073";
  }
  if (num == 256) {
    tile.style.backgroundColor = "#edcc62";
  }
  if (num == 512) {
    tile.style.backgroundColor = "#edc950";
  }
  if (num == 1024) {
    tile.style.backgroundColor = "#edc53f";
  }
  if (num == 2048) {
    tile.style.backgroundColor = "#edc22e";
  }
  if (num == 4096) {
    tile.style.backgroundColor = "#eee4da";
  }
}

function solve(i, j, a, b) {
  clearTile(field[i][j]);
  tile = document.querySelector(field[i + a][j + b]);
  tile.textContent = (Number(tile.textContent) * 2).toString();
  counter.textContent = Number(tile.textContent) + Number(counter.textContent);
  changeStyle(tile);
}

function leftswipe() {
  let free;
  let move = false;
  for (let i = 0; i < 4; i++) {
    free = 0;
    for (let j = 0; j < 4; j++) {
      if (isfree(document.querySelector(field[i][j]))) {
        free += 1;
      } else {
        if (free > 0) {
          replaceTile(i, j, 0, -free);
          move = true;
        }
        if (
          j - free > 0 &&
          document.querySelector(field[i][j - free - 1]).textContent ==
            document.querySelector(field[i][j - free]).textContent
        ) {
          solve(i, j - free, 0, -1);
          free += 1;
          move = true;
        }
      }
    }
  }
  if (move) {
    addTile(freePlaces());
  }
}

function rightswipe() {
  let free;
  let move = false;
  for (let i = 0; i < 4; i++) {
    free = 0;
    for (let j = 3; j > -1; j -= 1) {
      if (isfree(document.querySelector(field[i][j]))) {
        free += 1;
      } else {
        if (free > 0) {
          replaceTile(i, j, 0, free);
          move = true;
        }
        if (
          j + free < 3 &&
          document.querySelector(field[i][j + free + 1]).textContent ==
            document.querySelector(field[i][j + free]).textContent
        ) {
          solve(i, j + free, 0, 1);
          free += 1;
          move = true;
        }
      }
    }
  }
  if (move) {
    addTile(freePlaces());
  }
}

function upswipe() {
  let free;
  let move = false;
  for (let j = 0; j < 4; j++) {
    free = 0;
    for (let i = 0; i < 4; i++) {
      if (isfree(document.querySelector(field[i][j]))) {
        free += 1;
      } else {
        if (free > 0) {
          replaceTile(i, j, -free, 0);
          move = true;
        }
        if (
          i - free > 0 &&
          document.querySelector(field[i - free - 1][j]).textContent ==
            document.querySelector(field[i - free][j]).textContent
        ) {
          solve(i - free, j, -1, 0);
          free += 1;
          move = true;
        }
      }
    }
  }
  if (move) {
    addTile(freePlaces());
  }
}

function downswipe() {
  let free;
  let move = false;
  for (let j = 0; j < 4; j++) {
    free = 0;
    for (let i = 3; i > -1; i -= 1) {
      if (isfree(document.querySelector(field[i][j]))) {
        free += 1;
      } else {
        if (free > 0) {
          replaceTile(i, j, free, 0);
          move = true;
        }
        if (
          i + free < 3 &&
          document.querySelector(field[i + free + 1][j]).textContent ==
            document.querySelector(field[i + free][j]).textContent
        ) {
          solve(i + free, j, 1, 0);
          free += 1;
          move = true;
        }
      }
    }
  }
  if (move) {
    addTile(freePlaces());
  }
}
function swipe(event) {
  if (event.key == "ArrowRight" || event.code == 'KeyD') {
    rightswipe();
  }
  if (event.key == "ArrowLeft" || event.code == 'KeyA') {
    leftswipe();
  }
  if (event.key == "ArrowUp" || event.code == 'KeyW') {
    upswipe();
  }
  if (event.key == "ArrowDown" || event.code == 'KeyS') {
    downswipe();
  }
}

addTile(freePlaces());
addTile(freePlaces());

document.addEventListener("keydown", swipe);

// 2 #eee4da
// 4 #eee1c9
// 8 #f3b27a
// 16 #f69664
// 32 #f77c5f
// 64 #f75f3b
// 128 #edd073
// 256 #edcc62
// 512 #edc950
// 1024 #edc53f
// 2048 #edc22e

// #f9f6f2
