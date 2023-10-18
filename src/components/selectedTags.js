import selectTags from './selectTags';

function renderSelectedTags(props) {
  const { recipes, getSelectedTags, onChange } = props;

  let components = (() => {
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    recipes.forEach((recipe) => {
      recipe['ingredients'].forEach((ingredient) => {
        const ingredientName = capitalizeFirstLetter(ingredient['ingredient']);

        if (!ingredients.some((e) => e === ingredientName)) {
          ingredients.push(ingredientName);
        }
      });

      const applianceName = capitalizeFirstLetter(recipe['appliance']);
      if (!appliances.some((e) => e === applianceName)) {
        appliances.push(applianceName);
      }

      recipe['ustensils'].forEach((ustensil) => {
        const ustensilName = capitalizeFirstLetter(ustensil);
        if (!ustensils.some((e) => e === ustensilName)) {
          ustensils.push(ustensilName);
        }
      });

      ingredients.sort((a, b) => a.localeCompare(b));
      appliances.sort((a, b) => a.localeCompare(b));
      ustensils.sort((a, b) => a.localeCompare(b));
    });

    return { ingredients, appliances, ustensils };
  })();

  /**
   * @param {string} tag
   * @param {string} type
   */
  function renderSelectedTag(tag, type) {
    /**
     * Ignore if tag already selected
     */
    if (getSelectedTags(type).includes(tag)) {
      return;
    }

    const selectedTagsContainer = document.querySelector('#selected-tags');

    const node = document.createElement('div');

    // tailwind
    node.className =
      'flex flex-row items-center gap-2 px-3 py-1 text-sm text-black rounded bg-yellowTheme';
    // selector
    node.classList.add('selected-tag');
    node.setAttribute('data-type', type);

    node.innerHTML = `
      <span>${tag}</span>
      <button class="text-xl text-black cursor-pointer" type="button">
        <i class="fa-solid fa-times"></i>
      </button>
    `;

    selectedTagsContainer.appendChild(node);

    // update array
    onChange('ADD', type, tag);

    node.querySelector('button').addEventListener('click', () => {
      node.remove();

      onChange('DELETE', type, tag);

      // remove selected tag indicator in select
      document
        .querySelector('#select-' + type + '-options .option[data-value="' + tag + '"]')
        .classList.remove('bg-yellow-100');
    });
  }

  selectTags({
    container: document.querySelector('#selectTags-container'),
    name: 'ingredients',
    options: components.ingredients,
    onChange: (selectedOption) => {
      renderSelectedTag(selectedOption, 'ingredients');
    },
    placeholder: 'Ingrédients',
  });
  selectTags({
    container: document.querySelector('#selectTags-container'),
    name: 'appliances',
    options: components.appliances,
    onChange: (selectedOption) => {
      renderSelectedTag(selectedOption, 'appliances');
    },
    placeholder: 'Appareils',
  });
  selectTags({
    container: document.querySelector('#selectTags-container'),
    name: 'ustensils',
    options: components.ustensils,
    onChange: (selectedOption) => {
      renderSelectedTag(selectedOption, 'ustensils');
    },
    placeholder: 'Ustensiles',
  });
}

export default renderSelectedTags;
