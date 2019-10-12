//import {Level} from "brick";
//import {Ball, Paddle} from"player_objects";

function Brick(row, col, ot, ol, bp, color){

  this.width = 75;
  this.height = 20;

  // console.log(row, col, ot, ol, bp, color);

  this.x = (row*(this.width+bp))+ol;
  this.y = (col*(this.height+bp))+ot;

  this.status = true; // false if destroyed

  this.color = color;
  this.bcolor = "black";

  this.draw = function () {
    if (this.status) {
      ctx.fillStyle = this.color;
      ctx.strokestyle = this.bcolor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  this.hit = function () {
    this.status = false;
  }
}

function Level(canvas) {

  this.canvas = canvas;

  // distance of bricks to the left and top wall
  this.offset_top = 30;
  this.offset_left = 30;

  // distance between individual bricks
  this.bpadding = 10;

  // list containing all existing (not destroyed) bricks
  this.items = [];

  this.load_lvl1 = function () {
    var color = "lightblue";

    var rows = 5;
    var cols = 3;

    for (var c = 0; c < cols; c++) {
      this.items[c] = [];
      for (var r = 0; r < rows; r++) {
        this.items[c][r] = new Brick(r, c, this.offset_top, this.offset_left,
                                     this.bpadding, color);
      }
    }
  }

  this.draw = function () {
    for (var c = 0; c < this.items.length; c++) {
      for (var r = 0; r < this.items[c].length; r++) {
        var b = this.items[c][r];
        //console.log(b);
        b.draw();
      }
    }
  }

  this.empty = function () {
    // check if there are bricks left
    for (var c = 0; c < this.items.length; c++) {
      for (var r = 0; r < this.items[c].length; r++) {
        var b = this.items[c][r];
        if (b.status) {
          return false;
        }
      }
    }
    return true;
  }
}

function Ball(canvas, lvl, paddle) {
  this.canvas = canvas;
  this.level = lvl;
  this.paddle = paddle;

  this.score = 0;
  this.lives = 3;

  this.ox = Math.floor(this.canvas.width/2);
  this.oy = this.canvas.height-30;

  this.x = this.ox;
  this.y = this.oy;

  this.vx = 2;
  this.vy = -2;

  this.radius = 10;

  this.width = this.radius*2;
  this.height = this.width;

  this.color = "darkgreen";
  this.bcolor = "black";

  this.scored = function () {
    this.score++;
    if (this.level.empty()) {
      alert("YOU WIN, CONGRATS!");
      document.location.reload();
    }
  }

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    this.collide();
  }

  this.collide = function () {
    // checks for collsion with every brick
    for (var c = 0; c < this.level.items.length; c++) {
      for (var r = 0; r < this.level.items[c].length; r++) {
        var b = this.level.items[c][r];
        if (b.status) {
          if (this.x > b.x && this.x < (b.x+b.width) &&
              this.y > b.y && this.y < (b.y+b.height)) {
            b.hit();
            this.vy = -this.vy;
            this.scored();
          }
        }
      }
    }

    // check for paddle collison
    if (this.x > this.paddle.x && this.x < (this.paddle.x+this.paddle.width) &&
        this.y > this.paddle.y && this.y < (this.paddle.y+this.paddle.height)) {
      this.vy = -this.vy;
    }

    // checks for collsion with right and left wall
    if (this.x <= 0 || this.x >= this.canvas.width) {
      this.vx = -this.vx;
    }

    // checks for collsion with top wall
    if (this.y <= 0) {
      this.vy = -this.vy;
    }

    // checks for collsion with bottom wall
    if (this.y > this.canvas.height) {
      this.lives--;
      if(!this.lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        this.x = this.ox;
        this.y = this.oy;
        this.vx = 3;
        this.vy = -3;
        this.paddle.x = this.paddle.ox;
      }
    }
  }

  this.draw = function () {
    var c = [this.x+(this.width/2), this.y+(this.height/2)];

    ctx.fillStyle = this.color;
    ctx.strokestyle = this.bcolor;

    ctx.beginPath();
    ctx.arc(c[0], c[1], this.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

function Paddle(canvas, lvl) {
  this.canvas = canvas;
  this.lvl = lvl;

  this.width = 75;
  this.height = 10;

  this.ox = (this.canvas.width-this.width)/2;

  this.x = this.ox;
  this.y = this.canvas.height-this.height;

  this.color = "red";
  this.bcolor = "black";

  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.strokestyle = this.bcolor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

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
