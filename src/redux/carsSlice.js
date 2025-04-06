import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCars,
  fetchFilteredCars,
  fetchMoreCars,
  fetchSelectedCar,
} from "./operations";

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
  isFilterApplied: false,
  selectedCar: {},
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
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
    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMore = true;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
      state.hasMore = state.currentPage < action.payload;
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
        state.allCars =
          state.currentPage === 1
            ? [...action.payload.cars]
            : [...state.allCars, action.payload.cars];
        state.hasMore = action.payload.cars.length > 0;
        state.totalPages = action.payload.totalPages;
        console.log("Ответ от сервера:", action.payload);
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
      })
      .addCase(fetchMoreCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCars = [...state.allCars, ...action.payload.cars];
        state.currentPage += 1;
        state.hasMore =
          action.payload.cars.length > 0 &&
          state.currentPage < state.totalPages;
      })
      .addCase(fetchMoreCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetFilterResult,
  resetFilters,
  setFilters,
  toggleFavorite,
  resetPagination,
  setTotalPages,
} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
