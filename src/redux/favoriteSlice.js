import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: false,
};

const slice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    makeFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    resetFavorite: (state) => {
      state.favorite = false;
    },
  },
});

export const { makeFavorite, resetFavorite } = slice.actions;
export const favoriteReducer = slice.reducer;
