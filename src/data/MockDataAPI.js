import { useSelector } from "react-redux";

export function useCategoryById(categoryId) {
  const categories = useSelector((state) => state.categories);
  const category = categories.find((data) => data.id === categoryId);
  return category;
}

export function useIngredientName(ingredientId) {
  const ingredients = useSelector((state) => state.ingredients);
  const ingredient = ingredients.find(
    (data) => data.ingredientId === ingredientId
  );
  return ingredient ? ingredient.name : "";
}

export function useIngredientUrl(ingredientId) {
  const ingredients = useSelector((state) => state.ingredients);
  const ingredient = ingredients.find(
    (data) => data.ingredientId === ingredientId
  );
  return ingredient ? ingredient.photo_url : "";
}

export function useCategoryName(categoryId) {
  const categories = useSelector((state) => state.categories);
  const category = categories.find((data) => data.id === categoryId);
  return category ? category.name : "";
}

export function useRecipes(categoryId) {
  const recipes = useSelector((state) => state.recipes);
  return recipes.filter((data) => data.categoryId === categoryId);
}

export function useRecipesByIngredient(ingredientId) {
  const recipes = useSelector((state) => state.recipes);
  return recipes.filter((data) => {
    return data.ingredients.some((index) => index[0] === ingredientId);
  });
}

export function useNumberOfRecipes(categoryId) {
  const recipes = useSelector((state) => state.recipes);
  return recipes.reduce((count, data) => {
    if (data.categoryId === categoryId) {
      return count + 1;
    }
    return count;
  }, 0);
}

export function useAllIngredients(idArray) {
  const ingredients = useSelector((state) => state.ingredients);
  return idArray.map((index) => {
    const ingredient = ingredients.find(
      (data) => data.ingredientId === index[0]
    );
    return [ingredient, index[1]];
  });
}

export function useRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const ingredients = useSelector((state) => state.ingredients);
  const recipes = useSelector((state) => state.recipes);

  const filteredIngredients = ingredients.filter((data) =>
    data.name.toUpperCase().includes(nameUpper)
  );

  const recipesArray = [];
  filteredIngredients.forEach((data) => {
    const filteredRecipes = useRecipesByIngredient(data.ingredientId);
    filteredRecipes.forEach((item) => {
      if (!recipesArray.includes(item)) {
        recipesArray.push(item);
      }
    });
  });

  return recipesArray;
}

export function useRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const categories = useSelector((state) => state.categories);
  const recipes = useSelector((state) => state.recipes);

  const filteredCategories = categories.filter((data) =>
    data.name.toUpperCase().includes(nameUpper)
  );

  const recipesArray = [];
  filteredCategories.forEach((data) => {
    const filteredRecipes = useRecipes(data.id);
    filteredRecipes.forEach((item) => {
      if (!recipesArray.includes(item)) {
        recipesArray.push(item);
      }
    });
  });

  return recipesArray;
}

export function useRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipes = useSelector((state) => state.recipes);

  return recipes.filter((data) => data.title.toUpperCase().includes(nameUpper));
}
