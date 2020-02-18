import {random, Calculations, Noise, Vector2} from "../utils/utils.js";

var noise = new Noise();
const noiseScale = 0.02;

export function noise1d(s, yoff) {
  var ctx = s.canvas.context;

  let points = []
  let xoff = 0;
  for (var x = 0; x <= s.canvas.width; x += 10) {
    let y = Calculations.map(noise.simplex2(xoff, yoff), 0, 1, 200, 300);
    points.push(new Vector2(x, y));
    xoff += 0.05;
  }

  points.push(new Vector2(s.canvas.width, s.canvas.height));
  points.push(new Vector2(0, s.canvas.height));
  s.canvas.drawShape(points, "STROKE", "lightblue");
  return yoff += 0.003;
}

class Point {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
  }

  get alpha() {
    return Calculations.map(this.v, -1, 1, 0, 1, true);
  }

  get color() {
    return this.v*255;
  }
}

export function noise2d(s) {
  var points = [];

  for (var y = 0; y < s.canvas.height; y++) {
    for (var x = 0; x < s.canvas.width; x++) {
      let v = noise.perlin2(x * noiseScale, y * noiseScale);
      points.push(new Point(x, y, v));
      //s.canvas.drawPoint(x, y, 1, "rgb(" + a + ", " + a + ", " + a+ ")");
    }
  }

  return points;
}
