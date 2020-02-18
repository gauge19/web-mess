import {Sketch, random, Calculations, Vector, Canvas, rgb, hsl} from "../utils/utils.js";
import {Segment, Segments} from "./segment.js";
import {Ball} from "./ball.js";


var s = new Sketch("gameCanvas");

var canvas = s.canvas;

var mouse = new Vector(0, 0);
var ball = new Ball(canvas)

document.addEventListener("mousemove", event_mousemove);
document.addEventListener("mousedown", event_mousedown);

function event_mousedown(event) {
  const r = canvas.canvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  //vehicles.push(new Vehicle(x, y));
}
function event_mousemove(event) {
  const r = canvas.canvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  document.getElementById("demo").innerHTML = "x: " + x + " y: " + y;

  mouse.set(x, y);
}

var base = new Vector;
var segments = [];
for (var i = 0; i < 4; i++) {
  let x = Calculations.map(i, 0, 3, 0, canvas.width);
  base = new Vector(x, canvas.height/2);
  segments[i] = new Segments(base, 100, 3);
}

s.draw(function () {
  canvas.clear(hsl(0, 0, 15));

  ball.update();

  for (var s of segments) {
    s.follow(ball.pos);
    s.draw(canvas);
  }

})
