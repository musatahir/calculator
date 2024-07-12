

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

let first;
let second;
let op;

function operator(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "-":
            return subtract(a, b);
        default:
            throw new Error("Unsupported Operator");
    }
}




