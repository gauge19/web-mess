class Vector {
  constructor(x=0, y=0, z=0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  set x(value) {
    this._x = value;
  }
  set y(value) {
    this._y = value;
  }
  set z(value) {
    this._z = value;
  }

  mult(n) {
  // DOESN'T WORK!

    this.x *= n;
    this.y *= n;
    this.z *= n;
  }

  log() {
    console.log("Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z);
  }

  toString() {
    return "x: " + this.x + ", y: " + this.y + ", z: " + this.z;
  }
}

class Vertex {
  constructor(x, y, z=0) {
    this.vector = new Vector(x, y, z); // vector with coordinates
    this.color = "white"; // display color of vertex

    // orthographic projection matrix
    this.orthographic_projection = [[1, 0, 0],
                                    [0, 1, 0]];
  }

  // access vector properties through vertex
  get x() {
    return this.vector.x;
  }

  get y() {
    return this.vector.y;
  }

  get z() {
    return this.vector.z;
  }

  set x(value) {
    this.vector.x = value;
  }

  set y(value) {
    this.vector.y = value;
  }

  set z(value) {
    this.vector.z = value;
  }

  mult(n) {
    // DOESN'T WORK!

    this.vector.mult(n);
  }

  set_vector(v) {
    // replace old vector with new one

      if (v instanceof Vector) {
      this.vector = v;
    }
  }

  rotate(angle=45, axis="x") {
    // rotates the vertex by angle along axis and returns newly calculated vertex

    // check if angle is specified rather than just the axis
    if (typeof angle != "number") {
      console.log("angle must be a number! currently: " + angle);
    }

    var v = new Vertex(); // create new vertex that'll be returned later

    if (axis=="x" || axis=="X") {
      var rotationX = [[1, 0, 0],
                      [0, Math.cos(angle), -Math.sin(angle)],
                      [0, Math.sin(angle), Math.cos(angle)]];
      v.set_vector(matmul(rotationX, this.vector));
    }
    else if (axis=="y" || axis=="Y") {
      var rotationY = [[Math.cos(angle), 0, Math.sin(angle)],
                       [0, 1, 0],
                       [-Math.sin(angle), 0, Math.cos(angle)]];
      v.set_vector(matmul(rotationY, this.vector));
    }
    else if (axis=="z" || axis=="Z") {
      var rotationZ = [[Math.cos(angle), -Math.sin(angle), 0],
                       [Math.sin(angle), Math.cos(angle), 0],
                       [0, 0, 1]];
      v.set_vector(matmul(rotationZ, this.vector));
    }

    //console.log("rotation v.z: " + v.z);
    return v;

  }

  project_orthographic(v=this) {
    // calculates new Vertex for orthographic projection
    // should be called after rotation

    var n = new Vertex()

    n.set_vector(matmul(this.orthographic_projection, v.vector));
    return n;
  }

  project(v=this, distance=10) {
    // calculates new Vertex for perspective projection relative to the vertex' distance to the camera
    // should be called after rotation

    var fov = 90;
    var s = 1/(Math.tan((fov/2)*(Math.PI/180)));
    var perspective_projection = [[s, 0, 0],
                                  [0, s, 0]];

    var n = new Vertex()
    n.set_vector(matmul(perspective_projection, v.vector));
    return n;
  }

  rot_pro(angle=45, axis="x") {
    // rotate and project in one step

    return this.rotate(angle, axis).project_orthographic();
  }
}

class Matrix {
  constructor(rows=2, cols=2) {
    this.rows = rows;
    this.cols = cols;

    this._m = []

  }

  fill(mode) {
    this._m = [];

    if (mode == "random") {
      for (var i=0; i<this.rows; i++) {
        var r = [];
        for (var j=0; j<this.cols; j++){
          r.push(Math.random());
        }
        this._m.push(r);
      }
    }

    if (mode == "zero") {
      for (var i=0; i<this.rows; i++) {
        var r = [];
        for (var j=0; j<this.cols ; j++){
          r.push(0);
        }
        this._m.push(r);
      }
    }
  }

  multiply(n) {
    if (n instanceof Vector) {

    }

  }

  add() {

  }
}

function vecToMatrix(v) {
    let m = [];
    for (let i = 0; i < 3; i++) {
        m[i] = [];
    }
    m[0][0] = v.x;
    m[1][0] = v.y;
    m[2][0] = v.z;
    return m;
}

function matrixToVec(m) {
    var v = new Vector(m[0][0], m[1][0], m.length > 2 ? m[2][0] : 0);
    // return createVector(m[0][0], m[1][0], m.length > 2 ? m[2][0] : 0);
    return v;
}

function logMatrix(m) {
    const cols = m[0].length;
    const rows = m.length;
    console.log(rows + "x" + cols);
    console.log("----------------");
    let s = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            s += (m[i][j] + " ");
        }
        console.log(s);
    }
    console.log();
}

function matmulvec(a, vec) {
    let m = vecToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec(r);
}

function matmul(a, b) {
    if (b instanceof Vector) {
        return matmulvec(a, b);
    }

    let colsA = a[0].length;
    let rowsA = a.length;
    let colsB = b[0].length;
    let rowsB = b.length;

    if (colsA !== rowsB) {
        console.error("Columns of A must match rows of B");
        return null;
    }

    result = [];
    for (let j = 0; j < rowsA; j++) {
        result[j] = [];
        for (let i = 0; i < colsB; i++) {
            let sum = 0;
            for (let n = 0; n < colsA; n++) {
                sum += a[j][n] * b[n][i];
            }
            result[j][i] = sum;
        }
    }
    return result;
}
