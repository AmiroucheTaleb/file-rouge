import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fuelsSlice = createSlice({
  name: "fuels",
  initialState: {
    isLoading: false,
    fuels: [],
  },
  reducers: {
    addNewFuel: async (state, action) => {
      let { newFuelObj } = action.payload;
      await axios.post("http://localhost:3001/api/fuel", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      state.fuels = [...state.fuels, newFuelObj];
      console.log(newFuelObj);
    },
  },
});

export const { addNewFuel } = fuelsSlice.actions;

export default fuelsSlice.reducer;
