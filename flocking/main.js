const GAME_SPEED = 30;

var canvas = new Canvas("gameCanvas", 600, 400);

var running = true;
main();

function event_keypress(event) {

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  //console.log(keyPressed);

  if (keyPressed === UP_KEY) {
    camera.move(0, -1);
  }
  else if (keyPressed === DOWN_KEY) {
    camera.move(0, 1);
  }
  else if (keyPressed === LEFT_KEY) {
    camera.move(-1, 0);
  }
  else if (keyPressed === RIGHT_KEY) {
    camera.move(1, 0);
  }
  else {
    console.log("Key pressed: " + keyPressed);
  }
}

function event_mousemove(event) {
  const r = gameCanvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  document.getElementById("demo").innerHTML = "x: " + x + " y: " + y;
}

function event_mousedown(event) {
  const r = gameCanvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;
}

document.addEventListener("keydown", event_keypress);
document.addEventListener("mousemove", event_mousemove);
document.addEventListener("mousedown", event_mousedown);

// variables
const canvas_boundary = new Rectangle(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);
// var v1 = new Vector2(3, 4);

// create boids
const boidCount = 70;
var boids = [];
for (var i = 0; i < boidCount; i++) {
  boids.push(new Boid());
}

// game loop
function main() {
  setTimeout(function onTick() {
    canvas.clear();

    // build new quadtree every frame to adapt to moving boids
    var qtree = new Quadtree(canvas_boundary);
    for (var b of boids) {
      qtree.insert(new Point(b.position.x, b.position.y, b));
    }

    // draw qtree boundaries onto the canvas
    qtree.draw(canvas.context);

    // update and draw all boids
    qtree.forEach(function (boid) {

      // boundary to chech for surrounding boids
      let viewfield = new Circle(boid.position.x, boid.position.y, boid.min_distance);
      //viewfield.draw(canvas.context);
      let allBoids = qtree.query(canvas_boundary); // array containing all boids (including itself)
      let closeBoids = qtree.query(viewfield); // array containing all boids within viewfield (including itself)

      boid.update(allBoids, closeBoids);
      boid.draw(canvas);
    });

    main();
  }, GAME_SPEED)
}
