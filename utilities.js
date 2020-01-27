class random {
  static random(min, max) {
    //console.log("min", min, "max", max);
    if (!(typeof min == "undefined") && max) {
      return (Math.random() * (max - min) + min);
    } else if (min && !max) {
      return this.random(0, min); // use min argument as max argument
    } else {
      //console.log("no range specified");
      return Math.random();
    }
  }

  /**
   * Returns random integer within specified range including min and max.
   * @param {number} min - Minimum of range
   * @param {number} max - Maximum of range
   * @returns {number} Random integer within 'min' and 'max'.
   */
  static randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;;
  }

  /**
   * Returns a random element from a given array.
   * @param {Array} array - Array to pick from
   */
  static choice(array) {
    return array[this.randint(0, array.length)];
  }

  /**
   * Shuffles an array.
   * @param {Array} array - Array to be shuffled
   * @returns {Array} New, shuffled array
   */
  static shuffle(array) {
    var new_array = [...array]; // clone given array

    var m = new_array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = new_array[m];
      new_array[m] = new_array[i];
      new_array[i] = t;
    }

    return new_array;
  }

  /**
   * Shuffles an array in place.
   * @param {Array} array - Array to be shuffled
   */
  static shuffle_ip(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return;
  }
}

class Canvas {
  constructor(id, w, h) {
    this.canvas = document.getElementById(id);

    // check for optional parameters
    if (w) {
      this.width = w;
    }
    if (h) {
      this.height = h;
    }

    this.context = this.canvas.getContext("2d");

    this.background = "black";
    this.border = "grey";
  }

  get width() {
    return this.canvas.width;
  }
  set width(v) {
    this.canvas.width = v;
  }
  get height() {
    return this.canvas.height;
  }
  set height(v) {
    this.canvas.height = v;
  }

