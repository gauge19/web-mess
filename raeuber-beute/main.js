// import * as jsGame from "./jsGame/main.py";

const GAME_SPEED = 20;
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = "lightgrey";

var canvas = document.getElementById("gameCanvas");
var surface = new jsgame.Surface(canvas);

var s = new sprite.Sprite(0, 0, 100, 100);
var g = new sprite.Group();
g.add(s);

var running = true;

main();

function main() {

  if (!running) return;
  setTimeout(function onTick() {
    surface.fill(CANVAS_BACKGROUND_COLOR);

    g.update();
    g.draw(surface);

    main();
  }, GAME_SPEED)
}
