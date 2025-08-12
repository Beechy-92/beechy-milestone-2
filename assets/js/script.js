document.addEventListener("DOMContentLoaded", () => {

function addIngredient() {
  const lastIngredient = document.querySelector("#ingredients-list .ingredient:last-child");
  const nameInput = lastIngredient.querySelector(".ingredient-name");
  const amountInput = lastIngredient.querySelector(".ingredient-original");

  if (nameInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please enter both an ingredient name and amount before adding a new one.");
    return;
  }

    // Kepps original ingredients values visable
  const newRow = document.createElement("div");
  newRow.className = "ingredient";
  newRow.innerHTML = `
    <input type="text" class="ingredient-name" placeholder="e.g. Sugar" required />
    <input type="number" class="ingredient-original" placeholder="e.g. 100 (grams)" required />
    <input type="text" class="ingredient-scaled" placeholder="Scaled amount" readonly />
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
  const originals = document.querySelectorAll(".ingredient-original");
  const scaled = document.querySelectorAll(".ingredient-scaled");


  if (isNaN(originalServings) || originalServings <= 0) {
    alert("Please enter a valid original number of servings.");
    return;
  }

  if (isNaN(newServings) || newServings <= 0) {
    alert("Please enter a valid new number of servings.");
    return;
  }

  // Scale each ingredient
  originals.forEach(function (input, index) {
    const amountValue = parseFloat(input.value);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please make sure all ingredient amounts are valid positive numbers.");
      return;
    }

    const scaledAmount = (amountValue / originalServings) * newServings;
    scaled[index].value = scaledAmount.toFixed(2);
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

  const originals = document.querySelectorAll(".ingredient-original");
  const scaled = document.querySelectorAll(".ingredient-scaled");

  originals.forEach(function (input, index) {
    const amountValue = parseFloat(input.value);
    if (isNaN(amountValue)) return;

    const scaledAmount = (amountValue / originalServings) * newServings;
    scaled[index].value = scaledAmount.toFixed(2);
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

// Reset button: clear scaled amounts + new servings
document.getElementById("reset-ingredients").addEventListener("click", function () {
  const scaled = document.querySelectorAll(".ingredient-scaled");
  scaled.forEach(input => input.value = "");

  document.getElementById("new-servings").value = "";
});

const suggestionData = {
  "sugar": "Reduce sugar slightly if making for kids to lower sweetness.",
  "butter": "Soften butter before mixing for better texture.",
  "flour": "Sift flour to avoid lumps in the batter.",
  "egg": "Use room temperature eggs for fluffier bakes.",
  "milk": "Warm milk slightly to help yeast rise faster."
};

function updateSuggestions() {
  const ingredientNames = Array.from(document.querySelectorAll(".ingredient-name"))
    .map(input => input.value.trim().toLowerCase());

  console.log("Ingredients typed:", ingredientNames);

  const list = document.getElementById("suggestions-list");
  list.innerHTML = "";

  ingredientNames.forEach(name => {
    for (const key in suggestionData) {
      if (name.includes(key)) {
        const li = document.createElement("li");
        li.textContent = suggestionData[key];
        list.appendChild(li);
      }
    }
  });

  if (!list.hasChildNodes()) {
    const li = document.createElement("li");
    li.textContent = "No suggestions yet — try adding more ingredients.";
    list.appendChild(li);
  }
}

document.addEventListener("input", function(e) {
  if (e.target.classList.contains("ingredient-name")) {
    updateSuggestions();
  }
});
});