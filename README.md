# Project Overview
This project is a recipe scaling tool that allows users to input a recipe, including ingredients and serving size, and then scale the recipe for a different number of servings. It also provides local suggestions for ingredient preparation and improvements.

  ## Features I want

  **User input**
  - Recipe name
  - List of ingredients + quantity
  - Original number of servings

  **User output**
  - Choose how many servings the user needs
  - Get updated ingredient amounts

  **Bonus with API**
  - Suggested alternatives, tips, or improvments (based on recipe ingredients)

  ---

## Tech Stack Being Used
  | Part                  | Tech                           |
| --------------------- | ------------------------------ |
| Structure             | HTML                           |
| Styling               | CSS or Bootstrap               |
| Logic + Interactivity | JavaScript                     |
| Suggestions API       | OpenAI |

## Key Javascript Features

**Ingredient Management**
- Users can add new ingredients dynamically  
- Prevents adding a new ingredient if the previous one is empty  
- Each ingredient row has:
  - `.ingredient-name` → text input for ingredient name  
  - `.ingredient-original` → number input for original amount  
  - `.ingredient-scaled` → read-only input for scaled amount  

**Scaling Ingredients**
- Ingredients are scaled based on: scaledAmount = (originalAmount / originalServings) * newServings
- Supports live scaling as the user types a new number of servings  

**Input Validation**
- Original and new servings must be valid positive numbers  
- Blocks invalid number inputs: `e`, `E`, `+`, `-`  
- Alerts user if an ingredient amount is invalid  

**Suggestions System**
- Provides tips for ingredients using a local `suggestionData` object  
- Updates dynamically as ingredient names are typed  

**Reset Functionality**
- Clears all scaled amounts and new servings input  

---


## Testing
  ### Javascript Testing
  * Scale button pressed created an alert when no data was entered (Add photo)
  * Add ingredients button pressed with no data resulted in no alert (Add photo)
  * Add ingredients button pressed with no data resulted in no alert again (Add photo)
  * Add ingredients button pressed with no data resulted in alert (Add photo)
  * Numbers only test failed because "e" is a scientific numerical value (Add photo)
  * Numbers only test passed (Add photo)
  * Input test passed before and after (Add photo)
  * Live scaling unable to be tested as my original input needs to be seprated from scaled display (Add photo)
  * Local Smart suggestion introduced and tested (Add photo)
  
  ### CSS Testing
  * Basic CSS testing to make sure i have set up my style.css file correctly (Add photo)
  * Inital concept of my CSS, main problem is the ingredient box sizing (Add photo)
  * Inital concept of my CSS fixed ingredients box (Add photo)

  ### UX Testing
  * The location of the new number of people doesn't seem to flow very well, so im going to move this towards the top next to the original, this should improve the UI and therfore improving the UX (Add photo)
  * Live scaling test passed (Add video)
  
  **Key Design Notes**
- Ingredient rows are dynamically added below the last entry  
- Original amounts are editable; scaled amounts are read-only  
- Suggestions list updates live based on ingredient names  
- Buttons are positioned for clear user flow (Scale/Reset/Add Ingredient)  
- Focus and blur effects highlight active inputs for better UX

```+----------------------------------------------------+
| Recipe Name: [___________________] |
+----------------------------------------------------+
| Original Servings: [] New Servings: [] |
+----------------------------------------------------+
| Ingredients: |
| +--------------------------------------------+ |
| | Ingredient Name: [_______] Original: []|
| | Scaled Amount: [] |
| +--------------------------------------------+ |
| | Ingredient Name: [_______] Original: []|
| | Scaled Amount: [] |
| +--------------------------------------------+ |
| | ... | |
+----------------------------------------------------+
| [+ Add Ingredient] [Scale Recipe] [Reset] |
+----------------------------------------------------+
| Suggestions: |
| - Reduce sugar slightly if making for kids |
| - Soften butter before mixing for better texture|
| - ... |
+----------------------------------------------------+```




# beechy-milestone-2