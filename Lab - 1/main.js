document.addEventListener("DOMContentLoaded", function () {
  const addInputBtn = document.querySelector("#addInput");
  const inputsContainer = document.querySelector("#inputsContainer");
  const baseNumberDelButtons = document.querySelectorAll(".del-btn");

  baseNumberDelButtons.forEach((btn) => {
    console.log("xgxgxxgx");
    btn.addEventListener("click", () => {
      inputsContainer.removeChild(btn.parentElement);
    });
  });

  addInputBtn.addEventListener("click", () => {
    let numberContainer = document.createElement("div");
    numberContainer.classList.add("number-container");
    let numberInput = document.createElement("input");
    numberInput.classList.add("number-input");

    numberContainer.appendChild(numberInput);

    let numberInputDelBtn = document.createElement("button");
    numberInputDelBtn.classList.add("del-btn");
    numberInputDelBtn.textContent = "usuń";
    numberContainer.appendChild(numberInputDelBtn);

    numberInputDelBtn.addEventListener("click", () => {
      inputsContainer.removeChild(numberInputDelBtn.parentElement);
    });

    inputsContainer.appendChild(numberContainer);
  });
});
