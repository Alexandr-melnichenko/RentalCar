import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/cars");
      return response.data;
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
