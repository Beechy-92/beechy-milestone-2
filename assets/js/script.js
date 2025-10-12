document.addEventListener("DOMContentLoaded", () => {
  // All javascript runs only after DOM is ready

  // Add an initial ingredient row on page load
  function addInitialIngredient() {
    const ingredientsList = document.getElementById("ingredients-list");
    if (ingredientsList && ingredientsList.children.length === 0) {
      const newRow = document.createElement("div");
      newRow.className = "ingredient";
      newRow.innerHTML = `
        <input type="text" class="ingredient-name form-control" placeholder="e.g. Sugar" required />
        <input type="number" class="ingredient-original form-control" placeholder="e.g. 100 (grams)" required />
        <input type="text" class="ingredient-scaled form-control" placeholder="Scaled amount" readonly />
      `;
      ingredientsList.appendChild(newRow);
    }
  }
  addInitialIngredient();

// Store the timeout ID so we can clear it if needed
let errorTimeoutId;

function showError(message, invalidInputs = []) {
  // Try to find an existing container
  let errorDiv = document.getElementById("error-message");

  // If none exists, create it at the top of the form
  if (!errorDiv) {
    // Expecting #recipe-form to be inside .recipe-card (adjust if DOM changes)
    const formCard = document.getElementById("recipe-form");
    if (formCard && formCard.parentElement) {
      errorDiv = document.createElement("div");
      errorDiv.id = "error-message";
      errorDiv.setAttribute("aria-live", "assertive");
      formCard.parentElement.insertBefore(errorDiv, formCard);
    }
    if (errorDiv) {
      // Style as a Bootstrap alert for guaranteed visibility
      errorDiv.className = "alert alert-danger mb-3";
      errorDiv.textContent = message;
    }
    // Absolute fallback: browser alert (shouldn’t be needed)
    // alert(message); // Removed for better user experience
  }

  // Highlight invalid inputs
  invalidInputs.forEach((input) => {
    if (input) {
      input.style.borderColor = "red";
      input.style.boxShadow = "0 0 8px rgba(255, 0, 0, 0.6)";
    }
  });

  // Clear any previous timeout before setting a new one
  if (errorTimeoutId) {
    clearTimeout(errorTimeoutId);
  }
  // Clear after 4 seconds
  errorTimeoutId = setTimeout(() => {
    if (errorDiv) {
      errorDiv.textContent = "";
      errorDiv.className = ""; // remove alert classes
    }
    invalidInputs.forEach((input) => {
      if (input) {
        input.style.borderColor = "";
        input.style.boxShadow = "";
      }
    });
    errorTimeoutId = null;
}
  }, 4000);
}

  function addIngredient() {
    const ingredientsList = document.getElementById("ingredients-list");
    const lastIngredient = ingredientsList.querySelector(".ingredient:last-child");

    // If there are no ingredients yet, just add a new row
    if (!lastIngredient) {
      const newRow = document.createElement("div");
      newRow.className = "ingredient";
      newRow.innerHTML = `
        <input type="text" class="ingredient-name form-control" placeholder="e.g. Sugar" required />
        <input type="number" class="ingredient-original form-control" placeholder="e.g. 100 (grams)" required />
        <input type="text" class="ingredient-scaled form-control" placeholder="Scaled amount" readonly />
      `;
      ingredientsList.appendChild(newRow);
      updateSuggestions();
      return;
    }

    const nameInput = lastIngredient.querySelector(".ingredient-name");
    const amountInput = lastIngredient.querySelector(".ingredient-original");

    // Ensure the last ingredient is filled before adding a new one
    if (nameInput.value.trim() === "" || amountInput.value.trim() === "") {
      showError(
        "Please enter both an ingredient name and amount before adding a new one.",
        [nameInput, amountInput]
      );
      return;
    }
    // Keeps original ingredients values visible
    const newRow = document.createElement("div");
    newRow.className = "ingredient";
    newRow.innerHTML = `
      <input type="text" class="ingredient-name form-control" placeholder="e.g. Sugar" required />
      <input type="number" class="ingredient-original form-control" placeholder="e.g. 100 (grams)" required />
      <input type="text" class="ingredient-scaled form-control" placeholder="Scaled amount" readonly />
    `;

    ingredientsList.appendChild(newRow);
    updateSuggestions();
  }

  document
    .getElementById("add-ingredient-btn")
    .addEventListener("click", addIngredient);

  document
    .getElementById("recipe-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // Prevent form refresh

      const originalServings = parseFloat(
        document.getElementById("original-servings").value
      );
      const newServings = parseFloat(
        document.getElementById("new-servings").value
      );

      // Get all ingredient amount inputs
      const originals = document.querySelectorAll(".ingredient-original");
      const scaled = document.querySelectorAll(".ingredient-scaled");

      const originalInput = document.getElementById("original-servings");
      const newInput = document.getElementById("new-servings");

      if (isNaN(originalServings) || originalServings <= 0) {
        showError(
          "Please enter a valid original number of servings.",
          [originalInput]
        );
        return;
      }

      if (isNaN(newServings) || newServings <= 0) {
        showError("Please enter a valid new number of servings.", [newInput]);
        return;
      }

      // Scale each ingredient
      for (let index = 0; index < originals.length; index++) {
        const input = originals[index];
        const amountValue = parseFloat(input.value);
        if (isNaN(amountValue) || amountValue <= 0) {
          showError(
            "Please make sure all ingredient amounts are valid positive numbers."
          );
          return;
        }
        const scaledAmount = (amountValue / originalServings) * newServings;
        scaled[index].value = scaledAmount.toFixed(2);
      }
    });

  // Live scaling as user types new servings
  document
    .getElementById("new-servings")
    .addEventListener("input", function () {
      const originalServings = parseFloat(
        document.getElementById("original-servings").value
      );
      const newServings = parseFloat(this.value);

      // Check if both originalServings and newServings are valid numbers
      if (
        isNaN(originalServings) ||
        originalServings <= 0 ||
        isNaN(newServings) ||
        newServings <= 0
      ) {
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
  ["original-servings", "new-servings"].forEach(function (id) {
    document.getElementById(id).addEventListener("keydown", function (e) {
      if (
        e.key === "e" ||
        e.key === "E" ||
        e.key === "+" ||
        e.key === "-"
      ) {
        e.preventDefault();
      }
    });
  });

  // Reset button: clear scaled amounts + new servings
  document
    .getElementById("reset-ingredients")
    .addEventListener("click", function () {
      const scaled = document.querySelectorAll(".ingredient-scaled");
      scaled.forEach((input) => (input.value = ""));

      document.getElementById("new-servings").value = "";
    });

  const suggestionData = {
    sugar: "Reduce sugar slightly if making for kids to lower sweetness.",
    butter: "Soften butter before mixing for better texture.",
    flour: "Sift flour to avoid lumps in the batter.",
    egg: "Use room temperature eggs for fluffier bakes.",
    milk: "Warm milk slightly to help yeast rise faster.",
    salt: "A pinch of salt enhances overall flavor.",
    vanilla: "Add a dash of vanilla extract for extra aroma.",
    chocolate: "Use high-quality chocolate for richer taste.",
    oil: "Use vegetable oil for a lighter texture in cakes.",
    honey: "Honey can add moisture and a natural sweetness.",
    cinnamon: "Cinnamon pairs well with apple or pumpkin flavors.",
    lemon: "Lemon zest can brighten up the flavor profile.",
    garlic: "Fresh garlic provides a stronger flavor than powdered.",
    onion: "Caramelize onions for a sweeter, richer taste.",
    tomato: "Use ripe tomatoes for the best flavor in sauces.",
    basil: "Fresh basil adds a vibrant flavor to dishes.",
    oregano: "Oregano is great for Italian and Mediterranean recipes.",
    pepper: "Freshly ground black pepper has a more robust flavor.",
    chicken: "Marinate chicken to keep it juicy and flavorful.",
    beef: "Let beef rest after cooking to retain its juices.",
    fish: "Cook fish to an internal temperature of 145°F (63°C).",
    rice: "Rinse rice before cooking to remove excess starch.",
    pasta: "Salt pasta water generously for better flavor.",
    beans: "Soak beans overnight to reduce cooking time and improve digestibility.",
    lentils: "Rinse lentils to remove any debris before cooking.",
    spinach: "Wilt spinach quickly to retain its nutrients and color.",
    broccoli: "Steam broccoli to keep it crisp and vibrant green.",
    carrot: "Roast carrots to enhance their natural sweetness.",
    potato: "Use starchy potatoes for fluffy mashed potatoes.",
    cucumber: "Chill cucumbers before serving for a refreshing crunch.",
    avocado: "Use ripe avocados for the best texture and flavor.",
    yogurt: "Use Greek yogurt for a thicker, creamier texture.",
    cheese: "Let cheese come to room temperature before serving for better flavor.",
    wine: "Use wine that you would enjoy drinking for the best flavor in cooking.",
    beer: "Choose a beer that complements the dish's flavors.",
    chili: "Adjust chili quantity based on your heat preference.",
    paprika: "Smoked paprika adds a deep, smoky flavor to dishes.",
    cumin: "Cumin pairs well with spicy and savory dishes.",
    coriander: "Coriander adds a fresh, citrusy note to recipes.",
    turmeric: "Turmeric provides a warm color and subtle flavor.",
    ginger: "Fresh ginger has a more vibrant flavor than ground.",
    mint: "Fresh mint adds a refreshing touch to both sweet and savory dishes.",
    parsley: "Chop parsley finely to release its flavor.",
    thyme: "Thyme is great for slow-cooked dishes and roasts.",
    rosemary: "Use rosemary sparingly as it has a strong flavor.",
    sage: "Sage pairs well with rich, fatty foods like pork and sausage.", 
    nutmeg: "A little nutmeg goes a long way in enhancing flavors.",
    cloves: "Cloves have a strong flavor; use them sparingly.",
    cardamom: "Cardamom adds a unique, aromatic flavor to both sweet and savory dishes.",
    coconut: "Use coconut milk for a creamy texture in curries and desserts.",
    almond: "Toasted almonds add a nice crunch and flavor to dishes.",
    walnut: "Walnuts can add a rich, earthy flavor to both sweet and savory recipes.",
    pecan: "Pecans are great for adding texture and flavor to baked goods.",
    pistachio: "Pistachios add a unique flavor and vibrant color to desserts.",
    sesame: "Toasted sesame seeds add a nutty flavor and crunch.",
    soy: "Use low-sodium soy sauce to control salt levels in dishes.",
    vinegar: "Different vinegars add distinct flavors; choose based on the dish.",
    mustard: "Dijon mustard adds a tangy, sophisticated flavor.",
    ketchup: "Ketchup can add sweetness and tang to sauces and marinades.",
    mayonnaise: "Use mayonnaise to add creaminess to sandwiches and salads.",
    barbecue: "Barbecue sauce can add a smoky, sweet flavor to grilled foods.",
    tea: "Use fresh tea leaves or bags for the best flavor.",
    coffee: "Freshly ground coffee beans provide the best flavor.",
    water: "Use filtered water for the best taste in recipes.",
  };

  // Updates suggestions based on current ingredients
  function updateSuggestions() {
    const ingredientNames = Array.from(
      document.querySelectorAll(".ingredient-name")
    ).map((input) => input.value.trim().toLowerCase());

    // Target the suggestions list and clear old suggestions
    const list = document.getElementById("suggestions-list");
    list.innerHTML = "";

    // Loop through ingredient names and match with suggestionData keys
    ingredientNames.forEach((name) => {
      for (const key in suggestionData) {
        if (name.includes(key)) {
          const li = document.createElement("li");
          li.textContent = suggestionData[key];
          list.appendChild(li);
        }
      }
    });

    // If no suggestions, show a default message
    if (!list.hasChildNodes()) {
      const li = document.createElement("li");
      li.textContent = "No suggestions yet — try adding more ingredients.";
      list.appendChild(li);
    }
  }

  document.addEventListener("input", function (e) {
    if (e.target.classList.contains("ingredient-name")) {
      updateSuggestions();
    }
  });

  // Use event delegation for dynamically added .form-control elements
  document.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("form-control")) {
      e.target.style.transition =
        "box-shadow 0.3s ease, border-color 0.3s ease";
      e.target.style.borderColor = "#F6AE2D";
      e.target.style.boxShadow = "0 0 8px rgba(246, 174, 45, 0.6)";
    }
  });

  document.addEventListener("focusout", (e) => {
    if (e.target.classList.contains("form-control")) {
      e.target.style.borderColor = "";
      e.target.style.boxShadow = "";
    }
  });
});