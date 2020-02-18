import {random, Calculations, hsl, Sketch} from "../utils/utils.js";

function f1(x, y) {
  return {
    x: 0,
    y: 0.16*y
  };
}

function f2(x, y) {
  return {
    x:  0.85*x + 0.04*y,
    y: -0.04*x + 0.85*y + 1.6
  };
}

function f3(x, y) {
  return {
    x: 0.2*x  - 0.26*y,
    y: 0.23*x + 0.22*y + 1.6
  };
}

function f4(x, y) {
  return {
    x: -0.15*x + 0.28*y,
    y:  0.26*x + 0.24*y + 0.44
  };
}


/**
 * Generates next point on the Barnsley Fern based on a given point.
 *
 * @param  {number} x X value of previous point.
 * @param  {number} y X value of previous point.
 * @return {{x: number, y: number}} New point object with x and y values.
 */
export function getPoint(x, y) {
  let nx, ny;

  let r = Math.random();

  if (r < 0.01) {
    let p = f1(x, y);
    nx = p.x;
    ny = p.y;
  } else if (r < 0.86) {
    let p = f2(x, y);
    nx = p.x;
    ny = p.y;
  } else if (r < 0.93) {
    let p = f3(x, y);
    nx = p.x;
    ny = p.y;
  } else {
    let p = f4(x, y);
    nx = p.x;
    ny = p.y;
  }

  return {x: nx, y: ny};
}


/**
 * Draws Barnsley Fern on the canvas over time.
 *
 * @param  {Sketch} sketch used to render onto the canvas
 */
export function draw(sketch) {
  let canvas = sketch.canvas;

  canvas.clear(hsl(0, 0, 15));

  let x = 0;
  let y = 0;

  sketch.draw(function () {

    for (var i = 0; i < 20; i++) {
      let next = getPoint(x, y);

      let plotX = Calculations.map(x, -2.1820, 2.6558, 0, canvas.width);
      let plotY = Calculations.map(y, 0, 9.9983, canvas.height, 0);

      canvas.drawPoint(plotX, plotY, 1, "green");

      x = next.x;
      y = next.y;
    }

  });

}
