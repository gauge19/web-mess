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
}

class Vertex {
  constructor() {
    this.vector = new Vector()
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
