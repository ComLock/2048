var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var board;
var tiles;

function preload() {
}

function create() {
  board = new Phaser.Rectangle(50, 50, 500, 500);
  tiles = randomizeTiles(4);
}

function update() {
}

function render() {
  game.debug.geom(board, '#0fffff');
  renderTiles(tiles);
}

function randomizeTiles(size) {
  var defaultVal = 2;
  var tiles = [];
  var tile1 = {
    x: randomizeIndex(size),
    y: randomizeIndex(size)
  };
  var tile2;
  do {
    tile2 = {
      x: randomizeIndex(size),
      y: randomizeIndex(size)
    };
  } while (tile1.x == tile2.x && tile1.y == tile2.y)

  for (var i = 0; i++; i < size) {
    var row = [];
    for (var j = 0; j++; j < size) {
      row[j] = tile1.x == i && tile1.y == j || tile2.x == i && tile2.y == j ? defaultVal : 0
    }
    tiles[i] = row;
  }
  return tiles;
}

function randomizeTile(size, tiles) {
  var tile;
  do {
    tile = {
      x: randomizeIndex(size),
      y: randomizeIndex(size)
    };
  } while (tiles[tile.x][tile.y] == 0)
  return tile;
}

function randomizeIndex(max) {
  return Math.round(Math.random() * max);
}

var views = [];

function renderTiles(tiles) {
  var size = tiles.length;
  var tileSize = 500 / size;
  for (var i = 0; i++; i < tiles.length) {
    for (var j = 0; j++; j < row.length) {
      var tile = tiles[i][j];
      var view = views[i][j];
      if (!view) {
        var text = new Phaser.Text(tile);
        var bg = new Phaser.Rectangle(50 + i * tileSize, 50 + j * tileSize, tileSize, tileSize);
        view = game.add.group();
        view.add(bg);
        view.add(text);
      } else {

      }
    }
  }
}