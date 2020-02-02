import Calculations from "./calc.js";

/** @class Creates a 2D Vector object. */
export class Vector2 {

  /**
   * @constructor
   * @author gauge19
   * @param {number} x X value of this Vector. Optional, 0 if omitted.
   * @param {number} y Y value of this Vector. Optional, 0 if omitted.
   */
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  /**
  * Get magnitude of this vector.
  * @returns {number} magnitude
  */
  get mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  /**
  * Set magnitude of this vector.
  * @param {number} magnitude New magnitude
  */
  set mag(len) {
    let h = this.heading(); // angle of direction
    this.x = len*Math.cos(h);
    this.y = len*Math.sin(h);
  }

  /**
   * Logs x and y values as well as magnitude and heading angle to the console.
   */
  log() {
    console.log("Vector2 x: " + this.x + ", y: " + this.y + ". mag: " + this.mag + ", heading: " + this.heading_deg());
  }
  /**
   * Returns string, containing x and y values of this vector.
   * @returns {String} String, containing x and y values of this vector.
   */
  toString() {
    return "x: " + this.x + ", y: " + this.y;
  }

  /**
   * Limits x and y value to v. Possibly doesn't work.
   * @param {number} v Maximum (and negative minimum) value
   */
  limit(v) {
    let c = this.normalize();
    return c.mult(v);
  }

