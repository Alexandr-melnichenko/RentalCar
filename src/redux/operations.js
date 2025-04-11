import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/cars?page=1");
      return {
        cars: response.data.cars,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error fetching cars:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCars = createAsyncThunk(
  "cars/fetchFiltered",
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters.brand) params.append("brand", filters.brand);
      if (filters.rentalPrice)
        params.append("rentalPrice", filters.rentalPrice);
      if (filters.minMileage) params.append("minMileage", filters.minMileage);
      if (filters.maxMileage) params.append("maxMileage", filters.maxMileage);

      console.log("Параметры фильтра:", params.toString());
      const response = await axios.get(`/cars?${params.toString()}`);
      console.log("Ответ сервера с фильтрацией:", response.data);
      return response.data;
    } catch (err) {
      console.error("Filter error:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSelectedCar = createAsyncThunk(
  "cars/fetchSelected",
  async (carId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/cars/${carId}`);
      console.log("Ответ сервера с carId:", response.data);
      return response.data;
    } catch (err) {
      console.error("CarId error:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMoreCars = createAsyncThunk(
  "cars/fetchMore",
  async (page, { rejectWithValue, getState }) => {
    try {
      const { cars } = getState();
      const nextPage = cars.currentPage + 1;
      const response = await axios.get(`/cars?page=${nextPage}`);
      const newCars = response.data.cars.filter(
        (newCar) =>
          !cars.allCars.some((exitingCar) => exitingCar.id === newCar.id)
      );

      return {
        cars: newCars,
        page: nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
