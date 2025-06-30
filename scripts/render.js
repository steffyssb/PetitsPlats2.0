//render recipies from the global variable//
const recipieContainer = document.getElementById("recipies-container");

// function to generate html for one recipie //

function createRecipeCard(recipes){
    return`
    <article class = "recipie-card">
        <img src="/JSON_recipes/${recipes.image}" alt="${recipes.name}"/>
        <div class="recipe-header">
            <h2>${recipes.name}</h2>
            <span class="time"><i class="far-fa clock">${recipes.time}min</i></span>
        </div>
        <div class="recipe-body">
            <div class="ingredients">
                      ${recipes.ingredients
            .map((ing) => {
              let quantity = ing.quantity ? `: ${ing.quantity}` : "";
              if (ing.unit) quantity += ` ${ing.unit}`;
              return `<p><strong>${ing.ingredient}</strong>${quantity}</p>`;
            })
            .join("")}
            </div>
            <p class="description">${recipes.description}</p>
        </div>       
    </article>
`;
}

//function to render all recipes//

function displayRecipes(recipes){
    recipieContainer.innerHTML="";
    if (recipes.length === 0){
    recipieContainer.innerHTML=`<p>No recipe found</p>`;
    return;
    }
     recipieContainer.innerHTML=recipes.map(createRecipeCard).join("");
}
// call it initially with all its recipes//
displayRecipes(recipes);