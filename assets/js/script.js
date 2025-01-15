// Calculator Project
///////////////////////


// Dom Selection
const display = document.getElementById('display');
const clearButton = document.getElementById('clearButton');
const equalButton = document.getElementById('equalButton');
const backspaceButton = document.getElementById('backspaceButton');
const buttons = document.querySelectorAll('.button[data-value]');


// Functions for the calculator operations
function appendValue(value) {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

// Function to clear the content inside the output
function clearDisplay() {
    display.textContent = '0';
}

// Function to press the backspace button
function backspace() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}


function calculate() {
    const expression = display.textContent;
    try {
        // First, handle the power operator '^'
        const powerExpression = handlePowerOperator(expression);

        // Now, we calculate the expression without eval
        const result = evaluateExpression(powerExpression);
        display.textContent = result;
    } catch (error) {
        display.textContent = 'Error';
    }
}

function handlePowerOperator(expression) {
    // This for Replace '^' with '**' for the exponentiation operation
    return expression.replace(/\^/g, '**');
}

function evaluateExpression(expression) {
    // Split the expression into an array of numbers and operators
    const operators = ['+', '-', '*', '/', '**'];
    let numbers = [];
    let currentNumber = '';
    let currentOperator = '';

    // Iterate over the expression and parse the numbers and operators
    for (let char of expression) {
        if (operators.includes(char)) {
            if (currentNumber) {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            currentOperator = char;
            numbers.push(currentOperator);
        } else {
            currentNumber += char;
        }
    }
    if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
    }

    // Now, calculate the result step by step
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === '+') {
            result += numbers[i + 1];
        } else if (numbers[i] === '-') {
            result -= numbers[i + 1];
        } else if (numbers[i] === '*') {
            result *= numbers[i + 1];
        } else if (numbers[i] === '/') {
            result /= numbers[i + 1];
        } else if (numbers[i] === '**') {
            result = Math.pow(result, numbers[i + 1]);
        }
        i++;
    }
    return result;
}


// addEventListeners

// Event listener for number and operator buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        appendValue(value);
    });
});

// Event listener for the clear button
clearButton.addEventListener('click', clearDisplay);

// Event listener for the backspace button
backspaceButton.addEventListener('click', backspace);

// Event listener for the equal button
equalButton.addEventListener('click', calculate);