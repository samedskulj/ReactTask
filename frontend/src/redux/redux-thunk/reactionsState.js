import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReactions } from "../../utils/firebase-functions/firebase-functions";

export const getReactionsFirebase = createAsyncThunk(
  "reactions/getReactionsFirebase",
  async (formData) => {
    const response = await getReactions();
    return response;
  }
);

export const reactionsState = createSlice({
  name: "reactions",
  initialState: {
    reactions: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getReactionsFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getReactionsFirebase.fulfilled]: (state, action) => {
      state.loading = true;
      state.reaction = action.payload;
      state.error = null;
    },
    [getReactionsFirebase.rejected]: (state, action) => {
      state.loading = true;
      state.reaction = null;
      state.error = action.payload;
    },
    [getReactionsFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export default reactionsState.reducer;
