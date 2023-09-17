import { recipes } from "../../data/recipes.js";
import Select from "react-select";
import Recipe from "../Recipe/Recipe.jsx";

function Main() {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  let recipesCounter = 0;

  recipes.map((recipe) => {
    recipesCounter++;

    recipe["ingredients"].map((ingredient) => {
      const ingredientName = capitalizeFirstLetter(ingredient["ingredient"]);
      if (ingredients.map((e) => e.label).indexOf(ingredientName) === -1)
        ingredients.push({ label: ingredientName, value: ingredientName });
    });

    const applianceName = capitalizeFirstLetter(recipe["appliance"]);
    if (appliances.map((e) => e.label).indexOf(applianceName) === -1)
      appliances.push({ label: applianceName, value: applianceName });

    recipe["ustensils"].map((ustensil) => {
      const ustensilName = capitalizeFirstLetter(ustensil);
      if (ustensils.map((e) => e.label).indexOf(ustensilName) === -1)
        ustensils.push({ label: ustensilName, value: ustensilName });
    });
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ingredients.sort((a, b) => a.label.localeCompare(b.label));
  appliances.sort((a, b) => a.label.localeCompare(b.label));
  ustensils.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <div className="flex flex-col px-48 py-5">
        <div className="flex flex-row gap-10">
          <Select
            className=""
            options={ingredients}
            defaultValue={{ label: "Ingrédients", value: "Ingrédients" }}
          />
          <Select
            className=""
            options={appliances}
            defaultValue={{ label: "Appareils", value: "Appareils" }}
          />
          <Select
            className=""
            options={ustensils}
            defaultValue={{ label: "Ustensiles", value: "Ustensiles" }}
          />

          <span className="ml-auto">{recipesCounter} recettes</span>
        </div>
        <div className="grid grid-flow-col grid-rows-3 gap-4">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;
