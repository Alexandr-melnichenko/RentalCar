import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filteredItems: [],
  status: "idle",
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    filterCars: (state, action) => {
      const { brand, price, mileAgeFrom, mileAgeTo } = action.payload;
      let filtered = state.items;

      if (brand) {
        filtered = filtered.filter((p) => p.brand === brand);
      }

      if (price) {
        filtered = filtered.filter(
          (p) => Number(p.rentalPrice) === Number(price)
        );
      }

      if (mileAgeFrom) {
        filtered = filtered.filter(
          (p) => Number(p.mileage) >= Number(mileAgeFrom)
        );
        console.log("mileAgeFrom:", mileAgeFrom);
      }

      if (mileAgeTo) {
        filtered = filtered.filter(
          (p) => Number(p.mileage) <= Number(mileAgeTo)
        );
      }
      state.filteredItems = filtered;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.items = [...action.payload.cars];
        console.log("Ответ от сервера:", action.payload);
        state.filteredItems = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
