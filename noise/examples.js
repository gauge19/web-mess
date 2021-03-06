import {random, Calculations, Noise, Vector2} from "../utils/utils.js";

var noise = new Noise();
const noiseScale = 0.01;

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

function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function getColorAt(imageData, x, y) {
  let i = getColorIndicesForCoord(x, y, imageData.width);
  let data = imageData.data;
  return {imageData: imageData, r: data[i[0]], g: data[i[1]], b: data[i[2]], a: data[i[3]]};
}

export function noise2d(s) {
  let ctx = s.canvas.context;
  let width = s.canvas.width;
  let height = s.canvas.height;
  let imageData = ctx.createImageData(width, height);

  let inc = 0.005;
  let yoff = 0;

  let data = imageData.data;
  for (var y = 0; y < height; y++) {

    let xoff = 0;

    for (var x = 0; x < width; x++) {

      let v = noise.simplex2(xoff, yoff);
      v = Calculations.map(v, -1, 1, 0, 1) * 255;

      let indices = getColorIndicesForCoord(x, y, width);
      for (let index of indices) {
        data[index] = v;
      }
      data[indices[3]] = 255; // set alpha value to 255

      xoff += inc;
    }
    yoff += inc;
  }

  return imageData;
}
