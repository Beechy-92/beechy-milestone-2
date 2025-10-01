# Beechy Milestone 2
- [Recipe Wizard](https://beechy-92.github.io/beechy-milestone-2/)

  ![Recipe Wizard Preview](assets/deployment-images/full-final-preview.png)

# Project Overview
Recipe Wizard is a lightweight, front-end web application designed to solve a common kitchen problem: adapting recipes for different serving sizes without tedious manual calculations. Users enter a recipe’s ingredients and original servings, then adjust the serving size to instantly generate updated ingredient amounts.

For developers, this project demonstrates how modern front-end technologies (HTML, CSS/Bootstrap, and JavaScript) can be combined to create a responsive, interactive, and user-friendly tool. It has been intentionally designed with scalability in mind, making it easy to extend with new features such as API integrations, unit conversions, or persistent recipe storage.

The app has two clear goals:

For users: Provide an intuitive tool that makes cooking more flexible, reduces waste, and saves time.

For developers: Provide a clear, well-structured codebase that showcases practical use of DOM manipulation, input validation, live updates, and potential API integrations.

This project is particularly suited for:

Developers exploring front-end best practices with real-world functionality.

Students seeking an example of a complete, tested, and deployed JavaScript project.

Contributors who want to extend the app with features like AI-powered cooking tips, recipe storage, or unit conversions.


  ## Features I want
  
  **User input**
  - List of ingredients + quantity
  - Original number of servings
  
  **User output**
  - Choose how many servings the user needs
  - Get updated ingredient amounts
  
  **Bonus with API/Future improvements**
  - Suggested alternatives, tips, or improvments (based on recipe ingredients)

## Tech Stack Being Used
  | Part                  | Tech                           |
| --------------------- | ------------------------------ |
| Structure             | HTML                           |
| Styling               | CSS and Bootstrap              |
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
- Basic local suggestions for common ingredients, with plans to use an AI API in the future.

**Reset Functionality**
- Clears all scaled amounts and new servings input  

---

## Development Life Cycle

The development of **Beechy Milestone 2** followed a structured, iterative process to ensure functionality, usability, and maintainability.

### 1. Planning & Research
- Defined the core goal: Create a tool to scale recipes based on serving size.
- Identified required features:
  - Recipe name and ingredient inputs.
  - Original vs new servings scaling.
  - Local suggestions system.
  - Optional API integration for tips.
- Reviewed similar recipe scaling tools for inspiration.
- Chose tech stack: HTML, CSS/Bootstrap, JavaScript, optional OpenAI API.

### 2. Design
- Created initial wireframe for layout. ![alt text](assets/images/wireframe-design-recipe-wizard.png) 
- Designed a form-based interface with clearly separated sections for:
  - Recipe info.
  - Ingredient list.
  - Scaling controls.
  - Suggestions.
- Considered responsive design for mobile and desktop.
- Defined color scheme and basic typography.

### 3. Development
- **Phase 1:** HTML structure for form, ingredient rows, and suggestion area.
- **Phase 2:** JavaScript logic for:
  - Adding/removing ingredient rows.
  - Scaling amounts based on serving size.
  - Preventing invalid inputs.
  - Providing local ingredient tips.
- **Phase 3:** CSS/Bootstrap styling for responsive and clean layout.
- **Phase 4:** Integration of suggestion system and live updates.
- Frequent commits to GitHub with meaningful messages after each feature or fix.

### 4. Testing
- Conducted manual testing after each major feature:
  - Input validation tests.
  - Scaling formula verification.
  - Live scaling functionality.
  - UI/UX flow adjustments based on feedback.
- Tested across browsers (Chrome, Firefox, Edge) and devices.
- Logged testing outcomes with screenshots and videos (see Testing section).

### 5. Deployment
- Deployed to GitHub Pages for public access.
- Verified responsiveness and functionality on live site.
- Ensured all assets (images, videos, stylesheets) loaded correctly.

### 6. Maintenance & Future Enhancements
- Planned for possible API integration for advanced suggestions.
- Ideas for future:
  - Save and load recipes, including a function for adding recipe name.
  - User accounts to store preferences.
  - Unit conversions (e.g., cups ↔ grams).
  - Accessibility improvements.

---

## User Stories

**Steph** – As a home baker, I want to quickly scale my recipe ingredients so that I can make a cake for a larger party without manually calculating amounts.  
**Test:** I scaled a recipe from 4 → 12 servings. The ingredient amounts updated correctly in the scaled column.  
**Evidence:**  
![Steph scaling test](assets/deployment-images/steph-user-test.png)

---

**Abby** – As a busy senior manager, I want to reduce the serving size for my recipes so that I can prepare smaller meals and reduce food waste.  
**Test:** I scaled a recipe from 6 → 2 servings. The ingredient amounts reduced as expected, preventing waste.  
**Evidence:**  
![Abby scaling test](assets/deployment-images/abby-user-test.png)

---

**Teresa** – As an excellent cook from Hong Kong, I want the system to give me preparation tips for each ingredient so that I can adapt recipes to suit local tastes and cooking styles.  
**Test:** I entered "flour" as an ingredient. The Smart Suggestions box displayed preparation advice (e.g., “sift flour for lighter texture”).  
**Evidence:**  
![Teresa tips test](assets/deployment-images/teresa-user-test.png)

---

**Ashley** – As a web development student, I want to build a recipe scaling app so that I can demonstrate my ability to design a responsive, interactive front-end project that solves a real-world problem.  
**Test:** I tested the app on mobile, tablet, and desktop viewports. The layout adjusted responsively with no broken design or functionality.  
**Evidence:**  
![Ashley responsive test]()


## Developers Rational

I chose to build the Recipe Scaling Wizard because it solves a common, real-world problem: adapting recipes to suit different serving sizes without manual calculations. Scaling recipes is something that many people — from home cooks to professionals — encounter regularly, and existing solutions are often hidden behind paywalls or overly complicated apps.

From a developer’s perspective, this project was also chosen because it allowed me to:

- Apply core front-end skills: HTML for structure, CSS/Bootstrap for design, and JavaScript for logic and interactivity.
-Demonstrate problem-solving: implementing dynamic ingredient rows, handling invalid inputs, and providing real-time scaling feedback.
- Focus on accessibility and UX: ensuring that the app is clear, easy to navigate, and responsive across devices.
- Explore APIs and advanced interactivity: by planning (and partially implementing) a system for ingredient suggestions and preparation tips.
- Follow professional workflows: using GitHub for version control, documenting commits, testing features, and deploying via GitHub Pages.

By combining both technical learning goals and practical user needs, the Recipe Scaling Wizard demonstrates not just my ability to build a functional app, but also my ability to design with a purpose.

## Testing
  ### Javascript Testing
  * Scale button pressed created an alert when no data was entered ![alt text](assets/images/scale-button-pressed-no-data-entered.png)
  * Add ingredients button pressed with no data resulted in no alert ![alt text](assets/images/add-ing-button-no-alert-when-value-empty.png)
  * Add ingredients button pressed with no data resulted in no alert again ![alt text](assets/images/add-ing-button-no-alert-again-test-two.png)
  * Add ingredients button pressed with no data resulted in alert ![alt text](assets/images/add-ing-button-alerts-test-three.png)
  * Numbers only test failed because "e" is a scientific numerical value ![alt text](assets/images/numbers-only-test-fail-e-numeric-notation.png)
  * Numbers only test passed <img src="assets/images/numbers-only-test-pass.png" alt="Numbers only test passed" width="300">
  * Input test passed before and after ![alt text](assets/images/input-full-test-one-before.png) ![alt text](assets/images/input-full-test-one-after.png)
  * Live scaling unable to be tested as my original input needs to be seprated from scaled display ![alt text](assets/images/live-scaling-not-worked-oginput-scale-disp-needs-seperating.png)
  * Local Smart suggestion introduced and tested ![alt text](assets/images/smart-suggestion-test-no-api-local-only.png)
  
  ### CSS Testing
  * Basic CSS testing to make sure i have set up my style.css file correctly ![alt text](assets/images/css-test-body-form-container.png)
  * Inital concept of my CSS, main problem is the ingredient box sizing ![alt text](assets/images/design-1-css-basic-form-ingredients-box-is-too-small.png)
  * Inital concept of my CSS fixed ingredients box ![alt text](assets/images/design-1-css-basic-form-fixed-ing-box.png)

  ### UX Testing
  * The location of the new number of people doesn't seem to flow very well, so im going to move this towards the top next to the original, this should improve the UI and therfore improving the UX ![alt text](assets/images/moving-new-number-of-people.png)
  * Live scaling test passed <video controls src="assets/videos/live-scaling-test.mp4" title="Title"></video>

  ### Final Testing

| Test ID | Area                  | Action Taken / Device Tested                              | Expected Outcome                                  | Actual Outcome | Pass/Fail |
|---------|-----------------------|-----------------------------------------------------------|---------------------------------------------------|----------------|-----------|
| T1      | Start Button          | Click "Start Scaling"                                     | Page scrolls to scaling form                      | Works as expected | Pass |
| T2      | Hover Function        | Hover over buttons                                        | Visual hover effect appears                       | Works as expected | Pass |
| T3      | Validation (Original) | Leave "Original number of people" empty, click Scale      | Error message shown                               | Works as expected | Pass |
| T4      | Validation (New)      | Leave "New number of people" empty, click Scale           | Error message shown                               | Works as expected | Pass |
| T5      | Validation (Ingredient)| Leave ingredient name empty, click Scale                 | Error message shown                               | Works as expected | Pass |
| T6      | Scaling Formula       | Input ingredient & servings, click Scale                  | Ingredient amount recalculated                    | Works as expected | Pass |
| T7      | Add Ingredient        | Click "Add Ingredient"                                    | New row added to form                             | Works as expected | Pass |
| T8      | Live Scaling          | Change servings while ingredients entered                 | Scaled amounts update instantly                   | Works as expected | Pass |
| T9      | Smart Suggestions     | Enter "flour"                                             | Suggestion appears in Smart Suggestions box       | Works as expected | Pass |
| T10     | Reset Function        | Click "Reset"                                             | Clears scaled amounts and inputs                  | Works as expected | Pass |
| R1      | Responsiveness Mobile | iPhone-size screen (412x915)                              | Layout adjusts, no horizontal scroll              | Works as expected | Pass |
| R2      | Responsiveness Tablet | Tablet-size screen (1366x1024)                            | Layout balanced, spacing adjusts correctly        | Works as expected | Pass |
| R3      | Responsiveness PC     | Desktop-size screen (1280x800)                            | Full layout visible, centred                      | Works as expected | Pass |

**Screenshots:**

- 📱 Mobile: ![Mobile](assets/deployment-images/412-915-scale-phone-test.png)  
- 📲 Tablet: ![Tablet](assets/deployment-images/1366-1024-scale-tablet-test.png)  
- 💻 Desktop: ![Desktop](assets/deployment-images/1280-800-scale-pc-test.png)  

**Result:** Verified layout is responsive across devices and all core features function as intended.

  ### Manual VS Automated Testing
  Automated vs Manual Testing

  * Manual testing involves a person interacting with the app directly—clicking buttons, entering data, and checking outputs to verify that features work as expected. This is best for testing user experience (UX), layout, accessibility, and edge cases that are difficult to predict. Manual testing is flexible and can uncover unexpected issues but can also be time-consuming and inconsistent if repeated often.

  * Automated testing uses scripts or frameworks to run repeatable tests on the app’s logic and functionality. Automated tests are best when you need to verify core logic, calculations, or repetitive scenarios (like scaling ingredients correctly every time). They ensure reliability and save time in the long term, especially when features are updated or expanded.

  * In practice, manual testing is usually done during early development and for UI/UX checks, while automated testing becomes more valuable as the project grows and needs consistent, repeatable validation.
  
  
  ### 

  **Key Design Notes**
- Ingredient rows are dynamically added below the last entry  
- Original amounts are editable; scaled amounts are read-only  
- Suggestions list updates live based on ingredient names  
- Buttons are positioned for clear user flow (Scale/Reset/Add Ingredient)  
- Focus and blur effects highlight active inputs for better UX
```
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
+----------------------------------------------------+
```


## Legend / Notes 

### Original Servings / New Servings
- Input fields to scale ingredients.  

### Ingredients Section

#### Ingredient Name
- Name of the ingredient.  

#### Original
- Quantity based on original servings.  

#### Scaled Amount
- Automatically calculated based on new servings.  

### Buttons

#### Add Ingredient
- Adds a new ingredient row.  

#### Scale Recipe
- Calculates scaled amounts.  

#### Reset
- Clears scaled amounts and new servings.  

### Suggestions
- Optional tips or alternatives based on entered ingredients.  


# beechy-milestone-2