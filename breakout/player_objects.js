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
        var b = this.level.this.items[c][r];
        if (this.x > b.x && this.x < (b.x+b.width) &&
            this.y > b.y && this.y < (b.y+b.height)) {
          b.hit();
          this.vy = -this.vy;
          this.scored();
        }
      }
    }

    // check for paddle collison
    if (this.x > this.paddle.x && this.x < (this.paddle.x+this.paddle.width) &&
        this.y > this.paddle.y && this.y < (this.paddle.y+this.paddy.height)) {
      this.vy = -this.vy;
    }

    // checks for collsion with right and left wall
    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx = -this.vx;
    }

    // checks for collsion with top wall
    if (this.y <= 0) {
      this.vy = -this.vy;
    }

    // checks for collsion with bottom wall
    if (this.y > this.canvas.height) {
      this.lives--;
      if(!lives) {
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
