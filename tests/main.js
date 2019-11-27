var input1 = document.getElementById("input1");
var demo = document.getElementById("demo");
demo.innerHTML = input1.value;

function btn1_action() {
  demo.innerHTML = input1.value;
}

function btn2_action() {
  // demo.innerHTML = input1.value;
  window.open("kurse1.csv");
}
