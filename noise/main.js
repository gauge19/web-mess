import {Sketch, random, Calculations, Noise, Vector2} from "../utils/utils.js";
import {noise1d, noise2d} from "./examples.js";

var s = new Sketch("gameCanvas");
//s.canvas.setMode("CENTER");

var noise = new Noise();

s.canvas.canvas.width = 300;
s.canvas.canvas.height = 300;
var ctx = s.canvas.context;

var yoff = 0;

var points = noise2d(s);
console.log(points.length);
s.canvas.background = "black";
s.GAMESPEED = 1;

s.draw(function () {
  s.canvas.clear();

  // yoff = noise1d(s, yoff);
  for (var point of points) {
    let c = point.color;
    s.canvas.drawPoint(point.x, point.y, 1, "rgba("+c+", "+c+", "+c+")");
  }

});
