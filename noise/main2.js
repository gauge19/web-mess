import {Sketch, random, Calculations, Vector} from "../utils/utils.js";

var s = new Sketch("gameCanvas");
// s.canvas.setMode("CENTER"); // draw relative to center
s.GAMESPEED = 1;
let canvas = s.canvas;

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

let points_old = [];

let offset = 0;
let scale = 20; // size of cell
let w = 10; // number of point per row
let h = 7; // number of points per column

// create points
for (let y = 0; y < h-1; y++) {
  let row = [];
  for (var x = 0; x < w; x++) {
    let py = Calculations.map(y*scale, 0, 500, 0, 500);
    let py2 = Calculations.map((y+1)*scale, 0, 500, 0, 500);

    row.push(new Vector(x*scale + offset, py + offset,  1));
    row.push(new Vector(x*scale + offset, py2 + offset, 1));

  }
  points_old.push(row);
}


let a = 315;

s.draw(function () {

  s.canvas.clear();

  let points = [];
  for (var i = 0; i < h-1; i++) {
    points.push([]);
  }

  // rotate and project the points
  for (let col = 0; col < points_old.length; col++) {
    for (let row = 0; row < points_old[col].length; row++) {
      let p = points_old[col][row];
      p = p.rotate(a, "X");
      p = p.project(canvas.width, canvas.height);
      points[col][row] = p;
    }
  }

  //console.log(points);

  // draw points
  for (let col of points) {
    for (let row of col) {
      canvas.drawPoint(row.x, row.y, 5, "white");
    }
  }

  // draw triangle strip
  for (let col = 0; col < points.length; col++) {
    for (let row = 0; row < points[col].length-2; row++) {
      let p1 = points[col][row];
      let p2 = points[col][row+1];
      let p3 = points[col][row+2];
      // console.log(p1.toString(), p2.toString(), p3.toString());

      canvas.drawTriangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, "STROKE", "red");
    }
  }

  // a += 0.1;
})
