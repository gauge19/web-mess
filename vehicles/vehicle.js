import {random, Calculations, Vector, Canvas} from "../utils/utils.js";

export class Population {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.population = [];
    for (var i = 0; i < size; i++) {
      this.population.push(new Vehicle(canvas));
    }
  }

  extinct() {
    for (var v of this.population) {
      if (v.health > 0) {
        return false; // if one is alive, return false
      }
    }

    return true; // if all are dead, return true
  }

  behavior(good, bad) {
    for (var v of this.population) {
      v.behavior(this.population, good, bad);
    }
  }

  update() {
    for (var v of this.population) {
      v.fitness += 1;
      v.update();
    }
  }

  draw() {
    for (var v of this.population) {
      v.draw();
    }
  }

  draw_boundary() {
    let p = 30;
    let boundary = [{x: p, y: p}, {x: this.canvas.width-p, y: p},
                    {x: this.canvas.width-p, y: this.canvas.height-p},
                    {x: p, y: this.canvas.height-p}];
    this.canvas.drawShape(boundary, "STROKE", "white");
  }

  /**
   * sort - Sorts decending the population by their fitness value.
   *
   * @return {type}  description
   */
  sort() {
    this.population.sort(function (a, b) {
      if (a.fitness > b.fitness) {
        return -1;
      } else if (a.fitness < b.fitness) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  newGeneration() {
    this.sort();
    let newPop = [];
    for (var v of this.population) {
      newPop.push(new Vehicle(this.canvas));
    }

    this.population = newPop;
  }
}

export class Vehicle {

  /**
   * Autonomous vehicle class
   *
   * @param  {number} x X coordinate of the vehicle. Default is random between 0 and width.
   * @param  {number} y Y coordinate of the vehicle. Default is random between 0 and height.
   * @return {Vehicle}  Vehicle object
   */
  constructor(canvas, x, y) {
    this.canvas = canvas;

    if (x && y) {
      this.position = new Vector(x, y);
    } else {
      this.position = Vector.random();
    }

    this.velocity = new Vector(random.random(-1, 1), random.random(-1, 1));
    this.acceleration = new Vector();
    this.size = 10;
    this.maxspeed = 1;
    this.maxforce = 0.3;

    this.debug = true;

    this.health = 1;
    this.fitness = 0;

    this.dna = [];
    this.dna[0] = 45; // others perception
    this.dna[1] = random.randint(-2, 2); // good weight
    this.dna[2] = random.randint(-2, 2); // bad weight
    this.dna[3] = random.randint(1, 40); // good perception
    this.dna[4] = random.randint(1, 40); // good perception
  }

  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }

  /**
   * draw - Renders vehicle onto the canvas
   */
  draw() {
    let ctx = this.canvas.context
    let color = "white";

    let bl = this.velocity.rotate(135).normalize();
    bl.mult(this.size);
    bl.add(this.position);
    let br = this.velocity.rotate(225).normalize();
    br.mult(this.size);
    br.add(this.position);
    let fc = this.velocity.normalize();
    fc.mult(this.size);
    fc.add(this.position);

    this.canvas.drawShape([bl, br, fc], "FILL", color);

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.perception, 0, Math.PI*2);
    ctx.stroke();

    if (this.debug) {
      this.canvas.drawCircle(this.position.x, this.position.y, this.dna[3], "green");
      this.canvas.drawCircle(this.position.x, this.position.y, this.dna[4], "red");
    }
  }

  update() {
    this.health -= 0.001;

    this.boundaries(); // vehicles inside the canvas
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

  behavior(others, good, bad) {

    // behavior not to run into another vehicle
    for (var other of others) {
      other = other.position;
      let d = this.position.dist(other);
      if (d <= this.dna[0]) {
        let f = this.seek(other);
        if (d > 0) {
          let factor = (1/d)*5;
          f.mult(factor); // the further aways, the weaker the force
        }
        f.mult(-1);
        this.applyForce(f);
      }
    }

    for (var item of good) {
      let d = this.position.dist(item);
      if (d <= this.dna[3]) {
        if (d < 2) {
          this.health += 0.2;
          good.pop(item); // doesnt work
        } else {
          let f = this.seek(item);
          this.applyForce(f);
        }
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

  boundaries() {
    var canvas = this.canvas;
    var d = 30;

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
