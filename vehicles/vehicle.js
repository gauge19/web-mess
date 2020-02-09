import {random, Calculations, Vector, Canvas} from "../utils/utils.js";

export default class Vehicle {

  /**
   * Autonomous vehicle class
   *
   * @param  {number} x X coordinate of the vehicle. Default is random between 0 and width.
   * @param  {number} y Y coordinate of the vehicle. Default is random between 0 and height.
   * @return {Vehicle}  Vehicle object
   */
  constructor(x, y) {
    if (this.x && this.y) {
      this.position = new Vector(x, y);
    } else {
      this.position = Vector.random();
    }

    this.velocity = new Vector(random.random(-1, 1), random.random(-1, 1));
    this.acceleration = new Vector();
    this.size = 4;
    this.maxspeed = 1;
    this.maxforce = 0.2;
  }


  /**
   * draw - Renders vehicle onto the canvas
   *
   * @param  {Canvas} canvas description
   */
  draw(canvas) {
    let color = "white";
    canvas.drawPoint(this.position.x, this.position.y, this.size, color);
    let v = this.velocity.normalize();
    v.mult(20);
    v.add(this.position);
    canvas.drawLine(this.position.x, this.position.y, v.x, v.y, color);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }


  /**
   * seek - Seeks a taget by applying Craig Reynold's steering force (steering = desired - velocity).
   *
   * @param  {Vector} target description
   */
  seek(target) {
    let desired = Vector.sub(target, this.position);
    desired.mag = this.maxspeed;
    let steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.acceleration.add(steer);
    //return steer;
  }
}
