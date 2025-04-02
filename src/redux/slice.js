import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cars: [],
  filters: {
    carBrand: "",
    pricePerHour: "",
    carMileAgeKm: {
      mileAgeFrom: "",
      mileAgeTo: "",
    },
  },
  favorite: false,
};

const slice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    showCarsList: (state, action) => {
      state.cars = axios.get("https://car-rental-api.goit.global/cars");
    },
  },
});

export const { showCarsList } = slice.actions;
export const carsReducer = slice.reducer;
