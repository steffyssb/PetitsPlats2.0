function setupDropdownSearch() {
  const inputs = [
    { id: "ingredients", listId: "ingredients-list" },
    { id: "appliences", listId: "appliences-list" },
    { id: "utensils", listId: "utensils-list" }
  ];

  inputs.forEach(({ id, listId }) => {
    const input = document.getElementById(id);
    const list = document.getElementById(listId);
input.addEventListener("input", () => {
  const searchTerm = input.value.toLowerCase();
  const clearBtn = input.parentElement.querySelector(".filter-clear");

  // Show or hide the x clear icon
  clearBtn.style.display = searchTerm ? "block" : "none";

  list.querySelectorAll("li").forEach((li) => {
    const originalText = li.textContent;
    const lowerText = originalText.toLowerCase();

    if (lowerText.includes(searchTerm)) {
      li.style.display = "block";
      const regex = new RegExp(`(${searchTerm})`, "gi");
      li.innerHTML = originalText.replace(regex, `<span class="highlight">$1</span>`);
    } else {
      li.style.display = "none";
      li.innerHTML = originalText;
    }
  });
});
document.querySelectorAll(".filter-clear").forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputId = btn.getAttribute("data-input");
    const input = document.getElementById(inputId);
    input.value = "";
    btn.style.display = "none";
    
    // Trigger the input event manually to reset the list
    input.dispatchEvent(new Event("input"));
  });
});
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("main-search");
  const searchButton = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-search");

  // MAIN SEARCH EVENT
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    // Show or hide x cross icon
    clearBtn.style.display = searchTerm.length > 0 ? "inline" : "none";

    if (searchTerm.length < 3) {
      displayRecipes(recipes);
      displayFilterLists(recipes);
      searchButton.classList.remove("active"); // Reset yellow
      return;
    }

    const filteredRecipes = recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchTerm)
        )
      );
    });

    displayRecipes(filteredRecipes);
    displayFilterLists(filteredRecipes);
  });
  clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  searchButton.classList.remove("clicked"); // Reset yellow
  displayRecipes(recipes);
  displayFilterLists(recipes);
});


  // GET ALL TAGS
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

  // DISPLAY TAGS IN DROPDOWN
  function displayFilterLists(recipesToUse) {
    const tags = getAllTags(recipesToUse);

    const ingredientList = document.getElementById("ingredients-list");
    const applianceList = document.getElementById("appliences-list");
    const utensilList = document.getElementById("utensils-list");

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

  // FILTER BY CLICKING A TAG
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag-option")) {
      const tagValue = e.target.textContent.toLowerCase();
      const tagType = e.target.getAttribute("data-type");
      console.log(`🏷️ Tag clicked: ${tagType} = ${tagValue}`);

      const filtered = recipes.filter((recipe) => {
        if (tagType === "ingredient") {
          return recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(tagValue)
          );
        } else if (tagType === "appliance") {
          return recipe.appliance.toLowerCase().includes(tagValue);
        } else if (tagType === "utensil") {
          return recipe.ustensils.some((u) =>
            u.toLowerCase().includes(tagValue)
          );
        }
      });

      console.log("📦 Filtered by tag:", filtered.length);
      displayRecipes(filtered);
      displayFilterLists(filtered);
    }
  });

  // INITIAL RENDER
displayRecipes(recipes);
displayFilterLists(recipes);

// ✅ Delay setup until the dropdown <li>s and <input>s are in the DOM
setTimeout(() => {
  setupDropdownSearch();
}, 0);


  // TOGGLE DROPDOWNS
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const dropdown = btn.parentElement;

      // Close all others
      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== dropdown) d.classList.remove("open");
      });

      // Toggle this one
      dropdown.classList.toggle("open");
      e.stopPropagation();
    });
  });
});
