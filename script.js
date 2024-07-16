

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

const isValid = (a) => {
    const digitPattern = /\d/;
    return digitPattern.test(a);
}

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



let firstNumber = "";
let secondNumber = "";
let operation = null;
let displayValue = "0";

const numberButtons = document.querySelectorAll(".button-number");
const operationButtons = document.querySelectorAll(".button-operator");
const percentButton = document.querySelector(".percent");
const signButton = document.querySelector(".sign");
const decimalButton = document.querySelector(".decimal");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

function trimDisplayValue() {
    const MAX_LENGTH = 29;
    if (displayValue.length > MAX_LENGTH) {
        displayValue = displayValue.slice(-MAX_LENGTH);
    }
}

function updateDisplay() {
    trimDisplayValue()
    const displayElement = document.querySelector('.display-input');
    displayElement.innerText = displayValue;
}


let freeOperator = false;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const digit = button.innerHTML;
        if (operation === null) {
            if (displayValue === "0") {
                firstNumber = digit;
                displayValue = digit;
            } else {
                firstNumber += digit;
                displayValue += digit;
            }

            if (isValid(firstNumber)) {
                freeOperator = true;
            }
        } else {

            if (displayValue === firstNumber) {
                secondNumber = digit;
                displayValue = digit;
            } else {
                secondNumber += digit;
                displayValue += digit;
            }

            if (isValid(secondNumber)) {
                freeOperator = true;
            }
        }

        updateDisplay();
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonOperation = button.innerHTML;
        if (operation === null) {
            if (freeOperator === true) {
                firstNumber = displayValue;
                operation = buttonOperation;
                freeOperator = false;
            }
        }
        else if (freeOperator === true) {
            displayValue = String(operator(operation, +firstNumber, +displayValue));
            updateDisplay()
            firstNumber = displayValue;
            operation = buttonOperation;
            secondNumber = "";
            freeOperator = false;
        }

    })
})




