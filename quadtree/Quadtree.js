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

  // returns eukledian distance SQUARED between other point and this
  dist2(other) {
    let distX = Math.abs(other.x - this.x);
    let distY = Math.abs(other.y - this.y);
    return Math.pow(distX, 2) + Math.pow(distY, 2);
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

  // length of this node and all of its children combined
  get length() {
    let count = this.points.length;
    if (this.divided) {
      for (var child of this.children) {
        count += child.length;
      }
    }
    return count;
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

  query(range) {
    let results = [];

    if (!range.intersects(this.boundary)) {
      return results;
    }

    for (var point of this.points) {
      if (range.contains(point)) {
        results.push(point);
      }
    }

    if (!this.divided) {
      return results;
    } else {
      for (var child of this.children) {
        results.push(...child.query(range));
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
    this.drawPoints();
  }

  find_closest(point, count) {
    console.log(point instanceof Point);
    // if quad has been divided before, check its children
    if (this.divided) {
      for (var child of this.children) {
        // if child contains point in its borders
        if (child.boundary.contains(point)) {
          // if child has more than 'count' items within its boundary
          if (child.length > count) {
            // continue searching children
            return (child.find_closest(point, count));
          } else {
            // return all points within this quad and its children which in total is less than 'count'
            return this.query(this.boundary); // return all points within this quadrant
          }
        }
      }
    } else {
      return this.points;
    }
  }

  closest(point, count=1) {
    let closest = this.find_closest(point, count);
    closest.sort(function(a, b) {
      let k1 = a.dist2(point);
      let k2 = b.dist2(point);
      if (k1> k2) {
        return 1;
      } else if (k2 > k1) {
        return -1;
      } else {
        return 0;
      }
    })
    console.log(closest);
    return closest;
  }

}

// draws circle at the coordinates of x and y
function drawPoint(x, y, r=3, color="red") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.fill();
}
