import Sketch from "../utilities.js";
import {random, Vector2, Vector3, map} from "../utilities.js";

// console.log(random.randint(0, 100));

var s = new Sketch("gameCanvas");
s.canvas.setMode("CENTER");

let a = new Vector3(1, 0, 0);
let b = new Vector3(0, 1, 0);
//Vector3.cross(a, b).log();

var v = new Vector2(100, 100);
// v.log();
// console.log(v.heading_deg());

let u = random.randint(0, 359);
console.log("u:", u);
let x = map(u, 0, 359, 0, 100);
console.log(x);

var cube = [new Vector3(-10, -10, -10),
  new Vector3(-10, 10, -10),
  new Vector3(10, 10, -10),
  new Vector3(10, -10, -10),

  new Vector3(-10, -10, 10),
  new Vector3(-10, 10, 10),
  new Vector3(10, 10, 10),
  new Vector3(10, -10, 10)];

cube[0].log();
let r = cube[0].rotate(90, "x");
r.log();
r = r.project(100);
r.log();

s.draw(function () {
  s.canvas.clear();

  // for (var i = 0; i < 360; i++) {
    //   let r = v.rotate(i);
    //   s.canvas.drawPoint(r.x, r.y, 2, "red");
    // }
    // let p = v.rotate(angle);
    // s.canvas.drawPoint(p.x, p.y, 3, "yellow")
    // s.canvas.drawPoint(v.x, v.y, 3, "green");

    let projected = [];
    for (var p of cube) {
      let f = Vector3.mult_scalar(p, 0.3);
      let r = f.rotate(rotationAngle, "x").rotate(rotationAngle, "y").project();
      r = Vector3.mult_scalar(r, 40);
      projected.push(r);
    }

    for (var p of projected) {
      s.canvas.drawPoint(p.x, p.y, 2);
    }

    for (var i = 0; i < 4; i++) {
      s.canvas.drawLine(projected[i].x, projected[i].y, projected[(i+1) % 4].x, projected[(i+1) % 4].y);
      s.canvas.drawLine(projected[i+4].x, projected[i+4].y, projected[((i+1) % 4)+4].x, projected[((i+1) % 4)+4].y);
      s.canvas.drawLine(projected[i].x, projected[i].y, projected[i+4].x, projected[i+4].y);
    }

    rotationAngle+=rotationSpeed;
  });

window.addEventListener('load', function () {
  console.log("loaded");
});
