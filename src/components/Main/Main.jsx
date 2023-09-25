import { useMemo, useState } from "react";
import { recipes as defaultRecipes } from "../../data/recipes.js";
import Select from "../Select/Select.jsx";
import Recipe from "../Recipe/Recipe.jsx";

function Main(props) {
  const [selectedIngredients, setSelectedIngredient] = useState([]);
  const [selectedAppliances, setSelectedAppliance] = useState([]);
  const [selectedUstensils, setSelectedUstensils] = useState([]);

  const { search } = props;

  let recipes = useMemo(() => {
    if (search !== "") {
      console.log(search);
    }

    return defaultRecipes;
  }, [search]);

  let components = useMemo(() => {
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    recipes.forEach((recipe) => {
      recipe["ingredients"].forEach((ingredient) => {
        const ingredientName = capitalizeFirstLetter(ingredient["ingredient"]);

        if (!ingredients.some((e) => e.label === ingredientName)) {
          ingredients.push({ label: ingredientName, value: ingredientName });
        }
      });

      const applianceName = capitalizeFirstLetter(recipe["appliance"]);
      if (!appliances.some((e) => e.label === applianceName)) {
        appliances.push({ label: applianceName, value: applianceName });
      }

      recipe["ustensils"].forEach((ustensil) => {
        const ustensilName = capitalizeFirstLetter(ustensil);
        if (!ustensils.some((e) => e.label === ustensilName)) {
          ustensils.push({ label: ustensilName, value: ustensilName });
        }
      });

      ingredients.sort((a, b) => a.label.localeCompare(b.label));
      appliances.sort((a, b) => a.label.localeCompare(b.label));
      ustensils.sort((a, b) => a.label.localeCompare(b.label));
    });

    return { ingredients, appliances, ustensils };
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChangeIngredients = (selectedOption) => {
    setSelectedIngredient((selectedIngredients) => [
      ...selectedIngredients,
      selectedOption.value,
    ]);
  };
  const removeIngredient = (ingredientToRemove) => {
    setSelectedIngredient(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      )
    );
  };

  const handleChangeAppliance = (selectedOption) => {
    setSelectedIngredient((selectedAppliances) => [
      ...selectedAppliances,
      selectedOption.value,
    ]);
  };
  const removeAppliance = (applianceToRemove) => {
    setSelectedAppliance(
      selectedAppliances.filter((appliance) => appliance !== applianceToRemove)
    );
  };

  const handleChangeUstensils = (selectedOption) => {
    setSelectedUstensils((selectedUstensils) => [
      ...selectedUstensils,
      selectedOption.value,
    ]);
  };
  const removeUstensil = (ustensilToRemove) => {
    setSelectedUstensils(
      selectedUstensils.filter((ustensil) => ustensil !== ustensilToRemove)
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-48 py-5">
        <div className="flex flex-row gap-10">
          <Select
            className=""
            options={components.ingredients}
            onChange={handleChangeIngredients}
            defaultValue={{ label: "Ingrédients", value: "Ingrédients" }}
          />
          <Select
            className=""
            options={components.appliances}
            onChange={handleChangeAppliance}
            defaultValue={{ label: "Appareils", value: "Appareils" }}
          />
          <Select
            className=""
            options={components.ustensils}
            onChange={handleChangeUstensils}
            defaultValue={{ label: "Ustensiles", value: "Ustensiles" }}
          />

          <span className="ml-auto font-['Anton'] text-xl">
            {recipes.length} recettes
          </span>
        </div>
        <div className="flex flex-row gap-10">
          {selectedIngredients.map((ingredient) => (
            <div
              key={ingredient}
              className="flex flex-row items-center gap-2 px-3 py-1 text-sm text-black rounded bg-yellowTheme">
              <span>{ingredient}</span>
              <span
                className="text-xl text-black cursor-pointer"
                onClick={() => removeIngredient(ingredient)}>
                <i className="fa-solid fa-times"></i>
              </span>
            </div>
          ))}
          {selectedAppliances.map((appliance) => (
            <div
              key={appliance}
              className="flex flex-row items-center gap-2 px-3 py-1 text-sm text-black rounded bg-yellowTheme">
              <span>{appliance}</span>
              <span
                className="text-xl text-black cursor-pointer"
                onClick={() => removeAppliance(appliance)}>
                <i className="fa-solid fa-times"></i>
              </span>
            </div>
          ))}
          {selectedUstensils.map((ustensil) => (
            <div
              key={ustensil}
              className="flex flex-row items-center gap-2 px-3 py-1 text-sm text-black rounded bg-yellowTheme">
              <span>{ustensil}</span>
              <span
                className="text-xl text-black cursor-pointer"
                onClick={() => removeUstensil(ustensil)}>
                <i className="fa-solid fa-times"></i>
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-flow-row grid-cols-3 mt-6 gap-14">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;
