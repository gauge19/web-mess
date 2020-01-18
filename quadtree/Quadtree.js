class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; // center of rectangle
    this.y = y; // center of rectangle
    this.w = w; // half length of width
    this.h = h; // half length of height
  }

  get left() {
    return this.x-this.w;
  }
  get right() {
    return this.x+this.w;
  }
  get top() {
    return this.y-this.h;
  }
  get bottom() {
    return this.y+this.h;
  }

  get topleft() {
    return this.top, this.left;
  }

  draw(context, color="white", weight="2") {
    context.beginPath();
    context.lineWidth = weight;
    context.strokeStyle = color;
    context.rect(this.left, this.top, this.w*2, this.h*2);
    context.stroke();
  }

  // checks whether a given point lies within this rectangle
  contains(point) {
    return (point.x >= this.left &&
            point.x <= this.right &&
            point.y >= this.top &&
            point.y <= this.bottom);
  }

  // checks for an intersection between two rectangles
  intersects(rect) {
    return !(rect.left > this.right ||
           rect.right < this.left ||
           rect.top > this.bottom ||
           rect.bottom < this.top);
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  // returns x axis distance between the centers of obj and this
  distX(obj) {
    return Math.abs(obj.x - this.x);;
  }

  // returns x axis distance between the centers of obj and this
  distY(obj) {
    return Math.abs(obj.y - this.y);;
  }

  // returns eukledian distance between the centers of obj and this
  dist(obj) {
    return Math.sqrt(Math.pow(this.distX(obj), 2) + Math.pow(this.distY(obj), 2));
  }

  // checks whether a given point lies within this circle
  contains(point) {
    // distance between point and center must be less than (or equal to) the radius to be within
    return (this.dist(point) <= this.r);
  }

  // checks for an intersection between a rectangle and this
  intersects(rect) {
    // x and y value for point in rectangle closest to center of circle
    var dX = Math.max(rect.left, Math.min(this.x, rect.right));
    var dY = Math.max(rect.top, Math.min(this.y, rect.bottom));

    //drawPoint(dX, dY); // debugging

    return this.contains(new Point(dX, dY));
  }

  draw(context, color="white") {
    context.beginPath();
    context.strokeStyle = color;
    context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    context.stroke();
  }
}

class Point {
  constructor(x, y, data=undefined) {
    this.x = x;
    this.y = y;
    this.userData = data;
  }
}

class Quadtree {
  constructor(boundary, capacity=4) {
    // check for correct input
    if (!boundary) {
      throw TypeError('boundary is null or undefined');
    }
    if (!(boundary instanceof Rectangle)) {
      throw TypeError('boundary should be a Rectangle');
    }
    if (typeof capacity !== 'number') {
      throw TypeError(`capacity should be a number but is a ${typeof capacity}`);
    }
    if (capacity < 1) {
      throw RangeError('capacity must be greater than 0');
    }

    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
    this.children = [];
  }

  // insert a point into the quadtree
  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity && !this.divided) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    for (var child of this.children) {
      if (child.insert(point)) {
        return true;
      }
    }

    console.log("error inserting point");
    return false;
  }

  subdivide() {
    let w = this.boundary.w/2;
    let h = this.boundary.h/2;

    let nw = new Rectangle(this.boundary.x - w, this.boundary.y - h, w, h);
    let ne = new Rectangle(this.boundary.x + w, this.boundary.y - h, w, h);
    let sw = new Rectangle(this.boundary.x - w, this.boundary.y + h, w, h);
    let se = new Rectangle(this.boundary.x + w, this.boundary.y + h, w, h);

    this.children.push(new Quadtree(nw, this.capacity));
    this.children.push(new Quadtree(ne, this.capacity));
    this.children.push(new Quadtree(sw, this.capacity));
    this.children.push(new Quadtree(se, this.capacity));

    this.divided = true;
  }

  query(rect) {
    let results = [];

    if (!this.boundary.intersects(rect)) {
      return results;
    }

    for (var point of this.points) {
      if (rect.contains(point)) {
        results.push(point);
      }
    }

    if (!this.divided) {
      return results;
    } else {
      for (var child of this.children) {
        results.push(...child.query(rect));
      }
    }

    return results;
  }

  drawPoints() {
    for (var point of this.points) {
      drawPoint(point.x, point.y);
      //console.log("point drawn");
    }

    if (this.divided) {
      for (var child of this.children) {
        child.drawPoints();
      }
    }
  }

  draw(context) {
    //console.log(this.boundary instanceof Rectangle);
    this.boundary.draw(context);
    if (this.divided) {
      for (var child of this.children) {
        child.draw(context);
      }
    }
  }

}

// draws circle at the coordinates of x and y
function drawPoint(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x, y, 5, 0, 2*Math.PI);
  ctx.fill();
}
