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
var test1 = new Rectangle(gameCanvas.width/2, gameCanvas.height/2, 100, 100);
var test2 = new Circle(gameCanvas.width/2, gameCanvas.height/2, 100);
var p1 = new Point(gameCanvas.width/2-10, gameCanvas.height/2-10);

var qtree = new Quadtree(rect, 4);
for (var i = 0; i < 30; i++) {
  qtree.insert(new Point(randint(rect.left, rect.right), randint(rect.top, rect.bottom)))
}
qtree.insert(p1);
qtree.drawPoints();

document.addEventListener("keydown", event_keypress);
document.addEventListener("mousemove", event_mousemove);
document.addEventListener("mousedown", event_mousedown);

function main() {
  setTimeout(function onTick() {
    clearCanvas();

    // rect.draw(ctx);
    qtree.draw(ctx);
    test2.draw(ctx, "green");
    let pts = qtree.query(test2);
    for (point of pts) {
      drawPoint(point.x, point.y, 4, "green");
    }
    drawPoint(p1.x, p1.y, 5, "blue");

    let lmao = qtree.closest(p1, 4);
    for (point of lmao) {
      drawPoint(point.x, point.y, 4, "purple");
    }

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
    console.log(qtree.query(test2).length);
  }
  else if (keyPressed === DOWN_KEY) {

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

  test2.x = x;
  test2.y = y;

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
