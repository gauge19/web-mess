import {Sketch, random, Calculations, Vector, Canvas} from "../utils/utils.js";
import Vehicle from "./vehicle.js";

const count = 25;
var vehicles = [];
for (var i = 0; i < count; i++) {
  vehicles.push(new Vehicle());
}

var s = new Sketch("gameCanvas");
// s.canvas.setMode("CENTER");
var canvas = s.canvas;

var m = new Vector(canvas.width/2, canvas.height/2);

document.addEventListener("mousemove", event_mousemove);

function event_mousemove(event) {
  const r = canvas.canvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  document.getElementById("demo").innerHTML = "x: " + x + " y: " + y;

  m.x = x;
  m.y = y;
}

//console.log(vehicles);
s.draw(function () {
  canvas.clear();

  for (var v of vehicles) {
    canvas.drawCircle(v.position.x, v.position.y, v.perception);
    v.behavior(vehicles);
    v.update(canvas);
    v.draw(canvas);
  }

})