  clear() {
    //  Select the colour to fill the drawing
    this.context.fillStyle = this.background;
    //  Select the colour for the border of the canvas
    this.context.strokestyle = this.border;
    // Draw a "filled" rectangle to cover the entire canvas
    this.context.fillRect(0, 0, this.width, this.height);
    // Draw a "border" around the entire canvas
    this.context.strokeRect(0, 0, this.width, this.height);
  }
}

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
    console.log("Vector2 x: " + this.x + ", y: " + this.y);
  }
  toString() {
    return "x: " + this.x + ", y: " + this.y;
  }

  /**
  * Returns a new Vector2 object with random coordinates within the given width and height range.
   * @param {number} width Optional. Maximum x coordinate the vector should have. gameCanvas.width is default.
   * @param {number} height Optional. Maximum x coordinate the vector should have. gameCanvas.width is default.
   * @returns {Object}

   Vector2 object
   */
  static random(width, height) {
    if (!width) {
      width = gameCanvas.width;
    }
    if (!height) {
      height = gameCanvas.height;
    }
    return new Vector2(random.random(width), random.random(height));
  }

  /**
  * Calculates the squared distance between two vectors.
   Use for comparing two distances and finding the shorter one.
   d1>d2 --> d1^2>d2^2
   Much faster than calculating euclidean distance (Vector2.dist()) many times.
   * @param {Object} v1 Vector2 object
   * @param {Object} v2 Vector2 object
   * @returns {number} Squared distance between v1 and v2.
   */
  static dist2(v1, v2) {
    const x = Math.abs(v2.x - v1.x);
    const y = Math.abs(v2.y - v1.y);
    return Math.pow(x, 2) + (y, 2);
  }

  /**
  * Calculates the euclidean distance between two vectors.
   * @param {Object} v1 Vector2 object
   * @param {Object} v2 Vector2 object
   * @returns {number} Euclidean distance between v1 and v2.
   */
  static dist(v1, v2) {
    return Math.sqrt(this.dist2(v1, v2));
  }

  /**
   * Limits x and y value to v.
   * @param {number} v Maximum (and negative minimum) value
   */
  limit(v) {
    if (this.x > v) {
      this.x = v;
    }
    if (this.y > v) {
      this.y = v;
    }
    if (this.x < -v) {
      this.x = -v;
    }
    if (this.y < -v) {
      this.y = -v;
    }
  }

  /**
   * Returns this vector normalized, meaning x and y values are between 0 and 1 but keep their relative magnitude.
   * @returns {Object} normalized Vector2 object
   */
  normalize() {
    let mag = this.mag();
    if (mag != 0) {
      return this.mult((1/this.mag()));
    } else {
      return this.mult(1);
    }
  }

  /**
   * Returns angle of direction in radiants.
   * @returns {number} angle
   */
  heading() {
    return Math.atan(this.y/this.x);
  }

  /**
   * Returns angle of direction in degrees.
   * @returns {number} angle
   */
  heading_deg() {
    return this.heading()*(180/Math.PI);
  }

  /**
   * Returns magnitude of this vector.
   * @returns {number} magnitude
   */
  mag() {
    return Math.hypot(this.x, this.y);
  }

  /**
   * Returns new vector which is this vector, rotated counter-clockwise by a given angle theta.
   0° is to the right of the Vector head.
   Heading angle (this.heading_deg()) should be considered for rotation.
   Add this.heading_deg() to theta to get rotation without angle of direction. Only works if x and y are greater than 0 though.
   * @param {number} theta Angle to be rotated in degrees
   * @returns {Object} rotated Vector2 object
   */
  rotate(theta) {
    // "force" angle onto circle (370° --> 10° because it's 30 above 360)
    theta = deg_to_rad(theta%360); // convert angle to radiants

    // 2d rotation matrix
    const matrix = [[Math.cos(theta), Math.sin(theta)],
                  [-Math.sin(theta), Math.cos(theta)]];

    // matrix multiplication with rotation matrix and current vector to rotate it
    let x = matrix[0][0] * this.x + matrix[0][1] * this.y;
    let y = matrix[1][0] * this.x + matrix[1][1] * this.y;
    return new Vector2(x, y);
  }

  /**
   * Adds two vectors to each other and returns new Vector2 object
   * @param {Object} v1 Vector2 object
   * @param {Object} v2 Vector2 object
   * @returns {Object} Vector2 object
   */
  static add(v1, v2) {
     return new Vector2(v1.x+v2.x, v1.y+v2.y);
   }

  /**
   * Adds a scalar to this vector (in place)
   * @param {Object} scalar Vector to be added
   */
  add_ip(scalar) {
    this.x += scalar;
    this.y += scalar;
  }

  /**
   * Subtracts two vectors from each other and returns new Vector2 object
   * @param {Object} v1 Vector2 object
   * @param {Object} v2 Vector2 object
   * @returns {Object} Vector2 object
   */
   static sub(v1, v2) {
     return new Vector2(v1.x-v2.x, v1.y-v2.y);
   }

  /**
   * Subs a scalar from this vector (in place)
   * @param {Object} scalar Scalar to be subbed
   */
  sub_ip(scalar) {
    this.x -= scalar;
    this.y -= scalar;
  }


  /**
   * Returns new vector with a sclar multiplied to this vector
   * @param {number} scalar to be multiplied by
   * @returns {Object} Vector2 object
   */
  mult(scalar) {
    return new Vector2(this.x*scalar, this.y*scalar);
  }

  /**
   * Multiplies a scalar to this vector (in place)
   * @param {number} scalar -  number to be multiplied by
   */
  mult_ip(scalar) {
    this.x*=scalar;
    this.y*=scalar;
  }

  /**
   * Returns new vector with a sclar divided from this vector
   * @param {number} scalar to be divided by
   * @returns {Object} Vector2 object
   */
  div(scalar) {
    return new Vector2(this.x/scalar, this.y/scalar);
  }

  /**
   * Divides a scalar from this vector (in place)
   * @param {number} scalar -  number to be divided by
   */
  div_ip(scalar) {
    this.x/=scalar;
    this.y/=scalar;
  }

  /**
   * Calculates cross product of two vectors.
   * @param {Object} v1 Vector2 object
   * @param {Object} v2 Vector2 object
   * @returns {number} Cross product of v1 and v2.
   */
  static cross(v1, v2) {
    return v1.x*v2.y-v1.y*v2.x;
  }
}

function rad_to_deg(rad) {
  return rad*(180/Math.PI);
}

function deg_to_rad(deg) {
  return deg*(Math.PI/180);
}

/** Draws filled circle at the coordinates of x and y.
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} r Radius of the circle, 3 is default.
 * @param {string} color Color of the circle, red is default.
 */
function drawPoint(x, y, r=3, color="red") {
  let ctx = canvas.context;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.fill();
}
