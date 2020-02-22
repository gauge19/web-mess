import {Sketch, random, Calculations, Noise, Vector} from "../utils/utils.js";
import {noise1d, noise2d} from "./examples.js";

var s = new Sketch("gameCanvas");
// s.canvas.setMode("CENTER"); // draw relative to center
s.GAMESPEED = 10;
let canvas = s.canvas;

var noise = new Noise();

s.canvas.canvas.width = 600;
s.canvas.canvas.height = 400;
var ctx = s.canvas.context;

let xoff = 0;
let yoff = 0;
let inc = 0.01;

let imageData = noise2d(s);
s.canvas.background = "black";
s.GAMESPEED = 1;

let oldx = canvas.width/2;
let oldy = canvas.height/2;

s.canvas.clear();
//s.canvas.context.putImageData(imageData, 0, 0);

function sortXthenY(a, b) {
  // a is further left than b --> a gets lower index than b
  if (a.x < b.x) {
    return -1;
  }

  // a is further right than b --> b gets lower index than a
  else if (a.x > b.x) {
    return 1;
  }

  // a and b have the same x value --> sort by lowest y value
  else if (a.x == b.x) {

    // a is further up than b --> a gets lower index than b
    if (a.y < b.y) {
      return -1;
    }

    // b is further right than a --> b gets lower index than a
    else if (a.y > b.y){
      return 1;
    }
  }

  // a and b are at the exact same location --> index doesn't matter
  return 0;
}

let points = [];

let scale = 35;
let w = 10;
let h = 10;
for (let y = 1; y < h; y++) {
  for (var x = 1; x < w; x++) {
    let py = Calculations.map(y*scale, 0, 500, 0, 500);
    let py2 = Calculations.map((y+1)*scale, 0, 500, 0, 500);

    points.push(new Vector(x*scale, py, 1));
    points.push(new Vector(x*scale, py2, 1));

  }
}

//points.sort(sortXthenY);

for (var i = 0; i < points.length; i++) {
  points[i] = points[i].rotate(0, "X");
  points[i] = points[i].project(canvas.width, canvas.height);
}

for (let i = 0; i < points.length; i++) {
  let c = "white";
  if (i == 0) {
    c = "blue";
  }

  let p = points[i];
  canvas.drawPoint(p.x, p.y, 10, c);
}

for (var row = 0; row < points.length-2; row++) {
  for (var col = 0; col < points.length; col++) {
    let i = row*w + col;
    canvas.drawLine(points[i].x, points[i].y, points[i+1].x, points[i+1].y, "red");
    canvas.drawLine(points[i+1].x, points[i+1].y, points[i+2].x, points[i+2].y, "red");
    canvas.drawLine(points[i+2].x, points[i+2].y, points[i].x, points[i].y, "red");
  }
}
