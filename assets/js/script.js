function addIngredient() {
  const lastIngredient = document.querySelector("#ingredients-list .ingredient:last-child");
  const nameInput = lastIngredient.querySelector(".ingredient-name");
  const amountInput = lastIngredient.querySelector(".ingredient-amount");

  if (nameInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please enter both an ingredient name and amount before adding a new one.");
    return;
  }

    // Create a new ingredient input row
  const newIngredient = document.createElement("div");
  newIngredient.classList.add("ingredient");

  const newName = document.createElement("input");
  newName.type = "text";
  newName.className = "ingredient-name";
  newName.placeholder = "e.g. Flour";
  newName.required = true;

  const newAmount = document.createElement("input");
  newAmount.type = "number";
  newAmount.className = "ingredient-amount";
  newAmount.placeholder = "e.g. 200 (grams)";
  newAmount.required = true;

  newIngredient.appendChild(newName);
  newIngredient.appendChild(newAmount);
  document.getElementById("ingredients-list").appendChild(newIngredient);
}

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
     // Save original for future use
    input.value = scaledAmount.toFixed(2);
     // Round to 2 decimal places
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