

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => {
    if (b === 0) {
        return "Invalid";
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
    const MAX_LENGTH = 10;
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
    const absNumber = Math.abs(number);
    console.log(number);
    if (absNumber > 99999999) {
        return (number.toExponential(3));
    }
    else if (strNumber.includes('.')) {
        const decimalLength = strNumber.split('.')[1].length;
        let scientificNotation = number.toExponential(3);
        let figs = scientificNotation.split('e')[0].replace('.', '').replace(/0+$/, '').length;
        if (decimalLength > 5) {
            if (figs < 5) {
                return scientificNotation;
            }
            return Number(number.toFixed(5));
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

            if (displayValue === firstNumber && freeOperator === false) {
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




