class Slider {
  static cohesion(v) {
    for (var boid of boids) {
      boid.cohesion_factor = v;
    }
  }

  static alignment(v) {
    for (var boid of boids) {
      boid.alignment_factor = v;
    }
  }

  static distance(v) {
    for (var boid of boids) {
      boid.min_distance = v;
    }
  }

  static speed(v) {
    for (var boid of boids) {
      boid.maxSpeed = v;
    }
  }

  static drawlines(checkbox) {
    let state = checkbox.checked;
    console.log(state);
    drawlines = state;
  }
}
