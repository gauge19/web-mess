class Boid {
  constructor() {
    this.position = new Vector2(random.random(canvas.width), random.random(canvas.height));
    this.velocity = new Vector2(random.random(-1, 1), random.random(-1, 1));
    this.accelaration = new Vector2();
    this.maxSpeed = 1;
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

  separation(boids) {

  }

  alignment(boids) {
    var avg = new Vector2();
    let count = 0;
    for (var boid of boids) {
      boid = boid.userData;
      if (boid != this) {
        avg.add_vector_ip(boid.velocity);
        count++;
      }
    }
    if (count > 0) {
      avg.div_ip(count);

      // Implement Reynolds: Steering = Desired - Velocity
      avg = avg.normalize();
      avg.mult_ip(this.maxSpeed);
      avg.log()
      let steer = Vector2.sub(avg, this.velocity).normalize();
      this.accelaration.add_vector_ip(steer);
    }
  }

  cohesion(boids) {

  }

  update(boids) {

    // this.separation(boids);
    // this.alignment(boids);
    // this.cohesion(boids);

    this.velocity = Vector2.add(this.velocity, this.accelaration);
    this.velocity.limit(this.maxSpeed);
    this.position = Vector2.add(this.position, this.velocity);
    this.accelaration.mult_ip(0);
    this.wrap(canvas);
  }

  draw(canvas) {
    let r = 2;
    let lineLength = 10;

    // draw center of boid
    drawPoint(this.position.x, this.position.y, r, "white");

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
