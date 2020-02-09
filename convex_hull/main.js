import {Sketch, random, Calculations, test, Vector} from "../utils/utils.js";

var s = new Sketch("gameCanvas");
// s.canvas.setMode("CENTER");
var canvas = s.canvas
canvas.clear();

document.addEventListener("mousemove", event_mousemove);

function event_mousemove(event) {
  const r = canvas.canvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  document.getElementById("demo").innerHTML = "x: " + x + " y: " + y;
  //console.log("x: " + x + " y: " + y);
}

/**
 * @param {Vector} home
 * @param {Vector} p1
 * @param {Vector} p2
 * @returns {number} negative value if p2 is further left than p2 relative to home
 */
function direction(home, p1, p2) {
  let a = Vector.sub(p1, home);
  let b = Vector.sub(p2, home);
  let cross = a.cross(b);
  return cross.z;
}

/**
 * Bruteforce algorithm to find convex hull.
 * Runtime: O(n^3), where n is s.length.
 * @param {Vector[]} s original set of points
 * @returns {Vector[]} points on convex hull
 */
function bruteforce(s) {
  // find leftmost point (point with smallest x value)
  let hull = [];
  let leftmost = s[0]; // guaranteed to be on hull

  let current = leftmost;
  let next = current;

  do {
    // find a new random next value (CANNOT BE CURRENT!)
    while (next == current) {
      next = random.choice(s);
    }

    // add current to the hull
    hull.push(current);

    // compare every point in the set against next to find the greatest left turn from current
    for (var j = 0; j < s.length; j++) {
      let d = direction(current, next, s[j]);
      if (d < 0) {
        // if left turn is greater, update next
        next = s[j];
      }
    }

    // set "best" next as new current
    current = next;
  } while (current != leftmost && hull.length < count);

  return hull;
}

/**
 * Jarvis march algorithm to find convex hull.
 * Runtime: O(nh), where n is s.length and h is hull.length.
 * @param {Vector[]} s original set of points
 * @returns {Vector[]} points on convex hull
 */
function jarvis(s) {

  // find leftmost point (point with smallest x value)
  let minXindex = 0;
  for (var k = 1; k < s.length; k++) {
    if (s[k].x < s[minXindex].x) {
      minXindex = k;
    }
  }


  let pointsChecked = 0;
  let p = []; // array containing points on hull
  let pointOnHull = s[minXindex]; // leftmost point
  let i = 0;
  let endpoint;
  do {
    p[i] = pointOnHull; // add point to hull
    endpoint = s[0];
    for (var j = 0; j < s.length; j++) {
      pointsChecked+=1;

      // check if s[j] if further to the left than endpoint
      let a = Vector.sub(endpoint, p[i]);
      let b = Vector.sub(s[j], p[i]);
      let cross = a.cross(b); // less than 0 if s[j] is further outside than endpoint
      if (endpoint == pointOnHull || cross.z < 0) {
        endpoint = s[j]; // found greater left turn, update endpoint
      }
    }
    i += 1;
    pointOnHull = endpoint;
  } while (endpoint != p[0]); // as long as hull isn't closed

  console.log("points checked:", pointsChecked)
  return p;
}

/**
 * Merge two convex hulls into one.
 * @param {Vector[]} left left convex hull
 * @param {Vector[]} right right convex hull
 * @returns {Vector[]} merged convex hull of left and right
 */
function merge(left, right) {

  let pIndex = 0; // rightmost point (greatest x) of left ch
  for (var i = 1; i < left.length; i++) {
    if (left[i].x > left[pIndex].x) {
      pIndex = i;
    }
  }

  let qIndex = 0; // leftmost point (smallest x) of right ch
  for (var i = 1; i < right.length; i++) {
    if (right[i].x > right[qIndex].x) {
      qIndex = i;
    }
  }

  let p = left[pIndex];
  let q = right[qIndex];

  let pc = p.copy();
  let qc = q.copy();

  let prev_p = p;
  let prev_q = q;

  while (true) {
    pIndex = (pIndex+1)%right.length;
    qIndex = left.length+((pIndex-1)%left.length);

    prev_p = p;
    prev_q = q;

    let q_next = right[pIndex];
    while (direction(p, q, q_next) < 0) {
      q = q_next;
    }
    let p_next = left[qIndex];
    while (direction(p, q, p_next) < 0) {
      p = p_next;
    }
    if (p == prev_p && q == prev_q) {
      break;
    }
  }

  prev_p = undefined;
  prev_q = undefined;

  while (true) {
    pIndex = (pIndex+1)%right.length;
    qIndex = left.length+((pIndex-1)%left.length);

    let prev_p = pc;
    let prev_q = qc;

    let q_next = right[pIndex];
    while (direction(pc, qc, q_next) < 0) {
      q = q_next;
    }
    let p_next = left[qIndex];
    while (direction(pc, qc, p_next) < 0) {
      p = p_next;
    }
    if (pc == prev_p && qc == prev_q) {
      break;
    }
  }
}

/**
 * Divide and Conquer algorithm for convex hull.
 * @param {Vector[]} s original set of points sorted by x value ascending
 * @returns {Vector[]} points on convex hull
 */
function dnc(s) {

  // cut array into two equally sized halves
  let mid = Math.ceil((s.length-1)/2);
  //canvas.drawLine(s[mid].x, 0, s[mid].x, canvas.height, "yellow");
  let left = s.slice(0, mid);
  let right = s.slice(mid);

  // if size of halves is small enough use jarvis' march to conquer, else divide further
  const maxSize = 5;

  let l;
  let r;
  if (left.length <= maxSize && right.length <= maxSize) {
    // add points
    l = jarvis(left);
    r = jarvis(right);

    return merge(l, r);
  } else {
    // divide further
    l = dnc(left);
    r = dnc(right);

    return merge(l, r);
  }
}

var points = [];
const count = 1000;
const buffer = 20;
for (var i = 0; i < count-1; i++) {
  let v = new Vector(random.randint(buffer, canvas.width-buffer), random.randint(buffer, canvas.height-buffer));
  points.push(v);
}

points.sort((a, b) => a.x - b.x); // sort all points from lowest x to highest


const start = Date.now();
var hull = jarvis(points);
const end = Date.now();

console.log("number of points:", points.length);
console.log("time elapsed:", (end-start), "ms");
console.log("points on hull:", hull.length);

for (var p of points) {
  canvas.drawPoint(p.x, p.y, 1, "white");
}

for (var p of hull) {
  canvas.drawPoint(p.x, p.y, 2, "red");
}

canvas.drawShape(hull);
let alpha = Calculations.map(25, 0, 255, 0, 1);
canvas.drawShape(hull, "FILL", "rgba(255, 0, 0," + alpha + ")");

// canvas.drawPoint(hull[0].x, hull[0].y, 4, "yellow");
// canvas.drawPoint(hull[1].x, hull[1].y, 4, "purple");
