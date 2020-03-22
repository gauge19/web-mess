import {Sketch, random, Calculations, Noise, Vector} from "../utils/utils.js";
import {noise1d, noise2d} from "./examples.js";

var s = new Sketch("gameCanvas");
// s.canvas.setMode("CENTER"); // draw relative to center
s.GAMESPEED = 10;
let canvas = s.canvas;

var noise = new Noise();

s.canvas.canvas.width = 600;
s.canvas.canvas.height = 400;

let imageData = noise2d(s);
s.canvas.background = "black";

s.draw(function () {
  s.canvas.clear();
  s.canvas.context.putImageData(imageData, 0, 0);
})
