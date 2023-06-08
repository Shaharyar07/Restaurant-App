import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { categoriesReducer } from "./slices/categoriesSlice";
import { recipesReducer } from "./slices/recipesSlice";
import { ingredientsReducer } from "./slices/ingredientsSlice";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
