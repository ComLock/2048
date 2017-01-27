#!/usr/bin/env node


var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

function randomizeIndex(max) {
  return Math.round(Math.random() * max);
}

function randomizeTile(size, tiles) {
  var tile;
  do {
    tile = {
      x: randomizeIndex(size),
      y: randomizeIndex(size)
    };
  } while (tiles[tile.x][tile.y] != 0);
  return tile;
}

function isHorizontal(direction) {
  return direction === 'left' || direction === 'right' ? true : false;
}

function isVertical(direction) {
  return direction === 'up' || direction === 'down' ? true : false;
}

function move(direction, x, y) {
  var value = board[y][x];
  if (value === 0) {
    return;
  } // Is zero do nothing
  var bounds = direction === 'left' || direction === 'up' ? 0 : 3;
  if (isHorizontal(direction) && x === bounds || isVertical(direction) && y === bounds) {
    return;
  } // Already on edge, do nothing
  var nextX = isHorizontal(direction) ? direction === 'left' ? x - 1 : x + 1 : x;
  var nextY = isVertical(direction) ? direction === 'up' ? y - 1 : y + 1 : y;
  if (board[nextY][nextX] === value) {
    // Merge
    board[y][x] = 0;
    board[nextY][nextX] = 2 * value;
    console.log(`MERGE: direction:${direction} bounds:${bounds} x:${x} y:${y} nextX:${nextX} nextY:${nextY}`);
    //printBoard();
  } else if (board[nextY][nextX] === 0) {
    // Next is zero so move
    board[y][x] = 0;
    board[nextY][nextX] = value;
    console.log(`MOVE: direction:${direction} bounds:${bounds} x:${x} y:${y} nextX:${nextX} nextY:${nextY}`);
    //printBoard();
  }
  // else Can't move
}

function processRow(y, direction) {
  [0, 1, 2, 3].forEach(x => {
    move(direction, x, y);
    //direction === 'right' && moveRight(x,y) || moveLeft(x,y);
  });
}

function processColumn(x, direction) {
  [0, 1, 2, 3].forEach(y => {
    move(direction, x, y);
    //direction === 'up' && moveUp(x,y) || moveDown(x,y);
  });
}

function printBoard() {
  board.forEach((row, y) => {
    console.log(board[y].join(', '));
  });
}

function sumBoard() {
  return [].concat.apply([], board).reduce((a, b) => a + b);
}

function printSum() {
  console.log(`Sum: ${sumBoard()}`);
}

function placeNumber() {
  const coord = randomizeTile(4, board);
  board[coord.x][coord.y] = 2;
}

function processA(direction, a) {
  [0, 1, 2, 3].forEach(b => {
    if (isHorizontal(direction)) {
      move(direction, b, a);
    } else {
      move(direction, a, b);
    }
  });
}

function tilt(direction) {
  console.log(`Tilting ${direction}`);
  [0, 1, 2, 3].forEach(a => {
    processA(direction, a);
    processA(direction, a);
    processA(direction, a);
  });
  //placeNumber();
  printBoard();
  printSum();
}

printBoard();
printSum();
placeNumber();
placeNumber();
printBoard();
printSum();
tilt('up');
tilt('right');
tilt('down');
tilt('left');

