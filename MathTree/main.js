import {Sketch, random, Calculations, Vector, Canvas, rgb, hsl} from "../utils/utils.js";
import {Constant, Variable, Addition, Subtraction, Multiplication, Division, expressions} from "./expression.js";

var s = new Sketch("gameCanvas");

var canvas = s.canvas;
canvas.clear();

document.addEventListener("mousemove", event_mousemove);
document.addEventListener("mousedown", event_mousedown);

function event_mousedown(event) {
  const r = canvas.canvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;
}

function event_mousemove(event) {
  const r = canvas.canvas.getBoundingClientRect();
  const x = event.clientX - r.left;
  const y = event.clientY - r.top;

  document.getElementById("demo").innerHTML = "x: " + x + " y: " + y;
}

let e1 = new Multiplication(new Constant(3), new Addition(new Variable("y"), new Variable("x")))
let e2 = new Addition(new Multiplication(new Constant(3), new Variable("y")), new Variable("y"));
let e3 = new Subtraction(
          new Addition(
            new Multiplication(
              new Constant(3),
              new Variable("x")),
            new Variable("y")),
          new Multiplication(
            new Constant(2),
            new Variable("y")));

let e4 = new Subtraction(
          new Multiplication(
            new Constant(3),
            new Addition(
              new Variable("x"),
              new Variable("y"))),
          new Multiplication(
            new Constant(2),
            new Variable("y")));

let environment = {"x": 2, "y": 4};

console.log(`${e1.str()} = ${e1.eval(environment)}`);
console.log(`${e2.str()} = ${e2.eval(environment)}`);
console.log(`${e3.str()} = ${e3.eval(environment)}`);
console.log(`${e4.str()} = ${e4.eval(environment)}`);

function parseExp(exp) {
  /*
   * back to front
   * look for "+" or "-" OUTSIDE of brackets --> first node
   * check everything left of node
   * repeat
   * check everything right of node
   * repeat
   *
   * if there are no "+" or "-" outside of brackets, look for "*" or "/"
   * if there is only a bracket-expressions left in a block, disregard brackets and repeat
   */

  exp = exp.replace(/ /g, ""); // delete whitespaces

  let node;
  let index; // index at which to split the expression

  for (var i = exp.length-1; i > 0; i--) {
    if (exp.charAt(i) == "+" || exp.charAt(i) == "-") {
      index = i;
      break;
    }
  }

  console.log("subbing at", index, "subbed:", exp.charAt(index));

  let left = exp.substring(0, index);
  let right = exp.substring(index).substr(1);

  console.log(left);
  console.log(right);

  node = new expressions[exp.charAt(index)]; // create new node


  return node;
}

console.log(parseExp(e4.str()).str());
