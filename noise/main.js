import {Sketch, random, Calculations, Noise} from "../utils/utils.js";

var s = new Sketch("gameCanvas");
//s.canvas.setMode("CENTER");

var noise = new Noise();

var ctx = s.canvas.context;
var image = ctx.createImageData(s.canvas.width, s.canvas.height);
var data = image.data;


s.draw(function () {
  for (var x = 0; x < s.canvas.width; x++) {
    for (var y = 0; y < s.canvas.height; y++) {
      var value = Math.abs(noise.perlin2(x / 100, y / 100));
      value *= 256;

      var cell = (x + y * s.canvas.width) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }

  ctx.fillColor = 'black';
  ctx.fillRect(0, 0, 100, 100);
  ctx.putImageData(image, 0, 0);
})
