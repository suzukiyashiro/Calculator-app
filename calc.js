'use strict';
{
    
    function isNumber(value) {
        return !isNaN(value) || value === '.';
    }
    
    function appendNumber(number) {
        if (currentInput.length < 12) {
            if (number === '.' && currentInput.includes('.')) return;
    
            if (currentInput === "0" && number !== ".") {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }
    }
    
    function clear() {
        currentInput = "0";
        previousInput = "";
        operation = null;
        clearSelected();
    }
    
    function toggleSign() {
        if (currentInput !== "0") {
            currentInput = currentInput.startsWith("-") ? currentInput.substring(1) : "-" + currentInput;
        }
    }
    
    function applyPercentage() {
        currentInput = String((parseFloat(currentInput) / 100).toFixed(10)).replace(/\.0+$/, '');
        // 10桁までの数字に丸め、不要な0をトリム
        if (currentInput.length > 12) {
            currentInput = parseFloat(currentInput).toExponential(5); // 最大12桁の指数表示に変換
        }
    }
    
    
    function setOperation(op) {
        if (previousInput !== "" && currentInput !== "" && operation) {
            calculate();
        }
    
        if (currentInput !== "") {
            previousInput = currentInput;
            shouldClearScreen = true;
        }
    
        operation = op;
        clearSelected();
        document.querySelector(`.btn.orange[data-operation='${op}']`).classList.add("selected");
    }
    
    function calculate() {
        let result;
    
        if (!operation || previousInput === "") return;
    
        let prev = parseFloat(previousInput);
        let curr = parseFloat(currentInput);
    
        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '×':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
        }
    
        currentInput = String(result).slice(0, 12);
        previousInput = "";
        operation = null;
        clearSelected();
    }
    
    function updateDisplay() {
        document.getElementById('screen').innerText = currentInput;
    }
    
    function clearSelected() {
        document.querySelectorAll('.btn.selected').forEach(button => {
            button.classList.remove('selected');
        });
    }
    
    let currentInput = "0";
    let previousInput = "";
    let operation = null;
    let shouldClearScreen = false;
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            let value = this.innerText;
    
            if (isNumber(value)) {
                if (shouldClearScreen) {
                    currentInput = "";
                    shouldClearScreen = false;
                }
                appendNumber(value);
            } else {
                switch (value) {
                    case 'AC':
                        clear();
                        break;
                    case '±':
                        toggleSign();
                        break;
                    case '%':
                        applyPercentage();
                        break;
                    case '+':
                    case '-':
                    case '×':
                    case '÷':
                        setOperation(value);
                        break;
                    case '=':
                        calculate();
                        break;
                }
            }
    
            updateDisplay();
        });
    });

}
