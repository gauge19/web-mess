const GAME_SPEED = 30;
const CANVAS_BACKGROUND_COLOR = "black";
const CANVAS_BORDER_COLOR = "grey";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

var running = true;
main();

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1)) + min;;
}

var rect = new Rectangle(gameCanvas.width/2, gameCanvas.height/2, gameCanvas.width/2-50, gameCanvas.height/2-50);
// var circ = new Circle(100, 100, 100);

var qtree = new Quadtree(rect, 4);
for (var i = 0; i < 100; i++) {
  //console.log(i);
  if (qtree.insert(new Point(randint(rect.left, rect.right), randint(rect.top, rect.bottom)))) {
      //console.log("error");
  }
}
qtree.drawPoints();

document.addEventListener("keydown", event_keypress);
document.addEventListener("mousemove", event_mousemove);
document.addEventListener("mousedown", event_mousedown);

function main() {
  setTimeout(function onTick() {
    clearCanvas();

    // rect.draw(ctx);
    qtree.draw(ctx);
    qtree.drawPoints();

    main();
  }, GAME_SPEED)
}

function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = CANVAS_BORDER_COLOR;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function event_keypress(event) {

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  //console.log(keyPressed);

  if (keyPressed === UP_KEY) {
    console.log(qtree.query(new Rect(gameCanvas.width/2, gameCanvas.height/2, 100, 100)));
  }
  else if (keyPressed === DOWN_KEY) {
    ax-=0.03;
    console.log("ax: " + ax);
  }
  else if (keyPressed === LEFT_KEY) {
    ay+=0.03;
    console.log("ay: " + ay);
  }
  else if (keyPressed === RIGHT_KEY) {
    ay-=0.03;
    console.log("ay: " + ay);
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
  //console.log("x: " + x + " y: " + y);
}

function event_mousedown(event) {
  const r = gameCanvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  qtree.insert(new Point(x, y));
  //console.log("x: " + x + " y: " + y);
}
