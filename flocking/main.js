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
const viewing_radius = 30;
var v1 = new Vector2(100, 100);

// create boids
const boidCount = 10;
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
      let viewfield = new Circle(boid.position.x, boid.position.y, viewing_radius);
      viewfield.draw(canvas.context);
      let surrounding = qtree.query(viewfield); // array containing all boids within viewfield (including itself)
      //console.log(surrounding);

      boid.update(surrounding);
      boid.draw(canvas);
    });

    // draw circle around vector by using its rotated points
    let x = canvas.width/2 + v1.x;
    let y = canvas.height/2 + v1.y;
    drawPoint(x, y, 5, "red");

    const heading = v1.heading_deg();
    var a = 0;
    while (a<360) {
      let v2 = Vector2.add(v1, v1.rotate(a+heading));

      let x2 = canvas.width/2 + v2.x;
      let y2 = canvas.height/2 + v2.y;

      // highlight a degrees in blue, rest is yellow
      if(a == 180) {
        drawPoint(x2, y2, 4, "blue");
      } else {
        drawPoint(x2, y2, 1, "yellow");
      }
      a++;
    }


    main();
  }, GAME_SPEED)
}
