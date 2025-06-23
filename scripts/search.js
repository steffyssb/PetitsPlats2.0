//DOM element for search input//
const searchInput=document.getElementById("main-search");

//funtion to search if recipe matches the search element//
function isMatch(recipe, searchTerm){
    const term=searchTerm.toLowercase();
    //check recipe name//
    if(recipe.name.toLowercase.includes(term))return true ;
    //check recipe description //
    if(recipe.description.toLowercase.includes(term))return true ;
    //check recipe ingredients //
    const hasMatchingIngredient = recipe.ingredients.some((ing) =>
        ing.ingredients.toLowercase.includes(term));
    if (hasMatchingIngredient) return true;
    return false;
}

//eventlistener for search input//
searchInput.addEventListener("input",(e) =>{
    const value = e.target.value.trim();
    if (value.length < 3){
        displayRecipes(recipes);//show all if less than 3 letter//
        return;
    }
    const filteredRecipe = recipes.filter((recipe)=>
        isMatch(recipe,value)
    );
    displayRecipes(filteredRecipe);
}
);

