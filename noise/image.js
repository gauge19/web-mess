function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}


/**
 * Returns object with RGBA values at specified location.
 *
 * @param  {ImageData} imageData ImageData object to retrive color from.
 * @param  {number} x X value of pixel to be retrieved.
 * @param  {number} y Y value of pixel to be retrieved.
 * @return {{imageData: ImageData, r: number, g: number, b: number, a: number}} description
 */
function getColorAt(imageData, x, y) {
  let i = getColorIndicesForCoord(x, y, imageData.width);
  let data = imageData.data;
  return {imageData: imageData, r: data[i[0]], g: data[i[1]], b: data[i[2]], a: data[i[3]]};
}

function greyscale(imageData, ctx) {
  let data = imageData.data;
  for (var i = 0; i < data.length; i+=4) {
    let avg = (data[i] + data[i+1] + data[i+2]) / 3;
    data[i] = avg;
    data[i+1] = avg;
    data[i+2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
}

function inverse(imageData, ctx) {
  let data = imageData.data;
  for (var i = 0; i < data.length; i+=4) {
    data[i] = 255-data[i];
    data[i+1] = 255-data[i+1];
    data[i+2] = 255-data[i+2];
  }
  ctx.putImageData(imageData, 0, 0);
}

function randomize(imageData, ctx) {
  let data = imageData.data;
  for (var i = 0; i < data.length; i+=4) {
    let v = Math.ceil(Math.random()*255);
    data[i] = v;
    data[i+1] = v;
    data[i+2] = v;
    data[i+3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}

function draw() {
  let canvas = document.getElementById('gameCanvas');
  let ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0);

  img.style.display = 'none';

  // let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(getColorAt(imageData, 200, 200));

  // greyscale(imageData, ctx);
  //inverse(imageData, ctx);

  let imageData = ctx.createImageData(400, 400);
  console.log(getColorAt(imageData, 200, 200));
  randomize(imageData, ctx);

  console.log(getColorAt(imageData, 200, 200));
}

var img = new Image();
img.src = './image.jpg';
img.onload = function() {
  draw(this);
};
