export class Surface {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.colorkey;
  }

  // draw an image onto the surface
  draw (obj) {
    this.ctx.fillstyle = obj.color.get_rgb();
    this.ctx.fillrect(obj.rect.x, obj.rect.y, obj.rect.width, obj.rect.height);
  }

  // fill the surface with a solid color
  fill (color, rect=undefined) {
    if (rect == undefined) {
      rect = this.get_rect();
    }

    this.ctx.fillstyle = color.get_rgb();
    this.ctx.fillrect(rect.x, rect.y, rect.width, rect.height);
  }

  // shift the surface image in place
  scroll () {
    return;
  }

  // set the transparent colorkey
  set_colorkey (color) {
    this.colorkey = color;
  }

  // get the current transparent colorkey
  get_colorkey () {
    return this.colorkey;
  }

  // get the dimensions of the Surface
  get_size () {
    return [this.width, this.height];
  }

  // get the width of the Surface
  get_width () {
    return this.width;
  }

  // get the height of the Surface
  get_height () {
    return this.height;
  }

  // get the rectangular area of the Surface
  get_rect () {
    return new Rect(0, 0, this.width, this.height);
  }
}

export class Rect {
  constructor (left, top, width, height) {
    this.x = left;
    this.y = top;
    this.width = width;
    this.height = height;
  }

  // returns x value of top right corner
  get_topright () {
    return this.x+this.width;
  }

  // returns y value of bottom left corner
  get_bottomleft () {
    return this.y+this.height;
  }

  // returns new, moved rectangle
  move (dx, dy) {
    return new Rect(this.x+dx, this.y+dy, this.width, this. height);
  }

  // moves the rectangle, in place
  move_ip (dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  // grow or shrink the rectangle size
  inflate (x, y) {
    return new Rect(this.x-x/2, this.y-y/2, this.width+x, this.y+y);
  }

  // grow or shrink the rectangle size, in place
  inflate_ip (x, y) {
    this.x -= x/2;
    this.y -= y/2;
    this.width += x;
    this.height += y;
  }

  // correct negative sizes
  normalize () {
    if (this.width < 0) {
      this.width = -this.width;
    }
    if (this.height < 0) {
      this.height = -this.height;
    }
  }

  // test if one rectangle is inside another
  contains (rect) {
    if (rect.x >= this.x && rect.get_topright() <= get_topright() &&
        rect.y >= this.y && rect.get_bottomleft() <= this.get_bottomleft()) {
      return true;
    } else {
      return false;
    }
  }

  // test if a point is inside a rectangle
  collidepoint (x, y) {
    if (x >= this.x && x <= this.get_topright() && y >= this.y && y <= this.get_bottomleft()) {
      return true;
    } else {
      return false;
    }
  }

  // test if two rectangles overlap
  collliderect (rect) {
    ax1 = this.x;
    ax2 = this.get_topright();
    ay1 = this.y;
    ay2 = this.get_bottomleft();

    bx1 = rect.x;
    bx2 = rect.get_topright();
    by1 = rect.y;
    by2 = rect.get_bottomleft();

    if (ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1) {
      return true;
    } else {
      return false;
    }
  }
}

export class Color {
  constructor (r, g, b) {

    // ensure minimum of 0 and maximum of 255
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] < 0) {
        arguments[i] = 0;
      }
      if (arguments[i] > 255) {
        arguments[i] = 255;
      }
    }

    // ensure integer type and assign value
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
  }

  // get the color as a css rgb color "rgb(r, g, b)"
  get_rgb () {
    return "rgb(" + this.r +
           ", " + this.g +
           ", " + this.b + ")";
  }
}
