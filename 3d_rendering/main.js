const GAME_SPEED = 30;
const CANVAS_BACKGROUND_COLOR = "black";
const CANVAS_BORDER_COLOR = "grey";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

var running = true;
main();

document.addEventListener("keydown", event_keypress);

var v1 = new Vertex();
var m1 = new Matrix();
m1.fill("random");
console.log("m1: " + m1._m);

var r = 5;
var centerx = gameCanvas.width/2;
var centery = gameCanvas.height/2;
var cube = 80;

var points = [new Vertex(centerx-cube/2, centery-cube/2, cube/2),
              new Vertex(centerx-cube/2, centery+cube/2, cube/2),
              new Vertex(centerx+cube/2, centery-cube/2, cube/2),
              new Vertex(centerx+cube/2, centery+cube/2, cube/2),

              new Vertex(centerx-cube/2, centery-cube/2, -cube/2),
              new Vertex(centerx-cube/2, centery+cube/2, -cube/2),
              new Vertex(centerx+cube/2, centery-cube/2, -cube/2),
              new Vertex(centerx+cube/2, centery+cube/2, -cube/2)];

function drawPoint(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.fill();
  //ctx.endPath();
}

function main() {
  setTimeout(function onTick() {
    clearCanvas();

    for (point of points) {
      drawPoint(point.x, point.y);
    }

    main();
  }, GAME_SPEED)
}

function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = CANVAS_BORDER_COLOR;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function event_keypress(event) {
  /*
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  const A_KEY = 65;
  const D_KEY = 68;
  */

  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const W_KEY = 87;
  const S_KEY = 83;

  const keyPressed = event.keyCode;

  //console.log(keyPressed);

  if (keyPressed === UP_KEY) {
    pr.move(-MOVE_SPEED);
  }
  if (keyPressed === DOWN_KEY) {
    pr.move(MOVE_SPEED);
  }
  if (keyPressed === W_KEY) {
    pl.move(-MOVE_SPEED);
  }
  if (keyPressed === S_KEY) {
    pl.move(MOVE_SPEED);
  }
}
