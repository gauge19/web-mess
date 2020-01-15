function slider_radius(value) {
  r = value;
}

function slider_rotation(axis, value) {
  if (axis == "x" || axis == "X") {
    ax = value;
  }
  if (axis == "y" || axis == "Y") {
    ay = value;
  }
  if (axis == "z" || axis == "Z") {
    az = value;
  }
}

function slider_rotationSpeed(value) {
  a_change = value;
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
    ax = document.getElementById("rotateX").value;
    ay = document.getElementById("rotateY").value;;
    az = document.getElementById("rotateZ").value;;
  }
}
