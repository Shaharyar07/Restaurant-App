import { createSlice } from "@reduxjs/toolkit";

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
