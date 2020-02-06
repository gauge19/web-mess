import {Sketch, random, Calculations, test, Vector} from "../utils/utils.js";

var s = new Sketch("gameCanvas");
s.canvas.setMode("CENTER");

var color = "white";
var cs = [new Vector(-10, 0), new Vector(10, 0),
          new Vector(0, -10), new Vector(0, 10),
          new Vector(-10, 10), new Vector(10, -10)];

for (var v of cs) {
  v.mult(20);
}

var v1 = new Vector(10, 15, 32);
var v2 = new Vector(-16, 14, -8);

v1.mult(10);
v2.mult(10);

s.draw(function () {
  s.canvas.clear();

  s.canvas.drawLine(cs[0].x, cs[0].y, cs[1].x, cs[1].y, color);
  s.canvas.drawLine(cs[2].x, cs[2].y, cs[3].x, cs[3].y, color);
  s.canvas.drawLine(cs[4].x, cs[4].y, cs[5].x, cs[5].y, color);

  let p1 = v1.project(s.canvas.width, s.canvas.height);
  let p2 = v2.project();

  s.canvas.drawPoint(p1.x, p1.y, 3);
  s.canvas.drawPoint(p2.x, p2.y, 3);

});
