import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  function useCategoryById(categoryId) {
    const categories = useSelector((state) => state.categories);
    const category = categories.find((data) => data.id === categoryId);
    return category;
  }

  function useIngredientName(ingredientId) {
    const ingredients = useSelector((state) => state.ingredients);
    const ingredient = ingredients.find(
      (data) => data.ingredientId === ingredientId
    );
    return ingredient ? ingredient.name : "";
  }

  function useIngredientUrl(ingredientId) {
    const ingredients = useSelector((state) => state.ingredients);
    const ingredient = ingredients.find(
      (data) => data.ingredientId === ingredientId
    );
    return ingredient ? ingredient.photo_url : "";
  }

  function useCategoryName(categoryId) {
    const categories = useSelector((state) => state.categories);
    const category = categories.find((data) => data.id === categoryId);
    return category ? category.name : "";
  }

  function useRecipes(categoryId) {
    const recipes = useSelector((state) => state.recipes);
    return recipes.filter((data) => data.categoryId === categoryId);
  }

  function useRecipesByIngredient(ingredientId) {
    const recipes = useSelector((state) => state.recipes);
    return recipes.filter((data) => {
      return data.ingredients.some((index) => index[0] === ingredientId);
    });
  }

  function useNumberOfRecipes(categoryId) {
    const recipes = useSelector((state) => state.recipes);
    return recipes.reduce((count, data) => {
      if (data.categoryId === categoryId) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  function useAllIngredients(idArray) {
    const ingredients = useSelector((state) => state.ingredients);
    return idArray.map((index) => {
      const ingredient = ingredients.find(
        (data) => data.ingredientId === index[0]
      );
      return [ingredient, index[1]];
    });
  }

  function useRecipesByIngredientName(ingredientName) {
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

  function useRecipesByCategoryName(categoryName) {
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

  function useRecipesByRecipeName(recipeName) {
    const nameUpper = recipeName.toUpperCase();
    const recipes = useSelector((state) => state.recipes);

    return recipes.filter((data) =>
      data.title.toUpperCase().includes(nameUpper)
    );
  }
  return (
    <RecipeContext.Provider
      value={{
        useCategoryById,
        useIngredientName,
        useIngredientUrl,
        useCategoryName,
        useRecipes,
        useRecipesByIngredient,
        useNumberOfRecipes,
        useAllIngredients,
        useRecipesByIngredientName,
        useRecipesByCategoryName,
        useRecipesByRecipeName,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  return useContext(RecipeContext);
}
