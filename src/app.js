import './app.css';
import recipeCard from './components/recipeCard';
import renderSelectedTags from './components/selectedTags';

import { recipes as defaultRecipes } from './data/recipes';
import filterRecipes from './utils/filterRecipes';

let search = '';

const selectedTags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

function getRecipes() {
  let recipes = defaultRecipes;

  if (
    search !== '' ||
    selectedTags.ingredients.length > 0 ||
    selectedTags.appliances.length > 0 ||
    selectedTags.ustensils.length > 0
  ) {
    recipes = filterRecipes(defaultRecipes, search, {
      ingredients: selectedTags.ingredients,
      appliances: selectedTags.appliances,
      ustensils: selectedTags.ustensils,
    });
  }

  return recipes;
}

function renderRecipes(recipes) {
  const recipesContainer = document.querySelector('#recipes-container');
  const recipesLengthContainer = document.querySelector('#recipes-length');

  recipesContainer.innerHTML = '';

  if (recipes.length === 0) {
    recipesContainer.innerHTML = `
      <div>
        <h1 class="absolute text-2xl leading-snug text-center text-black font-['Anton'] ">
          Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux
          pommes », « poisson », etc.
        </h1>
      </div>
    `;
  } else {
    recipes.forEach((recipe) => {
      recipesContainer.innerHTML += recipeCard({ recipe });
    });
  }

  recipesLengthContainer.innerHTML = `${recipes.length} recettes`;

  return;
}

const handleChange = () => {
  const recipes = getRecipes();

  renderRecipes(recipes);

  renderSelectedTags({
    recipes,
    getSelectedTags: (type) => selectedTags[type],
    onChange: (eventType, type, tag) => {
      console.log(eventType, type, tag);

      if (eventType === 'DELETE') {
        selectedTags[type] = selectedTags[type].filter((e) => e !== tag);
      } else if (eventType === 'ADD') {
        selectedTags[type].push(tag);
      }

      handleChange();
    },
  });
};

document.querySelector('#search').addEventListener('submit', (event) => {
  event.preventDefault();

  const searchValue = new FormData(event.target).get('search');

  search = searchValue.length < 3 ? '' : searchValue;

  handleChange();
});

document.querySelector('#search input').addEventListener('input', (event) => {
  const searchValue = event.currentTarget.value;

  search = searchValue.length < 3 ? '' : searchValue;

  handleChange();
});

handleChange();
