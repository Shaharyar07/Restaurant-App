import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase"; // Assuming you have a Firebase instance named "db"
import { collection, getDocs } from "firebase/firestore";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

// Asynchronous action to fetch categories from Firebase
export const fetchCategories = () => async (dispatch) => {
  try {
    const docRef = collection(db, "categories");
    const docSnap = await getDocs(docRef);
    const categories = docSnap.docs.map((doc) => doc.data());
    console.log("categoriesSlice: ", categories);
    dispatch(setCategories(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    // You can dispatch an error action here or handle the error in another way
  }
};
