

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
let decimalLength;

function roundToMaxFiveDecimals(number) {
    const strNumber = number.toString();
    console.log(strNumber);
    const numberLength = strNumber.length;
    if (strNumber.includes('.')) {
        decimalLength = strNumber.split('.')[1].length;
    }
    else {
        decimalLength = 0
    }
    console.log(numberLength);
    if (numberLength > 10) {
        console.log(strNumber);
        if (numberLength - decimalLength < 6 && !strNumber.includes('e')) {
            return number.toFixed(5);
        }
        return number.toExponential(3)
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
    operationButtons.forEach(button => button.classList.remove('operation-selected'));
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
            operationButtons.forEach(button => button.classList.remove('operation-selected'));
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
                button.classList.toggle('operation-selected');
            }
        }
        else if (freeOperator === true) {
            displayValue = String(roundToMaxFiveDecimals(operator(operation, +firstNumber, +displayValue)));
            updateDisplay()
            firstNumber = displayValue;
            operation = buttonOperation;
            console.log(operation);
            freeOperator = false;
            document.querySelector(".button-operator");
            button.classList.toggle('operation-selected');
        }

    })
})




