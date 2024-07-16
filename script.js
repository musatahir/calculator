

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
let operation = null;
let displayValue = "0";

const numberButtons = document.querySelectorAll(".button-number");
const operationButtons = document.querySelectorAll(".button-operator");
const percentButton = document.querySelector(".percent");
const signButton = document.querySelector(".sign");
const decimalButton = document.querySelector(".button-decimal");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

function trimDisplayValue() {
    const MAX_LENGTH = 29;
    if (displayValue.length > MAX_LENGTH) {
        return displayValue.slice(-MAX_LENGTH);
    }
    return displayValue;
}

function updateDisplay() {
    const displayElement = document.querySelector('.display-input');
    displayElement.innerText = trimDisplayValue(displayValue);
}


let freeOperator = false;

function roundToMaxFiveDecimals(number) {
    const strNumber = number.toString();
    if (strNumber.includes('.')) {
        const decimalPart = strNumber.split('.')[1];
        if (decimalPart.length > 5) {
            console.log("OK");
            return Number((number.toExponential(5)));
        }
    }
    return number;
}



percentButton.addEventListener('click', () => {
    if (freeOperator === true) {
        displayValue = String(roundToMaxFiveDecimals(operator("/", +displayValue, 100)));
        updateDisplay()
    }
})


signButton.addEventListener('click', () => {
    if (freeOperator === true) {
        displayValue = String(roundToMaxFiveDecimals(operator("*", -1, +displayValue)));
        updateDisplay()
    }
})


decimalButton.addEventListener('click', () => {

    if (displayValue === firstNumber) {
        displayValue = ".";
        updateDisplay()
    } else if (!displayValue.includes('.')) {
        displayValue += ".";
        updateDisplay()
    }

})

clearButton.addEventListener('click', () => {
    firstNumber = "";
    operation = null;
    displayValue = "0";
    updateDisplay()
    freeOperator = false;
})

equalsButton.addEventListener('click', () => {
    if (operation !== null && freeOperator === true) {
        displayValue = String(roundToMaxFiveDecimals(operator(operation, +firstNumber, +displayValue)));
        updateDisplay()
        firstNumber = displayValue;
        operation = null;
    }
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const digit = button.innerHTML;
        if (operation === null) {
            if (displayValue === "0") {
                // firstNumber = digit;
                displayValue = digit;
            } else {
                // firstNumber += digit;
                displayValue += digit;
            }

        } else {

            if (displayValue === firstNumber) {
                // secondNumber = digit;
                displayValue = digit;
            } else {
                // secondNumber += digit;
                displayValue += digit;
            }

        }

        if (isValid(displayValue)) {
            freeOperator = true;
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
            displayValue = String(roundToMaxFiveDecimals(operator(operation, +firstNumber, +displayValue)));
            updateDisplay()
            firstNumber = displayValue;
            operation = buttonOperation;
            freeOperator = false;
        }

    })
})




