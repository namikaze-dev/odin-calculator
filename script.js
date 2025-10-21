const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numberAStr = "";
let numberBStr = "";
let numberCurr = "";
let operator;

const operate = (operator, numberA, numberB) => {
  let result;
  switch (operator) {
    case "+":
      result = add(numberA, numberB);
      break;
    case "-":
      result = subtract(numberA, numberB);
      break;
    case "*":
      result = multiply(numberA, numberB);
      break;
    case "/":
      result = divide(numberA, numberB);
      break;
    default:
      console.log(`Invalid operator:`, operator, numberA, numberB)
  }
  return result;
}

const display = document.querySelector(".display");
const displayTxt = display.querySelector(".display-txt");

const buttonCalcs = document.querySelectorAll(".btn-calc");
buttonCalcs.forEach(buttonCalc => {
  buttonCalc.addEventListener("click", (e) => {
    // Handle number button click
    if (isNumber(e.target.id)) {
      // Check for zero division
      if (e.target.id === "0" && operator === "/") {
        renderText("Cannot Divide by 0!");
        clearState();
        return;
      }

      numberCurr += e.target.id;
      renderText(numberCurr);
    }

    // Handle operator button click
    if (isOperator(e.target.id)) {
      const buttonDot = document.querySelector("#dot");
      buttonDot.classList.toggle("disable-btn", false);

      if (operator === "=") {
        operator = e.target.id;
        return;
      }

      const isFirstOperation = numberAStr === "";
      if (isFirstOperation) {
        operator = e.target.id;
        numberAStr = numberCurr;
        numberCurr = "";
        return;
      }

      numberBStr = numberCurr;
      numberCurr = "";
      const numberA = Number(numberAStr);
      const numberB = Number(numberBStr);
      const result = operate(operator, numberA, numberB);
      renderText(result);
      numberAStr = `${result}`;
      operator = e.target.id;
      numberBStr = "";
    }

    if (e.target.id === "clear") {
      operator = "";
      numberAStr = "";
      numberBStr = "";
      isFirstOperation = true;
      renderText("")
    }

    if (e.target.id === "delete") {
      handleBackSpace();
    }

    if (e.target.id === "dot") {
      handleFloatingPoint();
    }
  });
});

const handleBackSpace = () => {
  numberCurr = numberCurr.slice(0, -1);
  renderText(numberCurr);
}

const handleFloatingPoint = () => {
  const buttonDot = document.querySelector("#dot");
  buttonDot.classList.toggle("disable-btn", true);
  numberCurr += ".";
  renderText(numberCurr);
}

const clearState = () => {
  operator = "";
  numberAStr = "";
  numberBStr = "";
  numberCurr = "";
}

const isOperator = (id) => {
  return "+ - / * =".includes(id);
}

const isNumber = (id) => {
  return "0123456789".includes(id);
}


const renderText = (text) => {
  displayTxt.innerHTML = "";
  displayTxt.textContent = text;
}