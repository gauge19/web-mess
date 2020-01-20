class Vector2 {
  constructor(x=0, y=0) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

  set x(value) {
    this._x = value;
  }
  set y(value) {
    this._y = value;
  }

  log() {
    console.log("Vector x: " + this.x + ", y: " + this.y);
  }

  toString() {
    return "x: " + this.x + ", y: " + this.y;
  }

  /**
   * Adds another vector to this one (in place)
   * @param {Object:Vector2} - Vector to be added
   */
  add_ip(v) {
    this.x += v.x;
    this.y += v.y;
  }

  /**
   * Subtracts another vector to this one (in place)
   * @param {Object:Vector2} - Vector to be subtracted
   */
  sub_ip(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  /**
   * Returns new vector with a sclar multiplied to this vector
   * @param {number} - number to be multiplied by
   */
  mult(scalar) {
    return new Vector2(this.x*scalar, this.y*scalar);
  }

  /**
   * Multiplies a scalar to this vector (in place)
   * @param {number} - number to be multiplied by
   */
  mult_ip(scalar) {
    this.x*=scalar;
    this.y*=scalar;
  }

  cross(v) {
    return this.x*v.y-this.y*v.x;
  }
}

class Blob {
  constructor(x, y, diameter=20) {
    this.pos = new Vector2(x, y); // position in the map
    this.r = diameter/2;

    this.direction = new Vector2(0, 0);
    this.vel = 0.2;

    this.target = {x:this.pos.x, y:this.pos.y};
  }

  get x() {
    return this.pos.x;
  }
  get y() {
    return this.pos.y;
  }
  set x(v) {
    this.pos.x = v;
  }
  set y(v) {
    this.pos.y = v;
  }

  /**
   * returns true if center of other blob object is within this blobs circle
   * @param {Object} other - other blob object to check against
   */
  contains(other) {
    let distx = Math.abs(other.x - this.x);
    let disty = Math.abs(other.y - this.y);
    let dist = Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));

    return dist < this.r;
  }

  track() {
    if (this.x == this.target.x && this.y == this.target.y) {
      this.direction.x = 0;
      this.direction.y = 0;
    } else {
      player.direction.x = this.target.x - player.x;
      player.direction.y = this.target.y - player.y;
    }
  }

  /**
   * Updates Blob object. Should be called once per frame.
   */
  update() {
    //console.log(this.x, this.y);
    this.track(); // tracks mouse and sets direction accordingly
    this.pos.add_ip(this.direction.mult(this.vel));
  }

  /**
   * Renders Blob object onto the canvas. Should be called once per frame.
   */
  draw(camera, color="white") {
    camera.context.beginPath();
    let pos = camera.get_pos(this);
    camera.context.arc(pos.x, pos.y, this.r, 0, 2*Math.PI);
    camera.context.fillStyle = color;
    camera.context.fill();
  }
}

class Population {
  constructor(map, size=10) {
    this.population = [];
    for (var i = 0; i < size; i++) {
      this.population.push(new Blob(Math.random()*map.w, Math.random()*map.h, randint(10, 50)));
    }
  }

  update() {
    for (var blob of this.population) {
      blob.update();
    }
  }

  draw(camera, color="blue") {
    for (var blob of this.population) {
      blob.draw(camera, color);
    }
  }
}

class Map {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }

  get width() {
    return this.w;
  }
  get height() {
    return this.h;
  }
}

class Camera {
  constructor(context, map, x, y, w, h) {
    this.context = context;
    this.map = map;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.movement_speed = 50;
  }

  get left() {
    return this.x;
  }
  set left(v) {
    this.x = v;
  }
  get right() {
    return this.x+this.w;
  }
  set right(v) {
    this.x = v-this.w;
  }
  get top() {
    return this.y;
  }
  set top(v) {
    this.y = v;
  }
  get bottom() {
    return this.y+this.h;
  }
  set bottom(v) {
    this.y = v-this.h;
  }

  get topleft() {
    return this.top, this.left;
  }

  get_pos(obj) {
    return {x: obj.x-this.x, y: obj.y-this.y};
  }

  move(dx, dy) {
    if (dx < -1 || dx > 1 || dy < -1 || dy > 1) {
      console.log("dx and dy have to be -1, 0 or 1");
      return;
    }
    this.x += dx*this.movement_speed;
    this.y += dy*this.movement_speed;

    if (this.right > this.map.w) {
      this.right = this.map.w;
    }
    else if (this.left < 0) {
      this.left = 0;
    }
    else if (this.bottom > this.map.h) {
      this.bottom = this.map.h;
    }
    else if (this.top < 0) {
      this.top = 0;
    }
  }
}
