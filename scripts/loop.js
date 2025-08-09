let currentSearchTerm = "";

// Manual lowercase conversion
function toLowerManual(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      result += String.fromCharCode(code + 32);
    } else {
      result += str[i];
    }
  }
  return result;
}

// Add value to array without push()
function addToArray(arr, value) {
  arr[arr.length] = value;
}

// Check if value exists in array
function arrayIncludes(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return true;
  }
  return false;
}

// Dropdown search setup
function setupDropdownSearch() {
  const inputs = [
    { id: "ingredients", listId: "ingredients-list" },
    { id: "appliences", listId: "appliences-list" },
    { id: "utensils", listId: "utensils-list" }
  ];

  for (let idx = 0; idx < inputs.length; idx++) {
    const id = inputs[idx].id;
    const listId = inputs[idx].listId;

    const input = document.getElementById(id);
    const list = document.getElementById(listId);

    input.addEventListener("input", () => {
      const searchTerm = toLowerManual(input.value);
      const clearBtn = input.parentElement.querySelector(".filter-clear");
      clearBtn.style.display = searchTerm ? "block" : "none";

      const lis = list.querySelectorAll("li");
      for (let i = 0; i < lis.length; i++) {
        const li = lis[i];
        const originalText = li.textContent;
        const lowerText = toLowerManual(originalText);

        if (lowerText.indexOf(searchTerm) !== -1) {
          li.style.display = "block";
          const regex = new RegExp(`(${searchTerm})`, "gi");
          li.innerHTML = originalText.replace(regex, `<span class="highlight">$1</span>`);
        } else {
          li.style.display = "none";
          li.innerHTML = originalText;
        }
      }
    });

    document.querySelectorAll(".filter-clear").forEach((btn) => {
      btn.addEventListener("click", () => {
        const inputId = btn.getAttribute("data-input");
        const input = document.getElementById(inputId);
        input.value = "";
        btn.style.display = "none";
        input.dispatchEvent(new Event("input"));
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("main-search");
  const searchButton = document.getElementById("search-button");
  const clearBtn = document.getElementById("clear-search");

  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = toLowerManual(e.target.value.trim());
    clearBtn.style.display = currentSearchTerm.length > 0 ? "inline" : "none";
    applyAllFilters();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchButton.classList.remove("clicked");
    displayRecipes(recipes);
    displayFilterLists(recipes);
    applyAllFilters();
  });

  function getAllTags(recipes) {
    const ingredients = [];
    const appliances = [];
    const utensils = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ing = toLowerManual(recipe.ingredients[j].ingredient);
        if (!arrayIncludes(ingredients, ing)) addToArray(ingredients, ing);
      }

      const app = toLowerManual(recipe.appliance);
      if (!arrayIncludes(appliances, app)) addToArray(appliances, app);

      for (let j = 0; j < recipe.ustensils.length; j++) {
        const ust = toLowerManual(recipe.ustensils[j]);
        if (!arrayIncludes(utensils, ust)) addToArray(utensils, ust);
      }
    }

    ingredients.sort();
    appliances.sort();
    utensils.sort();

    return { ingredients, appliances, utensils };
  }

  function displayFilterLists(recipesToUse) {
    const tags = getAllTags(recipesToUse);

    const ingredientList = document.getElementById("ingredients-list");
    const applianceList = document.getElementById("appliences-list");
    const utensilList = document.getElementById("utensils-list");

    ingredientList.innerHTML = "";
    applianceList.innerHTML = "";
    utensilList.innerHTML = "";

    for (let i = 0; i < tags.ingredients.length; i++) {
      ingredientList.innerHTML += `<li class="tag-option" data-type="ingredient">${tags.ingredients[i]}</li>`;
    }
    for (let i = 0; i < tags.appliances.length; i++) {
      applianceList.innerHTML += `<li class="tag-option" data-type="appliance">${tags.appliances[i]}</li>`;
    }
    for (let i = 0; i < tags.utensils.length; i++) {
      utensilList.innerHTML += `<li class="tag-option" data-type="utensil">${tags.utensils[i]}</li>`;
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag-option")) {
      const tagValue = toLowerManual(e.target.textContent);
      const tagType = e.target.getAttribute("data-type");
      addTagToUI(tagValue, tagType);
    }
  });

  function addTagToUI(tagText, type) {
    const selectedTagsContainer = document.getElementById("selected-tags");

    const tags = selectedTagsContainer.querySelectorAll(".tag");
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (tag.dataset.value === tagText && tag.dataset.type === type) return;
    }

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.dataset.type = type;
    tag.dataset.value = tagText;
    tag.innerHTML = `${tagText} <span class="tag-remove" style="cursor:pointer;">&times;</span>`;
    selectedTagsContainer.appendChild(tag);

    applyAllFilters();

    tag.querySelector(".tag-remove").addEventListener("click", () => {
      tag.remove();
      applyAllFilters();
    });
  }

  function applyAllFilters() {
    const selectedTagElems = document.querySelectorAll("#selected-tags .tag");
    const selectedTags = [];

    for (let i = 0; i < selectedTagElems.length; i++) {
      const tag = selectedTagElems[i];
      addToArray(selectedTags, { value: tag.dataset.value, type: tag.dataset.type });
    }

    const results = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const name = toLowerManual(recipe.name);
      const description = toLowerManual(recipe.description);

      const ingredients = [];
      for (let j = 0; j < recipe.ingredients.length; j++) {
        addToArray(ingredients, toLowerManual(recipe.ingredients[j].ingredient));
      }

      const appliance = toLowerManual(recipe.appliance);
      const ustensils = [];
      for (let j = 0; j < recipe.ustensils.length; j++) {
        addToArray(ustensils, toLowerManual(recipe.ustensils[j]));
      }

      let matchesSearch = false;
      if (currentSearchTerm.length < 3) {
        matchesSearch = true;
      } else {
        if (name.indexOf(currentSearchTerm) !== -1 || description.indexOf(currentSearchTerm) !== -1) {
          matchesSearch = true;
        } else {
          for (let k = 0; k < ingredients.length; k++) {
            if (ingredients[k].indexOf(currentSearchTerm) !== -1) {
              matchesSearch = true;
              break;
            }
          }
        }
      }

      let matchesTags = true;
      for (let t = 0; t < selectedTags.length; t++) {
        const value = selectedTags[t].value;
        const type = selectedTags[t].type;

        if (type === "ingredient" && !arrayIncludes(ingredients, value)) {
          matchesTags = false;
          break;
        }
        if (type === "appliance" && appliance.indexOf(value) === -1) {
          matchesTags = false;
          break;
        }
        if (type === "utensil" && !arrayIncludes(ustensils, value)) {
          matchesTags = false;
          break;
        }
      }

      if (matchesSearch && matchesTags) {
        addToArray(results, recipe);
      }
    }

    displayRecipes(results);
    displayFilterLists(results);
  }

  displayRecipes(recipes);
  displayFilterLists(recipes);

  setTimeout(() => {
    setupDropdownSearch();
  }, 0);

  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const dropdown = btn.parentElement;
      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== dropdown) d.classList.remove("open");
      });
      dropdown.classList.toggle("open");
      e.stopPropagation();
    });
  });
});

