import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const carsSlice = createSlice({
  name: "cars",
  initialState: {
    isLoading: false,
    cars: [],
  },
  reducers: {
    addNewCar: async (state, action) => {
      let { newFuelObj } = action.payload;
      await axios.post("http://localhost:3001/api/car", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      state.cars = [...state.cars, newFuelObj];
      console.log(newFuelObj);
    },
  },
});

export const { addNewCar } = carsSlice.actions;

export default carsSlice.reducer;
