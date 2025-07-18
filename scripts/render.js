const recipieContainer = document.getElementById("recipies-container");

function createRecipeCard(recipe) {
  return `
    <article class="recipie-card">
      <img src="./JSON_recipes/${recipe.image}" alt="${recipe.name}"/>
      <span class="time"><i class="fa-regular fa-clock"></i> ${recipe.time} min</span>
      <div class="recipe-header">
        <h2>${recipe.name}</h2>
      </div>
      <h3>Recette</h3>
      <div class="recipie-description">
        <p class="description">${recipe.description}</p>
      </div>
      <h3>Ingrédients</h3>
      <div class="ingredients-grid">
        ${recipe.ingredients
          .map((ing) => {
            let quantity = ing.quantity ? `: ${ing.quantity}` : "";
            if (ing.unit) quantity += ` ${ing.unit}`;
            return `<div class="ingredient-item"><p>${ing.ingredient}</p>${quantity}</div>`;
          })
          .join("")}
      </div>
    </article>
  `;
}

// Display function (required by search.js)
function displayRecipes(recipes) {
      const container = document.getElementById("recipies-container");
  const countElement = document.getElementById("recipe-count");
  recipieContainer.innerHTML = "";


  if (recipes.length === 0) {
    recipieContainer.innerHTML = "<p>Aucune recette trouvée.</p>";
    return;
  }
  recipieContainer.innerHTML = recipes.map(createRecipeCard).join("");
  countElement.textContent = `${recipes.length} recette${recipes.length > 1 ? "s" : ""}`;
}

