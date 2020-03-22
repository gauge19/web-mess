class Expression {
    str() {
      throw Error("str method not defined")
    }
  
    eval(env) {
      throw Error("eval method not defined")
    }
  }
  
class Constant extends Expression {
    value: any;
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

class Variable extends Expression {
    name: any;
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

class NumericalExp extends Expression {
    operator: string;
    left: any;
    right: any;
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

class Addition extends NumericalExp {
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

class Subtraction extends NumericalExp {
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

class Multiplication extends NumericalExp {
    constructor(l, r) {
        super("*", l, r);
    }

    eval(env) {
        return this.left.eval(env) * this.right.eval(env);
    }
}

class Division extends NumericalExp {
    constructor(l, r) {
        super("/", l, r);
    }

    eval(env) {
        return this.left.eval(env) / this.right.eval(env);
    }
}

class Power extends Expression {
    base: any;
    exponent: any;
    constructor(base: any, exponent: any) {
        super();
        
        // assign base
        this.base = base;

        // assign exponent
        this.exponent = exponent;
    }

    str(): string {
        let result: string = "";

        if (this.base instanceof Constant || this.base instanceof Variable) {
            result += this.base.str();
        } else {
            result += "(" + this.base.str() + ")";
        }

        result += "^"
            
        result += "(" + this.exponent.str() + ")";

        return result;
    }

    eval(env: object): number {
        return Math.pow(this.base.eval(env), this.exponent.eval(env));
    }
}

class Root extends Power {
    degree: any;
    constructor(base, degree) {
        super(base, new Division(new Constant(1), degree));
        
        this.degree = degree;
    }

    str(): string {        
        let result: string = "";

        if (this.degree instanceof Constant || this.degree instanceof Variable) {
            result += this.degree.str();
        } else {
            result += "(" + this.degree.str() + ")";
        }

        result += "√"

        result += "(" + this.base.str() + ")";

        return result;
    }
}

let expressions = {
    "+": Addition,
    "-": Subtraction,
    "*": Multiplication,
    "/": Division,
    "C": Constant,
    "V": Variable,
};

let e = [
    new Multiplication(new Constant(3), new Addition(new Variable("y"), new Variable("x"))),
    new Addition(new Multiplication(new Constant(3), new Variable("y")), new Variable("y")),
    new Subtraction(
        new Addition(
            new Multiplication(
            new Constant(3),
            new Variable("x")),
            new Variable("y")),
        new Multiplication(
            new Constant(2),
            new Variable("y"))),

    new Subtraction(
        new Multiplication(
            new Constant(3),
            new Addition(
            new Variable("x"),
            new Variable("y"))),
        new Multiplication(
            new Constant(2),
            new Variable("y"))),
    new Power(new Constant(5), new Addition(new Constant(2), new Variable("x"))),
    new Addition(new Constant(3), new Root(new Constant(625), new Constant(4))];

let environment = {"x": 2, "y": 4};
console.log(environment);


// print expressions and their values
for (const exp of e) {
    console.log(`${exp.str()} = ${exp.eval(environment)}`);
}
console.log();



function parseExp(exp: string) {
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
    let index: number; // index at which to split the expression

    for (let i = exp.length-1; i > 0; i--) {
        if (exp.charAt(i) == "+" || exp.charAt(i) == "-") {
        index = i;
        break;
        }
    }

    console.log("subbing at", index, "subbed:", exp.charAt(index));

    let l = exp.substring(0, index);
    let r = exp.substring(index).substr(1);

    console.log(l);
    console.log(r);

    let left = parseExp(l); // infinite loop --> DONT RUN!
    let right = parseExp(r);

    node = new expressions[exp.charAt(index)](left, right); // create new node

    console.log(node);
    return node;
}

// console.log(parseExp(e[1].str()).str());
