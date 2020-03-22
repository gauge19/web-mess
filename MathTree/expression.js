class Expression {
  str() {
    throw Error("str method not defined")
  }

  eval(env) {
    throw Error("eval method not defined")
  }
}

export class Constant extends Expression {
  constructor(val) {
    super();
    this.value = val;
  }

  str() {
    return this.value.toString();
  }

  eval(env) {
    return this.value;
  }
}

export class Variable extends Expression {
  constructor(name) {
    super();
    this.name = name;
  }

  str() {
    return this.name;
  }

  eval(env) {
    return env[this.name];
  }
}

export class NumericalExp extends Expression {
  constructor(op, l, r) {
    super();
    this.operator = op
    this.left = l;
    this.right = r;
  }

  str() {
    let result = "";

    if (this.left instanceof Constant || this.left instanceof Variable) {
      result += this.left.str();
    } else {
      result += "(" + this.left.str() + ")";
    }

    result += " " + this.operator + " ";

    if (this.right instanceof Constant || this.right instanceof Variable) {
      result += this.right.str();
    } else {
      result += "(" + this.right.str() + ")";
    }

    return result;
  }
}

export class Addition extends NumericalExp {
  constructor(l, r) {
    super("+", l, r);
  }

  str() {
    return this.left.str() + " + " + this.right.str();
  }

  eval(env) {
    return this.left.eval(env) + this.right.eval(env);
  }
}

export class Subtraction extends NumericalExp {
  constructor(l, r) {
    super("-", l, r);
  }

  str() {
    return this.left.str() + " - " + this.right.str();
  }

  eval(env) {
    return this.left.eval(env) - this.right.eval(env);
  }
}

export class Multiplication extends NumericalExp {
  constructor(l, r) {
    super("*", l, r);
  }

  eval(env) {
    return this.left.eval(env) * this.right.eval(env);
  }
}

export class Division extends NumericalExp {
  constructor(l, r) {
    super("/", l, r);
  }

  eval(env) {
    return this.left.eval(env) / this.right.eval(env);
  }
}

export let expressions = {
  "+": Addition,
  "-": Subtraction,
  "*": Multiplication,
  "/": Division,
  "C": Constant,
  "V": Variable,
};

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

// print expressions and their values
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

  node = new expressions[exp.charAt(index)](left, right); // create new node

  console.log(node);
  return node;
}

console.log(parseExp(e4.str()).str());
