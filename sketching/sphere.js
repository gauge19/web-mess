import Calculations, {random, Vector2, Vector3} from "../utilities.js";

export default class Sphere {
  constructor(r, total) {
    this.verteces = [];
    this.indexBuffer = [];

    // create points on sphere and add them to the verteces array
    for (var i = 0; i < total+1; i++) {
      const lon = Calculations.map(i, 0, total, -Math.PI, Math.PI);
      var row = [];
      for (var j = 0; j < total+1; j++) {
        const lat = Calculations.map(j, 0, total, -(Math.PI/2), Math.PI/2);
        row.push(Calculations.polar_coordinates_3d(r, lon, lat));
      }
      this.verteces.push(row);
    }

    // create indexbuffer
    for (var row = 0; row < this.verteces.length-1; row++) {
      for (var column = 0; column < this.verteces[row].length; column++) {
        this.indexBuffer.push([row, column]);
        this.indexBuffer.push([row+1, column]);
      }
    }
    console.log(this.indexBuffer);
  }

  get_point(lat, lon) {
    return this.verteces[lat][lon];
  }

  iterate(rotationAngle, canvas) {
    for (var i = 0; i < (this.indexBuffer.length-2); i++) {
      // indeces
      let i1 = this.indexBuffer[i];
      let i2 = this.indexBuffer[i+1];
      let i3 = this.indexBuffer[i+2];

      // points
      let p1 = this.get_point(i1[0], i1[1]);
      let p2 = this.get_point(i2[0], i2[1]);
      let p3 = this.get_point(i3[0], i3[1]);

      // rotate and project points
      p1 = p1.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 1
      p2 = p2.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 2
      p3 = p3.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 4

      //connecting the points
      const colors = ["red", "blue", "green", "yellow", "white", "purple"];
      const color = "red";
      canvas.drawPoint(p1.x, p1.y, 2, color);
      canvas.drawPoint(p2.x, p2.y, 2, color);
      canvas.drawPoint(p3.x, p3.y, 2, color);

      canvas.drawTriangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, "FILL", colors[1]);
    }
  }
}

class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
}
