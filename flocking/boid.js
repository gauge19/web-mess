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

    canvas.context.beginPath();
    canvas.context.fillStyle = "white";
    canvas.context.arc(this.position.x, this.position.y, r, 0, 2*Math.PI);
    canvas.context.fill();

    // // draw line in its moving direction
    // canvas.context.beginPath();
    // canvas.context.strokeStyle = "red";
    // canvas.context.moveTo(this.position.x, this.position.y);
    // canvas.context.lineTo(this.position.x+this.velocity.normalize().x*lineLength, this.position.y+this.velocity.normalize().y*lineLength);
    // canvas.context.stroke();
    //
    // //draw fov
    // let fov = deg_to_rad(45);
    //
    // canvas.context.beginPath();
    // canvas.context.strokeStyle = "red";
    // let dir = this.velocity.angle();
    // if (this.velocity.x < 0) {
    //   dir += Math.PI;
    // }
    // canvas.context.arc(this.position.x, this.position.y, lineLength, dir-fov, dir+fov);
    // canvas.context.stroke();

    // draw triangle rotated in moving direction
    canvas.context.beginPath();
    canvas.context.strokeStyle = "pink";
    let back_left = this.velocity.rotate(135).normalize();
    canvas.context.moveTo(this.position.x+back_left.x*lineLength, this.position.y+back_left.y*lineLength);
    let back_right = this.velocity.rotate(360-135).normalize();
    canvas.context.lineTo(this.position.x+back_right.x*lineLength, this.position.y+back_right.y*lineLength);
    let front_center = this.velocity.normalize();
    canvas.context.lineTo(this.position.x+front_center.x*lineLength*1.5, this.position.y+front_center.y*lineLength*1.5);
    canvas.context.lineTo(this.position.x+back_left.x*lineLength, this.position.y+back_left.y*lineLength);
    canvas.context.stroke();

  }
}
