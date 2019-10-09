const = GAME_SPEED = 100;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const BALL_COLOR = 'red';
const BALL_BORDER_COLOR = 'darkred';
const PADDLE_COLOR = 'blue';
const PADDLE_BORDER_COLOR = 'darkblue';

// Ball class; one instance will be created
function Ball(posx, posy, vx, vy, color, border_color) {

  this.width = 10;
  this.height = 10;

  this.x = Math.floor(posx-this.width/2);
  this.y = Math.floor(posy-this.height/2);

  this.vx = vx;
  this.vy = vy;

  this.color = color;
  this.bcolor = border_color;

  this.move = function () {
    this.x += this.vx;
    this.y += this.vy;
  }

  this.change_direction = function (vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  this.get_color = function () {
    return this.color;
  }
  this.get_bcolor = function () {
    return this.border_color;
  }

  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.strokestyle= this.bcolor;
    ctx.fillRect(this.x, this.x, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  this.update = function () {
    // check if the ball is still within the bounds

    //if the ball left the bounds to the north or south, the game is over
    if (this.y < 0 || this.y > gameCanvas.height) {
      return false;
    } else {
      this.move();
      return true;
    }
  }
}

// Paddle class; two instances will be created, one for each player/side
function Paddle(posx, color, bcolor) {

  this.width = 30;
  this.height = 300;

  this.x = posx;
  this.y = 0;
  this.color = color;
  this.bcolor = bcolor;

  this.move = function (mx, my) {
    this.x += mx;
    this.y += my;
  }

  this.get_color = function () {
    return this.color;
  }
  this.get_bcolor = function () {
    return this.border_color;
  }

  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.strokestyle= this.bcolor;
    ctx.fillRect(this.x, this.x, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  this.scored = function () {
    this.score += 1;
    console.log("x: " + this.x + "; score: " + this.score);
  }
}

// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");

var score_l = 0;
var score_r = 0;

var ball = Ball(gameCanvas.width/2, gameCanvas.height/2,
                1, 0, BALL_COLOR, BALL_BORDER_COLOR);

var paddle_l = Paddle(0, PADDLE_COLOR, PADDLE_BORDER_COLOR);
var paddle_r = Paddle(gameCanvas.width-this.width, PADDLE_COLOR, PADDLE_BORDER_COLOR);

//--------------------------------------------------------------

main();

function main() {
  setTimeout(function onTick() {
    clearCanvas();

    ball.update();
    ball.draw();

    paddle_l.draw();
    paddle_r.draw();

    main();
  }, GAME_SPEED)
}

function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = CANVAS_BORDER_COLOUR;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
