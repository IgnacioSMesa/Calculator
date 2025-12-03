let numbers = document.getElementsByClassName("buttonNumber");
let nums = [];
let currentOperator = null;
let currentNumber = "";
let display = document.querySelector(".display");
let equalButton = document.getElementById('buttonEqual');

equalButton.disabled = true;

// funcion para comprobar que solo se pueda presionar el boton igual cuando haya suficientes datos
function updateEqualState() {
    if (nums.length === 1 && currentOperator !== null && currentNumber !== "") {
        equalButton.disabled = false;
    } else {
        equalButton.disabled = true;
    }
}


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function() {
        let selectedNumber = numbers[i].innerText;
        if (selectedNumber === '.' && !currentNumber.includes('.')) {
            currentNumber += selectedNumber;
        } else if (selectedNumber !== '.') {
            currentNumber += selectedNumber;
        }
        display.innerText = currentNumber;
        updateEqualState();
    });
}

let sign = document.getElementsByClassName("buttonSpecial");

for (let i = 0; i < sign.length; i++) {
    sign[i].addEventListener('click', function() {
        let operator = sign[i].innerText;

        if (operator === "C") {
            currentNumber = "";
            nums = [];
            currentOperator = null;
            display.innerText = "0";
            equalButton.disabled = true;

        } else if (operator === "±") {
            currentNumber = (parseFloat(currentNumber) * -1).toString();
            display.innerText = currentNumber;

        } else if (operator === "%") {
            currentNumber = (parseFloat(currentNumber) / 100).toString();
            display.innerText = currentNumber;

        } else {

            if (currentNumber !== "") {
                nums.push(parseFloat(currentNumber));
                currentNumber = "";
            }
            currentOperator = operator;
            display.innerText = currentOperator;
            
            updateEqualState();
        }
        
    });
}

equalButton.addEventListener('click', function() {
    if (currentNumber !== "") {
        nums.push(parseFloat(currentNumber));
        currentNumber = "";
        equalButton.disabled = false;
    }

    let result;
    if (nums.length >= 2) {

        if (currentOperator === '+') {
            result = nums.reduce((acc, num) => acc + num, 0);

        } else if (currentOperator === '−') {
            result = nums.reduce((acc, num) => acc - num);

        } else if (currentOperator === '×') {
            result = nums.reduce((acc, num) => acc * num, 1);

        } else if (currentOperator === '÷') {
            result = nums.reduce((acc, num) => acc / num);

        }
    }

    display.innerText = result;
    nums = [result];
});
