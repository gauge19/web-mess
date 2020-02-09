export class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);

    this.context = this.canvas.getContext("2d");

    this.background = "black";
    this.border = "grey";

    this.mode = "NORMAL";
  }

  get width() {
    return this.canvas.width;
  }
  set width(v) {
    this.canvas.width = v;
  }
  get height() {
    return this.canvas.height;
  }
  set height(v) {
    this.canvas.height = v;
  }

  clear() {
    //  Select the colour to fill the drawing
    this.context.fillStyle = this.background;
    //  Select the colour for the border of the canvas
    this.context.strokestyle = this.border;
    // Draw a "filled" rectangle to cover the entire canvas
    this.context.fillRect(0, 0, this.width, this.height);
    // Draw a "border" around the entire canvas
    this.context.strokeRect(0, 0, this.width, this.height);
  }

  /** Draws filled circle at the coordinates of x and y.
   * @param {number} x X coordinate
   * @param {number} y Y coordinate
   * @param {number} r Radius of the circle, 3 is default.
   * @param {string} color Color of the circle, red is default.
   */
  drawPoint(x, y, r=3, color="red") {
    let ctx = this.context;
    ctx.beginPath();
    ctx.fillStyle = color;

    if (this.mode == "CENTER") {
      x = this.width/2 + x;
      y = this.height/2 + y;
    }

    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
  }

  /** Draws line between points A(x1, y1) and B(x2, y2).
   * @param {number} x1 X coordinate of point A
   * @param {number} y1 Y coordinate of point A
   * @param {number} x2 X coordinate of point B
   * @param {number} y2 Y coordinate of point B
   * @param {string} color Color of the line, red is default.
   */
  drawLine(x1, y1, x2, y2, color="red", weight=1) {
    let ctx = this.context;

    ctx.beginPath();
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;

    if (this.mode == "CENTER") {
      x1 = this.width/2 + x1;
      x2 = this.width/2 + x2;
      y1 = this.height/2 + y1;
      y2 = this.height/2 + y2;
    }

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  /** Draws line between points A(x1, y1), B(x2, y2) and C(x3, y3) and fills the space in between.
   * @param {number} x1 X coordinate of point A
   * @param {number} y1 Y coordinate of point A
   * @param {number} x2 X coordinate of point B
   * @param {number} y2 Y coordinate of point B
   * @param {number} x3 X coordinate of point C
   * @param {number} y3 Y coordinate of point C
   * @param {string} color Color of the triangle, red is default.
   */
  drawTriangle(x1, y1, x2, y2, x3, y3, drawmode="STROKE", color="red") {
    let ctx = this.context;

    ctx.beginPath();

    if (this.mode == "CENTER") {
      x1 = this.width/2 + x1;
      x2 = this.width/2 + x2;
      x3 = this.width/2 + x3;
      y1 = this.height/2 + y1;
      y2 = this.height/2 + y2;
      y3 = this.height/2 + y3;
    }

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x1, y1);

    if (drawmode == "STROKE") {
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (drawmode == "FILL") {
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  drawShape(verteces=[], drawmode="STROKE", color="red") {
    let ctx = this.context;
    ctx.beginPath();

    for (var i = 0; i < verteces.length; i++) {
      let x = verteces[i].x;
      let y = verteces[i].y;

      if (this.mode == "CENTER") {
        x = this.width/2 + x;
        y = this.height/2 + y;
      }

      if (i == 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    // close polygon by conneting last with first point
    let x = verteces[0].x;
    let y = verteces[0].y;

    if (this.mode == "CENTER") {
      x = this.width/2 + x;
      y = this.height/2 + y;
    }

    ctx.lineTo(x, y);

    // draw the polygon
    if (drawmode == "STROKE") {
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (drawmode == "FILL") {
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  setMode(m) {
    if (m == "CENTER") {
      this.mode = m;
    } else {
      console.log("m is either undefined or invalide input:", m);
    }
  }
}

export class Sketch {
  constructor(id) {
    this.GAMESPEED = 30;
    this.canvas = new Canvas(id);
  }

  draw(loop) {
    //console.log("gamespeed:", this.GAMESPEED);
    var t = this;
    setTimeout(function onTick() {
      loop();
      t.draw(loop);
    }, this.GAME_SPEED);
  }
}

import {Vector2, Vector3, Vector} from "./vector.js";
export {Vector2, Vector3, Vector};

import random from "./random.js";
export {random};

import Calculations from "./calc.js";
export {Calculations};

import Noise from "./noise.js";
export {Noise};

export function test() {
  let n = new Noise();
  let a = n.simplex2(0, 0);
  console.log("noise:", a);
}
