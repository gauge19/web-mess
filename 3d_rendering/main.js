import {Sketch, random, Vector2, Vector3, Calculations} from "../utils/utils.js";

var s = new Sketch("gameCanvas");
s.canvas.setMode("CENTER"); // draw relative to center

document.addEventListener("keydown", event_keypress);
document.addEventListener("mousedown", event_mousedown);

var clicked_left = false;
var clicked_right = false;

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
  ax += ax_update;
  ay += ay_update;
  az += az_update;

  if (clicked_left) {
    ay_update -= friction;
    if (ay_update <= 0) {
      clicked_left = false;
      ay_update = 0;
    }
  }
  if (clicked_right) {
    ay_update += friction;
    if (ay_update >= 0) {
      clicked_right = false;
      ay_update = 0;
    }
  }

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
function event_mousedown(event) {

  let rect = s.canvas.canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  // console.log(x, y);
  const click_strength = 50;

  if (x > 0 && x < s.canvas.width/2 && y > 0 && y < s.canvas.height) {
    clicked_left = true;
    ay_update = a_change*click_strength;
  } else if (x > s.canvas.width/2 && x < s.canvas.width && y > 0 && y < s.canvas.height) {
    clicked_right = true;
    ay_update = -a_change*click_strength;
  }
}
