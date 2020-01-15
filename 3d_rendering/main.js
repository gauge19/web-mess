const GAME_SPEED = 30;
const CANVAS_BACKGROUND_COLOR = "black";
const CANVAS_BORDER_COLOR = "grey";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

// ctx.translate(300, 200);

var running = true;
main();

document.addEventListener("keydown", event_keypress);

// defined in index.html to be used with sliders
/*
var r = 4; // radius of cirle used to represent points
var cube_scale = 10; // determins scale of cube
var ax = Math.PI/10; // angle of rotation along x axis
var ay = Math.PI/10; // angle of rotation along y axis
var az = Math.PI/10; // angle of rotation along z axis
var a_change = 0.0314; // change per frame (~1% of full rotation which is Pi or 3.14)
var a_update = 0; // used for auto rotation;
*/

var translation = [gameCanvas.width/2, gameCanvas.height/2]; // used to shift items to center

// points to form cube
var points = [new Vertex(-10, -10, -10),
              new Vertex(-10, 10, -10),
              new Vertex(10, 10, -10),
              new Vertex(10, -10, -10),

              new Vertex(-10, -10, 10),
              new Vertex(-10, 10, 10),
              new Vertex(10, 10, 10),
              new Vertex(10, -10, 10)];

// draws circle at the coordinates of the Vertex p
function drawPoint(p) {
  ctx.beginPath();
  ctx.fillStyle = p.color;
  ctx.arc(p.x*cube_scale+translation[0], p.y*cube_scale+translation[1], r, 0, 2*Math.PI);
  ctx.fill();
  //ctx.endPath();
}

// draws a line between two points
function drawLine(p1, p2) {
  ctx.beginPath();
  ctx.strokeStyle = p1.color;
  ctx.moveTo(p1.x*cube_scale+translation[0], p1.y*cube_scale+translation[1]);
  ctx.lineTo(p2.x*cube_scale+translation[0], p2.y*cube_scale+translation[1]);
  ctx.stroke();
}

function main() {
  setTimeout(function onTick() {
    clearCanvas();

    // calculate points
    var projected_arr = []; // all the newly calculated vertices
    var index = 0;
    for (point of points) {
      projected_arr[index] = point.rotate(ax, "x").rotate(ay, "y").rotate(az, "z").project();

      index++;
    }

    // draw the projected points
    for (p of projected_arr) {
      drawPoint(p);
    }

    // connecting points
    for (var i = 0; i < 4; i++) {
      drawLine(projected_arr[i], projected_arr[(i+1) % 4]);
      drawLine(projected_arr[i+4], projected_arr[((i+1) % 4)+4]);
      drawLine(projected_arr[i], projected_arr[i+4]);
    }

    // increase angle every frame to make it rotate automatically, handled by sliders
    ax += a_update;
    ay += a_update;
    az += a_update;

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
    ax+=0.03;
    console.log("ax: " + ax);
  }
  if (keyPressed === DOWN_KEY) {
    ax-=0.03;
    console.log("ax: " + ax);
  }
  if (keyPressed === LEFT_KEY) {
    ay+=0.03;
    console.log("ay: " + ay);
  }
  if (keyPressed === RIGHT_KEY) {
    ay-=0.03;
    console.log("ay: " + ay);
  }
  else {
    console.log("Key pressed: " + keyPressed);
  }
}
