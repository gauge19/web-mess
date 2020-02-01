import Calculations from "../utilities.js";
import {Sketch, random, Vector2, Vector3} from "../utilities.js";

var s = new Sketch("gameCanvas");
s.canvas.setMode("CENTER"); // draw relative to center

document.addEventListener("keydown", event_keypress);

// defined in index.html to be used with sliders
/*
var r = 4; // radius of cirle used to represent points
var cube_scale = 10; // determins scale of cube
var ax = Math.PI/10; // angle of rotation along x axis
var ay = Math.PI/10; // angle of rotation along y axis
var az = Math.PI/10; // angle of rotation along z axis
var a_change = 0.0314; // change per frame (~1% of full rotation which is Pi or 3.14)
var a_update = 0; // used for auto rotation;
*/

var cube = [new Vector3(-10, -10, -10),
  new Vector3(-10, 10, -10),
  new Vector3(10, 10, -10),
  new Vector3(10, -10, -10),

  new Vector3(-10, -10, 10),
  new Vector3(-10, 10, 10),
  new Vector3(10, 10, 10),
  new Vector3(10, -10, 10)];

s.draw(function () {
  s.canvas.clear();

  let projected = [];
  for (var p of cube) {
    let f = Vector3.mult_scalar(p, cube_scale);
    let point = f.rotate(ax, "x").rotate(ay, "y").rotate(az, "z").project(45);
    projected.push(point);
  }

  for (var p of projected) {
    s.canvas.drawPoint(p.x, p.y, r, "white");
  }

  for (var i = 0; i < 4; i++) {
    s.canvas.drawLine(projected[i].x, projected[i].y, projected[(i+1) % 4].x, projected[(i+1) % 4].y, "white");
    s.canvas.drawLine(projected[i+4].x, projected[i+4].y, projected[((i+1) % 4)+4].x, projected[((i+1) % 4)+4].y, "white");
    s.canvas.drawLine(projected[i].x, projected[i].y, projected[i+4].x, projected[i+4].y, "white");
  }

  // increase angle every frame to make it rotate automatically, handled by sliders
  ax += a_update;
  ay += a_update;
  az += a_update;

})

function event_keypress(event) {

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  //console.log(keyPressed);

  if (keyPressed === UP_KEY) {
    ax+=0.03;
    console.log("ax: " + ax);
  }
  if (keyPressed === DOWN_KEY) {
    ax-=0.03;
    console.log("ax: " + ax);
  }
  if (keyPressed === LEFT_KEY) {
    ay+=0.03;
    console.log("ay: " + ay);
  }
  if (keyPressed === RIGHT_KEY) {
    ay-=0.03;
    console.log("ay: " + ay);
  }
  else {
    console.log("Key pressed: " + keyPressed);
  }
}
