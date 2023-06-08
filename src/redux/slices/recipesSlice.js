import { createSlice } from "@reduxjs/toolkit";

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
