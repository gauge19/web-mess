class Boid {
  constructor() {
    this.position = new Vector2(random.random(canvas.width), random.random(canvas.height));
    this.velocity = new Vector2(random.random(-10, 10), random.random(-10, 10));
    // this.velocity = Vector2.random(10, 0);
    this.accelaration = new Vector2();

    this.maxSpeed = 5;
    this.maxForce = .05;

    this.min_distance = 100;
    this.alignment_factor = 8;
    this.cohesion_factor = 100;
  }

  /**
   * Makes the boid wrap around the canvas.
   * @param {Object} Canvas canvas object to wrap around
   */
  wrap(canvas) {
    if (this.position.x < 0) {
      this.position.x = canvas.width;
    }
    if (this.position.x > canvas.width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = canvas.height;
    }
    if (this.position.y > canvas.height) {
      this.position.y = 0;
    }
  }

  separation2(boids) {
    var c = new Vector2(); //

    for (var boid of boids) {
      boid = boid.userData; // access the Boid object rather than the Point object
      let d = Vector2.dist(boid.position, this.position);
      if (boid != this && d < this.min_distance) {
        c = Vector2.sub(c, (Vector2.sub(boid.position, this.position)));
      }
    }

    return c.limit(this.maxForce).mult(1.5);
  }

  separation(boids) {
    var c = new Vector2();
    var count = 0;

    for (var boid of boids) {
      boid = boid.userData;
      if (boid != this) {
        let d = Vector2.dist(this.position, boid.position);
        let diff = Vector2.sub(this.position, boid.position);
        diff = diff.normalize();
        diff.div_ip(d);
        c = Vector2.add(c, diff);

        count++;
      }

    }

    if (count > 0) {
      c.div_ip(count);
    }

    if (c.mag > 0) {
      c.mag = this.maxSpeed;
      c = Vector2.sub(c, this.velocity);
      c = c.limit(this.maxForce);
    }

    return c;
  }

  alignment(boids) {
    var pv = new Vector2(); // perceived velocity (velocity of all boids exluding this boid)
    let count = 0; // number of boids this boids is adjusting its position to

    for (var boid of boids) {
      boid = boid.userData; // access the Boid object rather than the Point object
      if (boid != this) {
        pv = Vector2.add(pv, boid.velocity); // add all positions
        count++;
      }
    }
    if (count > 0) {
      pv.div_ip(count); // average the velocity of all other boids => pv / n-1

      // Implement Reynolds: Steering = Desired - Velocity
      let steer = Vector2.sub(pv, this.velocity);
      steer = Vector2.div(steer, this.alignment_factor);
      return steer.limit(this.maxForce);
    } else {
      return new Vector2();
    }
  }

  cohesion(boids) {
    var pc = new Vector2(); // perceived center of mass (center of all boids exluding this boid)
    let count = 0; // number of boids this boids is adjusting its position to

    for (var boid of boids) {
      boid = boid.userData; // access the Boid object rather than the Point object
      if (boid != this) {
        pc = Vector2.add(pc, boid.position); // add all positions
        count++;
      }
    }
    if (count > 0) {
      pc.div_ip(count); // average the position of all other boids => pc / n-1

      // Implement Reynolds: Steering = Desired - Velocity
      let steer = Vector2.sub(pc, this.position);
      steer = Vector2.div(steer, this.cohesion_factor);
      return steer.limit(this.maxForce);
    } else {
      return new Vector2();
    }
  }

  update(allBoids, closeBoids) {

    var sep = this.separation(allBoids).mult(1.5);
    var align = this.alignment(allBoids);
    var coh = this.cohesion(allBoids);

    this.velocity = Vector2.add(this.velocity, sep);
    this.velocity = Vector2.add(this.velocity, align);
    this.velocity = Vector2.add(this.velocity, coh);
    //this.velocity.limit(this.maxSpeed);
    this.velocity.mag = this.maxSpeed;
    this.position = Vector2.add(this.position, this.velocity);
    this.accelaration.mult_ip(0);
    this.wrap(canvas);
  }

  draw(canvas) {
    let r = 2;
    let lineLength = 5;

    // draw center of boid
    // drawPoint(this.position.x, this.position.y, r, "white");

    // rotation test

    // draw triangle rotated in moving direction
    canvas.context.beginPath();
    canvas.context.strokeStyle = "pink";

    // rotate vector, normalize it and give it a relative maximum length of lineLength
    // add current position to the new vector --> position of the triangle points
    let back_left = Vector2.add(this.position, this.velocity.rotate(135).normalize().mult(lineLength));
    let back_right = Vector2.add(this.position, this.velocity.rotate(225).normalize().mult(lineLength));
    let back_center = Vector2.add(this.position, this.velocity.rotate(180).normalize().mult(lineLength*0.35));
    let front_center = Vector2.add(this.position, this.velocity.normalize().mult(lineLength*1.5));

    canvas.context.moveTo(back_left.x, back_left.y);

    canvas.context.lineTo(back_center.x, back_center.y);
    canvas.context.lineTo(back_right.x, back_right.y);
    canvas.context.lineTo(front_center.x, front_center.y);
    canvas.context.lineTo(back_left.x, back_left.y);

    canvas.context.stroke();

    /*
    // draw line in its moving direction
    canvas.context.beginPath();
    canvas.context.strokeStyle = "red";
    canvas.context.moveTo(this.position.x, this.position.y);
    canvas.context.lineTo(this.position.x+this.velocity.normalize().x*lineLength, this.position.y+this.velocity.normalize().y*lineLength);
    canvas.context.stroke();

    //draw fov
    let fov = deg_to_rad(45);

    canvas.context.beginPath();
    canvas.context.strokeStyle = "red";
    let dir = this.velocity.angle();
    if (this.velocity.x < 0) {
      dir += Math.PI;
    }
    canvas.context.arc(this.position.x, this.position.y, lineLength, dir-fov, dir+fov);
    canvas.context.stroke();
    */
  }
}
