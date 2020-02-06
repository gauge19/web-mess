import {Sketch, random, Calculations, test, Vector} from "../utils/utils.js";
import Sphere from "./sphere.js";

var s = new Sketch("gameCanvas");
s.canvas.setMode("CENTER");

var color = "red";

let v1 = new Vector(4, 3);
let v2 = new Vector(4, 3, 0.1);
v1.log();
v2.log();
v1.mag = 3;
v2.mag = 3;
v1.log();
v2.log();
// console.log("deg", Calculations.rad_to_deg(angle));

const r = 150; // radius of sphere
const total = 20; // number of points per row/column
var sphere = new Sphere(r, total);



s.draw(function () {
  s.canvas.clear();

  sphere.iterate(rotationAngle, s.canvas);

  rotationAngle += rotationSpeed;

  });

window.addEventListener('load', function () {
  console.log("loaded");
});
