const GAME_SPEED = 30;

var canvas = new Canvas("gameCanvas", window.innerWidth-100, window.innerHeight-100);

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

  // player.direction.x = x - player.x;
  // player.direction.y = y - player.y;

  player.target = {x: x, y: y};

  //console.log("x: " + x + " y: " + y);
}

function event_mousedown(event) {
  const r = gameCanvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;
}

document.addEventListener("keydown", event_keypress);
document.addEventListener("mousemove", event_mousemove);
document.addEventListener("mousedown", event_mousedown);

var map = new Map(1000, canvas.height*2);
var camera = new Camera(canvas, map, 0, 0, canvas.width, canvas.height);

// initialising variables
var player = new Blob(map.w/2, map.w/2);
var population = new Population(map, 100);

function main() {
  setTimeout(function onTick() {
    canvas.clear();

    population.update();
    population.draw(camera);

    player.update();
    player.draw(camera);

    main();
  }, GAME_SPEED)
}
