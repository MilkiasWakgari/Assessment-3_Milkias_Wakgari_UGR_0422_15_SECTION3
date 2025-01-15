const resultDisplay = document.getElementById("result");

let currentInput = "0";
let previousInput = null;
let operator = null;

function updateDisplay() {
    resultDisplay.textContent = currentInput;
}

function clearCalculator() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    updateDisplay();
}

function handleNumber(number) {
    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator && previousInput !== null) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "0";
}

function calculate() {
    if (operator && previousInput !== null) {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operator) {
            case "+":
                currentInput = (prev + curr).toString();
                break;
            case "-":
                currentInput = (prev - curr).toString();
                break;
            case "×":
                currentInput = (prev * curr).toString();
                break;
            case "÷":
                currentInput = curr !== 0 ? (prev / curr).toString() : "Error";
                break;
        }

        operator = null;
        previousInput = null;
        updateDisplay();
    }
}

function handleSignChange() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function handlePercent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

// Event Listeners
document.querySelectorAll(".btn.number").forEach((button) => {
    button.addEventListener("click", () => handleNumber(button.textContent));
});

document.querySelectorAll(".btn.operator").forEach((button) => {
    button.addEventListener("click", () => handleOperator(button.textContent));
});

document.getElementById("clear").addEventListener("click", clearCalculator);
document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("sign").addEventListener("click", handleSignChange);
document.getElementById("percent").addEventListener("click", handlePercent);
document.getElementById("decimal").addEventListener("click", handleDecimal);