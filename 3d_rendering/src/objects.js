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

  log() {
    console.log("x: " + this.x + ", y: " + this.y + ", z: " + this.z);
  }
}

class Vertex {
  constructor(x, y, z=0) {
    this.vector = new Vector(x, y, z);
    this.color = "white";
  }

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
