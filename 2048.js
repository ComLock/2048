var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

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
  placeNumber();
  printBoard();
  printSum();
}





var game = new Phaser.Game(590, 590, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var gamesounds;
var isPlaying = 0;
var sounds = [
  'oooo',
  'bad_boy2',
  'jackass',
  'ohh',
  'uh_oh',
  'clueless_whatever',
  'no',
  'oooo',
  'whoops',
  'go_ahead1',
  'oh_my1',
  'ooooh',
  'yaahaha'
];

function preload() {
  sounds.forEach(a => game.load.audio(a, `audio/${a}.wav`));
}


function create() {
  var bg = game.add.graphics();
  bg.beginFill(0x9F6164, 1);
  bg.drawRect(0, 0, 590, 590);

  board = randomizeTiles(4);
  renderTiles(board);
  gamesounds = sounds.map(a => game.add.audio(a));
}

function playRandomSound() {
  gamesounds[Math.round(Math.random() * gamesounds.length) - 1].play();
}

function update() {
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    console.log('left');
    tilt('left');
    gamesounds[0].play();
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    console.log('right');
    tilt('right');
    gamesounds[1].play();
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    console.log('up');
    tilt('up');
    gamesounds[2].play();
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    console.log('down');
    tilt('down');
    gamesounds[3].play();
  }
}

function render() {
  renderTiles(board);
}

function randomizeTiles(size) {
  var defaultVal = 2;
  var tiles = [];

  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row[j] = 0;
    }
    tiles[i] = row;
  }

  var tile1 = randomizeTile(4, tiles);
  tiles[tile1.x][tile1.y] = defaultVal;

  var tile2 = randomizeTile(4, tiles);
  tiles[tile2.x][tile2.y] = defaultVal;

  return tiles;
}

function randomizeTile(size, tiles) {
  var tile;
  do {
    tile = {
      x: randomizeIndex(size),
      y: randomizeIndex(size)
    };
  } while (tiles[tile.x][tile.y] != 0)
  return tile;
}

function randomizeIndex(max) {
  return Math.floor(Math.random() * max);
}

var views = [];
var texts = [];

function renderTiles(tiles) {
  var size = tiles.length;
  var tileSize = 500 / size;

  for (var i = 0; i < tiles.length; i++) {
    var row = tiles[i];
    for (var j = 0; j < row.length; j++) {
      var tile = row[j];

      var viewRow = views[i];
      if (!viewRow) {
        viewRow = [];
        views[i] = viewRow;
      }
      var view = viewRow[j],
        x = 30 + i * (tileSize + 10),
        y = 30 + j * (tileSize + 10);

      if (!view) {
        view = game.add.graphics();
        view.beginFill(0xF8DEBD, 1);
        view.drawRect(x, y, tileSize, tileSize);
        viewRow[j] = view;
      }

      var textRow = texts[i];
      if (!textRow) {
        var textRow = [];
        texts[i] = textRow;
      }

      var text = textRow[j];
      if (tile > 0) {
        if (!text) {
          var style = { font: "bold 32px Arial", fill: "#9F6164", boundsAlignH: "center", boundsAlignV: "middle" };
          var text = game.add.text(x, y, "" + tile, style);
          text.setTextBounds(0, 0, tileSize, tileSize);
          textRow[j] = text;
        } else {
          text.setText("" + tile);
        }
      } else if (!!text) {
        text.destroy();
      }
    }
  }
}
