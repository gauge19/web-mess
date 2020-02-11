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
    if (x && y) {
      this.position = new Vector(x, y);
    } else {
      this.position = Vector.random();
    }

    this.velocity = new Vector(random.random(-1, 1), random.random(-1, 1));
    this.acceleration = new Vector();
    this.size = 10;
    this.maxspeed = 1;
    this.maxforce = 0.2;

    this.perception = 40;
  }

  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }

  /**
   * draw - Renders vehicle onto the canvas
   *
   * @param  {Canvas} canvas description
   */
  draw(canvas) {
    let color = "white";
    //canvas.drawPoint(this.position.x, this.position.y, this.size, color);

    // let test = this.velocity.rotate(135).normalize();
    // test.mult(this.size);
    // console.log(test.toString());

    let bl = this.velocity.rotate(135).normalize();
    bl.mult(this.size);
    bl.add(this.position);
    let br = this.velocity.rotate(225).normalize();
    br.mult(this.size);
    br.add(this.position);
    let fc = this.velocity.normalize();
    fc.mult(this.size);
    fc.add(this.position);

    canvas.drawShape([bl, br, fc], "STROKE", color);
  }

  update(canvas) {
    this.boundaries(canvas); // vehicles inside the canvas
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    //console.log("vel:", this.velocity.toString());
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    //force.log();
    this.acceleration.add(force);
  }

  behavior(others) {
    for (var other of others) {
      other = other.position;
      let d = this.position.dist(other);
      if (d <= this.perception) {
        let f = this.seek(other);
        if (d > 0) {
          let factor = (1/d)*5;
          f.mult(factor); // the further aways, the weaker the force
        }
        f.mult(-1);
        this.applyForce(f);
      }
    }
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

    return steer;
  }

  boundaries(canvas) {
    var d = this.perception;

    var desired = null;

    if (this.position.x < d) {
      desired = new Vector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > canvas.width - d) {
      desired = new Vector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = new Vector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > canvas.height - d) {
      desired = new Vector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired = desired.normalize();
      desired.mult(this.maxspeed);
      let steer = Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}
