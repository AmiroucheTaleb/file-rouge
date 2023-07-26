import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const vidangesSlice = createSlice({
  name: "vidanges",
  initialState: {
    isLoading: false,
    vidanges: [],
  },
  reducers: {
    addNewFuel: async (state, action) => {
      let { newFuelObj } = action.payload;
      await axios.post("http://localhost:3001/api/vidanges", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      state.vidanges = [...state.vidanges, newFuelObj];
      console.log(newFuelObj);
    },
  },
});

export const { addNewVidange } = vidangesSlice.actions;

export default vidangesSlice.reducer;
