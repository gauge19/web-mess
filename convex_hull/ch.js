class ConvexHull {
  constructor(points) {
    this.points = points;
    this.hull = [];
  }

  bruteforce() {
    if (this.points.length < 5) {

      // find leftmost point (point with smallest x value)
      let minXindex = 0;
      for (var i = 1; i < this.points.length; i++) {
        if (this.points[i].x < this.points[minXindex].x) {
          minXindex = i;
        }
      }

      let current = this.points[minXindex]; // leftmost point
      this.hull.push(current);
      let next = this.points[1];
      let index = 2;

      let checking = this.points[index];

    }
  }
}
