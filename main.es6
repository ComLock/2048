#!/usr/bin/env node

var board = [
  [ 2, 2, 2, 2 ],
  [ 2, 2, 2, 2 ],
  [ 2, 2, 2, 2 ],
  [ 2, 2, 2, 2 ],
];

/* TODO:
  * Find a random free cell and place a number 2 into it
  * Place two number 2 at random cells
*/

function moveUp(x,y) {
  var value = board[y][x];
  if(value === 0) { return; } // Is zero do nothing
  if(y===0) { return; } // Already in upmost position, do nothing
  if(board[y-1][x] === value) { // Merge
    board[y][x] = 0;
    board[y-1][x] = 2*value;
  } else if (board[y-1][x] === 0) { // Next is zero so move
    board[y][x] = 0;
    board[y-1][x] = value;
  }
  // else Can't move
}


function moveDown(x,y) {
  var value = board[y][x];
  if(value === 0) { return; } // Is zero do nothing
  if(y===3) { return; } // Already in downmost position, do nothing
  if(board[y+1][x] === value) { // Merge
    board[y][x] = 0;
    board[y+1][x] = 2*value;
  } else if (board[y+1][x] === 0) { // Next is zero so move
    board[y][x] = 0;
    board[y+1][x] = value;
  }
  // else Can't move
}


function moveRight(x,y) {
  var value = board[y][x];
  if(value === 0) { return; } // Is zero do nothing
  if(x===3) { return; } // Already in rightmost position, do nothing
  if(board[y][x+1] === value) { // Merge
    board[y][x] = 0;
    board[y][x+1] = 2*value;
  } else if (board[y][x+1] === 0) { // Next is zero so move
    board[y][x] = 0;
    board[y][x+1] = value;
  }
  // else Can't move
}

function moveLeft(x,y) {
  var value = board[y][x];
  if(value === 0) { return; } // Is zero do nothing
  if(x===0) { return; } // Already in leftmost position, do nothing
  if(board[y][x-1] === value) { // Merge
    board[y][x] = 0;
    board[y][x-1] = 2*value;
  } else if (board[y][x-1] === 0) { // Next is zero so move
    board[y][x] = 0;
    board[y][x-1] = value;
  }
  // else Can't move
}

function processRow(y, direction) {
  [0,1,2,3].forEach(x => {
    direction === 'right' && moveRight(x,y) || moveLeft(x,y);
  });
}

function processColumn(x, direction) {
  [0,1,2,3].forEach(y => {
    direction === 'up' && moveUp(x,y) || moveDown(x,y);
  });
}

function tilt(direction) {
  if(direction === 'left' || direction == 'right') {
    [0,1,2,3].forEach(y => {
      processRow(y, direction);
      processRow(y, direction);
      processRow(y, direction);
    });
  } else {
    [0,1,2,3].forEach(x => {
      processColumn(x, direction);
      processColumn(x, direction);
      processColumn(x, direction);
    });
  }
}

console.log(JSON.stringify(board, null, 4));
tilt('up');
tilt('right');
tilt('down');
tilt('left');
console.log(JSON.stringify(board, null, 4));
