import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((car) => car.id !== action.payload);
    },
    loadFavorites: (state) => {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      state.items = savedFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites, loadFavorites } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
