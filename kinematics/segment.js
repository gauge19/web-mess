import {random, Calculations, Vector, Canvas, rgb, hsl} from "../utils/utils.js";

export class Segment {
  constructor(x, y, len) {

    let r = random.randint(0, 255);
    let g = random.randint(0, 255);
    let b = random.randint(0, 255);
    this.color = rgb(255, 255, 255);

    this.parent;
    this.a;
    this.length;
    this.angle = 0; // in degrees
    this.b_ = new Vector();

    if (x instanceof Segment) {
      // a => x.b (parent's b), y => len
      this.parent = x;
      this.a = this.parent.b.copy();
      this.length = y;
    } else if (typeof x == "number") {
      this.a = new Vector(x, y);
      this.length = len;
    }
  }

  get b() {
    let a = Calculations.deg_to_rad(this.angle);

    let dx = this.length * Math.cos(a);
    let dy = this.length * Math.sin(a);

    this.b_.set(this.a.x+dx, this.a.y+dy);

    return this.b_;
  }

  setA(newA) {
    this.a = newA.copy();
  }

  update() {
    if (this.parent) {
      this.a = this.parent.b.copy(); // update a based on parents b
    }
  }

  follow(target) {
    let dir = Vector.sub(target, this.a);
    this.angle = dir.heading();
    dir.mag = this.length;
    dir.mult(-1);
    this.a = Vector.add(target, dir);
  }

  draw(canvas, color) {
    if (!color) {
      color = this.color;
    }
    canvas.drawLine(this.a.x, this.a.y, this.b.x, this.b.y, color, 15);
  }
}

export class Segments {
  constructor(base, size, segLength=25) {
    this.base = base;

    this.segments = [];
    this.segments.push(new Segment(0, 0, segLength));
    for (var i = 1; i < size; i++) {
      this.segments[i] = new Segment(this.segments[i-1], segLength);
    }
  }

  follow(target) {
    let total = this.segments.length;
    let end = this.segments[total-1]; // last segment
    end.follow(target);

    for (var i = total-2; i >= 0; i--) {
      this.segments[i].follow(this.segments[i+1].a);
    }

    this.segments[0].setA(this.base);
    for (var i = 1; i < total; i++) {
      this.segments[i].setA(this.segments[i-1].b);
    }
  }

  draw(canvas) {
    if (!canvas) {
      throw Error("canvas not defined in Segments.draw()");
    } else {
      for (var seg of this.segments) {
        seg.draw(canvas);
      }
    }
  }
}
