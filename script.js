const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numberAStr = "";
let numberBStr = "";
let isFirstOperation = true;
let isResultDisplayed = false;

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
    if (isOperator(e.target.id)) {
      if (operator === "=") {
        operator = e.target.id;
        isFirstOperation = false;
        isResultDisplayed = false;
        return;
      }

      if (isFirstOperation) {
        operator = e.target.id;
        isFirstOperation = false;
      } else {
        if (operator === "/" && numberBStr == "0") {
          renderText("Cannot Divide by 0!");
          operator = "";
          numberAStr = "";
          numberBStr = "";
          isFirstOperation = true;
          return;
        }

        const numberA = Number(numberAStr);
        const numberB = Number(numberBStr);
        const result = operate(operator, numberA, numberB);
        renderText(result);
        numberAStr = `${result}`;
        operator = e.target.id;
        numberBStr = "";
      }
    } else if (isNumber(e.target.id)) {
      if (isResultDisplayed) {
        numberAStr = e.target.id;
        numberBStr = "";
        operator = "";
        renderText(numberAStr);
        isFirstOperation = true;
        isResultDisplayed = false;
        return;
      }

      if (isFirstOperation) {
        numberAStr += e.target.id;
        renderText(numberAStr);
      } else {
        numberBStr += e.target.id;
        renderText(numberBStr);
      }
    } else {
      if (e.target.id === "=") {
        const numberA = Number(numberAStr);
        const numberB = Number(numberBStr);
        const result = operate(operator, numberA, numberB);
        renderText(result);
        numberAStr = `${result}`;
        operator = "=";
        numberBStr = "";
        isFirstOperation = true;
        isResultDisplayed = true;
        return;
      } else if (e.target.id === "clear") {
        operator = "";
        numberAStr = "";
        numberBStr = "";
        isFirstOperation = true;
        renderText("")
      } else if (e.target.id === "delete") {
        alert("boom")
      }
    }
  });
});

const isOperator = (id) => {
  return "+ - / *".includes(id);
}

const isNumber = (id) => {
  return "0123456789".includes(id);
}


const renderText = (text) => {
  displayTxt.innerHTML = "";
  displayTxt.textContent = text;
}