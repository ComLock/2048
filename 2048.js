var game = new Phaser.Game(590, 590, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var board;
var tiles;
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
  board = new Phaser.Rectangle(0, 0, 590, 590);
  tiles = randomizeTiles(4);
  renderTiles(tiles);
  gamesounds = sounds.map(a => game.add.audio(a));
}

function playRandomSound() {
    gamesounds[Math.round(Math.random() * gamesounds.length)-1].play();
}

function update() {
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    console.log('left');
    //tilt('left');
    gamesounds[0].play();
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    console.log('right');
    //tilt('right');
    gamesounds[1].play();
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    console.log('up');
    //tilt('up');
    gamesounds[2].play();
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    console.log('down');
    //tilt('down');
    gamesounds[3].play();
  }
}

function render() {
  game.debug.geom(board, '#9F6164');
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

  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
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
  } while (tiles[tile.x][tile.y] != 0)
  return tile;
}

function randomizeIndex(max) {
  return Math.floor(Math.random() * max);
}

var views = [];

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
      var view = viewRow[j];
      if (!view) {
        var x = 30 + i * (tileSize + 10),
          y = 30 + j * (tileSize + 10);
        view = new Phaser.Rectangle(x, y, tileSize, tileSize);
        if (tile > 0) {
          var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
          var text = game.add.text(x, y, "" + tile, style);
          text.setTextBounds(x, y, tileSize, tileSize);
        }
        viewRow[j] = view;
      } else {

      }
      game.debug.geom(view, '#F8DEBD');
    }
  }
}
