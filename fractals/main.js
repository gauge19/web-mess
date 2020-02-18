import {Sketch, random, Calculations, Vector, Canvas, rgb, hsl} from "../utils/utils.js";
import * as fern from "./fern.js";


var s = new Sketch("gameCanvas");
s.GAMESPEED = 250;

var canvas = s.canvas;

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
}

fern.draw(s);
