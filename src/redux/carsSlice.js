import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchFilteredCars, fetchSelectedCar } from "./operations";

const initialState = {
  allCars: [],
  filteredCars: [],
  isLoading: false,
  error: null,
  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  },
  favorites: [],
  isFilterApplied: false,
  selectedCar: {},
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    resetFilterResult: (state) => {
      state.filteredCars = [];
      state.isFilterApplied = false;
    },
    resetFilters: (state) => {
      state.filters = {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      };
      state.isFilterApplied = false;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      const index = state.favorites.indexOf(carId);
      if (index === -1) {
        state.favorites.push(carId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.allCars = [...action.payload.cars];
        console.log("Ответ от сервера:", action.payload);
        // state.filteredItems = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilteredCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isFilterApplied = true;
        state.filteredCars = [];
      })
      .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredCars = [...action.payload.cars];
        console.log("Фильтр ответ от сервера:", action.payload.cars);
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchSelectedCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSelectedCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
        console.log("Selected car response:", action.payload);
      })
      .addCase(fetchSelectedCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetFilterResult, resetFilters, setFilters, toggleFavorite } =
  carsSlice.actions;
export const carsReducer = carsSlice.reducer;
