import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filters: {
    carBrand: "",
    pricePerHour: "",
    mileAgeFrom: "",
    mileAgeTo: "",
  },
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const { showCarsList } = slice.actions;
export const carsReducer = carsSlice.reducer;

// export const selectFilteredContacts = createSelector(
//     [selectContacts, selectNameFilter],
//     (contacts, nameFilter) => {
//       return contacts.filter((item) =>
//         item.name.toLowerCase().includes(nameFilter.toLowerCase())
//       );
//     }
//   );
