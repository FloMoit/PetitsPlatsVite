console.log(recipes);

function setIngredients() {
  const select = document.getElementById("ingredients");
  const ingredients = ["leite", "café", "chocolate", "açúcar", "canela"];
  ingredients.forEach((ingredient) => {
    const option = document.createElement("option");
    option.value = ingredient;
    option.innerText = ingredient;
    select.appendChild(option);
  });
}

setIngredients();
