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
    this.pos = new Vector2(x, y);
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
  draw(context, color="white") {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    context.fillStyle = color;
    context.fill();
  }
}

class Population {
  constructor(size=10) {
    this.population = [];
    for (var i = 0; i < size; i++) {
      this.population.push(new Blob(Math.random()*gameCanvas.width, Math.random()*gameCanvas.height, randint(10, 50)));
    }
  }

  update() {
    for (var blob of this.population) {
      blob.update();
    }
  }

  draw(context, color="blue") {
    for (var blob of this.population) {
      blob.draw(context, color);
    }
  }
}
