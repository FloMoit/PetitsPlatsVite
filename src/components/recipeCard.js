function recipeCard({ recipe }) {
  return `
    <div
      data-id=${recipe.id}
      class="recipe-card    flex flex-col min-w-0 overflow-hidden bg-white shadow rounded-2xl"
    >
      <div className="relative w-full h-72">
        <img
          src="${'src/assets/recipes-img/' + recipe.image}"
          alt="Recipe"
          class="object-cover w-full h-full rounded-t-2xl"
        />
        <span class="absolute px-3 py-1 text-sm text-black rounded-full top-5 right-5 bg-yellowTheme">
          ${recipe.time + 'min'}
        </span>
      </div>
      <div class="flex flex-col gap-4 px-6 py-8">
        <h2 class="text-lg font-bold font-['Anton'] pb-5">
          ${recipe.name}
        </h2>
        <span class="text-sm font-bold tracking-wider text-gray-400">
          RECETTE
        </span>
        <p class="pb-5 text-sm">${recipe.description}</p>
        <span class="text-sm font-bold tracking-wider text-gray-400">
          INGRÉDIENTS
        </span>
        <div class="grid grid-cols-2 gap-6">
          ${recipe.ingredients
            .map((ingredient) => {
              let ingredientQuantity = '';

              if (typeof ingredient.quantity !== 'undefined') {
                ingredientQuantity = ingredient.quantity;
              }
              if (typeof ingredient.unit !== 'undefined') {
                ingredientQuantity = ingredientQuantity + ' ' + ingredient.unit;
              }

              return `
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-black">
                    ${ingredient.ingredient}
                  </span>
                  <span class="text-sm text-gray-400">
                    ${ingredientQuantity}
                  </span>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    </div>
  `;
}

export default recipeCard;
