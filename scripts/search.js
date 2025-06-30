//DOM element for search input//
const searchInput=document.getElementById("main-search");

//funtion to search if recipe matches the search element//
function isMatch(recipe, searchTerm) {
  const term = searchTerm.toLowerCase();

  // check name
  if (recipe.name.toLowerCase().includes(term)) return true;

  // check description
  if (recipe.description.toLowerCase().includes(term)) return true;

  // check ingredients
  const hasMatchingIngredient = recipe.ingredients.some((ing) =>
    ing.ingredient.toLowerCase().includes(term)
  );
  if (hasMatchingIngredient) return true;

  return false;
}
const ingredientInput = document.getElementById("ingredients");
const applianceInput = document.getElementById("appliences");
const utensilInput = document.getElementById("utensils");

function getAllTags(recipes) {
  const ingredients = new Set();
  const appliances = new Set();
  const utensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient.toLowerCase()));
    appliances.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((ut) => utensils.add(ut.toLowerCase()));
  });

  return {
    ingredients: [...ingredients].sort(),
    appliances: [...appliances].sort(),
    utensils: [...utensils].sort(),
  };
}
function displayFilterLists(recipes) {
  const tags = getAllTags(recipes);

  const ingredientList = document.getElementById("ingredients-list");
  const applianceList = document.getElementById("appliences-list");
  const utensilList = document.getElementById("utensils-list");

  // clear lists first
  ingredientList.innerHTML = "";
  applianceList.innerHTML = "";
  utensilList.innerHTML = "";

  tags.ingredients.forEach((item) => {
    ingredientList.innerHTML += `<li class="tag-option" data-type="ingredient">${item}</li>`;
  });

  tags.appliances.forEach((item) => {
    applianceList.innerHTML += `<li class="tag-option" data-type="appliance">${item}</li>`;
  });

  tags.utensils.forEach((item) => {
    utensilList.innerHTML += `<li class="tag-option" data-type="utensil">${item}</li>`;
  });
}


//eventlistener for search input//
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("tag-option")) {
    const tagValue = e.target.textContent.toLowerCase();
    const tagType = e.target.getAttribute("data-type");

    const filtered = recipes.filter((recipe) => {
      if (tagType === "ingredient") {
        return recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tagValue)
        );
      } else if (tagType === "appliance") {
        return recipe.appliance.toLowerCase().includes(tagValue);
      } else if (tagType === "utensil") {
        return recipe.ustensils.some((u) => u.toLowerCase().includes(tagValue));
      }
    });

    displayRecipes(filtered);
    displayFilterLists(filtered); // refresh dropdowns for filtered list
  }
});
displayRecipes(recipes);        // initial display of all recipes
displayFilterLists(recipes);    // populate dropdowns
document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});
document.addEventListener("click", function (e) {
  document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    if (!dropdown.parentElement.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
});


