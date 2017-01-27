#!/usr/bin/env node

var board = [
  [ 0, 0, 0, 0],
  [ 0, 2, 0, 0],
  [ 0, 0, 0, 0],
  [ 0, 0, 2, 0],
];

/* TODO:

  * Find a random free cell and place a number 2 into it
  * Place two number 2 at random cells
  * Tilt the board
  * Move and merge brick
  * Flytte, merge, stå stille

*/

function moveRight(x,y) {
  var value = board[x][y];
  if(value === 0) { return; } // Is zero do nothing
  if(board[x+1][y] === value) { // Merge
    board[x][y] = 0;
    board[x+1][y] = 2*value;
  } else if (board[x+1][y] === 0) { // Next is zero so move
    board[x][y] = 0;
    board[x+1][y] = value;
  }
  // else Can't move
}

function tilt(direction) {
  // Start with right to see the math
  // Start with row 1
  // Start with the rightmost cell
  // Check if 0,
  // Multiple passes
  board.forEach(row, y => {
    row.forEach(value, x) {
      moveRight(x,y);
    }
  });
  console.log(JSON.stringify(board, null, 4));
}
