function changeSpeed(s) {
  rotationSpeed = parseInt(s)/10;
}

function changeAngle(a) {
  rotationAngle = parseInt(a);
  console.log(rotationAngle);
}

function changeFOV(v) {
  console.log("FOV:", v);
  fov = parseInt(v);
}
