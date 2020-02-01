function slider_radius(value) {
  r = value;
}

function slider_rotation(axis, value) {
  value = parseInt(value);
  if (axis == "x" || axis == "X") {
    ax = value;
    console.log("ax:", ax);
  }
  if (axis == "y" || axis == "Y") {
    ay = value;
    console.log("ay:", ay);
  }
  if (axis == "z" || axis == "Z") {
    az = value;
    console.log("az:", az);
  }
}

function slider_rotationSpeed(value) {
  a_update = parseInt(value)/100;
  console.log("a_update: " + a_update);
}

function checkbox_autoRotate(checkbox) {
  var state = checkbox.checked;

  console.log("state: " + state);
  if (state) {
    // reset angle values so no errors occur
    ax = 0;
    ay = 0;
    az = 0;

    a_update = a_change;
  } else {
    // turn off auto rotate
    a_update = 0;

    // set angle to values of sliders
    ax = parseInt(document.getElementById("rotateX").value);
    ay = parseInt(document.getElementById("rotateY").value);
    az = parseInt(document.getElementById("rotateZ").value);
  }
}
