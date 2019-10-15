// necessary scripts are being loaded by "scripts.js"

const GAME_SPEED = 20;
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = "lightgrey";

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var level = new Level(canvas);
level.load_lvl1();
var paddle = new Paddle(canvas, level);
var ball = new Ball(canvas, level, paddle);

// ----------------------------------------------

document.addEventListener("mousemove", action_mousemove, false);

function action_mousemove(event) {
  var relX = event.clientX - canvas.offsetLeft;
  if(relX > 0 && relX < canvas.width) {
    paddle.x = relX - paddle.width/2;
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+ ball.score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+ ball.lives, canvas.width-65, 20);
}

function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = CANVAS_BORDER_COLOR;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// ----------------------------------------------

var running = true;

main();

function main() {

  if (!running) return;
  setTimeout(function onTick() {
    clearCanvas();

    level.draw();

    paddle.draw();

    ball.update();
    ball.draw();

    drawScore();
    drawLives();

    main();
  }, GAME_SPEED)
}
