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
    const originalAmount = parseFloat(input.getAttribute("data-original")) || parseFloat(input.value);
    const scaledAmount = (originalAmount / originalServings) * newServings;

    input.setAttribute("data-original", originalAmount);
    input.value = scaledAmount.toFixed(2);

    // Shows the original value beside the input
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