import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers: {
    addRecipe: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addRecipe } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;

export const fetchRecipes = () => async (dispatch) => {
  try {
    const docRef = collection(db, "recipes");
    const docSnap = await getDocs(docRef);
    const recipes = docSnap.docs.map((doc) => doc.data());
    console.log("recipesSlice: ", recipes);
    recipes.forEach((recipe) => dispatch(addRecipe(recipe))); // Dispatch addRecipe for each recipe
  } catch (error) {
    console.error("Error fetching recipes:", error);
    // You can dispatch an error action here or handle the error in another way
  }
};
