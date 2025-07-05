let textDisplay = document.getElementById("textDisplay");
let firstNumber = "";
let secondNumber = "";
let operated = false;

const enterDigit = (int) => {
    if (!operated) {
        textDisplay.insertAdjacentHTML('beforeend', int);
        firstNumber = firstNumber.concat(int);
        console.log(firstNumber);
    } else {
        textDisplay.insertAdjacentHTML('beforeend', int);
        secondNumber = secondNumber.concat(int);
        console.log(secondNumber);
    }
}

const func = (command) => {
    switch (command) {
        case "add":
            if (!operated) {
                textDisplay.insertAdjacentHTML('beforeend', " + ");
                console.log("+");
                operated = true;
            }
            break;
        case "subtract":
            if (!operated) {
                textDisplay.insertAdjacentHTML('beforeend', " - ");
                console.log("-");
                operated = true;
            }
            break;
        case "multiply":
            if (!operated) {
                textDisplay.insertAdjacentHTML('beforeend', " x ");
                console.log("*");
                operated = true;
            }
            break;
        case "divide":
            if (!operated) {
                textDisplay.insertAdjacentHTML('beforeend', " &#247; ");
                console.log("/");
                operated = true;
            }
            break;
        case "clear":
            console.log("C");
            textDisplay.innerHTML = "";
            break;
        case "equals":
            textDisplay.insertAdjacentHTML('beforeend', " = ");
            console.log("=");
            break;
    }
}