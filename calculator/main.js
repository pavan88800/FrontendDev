const input = document.getElementById("input");
const holder = document.getElementById("value-holder");
const container = document.getElementById("calculator");
const numbers = document.getElementById("numbers");
let evalString = "";
function createCalculator() {
  const keys = ["+", "-", "*", "<", "=", "/", "C", "%"];
  keys.forEach((key) => {
    const button = document.createElement("button");
    button.innerText = key;
    button.setAttribute("data-keys", key);
    button.classList.add("button-keys");
    holder.appendChild(button);
  });

  function generateNumbers() {
    for (let i = 0; i < 10; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.setAttribute("data-numbers", i);
      button.classList.add("button-keys");
      numbers.appendChild(button);
    }
  }
  generateNumbers();

  holder.addEventListener("click", (e) => handleKeys(e));
  numbers.addEventListener("click", (e) => handleNumbers(e));

  function handleKeys(e) {
    const { keys } = e.target.dataset;
    if (keys) {
      if (keys === "=") {
        try {
          evalString = eval(evalString);
        } catch (error) {
          evalString = "Error";
        }
      } else if (keys === "C") {
        evalString = "";
      } else if (keys === "<") {
        evalString = evalString.slice(0, -1);
      } else {
        evalString += ` ${keys}`;
      }
      input.value = evalString;
    }
  }
  function handleNumbers(e) {
    const { numbers } = e.target.dataset;
    if (numbers) {
      evalString += `${numbers}`;
      input.value = evalString;
    }
  }
}

createCalculator();
