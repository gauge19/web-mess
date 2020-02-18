import {random, Calculations, Vector, Canvas, rgb, hsl, Noise} from "../utils/utils.js";

export class Ball {
  constructor(canvas) {
    this.canvas = canvas;

    this.pos = Vector.random(1000, 200);
    this.vel = new Vector(2, 1.3);
    this.gravity = new Vector(0, 0.12);
    this.r = 16;
  }

  update() {
    //this.vel.add(this.gravity);
    this.boundaries();
    this.pos.add(this.vel);

    this.draw();
  }

  boundaries() {
    if (this.pos.x < 0 || this.pos.x > this.canvas.width) {
      this.vel.x *= -1;
    } else if (this.pos.y > this.canvas.height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  draw() {
    this.canvas.drawPoint(this.pos.x, this.pos.y, this.r, "red");
  }
}
