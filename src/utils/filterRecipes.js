/**
 * Filter recipes by search and tags
 *
 * @param {any[]} recipes
 * @param {string} search
 * @param {any[]} tags
 * @returns {any[]} recipes filtered
 */
function filterRecipes(recipes, search, tags) {
  search = search.toLowerCase();

  return recipes.filter((recipe) => {
    let isOk = false;
    if (search !== '') {
      if (recipe.name.toLowerCase().includes(search)) {
        isOk = true;
      } else if (recipe.description.toLowerCase().includes(search)) {
        isOk = true;
      } else if (
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(search)
        )
      ) {
        isOk = true;
      } else {
        isOk = false;
      }
    } else {
      isOk = true;
    }

    if (tags.ingredients.length > 0 && isOk) {
      if (
        recipe.ingredients.some((ingredient) => tags.ingredients.includes(ingredient.ingredient))
      ) {
        console.log('ingredient', recipe.ingredients);
        isOk = true;
      } else {
        isOk = false;
      }
    }

    if (tags.appliances.length > 0 && isOk) {
      if (tags.appliances.includes(recipe.appliance)) {
        isOk = true;
      } else {
        isOk = false;
      }
    }

    if (tags.ustensils.length > 0 && isOk) {
      if (recipe.ustensils.some((ustensil) => tags.ustensils.includes(ustensil))) {
        isOk = true;
      } else {
        isOk = false;
      }
    }

    return isOk;
  });
}

export default filterRecipes;
