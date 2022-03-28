import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const reactionsSlice = createSlice({
  name: "reactionsSlice",
  initialState: {
    reactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    getReactionsFetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    getReactionsSuccess: (state, action) => {
      state.reactions = action.payload;
      state.loading = false;
      state.error = null;
    },
    getReactionsRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getReactionsFetch, getReactionsSuccess, getReactionsRejected } =
  reactionsSlice.actions;

export default reactionsSlice.reducer;