  /**
   * Returns this vector normalized, meaning x and y values are between 0 and 1 but keep their relative magnitude.
   * @returns {Vector2} normalized Vector2 object
   */
  normalize() {
    let mag = this.mag;
    if (mag != 0) {
      return this.mult((1/mag));
    } else {
      return this.mult(1); // copy of this
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
   * Rotates this vector counter-clockwise by a given angle theta, starting from the right hand side.
   Heading angle (this.heading_deg()) should be considered for rotation.
   Add this.heading_deg() to theta to get rotation without angle of direction. Only works if x and y are greater than 0 though.
   * @param {number} theta Angle to be rotated in degrees
   * @returns {Vector2} rotated Vector2 object
   */
  rotate(theta) {
    // "force" angle onto circle (370° --> 10° because it's 30 above 360)
    theta = Calculations.deg_to_rad(theta%360); // convert angle to radiants

    // 2d rotation matrix
    const matrix = [[Math.cos(theta), Math.sin(theta)],
                  [-Math.sin(theta), Math.cos(theta)]];

    // matrix multiplication with rotation matrix and current vector to rotate it
    let x = matrix[0][0] * this.x + matrix[0][1] * this.y;
    let y = matrix[1][0] * this.x + matrix[1][1] * this.y;
    x = parseFloat(Number.parseFloat(x).toFixed(4));
    y = parseFloat(Number.parseFloat(y).toFixed(4));
    return new Vector2(x, y);
  }

  /* Vector operations */
  /**
   * Adds a vector to this vector in place.
   * @param {Vector2} v Vector2 object to be added
   */
  add(v) {
   this.x += v.x;
   this.y += v.y;
  }

  /**
   * Subtracts a vector from this vector in place.
   * @param {Vector2} v Vector2 object to be subtracted
   */
  sub(v) {
   this.x -= v.x;
   this.y -= v.y;
  }

  /**
   * Multiplies this vector by another vector in place.
   * @param {Vector2} v Vector2 object to be multiplied by
   */
  mult(v) {
   this.x *= v.x;
   this.y *= v.y;
  }

  /**
   * Divides this vector by another vector in place.
   * @param {Vector2} v Vector2 object to be divided by
   */
  div(v) {
   this.x /= v.x;
   this.y /= v.y;
  }

  /**
   * Adds a scalar to this vector in place.
   * @param {number} scalar Scalar to be added
   */
  add_scalar(scalar) {
    this.x += scalar;
    this.y += scalar;
  }

  /**
   * Subtracts a scalar from this vector in place.
   * @param {number} scalar Scalar to be subtracted
   */
  sub_scalar(scalar) {
    this.x -= scalar;
    this.y -= scalar;
  }

  /**
   * Multiplies this vector by a scalar in place.
   * @param {number} scalar Scalar to be multiplied
   */
  mult_scalar(scalar) {
    this.x*=scalar;
    this.y*=scalar;
  }

  /**
   * Divides this vector by a scalar in place.
   * @param {number} scalar Scalar to be divided by
   */
  div_scalar(scalar) {
    this.x/=scalar;
    this.y/=scalar;
  }

  /* Static methods below */

  /* Vector-Vector methods */
  /**
   * Adds two vectors to each other and returns new Vector2 object
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {Vector2} Vector2 object
   */
  static add(v1, v2) {
    return new Vector2(v1.x+v2.x, v1.y+v2.y);
  }

  /**
   * Subtracts two vectors from each other and returns new Vector2 object
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {Vector2} Vector2 object
   */
  static sub(v1, v2) {
    return new Vector2(v1.x-v2.x, v1.y-v2.y);
  }

  /**
   * Multiplies one vector by another and returns new Vector2 object
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {Vector2} Vector2 object
   */
  static mult(v1, v2) {
    return new Vector2(v1.x*v2.x, v1.y*v2.y);
  }

  /**
   *  Divides two vectors by each other and returns new Vector2 object
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {Vector2} Vector2 object
   */
  static div(v1, v2) {
    return new Vector2(v1.x/v2.x, v1.y/v2.y);
  }

  /* Vector-Scalar methods */
  /**
   * Returns new vector with with a scalar added to a vector.
   * @param {Vector2} v Vector2 object
   * @param {number} scalar Scalar to be added to v
   * @returns {Vector2} Vector2 object
   */
  static add_scalar(v, scalar) {
    return new Vector2(v.x+scalar, v.y+scalar);
  }

  /**
   * Returns new vector with with a scalar subtracted from a vector.
   * @param {Vector2} v Vector2 object
   * @param {number} scalar Scalar to be subtracted from v
   * @returns {Vector2} Vector2 object
   */
  static sub_scalar(v, scalar) {
    return new Vector2(v.x-scalar, v.y-scalar);
  }

  /**
   * Returns new vector with with vector multiplied by a scalar.
   * @param {Vector2} v Vector2 object
   * @param {number} scalar Scalar to be multiplied to v
   * @returns {Vector2} Vector2 object
   */
  static mult_scalar(v, scalar) {
    return new Vector2(v.x*scalar, v.y*scalar);
  }

  /**
   * Returns new vector with with vector divided by a scalar.
   * @param {Vector2} v Vector2 object
   * @param {number} scalar Scalar to be divided from v
   * @returns {Vector2} Vector2 object
   */
  static div_scalar(v, scalar) {
    return new Vector2(v.x/scalar, v.y/scalar);
  }

  /* Other methods */
  /**
   * Returns a new Vector2 object with random coordinates within the given width and height range.
   * @param {number} width Optional. Maximum x coordinate the vector should have. gameCanvas.width is default.
   * @param {number} height Optional. Maximum x coordinate the vector should have. gameCanvas.width is default.
   * @returns {Vector2} Vector2 object
   */
  static random(maxX, maxY) {
    if (!maxX) {
      maxX = gameCanvas.width;
    }
    if (!maxY) {
      maxY = gameCanvas.height;
    }
    return new Vector2(random.random(maxX), random.random(maxY));
  }

  /**
   * Calculates the squared distance between two vectors.
   Use for comparing two distances and finding the shorter one.
   d1>d2 --> d1^2>d2^2
   Much faster than calculating euclidean distance (Vector2.dist()) many times.
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {number} Squared distance between v1 and v2.
   */
  static dist2(v1, v2) {
    const x = Math.abs(v2.x - v1.x);
    const y = Math.abs(v2.y - v1.y);

    return Math.pow(x, 2) + Math.pow(y, 2); // distance squared
  }

  /**
   * Calculates the euclidean distance between two vectors.
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {number} Euclidean distance between v1 and v2.
   */
  static dist(v1, v2) {
    const x = Math.abs(v2.x - v1.x);
    const y = Math.abs(v2.y - v1.y);
    const d2 = Math.pow(x, 2) + Math.pow(y, 2); // distance squared

    return Math.sqrt(d2);
  }

  /**
   * Calculates cross product of two vectors.
   * @param {Vector2} v1 Vector2 object
   * @param {Vector2} v2 Vector2 object
   * @returns {number} Cross product of v1 and v2.
   */
  static cross(v1, v2) {
    return v1.x*v2.y-v1.y*v2.x;
  }
}

/** @class Creates a 3D Vector object. */
export class Vector3 {

  /**
   * @constructor
   * @author gauge19
   * @param {number} x X value of this Vector. Optional, 0 if omitted.
   * @param {number} y Y value of this Vector. Optional, 0 if omitted.
   * @param {number} z Z value of this Vector. Optional, 0 if omitted.
   */
  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
  * Get magnitude of this vector.
  * @returns {number} magnitude
  */
  get mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
  /**
  * Set magnitude of this vector.
  * @param {number} magnitude New magnitude
  */
  set mag(len) {
    throw TypeError("Not yet supported");
    let h = this.heading(); // angle of direction
    this.x = len*Math.cos(h);
    this.y = len*Math.sin(h);
  }

  /**
   * Logs x, y and z values as well as magnitude and heading angle to the console.
   */
  log() {
    console.log("Vector3 x: " + this.x + ", y: " + this.y + ", z: " + this.z + ". mag: " + this.mag + ", heading: " + this.heading_deg());
  }
  /**
   * Returns string, containing x, y and z values of this vector.
   * @returns {String} String, containing x, y and z values of this vector.
   */
  toString() {
    return "x: " + this.x + ", y: " + this.y + ", z: " + this.z;
  }

  /**
   * Returns this vector normalized, meaning x, y and z values are between 0 and 1 but keep their relative magnitude.
   * @returns {Vector3} normalized Vector3 object
   */
  normalize() {
    console.log("normalize() doesn't yet work for Vector3 objects");
    return new Vector3();
  }

  /**
   * Returns angle of direction in radiants.
   * @returns {number} angle
   */
  heading() {
    console.log("heading() doesn't yet work for Vector3 objects");
    return 0;
  }

  /**
   * Returns angle of direction in degrees.
   * @returns {number} angle
   */
  heading_deg() {
    return this.heading()*(180/Math.PI);
  }

  /**
   * Rotates this vector around a given axis by a given angle theta.
   * @param {number} theta Angle to be rotated in degrees
   * @param {number} axis Axis to be rotated around
   * @returns {Vector3} rotated Vector3 object
   */
  rotate(theta, axis) {
    // "force" angle onto circle (370° --> 10° because it's 30 above 360)
    const angle = Calculations.deg_to_rad(theta%360); // convert angle to radiants

    var rotation;

    if (axis == "x" || axis == "X") {
      let rotationX = [[1, 0, 0],
                       [0, Math.cos(angle), -Math.sin(angle)],
                       [0, Math.sin(angle), Math.cos(angle)]];
      rotation = rotationX;
    }
    if (axis == "y" || axis == "Y") {
      let rotationY = [[Math.cos(angle), 0, Math.sin(angle)],
                       [0, 1, 0],
                       [-Math.sin(angle), 0, Math.cos(angle)]];
      rotation = rotationY;
    }
    if (axis == "z" || axis == "Z") {
      let rotationZ = [[Math.cos(angle), -Math.sin(angle), 0],
                       [Math.sin(angle), Math.cos(angle), 0],
                       [0, 0, 1]];
      rotation = rotationZ;
    }

    const x = rotation[0][0]*this.x+rotation[0][1]*this.y+rotation[0][2]*this.z;
    const y = rotation[1][0]*this.x+rotation[1][1]*this.y+rotation[1][2]*this.z;
    const z = rotation[2][0]*this.x+rotation[2][1]*this.y+rotation[2][2]*this.z;

    return new Vector3(x, y, z);
  }

  /**
   * Projects a 3d vector into 2d space.
   *
   * Based on Quinn Fowler's answer on StackOverflow:
   https://stackoverflow.com/questions/724219/how-to-convert-a-3d-point-into-2d-perspective-projection
   * @param {number} fov Field of view in degrees. 45° is default.
   * @param {number} screenW Width of the canvas in pixels. 600px is default.
   * @param {number} screenH Width of the canvas in pixels. 400px is default.
   * @returns {Vector2} Vector2 object
   */
  project(fov=45, screenW=600, screenH=400) {

    // option 2: stackoverflow --> works fucking amazing
    const hw = screenW/2;
    const hh = screenH/2;
    const fl_top = hw / Math.tan(fov/2); // focal length top
    const fl_side = hh / Math.tan(fov/2); // focal length top

    const d = (fl_top + fl_side) / 2;

    const x = (this.x*d) / (this.z+d);
    const y = (this.y*d) / (this.z+d);

    return new Vector2(x, y); // create new Vector2 with calculated coordinates
  }

  /* Vector operations */
  /**
   * Adds a vector to this vector in place.
   * @param {Vector3} v Vector3 object to be added
   */
  add(v) {
   this.x += v.x;
   this.y += v.y;
   this.z += v.z;
  }

  /**
   * Subtracts a vector from this vector in place.
   * @param {Vector3} v Vector3 object to be subtracted
   */
  sub(v) {
   this.x -= v.x;
   this.y -= v.y;
   this.z -= v.z;
  }

  /**
   * Multiplies this vector by another vector in place.
   * @param {Vector3} v Vector3 object to be multiplied by
   */
  mult(v) {
   this.x *= v.x;
   this.y *= v.y;
   this.z *= v.z;
  }

  /**
   * Divides this vector by another vector in place.
   * @param {Vector3} v Vector3 object to be divided by
   */
  div(v) {
   this.x /= v.x;
   this.y /= v.y;
   this.z /= v.z;
  }

  /**
   * Adds a scalar to this vector in place.
   * @param {number} scalar Scalar to be added
   */
  add_scalar(scalar) {
    this.x += scalar;
    this.y += scalar;
    this.z += scalar;
  }

  /**
   * Subtracts a scalar from this vector in place.
   * @param {number} scalar Scalar to be subtracted
   */
  sub_scalar(scalar) {
    this.x -= scalar;
    this.y -= scalar;
    this.z -= scalar;
  }

  /**
   * Multiplies this vector by a scalar in place.
   * @param {number} scalar Scalar to be multiplied
   */
  mult_scalar(scalar) {
    this.x*=scalar;
    this.y*=scalar;
    this.z*= scalar;
  }

  /**
   * Divides this vector by a scalar in place.
   * @param {number} scalar Scalar to be divided by
   */
  div_scalar(scalar) {
    this.x/=scalar;
    this.y/=scalar;
    this.z/=scalar;
  }

  /* Static methods below */

  /* Vector-Vector methods */
  /**
   * Adds two vectors to each other and returns new Vector3 object
   * @param {Vector3} v1 Vector3 object
   * @param {Vector3} v2 Vector3 object
   * @returns {Vector3} Vector3 object
   */
  static add(v1, v2) {
    return new Vector3(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
  }

  /**
   * Subtracts two vectors from each other and returns new Vector3 object
   * @param {Vector3} v1 Vector3 object
   * @param {Vector3} v2 Vector3 object
   * @returns {Vector3} Vector3 object
   */
  static sub(v1, v2) {
    return new Vector3(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z);
  }

  /**
   * Multiplies one vector by another and returns new Vector3 object
   * @param {Vector3} v1 Vector3 object
   * @param {Vector3} v2 Vector3 object
   * @returns {Vector3} Vector3 object
   */
  static mult(v1, v2) {
    return new Vector3(v1.x*v2.x, v1.y*v2.y, v1.z*v2.z);
  }

  /**
   *  Divides two vectors by each other and returns new Vector3 object
   * @param {Vector3} v1 Vector3 object
   * @param {Vector3} v2 Vector3 object
   * @returns {Vector3} Vector3 object
   */
  static div(v1, v2) {
    return new Vector3(v1.x/v2.x, v1.y/v2.y, v1.z/v2.z);
  }

  /* Vector-Scalar methods */
  /**
   * Returns new vector with with a scalar added to a vector.
   * @param {Vector3} v Vector3 object
   * @param {number} scalar Scalar to be added to v
   * @returns {Vector3} Vector3 object
   */
  static add_scalar(v, scalar) {
    return new Vector3(v.x+scalar, v.y+scalar, v.z+scalar);
  }

  /**
   * Returns new vector with with a scalar subtracted from a vector.
   * @param {Vector3} v Vector3 object
   * @param {number} scalar Scalar to be subtracted from v
   * @returns {Vector3} Vector3 object
   */
  static sub_scalar(v, scalar) {
    return new Vector3(v.x-scalar, v.y-scalar, v.z-scalar);
  }

  /**
   * Returns new vector with with vector multiplied by a scalar.
   * @param {Vector3} v Vector3 object
   * @param {number} scalar Scalar to be multiplied to v
   * @returns {Vector3} Vector3 object
   */
  static mult_scalar(v, scalar) {
    return new Vector3(v.x*scalar, v.y*scalar, v.z*scalar);
  }

  /**
   * Returns new vector with with vector divided by a scalar.
   * @param {Vector3} v Vector3 object
   * @param {number} scalar Scalar to be divided from v
   * @returns {Vector3} Vector3 object
   */
  static div_scalar(v, scalar) {
    return new Vector3(v.x/scalar, v.y/scalar, v.z/scalar);
  }

  /* Other methods */
  /**
   * Returns a new Vector3 object with random coordinates within the given width and height range.
   * @param {number} maxX Optional. Maximum x coordinate the vector should have. gameCanvas.width is default.
   * @param {number} maxY Optional. Maximum y coordinate the vector should have. gameCanvas.width is default.
   * @param {number} maxZ Optional. Maximum z coordinate the vector should have. 0 is default.
   * @returns {Vector3} Vector3 object
   */
  static random(maxX, maxY, maxZ) {
    if (!maxX) {
      maxX = gameCanvas.width;
    }
    if (!maxY) {
      maxY = gameCanvas.height;
    }
    if (!maxZ) {
      maxZ = 0;
    }

    return new Vector3(random.random(maxX), random.random(maxY), random.random(maxZ));
  }

  /**
  * Calculates the squared distance between two vectors.
  Use for comparing two distances and finding the shorter one.
  d1>d2 --> d1^2>d2^2
  Much faster than calculating euclidean distance (Vector3.dist()) many times.
  * @param {Vector3} v1 Vector3 object
  * @param {Vector3} v2 Vector3 object
  * @returns {number} Squared distance between v1 and v2.
  */
  static dist2(v1, v2) {
    const dx = Math.abs(v2.x - v1.x);
    const dy = Math.abs(v2.y - v1.y);
    const dz = Math.abs(v2.z - v1.z);

    return Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2); // distance squared
  }

  /**
  * Calculates the euclidean distance between two vectors.
  * @param {Vector3} v1 Vector3 object
  * @param {Vector3} v2 Vector3 object
  * @returns {number} Euclidean distance between v1 and v2.
  */
  static dist(v1, v2) {
    const dx = Math.abs(v2.x - v1.x);
    const dy = Math.abs(v2.y - v1.y);
    const dz = Math.abs(v2.z - v1.z);
    const d2 = Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2); // distance squared

    return Math.sqrt(d2);
  }

  /**
   * Calculates cross product of two vectors.
   * @param {Vector3} v1 Vector3 object
   * @param {Vector3} v2 Vector3 object
   * @returns {Vector3} Cross product of v1 and v2.
   */
  static cross(v1, v2) {
    let v1a = [v1.y, v1.z, v1.x, v1.y];
    let v2a = [v2.y, v2.z, v2.x, v2.y];
    let x = v1a[0]*v2a[1]-v1a[1]*v2a[0];
    let y = v1a[1]*v2a[2]-v1a[2]*v2a[1];
    let z = v1a[2]*v2a[3]-v1a[3]*v2a[2];
    return new Vector3(x, y, z);
  }
}