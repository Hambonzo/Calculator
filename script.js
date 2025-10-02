let number;
let operator;
let number2;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    a = Number(a); // ensure a is a number
    b = Number(b); // ensure b is a number

    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;
    if (operator === "/") return a / b;
}


function display(button) {
    let allButtons = document.querySelectorAll("button");
    let display = document.querySelector("#display");
    let currentNumber = "";
    let justEvaluated = false;

    allButtons.forEach(button => {
        button.addEventListener("click", () => {
            let buttonType = button.textContent;

            if (buttonType === "clear") {
                display.textContent = "0";
                number = undefined;
                operator = undefined;
                number2 = undefined;
                currentNumber = "";
                return;
            }

            if (buttonType === "+/-") {
                if (currentNumber !== "") {
                    currentNumber = currentNumber.startsWith("-")
                        ? currentNumber.slice(1)
                        : "-" + currentNumber;
                    display.textContent = currentNumber;
                } else if (number !== undefined) {
                    currentNumber = String(number).startsWith("-")
                        ? String(number).slice(1)
                        : "-" + String(number);
                    display.textContent = currentNumber;
                } else {
                    currentNumber = display.textContent.startsWith("-")
                        ? display.textContent.slice(1)
                        : "-" + display.textContent;
                    display.textContent = currentNumber;
                }
                return;
            }



            if (buttonType === "+" || buttonType === "-" ||
                buttonType === "/" || buttonType === "*") {
                if (number !== undefined && currentNumber !== "") {
                    number2 = +currentNumber;
                    if (operator === "/" && number2 === 0) {
                        console.warn("Error: can't divide by zero");
                        display.textContent = "One does not simply divide by zero";
                        return;
                    } else {
                        let result = operate(number, operator, number2);
                        operator = buttonType;
                        number = result;
                        display.textContent = result.toFixed(1);
                        currentNumber = "";
                        justEvaluated = true;
                        return;
                    }

                } else if (number !== undefined && currentNumber === "") {
                    operator = buttonType;
                    justEvaluated = false;
                    return;
                }


                else {
                    operator = buttonType;
                    number = +currentNumber;
                    display.textContent = currentNumber;
                    currentNumber = "";
                    justEvaluated = false;
                    return;
                }

            } else if (buttonType === "=") {
                if (number === undefined) {
                    display.textContent = 0;
                    return;
                }
                number2 = currentNumber === "" ? number2 : +currentNumber;

                if (operator === "/" && number2 === 0) {
                    console.warn("Error: can't divide by zero");
                    display.textContent = "One does not simply divide by zero";
                    return;

                } else {
                    let result = operate(number, operator, number2);
                    display.textContent = result.toFixed(1);
                    number = result;
                    currentNumber = "";
                    justEvaluated = true;
                    return;
                }

            } else {
                if (!isNaN(buttonType)) {
                    if (justEvaluated) {
                        number = undefined;
                        number2 = undefined;
                        operator = undefined;
                        currentNumber = "";
                        justEvaluated = false;
                    }
                    currentNumber += buttonType;
                    display.textContent = currentNumber;

                }
            }
        });
    });

}

display();