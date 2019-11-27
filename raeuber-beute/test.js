console.log("test.js succesfully loaded");

$("#p1").click(function () {
  console.log("p1 clicked");
  $(this).hide();
})

function myFunc() {
  $("#p1").toggle();
}
