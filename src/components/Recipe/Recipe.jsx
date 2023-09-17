function Recipe({ recipe }) {
  console.log(recipe);

  return (
    <>
      <div className="flex flex-col rounded">
        <div className="w-full h-12">
          <img
            src={"src/assets/recipes-img/" + recipe.image}
            alt="Recipe"
            className="object-cover w-full h-full rounded-t"
          />
        </div>
      </div>
    </>
  );
}

export default Recipe;
