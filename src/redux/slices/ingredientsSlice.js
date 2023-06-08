import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: [],
  reducers: {
    addIngredient: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addIngredient } = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;

export const fetchIngredients = () => async (dispatch) => {
  try {
    const docRef = collection(db, "ingredients");
    const docSnap = await getDocs(docRef);
    const ingredients = docSnap.docs.map((doc) => doc.data());
    console.log("ingredientsSlice: ", ingredients);
    ingredients.forEach((ingredient) => dispatch(addIngredient(ingredient))); // Dispatch addIngredient for each ingredient
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    // You can dispatch an error action here or handle the error in another way
  }
};
