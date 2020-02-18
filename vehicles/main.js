import {Sketch, random, Calculations, Vector, Canvas, rgb, hsl} from "../utils/utils.js";
import {Population, Vehicle} from "./vehicle.js";

var s = new Sketch("gameCanvas");
// s.canvas.setMode("CENTER");
var canvas = s.canvas;

var population = new Population(canvas, 1);
const foodcount = 100;
var food = [];
for (var i = 0; i < foodcount; i++) {
  food.push(new Vector(random.randint(0, canvas.width), random.randint(0, canvas.height)));
}

var m = new Vector(canvas.width/2, canvas.height/2);

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

  m.x = x;
  m.y = y;
}

console.log(Calculations.lerp(80, 20, 0.5));
s.draw(function () {
  canvas.clear(hsl(0, 0, 15));

  population.draw_boundary();

  // while (food.length < foodcount) {
  //   food.push(new Vector(random.randint(0, canvas.width), random.randint(0, canvas.height)));
  // }
  for (var f of food) {
    canvas.drawPoint(f.x, f.y, 3, "green");
  }

  if (!population.extinct()) {
    population.behavior(food);
    population.update();
    population.draw();
  } else {
    population.newGeneration();
  }

})
