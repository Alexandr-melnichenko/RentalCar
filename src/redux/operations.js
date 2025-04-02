import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk("cars/fetchAll", async () => {
  try {
    const response = await axios.get("/cars");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});
