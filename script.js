const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let numberA = 0;
let numberB = 0;
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
      console.log("Invalid operator:", operator)
  }
  return result;
}

const display = document.querySelector(".display");
const displayTxt = display.querySelector(".display-txt");

const buttonCalcs = document.querySelectorAll(".btn-calc");
buttonCalcs.forEach(buttonCalc => {
  buttonCalc.addEventListener("click", e => {
    alert(e.target.id);
  })
});

const renderText = (text) => {
  displayTxt.innerHTML = "";
  displayTxt.textContent = text;
}