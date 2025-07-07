let textDisplay = document.getElementById("textDisplay");
let firstNumber = "";
let secondNumber = "";
let operated = false;
let operator = "";
let completed = false;

const enterDigit = (int) => {
    if (completed) {
        clear();
    }
    if (!operated) {
        textDisplay.insertAdjacentHTML('beforeend', int);
        firstNumber = firstNumber.concat(int);
    } else {
        textDisplay.insertAdjacentHTML('beforeend', int);
        secondNumber = secondNumber.concat(int);
    }
}

const produceAnswer = (x, operation, y) => {
    let result = 0;
    if (operated) {

        finalX = parseFloat(x);
        finalY = parseFloat(y);

        switch (operation) {
            case "+":
                result = finalX + finalY;
                break;
            case "-":
                result = finalX - finalY;
                break;
            case "*":
                result = finalX * finalY;
                break;
            case "/":
                if (finalX == 0 || finalY == 0) {
                    textDisplay.innerText = "Don't do that!";
                    return;
                } else {
                    result = finalX / finalY;
                }
                break;
        }

        completed = true;
        console.log(result);
        textDisplay.insertAdjacentHTML('beforeend', Number(result.toFixed(2)));
    }
}

const clear = () => {
    operator = "";
    firstNumber = "";
    secondNumber = "";
    operated = false;
    textDisplay.innerHTML = "";
    completed = false;
}

const func = (command) => {
    switch (command) {
        case "add":
            if (completed) {
                clear();
            }
            if (!operated || firstNumber != "") {
                textDisplay.insertAdjacentHTML('beforeend', " + ");
                operator = "+";
                operated = true;
            }
            break;
        case "subtract":
            if (completed) {
                clear();
            }
            if (!operated || firstNumber != "") {
                textDisplay.insertAdjacentHTML('beforeend', " - ");
                operator = "-";
                operated = true;
            }
            break;
        case "multiply":
            if (completed) {
                clear();
            }
            if (!operated || firstNumber != "") {
                textDisplay.insertAdjacentHTML('beforeend', " x ");
                operator = "*";
                operated = true;
            }
            break;
        case "divide":
            if (completed || firstNumber != "") {
                clear();
            }
            if (!operated || firstNumber != "") {
                textDisplay.insertAdjacentHTML('beforeend', " &#247; ");
                operator = "/";
                operated = true;
            }
            break;
        case "clear":
            clear();
            break;
        case "equals":
            if (firstNumber != "" && secondNumber != "") {
                textDisplay.insertAdjacentHTML('beforeend', " = ");
                produceAnswer(firstNumber, operator, secondNumber);
            }
            break;
    }
}