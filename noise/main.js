import {Sketch, random, Calculations, Noise, Vector2} from "../utils/utils.js";
import {noise1d, noise2d} from "./examples.js";

var s = new Sketch("gameCanvas");
//s.canvas.setMode("CENTER");

var noise = new Noise();

s.canvas.canvas.width = 600;
s.canvas.canvas.height = 400;
var ctx = s.canvas.context;

var yoff = 0;

var imageData = noise2d(s);
s.canvas.background = "black";
s.GAMESPEED = 1;

s.draw(function () {
  s.canvas.clear();

  s.canvas.context.putImageData(imageData, 0, 0);

});
