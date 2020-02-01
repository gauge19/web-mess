//import * as utilities from "../utilities.js";
import Calculations, {Sketch, random, Vector2, Vector3} from "../utilities.js";
import Sphere from "./sphere.js";


// console.log(random.randint(0, 100));

var s = new Sketch("gameCanvas");
s.canvas.setMode("CENTER");

var color = "red";


// var sphere = []; // sphere[lat][lon]

const r = 150; // radius of sphere
const total = 20; // number of points per row/column
var sphere = new Sphere(r, total);

// // create points on sphere and add them to the sphere array
// for (var i = 0; i < total+1; i++) {
//   const lat = Calculations.map(i, 0, total, -(Math.PI/2), Math.PI/2);
//   var column = [];
//   for (var j = 0; j < total+1; j++) {
//     const lon = Calculations.map(j, 0, total, -Math.PI, Math.PI);
//     column.push(Calculations.polar_coordinates_3d(r, lon, lat));
//   }
//   sphere.push(column);
// }

s.draw(function () {
  s.canvas.clear();

  // for (var lat = 0; lat<sphere.length-1; lat++) {
  //   for (var lon = 0; lon<sphere[lat].length-1; lon++) {
  //
  //     if (lat%2 == 0) {
  //       color = "white";
  //     } else {
  //       color = "blue";
  //     }
  //
  //     // projecting and rotating the points into 2d
  //     let p1 = sphere[lat][lon];
  //     let v1 = p1.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 1
  //
  //     let p2 = sphere[lat+1][lon];
  //     let v2 = p2.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 2
  //
  //     let p3 = sphere[lat][lon+1];
  //     let v3 = p3.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 3
  //
  //     let p4 = sphere[lat+1][lon+1];
  //     let v4 = p4.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project(); // vertex 4
  //
  //     // drawing the points
  //     // connecting the points
  //     // s.canvas.drawPoint(v1.x, v1.y, 2, color);
  //     // s.canvas.drawPoint(v2.x, v2.y, 2, color);
  //     // s.canvas.drawPoint(v3.x, v3.y, 2, color);
  //
  //     // s.canvas.drawLine(v1.x, v1.y, v2.x, v2.y, color);
  //     // s.canvas.drawLine(v1.x, v1.y, v3.x, v3.y, color);
  //     // s.canvas.drawLine(v2.x, v2.y, v3.x, v3.y, color);
  //
  //     s.canvas.drawTriangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, color);
  //     s.canvas.drawTriangle(v2.x, v2.y, v3.x, v3.y, v4.x, v4.y, color);
  //   }
  // }

  sphere.iterate(rotationAngle, s.canvas);

  rotationAngle += rotationSpeed;

  });

window.addEventListener('load', function () {
  console.log("loaded");
});
