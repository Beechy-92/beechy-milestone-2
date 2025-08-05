function addIngredient() {
  const lastIngredient = document.querySelector("#ingredients-list .ingredient:last-child");
  const nameInput = lastIngredient.querySelector(".ingredient-name");
  const amountInput = lastIngredient.querySelector(".ingredient-amount");

  if (nameInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please enter both an ingredient name and amount before adding a new one.");
    return;
  }

    // Kepps original ingredients values visable
  const newRow = document.createElement("div");
  newRow.className = "ingredient";
  newRow.innerHTML = `
    <input type="text" class="ingredient-name" placeholder="e.g. Sugar" required />
    <input type="number" class="ingredient-amount" placeholder="e.g. 100 (grams)" required />
    <small class="original-display" style="margin-left: 10px; color: gray;"></small>
  `;

  document.getElementById("ingredients-list").appendChild(newRow);
}

document.getElementById("add-ingredient-btn").addEventListener("click", addIngredient);


document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();
   // Prevent form refresh

  const originalServings = parseFloat(document.getElementById("original-servings").value);
  const newServings = parseFloat(document.getElementById("new-servings").value);
    // Get all ingredient amount inputs  
  const amounts = document.querySelectorAll(".ingredient-amount");


  if (isNaN(originalServings) || originalServings <= 0) {
    alert("Please enter a valid original number of servings.");
    return;
  }

  if (isNaN(newServings) || newServings <= 0) {
    alert("Please enter a valid new number of servings.");
    return;
  }

  for (let input of amounts) {
    const amountValue = parseFloat(input.value);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please make sure all ingredient amounts are valid positive numbers.");
      return;
    }
  }
  amounts.forEach(function (input) {
    if (!input.value.trim()) return; // Skip empty inputs

    // Get original amount from data attribute or input value
  let originalAmount = input.getAttribute("data-original");

  if (!originalAmount) {
    originalAmount = parseFloat(input.value);
    input.setAttribute("data-original", originalAmount);
  } else {
    originalAmount = parseFloat(originalAmount);
  }

  // Scale from original amount
  const scaledAmount = (originalAmount / originalServings) * newServings;
  input.value = scaledAmount.toFixed(2);

  // Update visible original display
  const displayEl = input.nextElementSibling;
  if (displayEl && displayEl.classList.contains("original-display")) {
    displayEl.textContent = `Original: ${originalAmount}`;
  }
  
  });
});

// Live scaling as user types new servings
document.getElementById("new-servings").addEventListener("input", function () {
  const originalServings = parseFloat(document.getElementById("original-servings").value);
  const newServings = parseFloat(this.value);

  // Check if both originalServings and newServings are valid numbers
  if (isNaN(originalServings) || originalServings <= 0 || isNaN(newServings) || newServings <= 0) {
    return;
  }

  const amounts = document.querySelectorAll(".ingredient-amount");

  amounts.forEach(function (input) {
    let originalAmount = input.getAttribute("data-original");

    // If original amount is not set, use current input value
    if (!originalAmount) {
      originalAmount = parseFloat(input.value);
      if (!isNaN(originalAmount)) {
        input.setAttribute("data-original", originalAmount);
      } else {
        return; // Skip if input is empty or invalid
      }
    } else {
      originalAmount = parseFloat(originalAmount);
    }

    const scaledAmount = (originalAmount / originalServings) * newServings;
    input.value = scaledAmount.toFixed(2);

    // Update display
    const displayEl = input.nextElementSibling;
    if (displayEl && displayEl.classList.contains("original-display")) {
      displayEl.textContent = `Original: ${originalAmount}`;
    }
  });
});

// New: block 'e', 'E', '+', '-' in number inputs
["original-servings", "new-servings"].forEach(function(id) {
  document.getElementById(id).addEventListener("keydown", function(e) {
    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  });
});