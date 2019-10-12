function Brick(row, col, ot, ol, bp, color){

  this.width = 75;
  this.height = 20;

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

  this.collide = function (obj) {
    if (obj.x > this.x && obj.x < (this.x+this.width) &&
        obj.y > this.y && obj.y < (this.y+this.height)) {
      this.status = false;
      obj.vy = -obj.vy;
      obj.scored();
    }
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
                                     this.brickpadding, color);
      }
    }
  }

  this.draw = function () {
    for (var c = 0; c < this.items.length; c++) {
      for (var r = 0; r < this.items[c].length; r++) {
        this.items[c][r].draw();
      }
    }
  }

  this.empty = function () {
    if (this.items.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
