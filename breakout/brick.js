class Brick  {
  constructor(row, col, ot, ol, bp, color){

    this.width = 75;
    this.height = 20;

    // console.log(row, col, ot, ol, bp, color);

    this.x = (row*(this.width+bp))+ol;
    this.y = (col*(this.height+bp))+ot;

    this.status = true; // false if destroyed

    this.color = color;
    this.bcolor = "black";
  }

  draw () {
    if (this.status) {
      ctx.fillStyle = this.color;
      ctx.strokestyle = this.bcolor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  hit () {
    this.status = false;
  }
}

class Level {
  constructor (canvas) {
    this.canvas = canvas;

    // distance of bricks to the left and top wall
    this.offset_top = 30;
    this.offset_left = 30;

    // distance between individual bricks
    this.bpadding = 10;

    // list containing all existing (not destroyed) bricks
    this.items = [];
  }

  load_lvl1 () {
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

  draw () {
    for (var c = 0; c < this.items.length; c++) {
      for (var r = 0; r < this.items[c].length; r++) {
        var b = this.items[c][r];
        //console.log(b);
        b.draw();
      }
    }
  }

  empty () {
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
