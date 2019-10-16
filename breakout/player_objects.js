class RectangularObject {
  constructor () {
    this.x;
    this.y;
    this.width;
    this.height;
  }

  collide (obj) {
    var ax1 = this.x;
    var ay1 = this.y;
    var ax2 = this.x+this.width;
    var ay2 = this.y+this.height;

    var bx1 = obj.x;
    var by1 = obj.y;
    var bx2 = obj.x+obj.width;
    var by2 = obj.y+obj.height;

    if (ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1) {
      return true;
    } else {
      return false;
    }
  }
}

class Ball extends RectangularObject {
  constructor(canvas, lvl, paddle) {
    super();
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
  }

  scored () {
    this.score++;
    if (this.level.empty()) {
      alert("YOU WIN, CONGRATS!");
      document.location.reload();
    }
  }

  update () {
    this.x += this.vx;
    this.y += this.vy;

    this.collision_check();
  }

  collision_check () {
    // checks for collsion with every brick
    for (var c = 0; c < this.level.items.length; c++) {
      for (var r = 0; r < this.level.items[c].length; r++) {
        var b = this.level.items[c][r];
        if (b.status) {
          if (super.collide(b)) {
            b.hit();
            this.vy = -this.vy;
            this.scored();
          }
        }
      }
    }

    // check for paddle collison ("top" and "left" sides of the ball)
    if (super.collide(this.paddle)) {
      this.vy = -this.vy;
    }

    // checks for collsion with right and left wall
    if (this.x <= 0 || this.x+this.width >= this.canvas.width) {
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

  draw () {
    var c = [this.x+(this.width/2), this.y+(this.height/2)];

    ctx.fillStyle = this.color;
    ctx.strokestyle = this.bcolor;

    ctx.beginPath();
    ctx.arc(c[0], c[1], this.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // draw rectangle shape around circle, for debugging
    /*
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x+this.width, this.y);
    ctx.lineTo(this.x+this.width, this.y+this.height);
    ctx.lineTo(this.x, this.y+this.height);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.strokestyle = "red";
    ctx.stroke();
    */
  }
}

class Paddle extends RectangularObject {
  constructor (canvas, lvl) {
    super();

    this.canvas = canvas;
    this.lvl = lvl;

    this.width = 75;
    this.height = 10;

    this.ox = (this.canvas.width-this.width)/2;

    this.x = this.ox;
    this.y = this.canvas.height-this.height;

    this.color = "red";
    this.bcolor = "black";
  }

  draw () {
    ctx.fillStyle = this.color;
    ctx.strokestyle = this.bcolor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
