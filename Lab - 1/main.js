document.addEventListener("DOMContentLoaded", function () {
  const addInputBtn = document.querySelector("#addInput");
  const inputsContainer = document.querySelector("#inputsContainer");
  const baseNumberDelButtons = document.querySelectorAll(".del-btn");
  const baseNumberInputs = document.querySelectorAll(".number-input");

  const sumResult = document.querySelector("#sum");
  const avgResult = document.querySelector("#avg");
  const minResult = document.querySelector("#min");
  const maxResult = document.querySelector("#max");

  baseNumberDelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      inputsContainer.removeChild(btn.parentElement);
    });
  });

  baseNumberInputs.forEach((input) => {
    input.addEventListener("input", calculate);
  });

  addInputBtn.addEventListener("click", () => {
    inputsContainer.appendChild(createNumberContainer());
  });

  function calculate() {
    let inputs = [];
    document.querySelectorAll(".number-input").forEach((input) => {
      if (input.value != "") {
        inputs.push(input.value);
      }
    });
    sumResult.innerHTML = sumFromNumbers(inputs);
    avgResult.innerHTML = avgFromNumbers(inputs);
    minResult.innerHTML = minFromNumbers(inputs);
    maxResult.innerHTML = maxFromNumbers(inputs);
  }

  function sumFromNumbers(numbers) {
    let sum = 0.0;
    numbers.forEach((number) => {
      sum += parseFloat(number);
    });
    return sum;
  }

  function avgFromNumbers(numbers) {
    let sum = 0.0;
    numbers.forEach((number) => {
      sum += parseFloat(number);
    });
    return sum / numbers.length;
  }

  function minFromNumbers(numbers) {
    let min = Number.MAX_VALUE;
    numbers.forEach((number) => {
      parseFloat(number) < min ? (min = parseFloat(number)) : null;
    });
    return min;
  }

  function maxFromNumbers(numbers) {
    let max = Number.MIN_VALUE;
    numbers.forEach((number) => {
      parseFloat(number) > max ? (max = parseFloat(number)) : null;
    });
    return max;
  }

  function createNumberContainer() {
    let numberContainer = document.createElement("div");
    numberContainer.classList.add("number-container");
    let numberInput = document.createElement("input");
    numberInput.classList.add("number-input");
    numberInput.type = "number";

    numberInput.addEventListener("input", calculate);

    numberContainer.appendChild(numberInput);

    let numberInputDelBtn = document.createElement("button");
    numberInputDelBtn.classList.add("del-btn");
    numberInputDelBtn.textContent = "usuń";
    numberContainer.appendChild(numberInputDelBtn);

    numberInputDelBtn.addEventListener("click", () => {
      inputsContainer.removeChild(numberInputDelBtn.parentElement);
    });

    return numberContainer;
  }
});
