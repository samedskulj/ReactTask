import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHot } from "../../utils/firebase-functions/firebase-functions";

export const getHotQuestions = createAsyncThunk(
  "hot/getHotQuestions",
  async () => {
    const response = await getHot();
    return response;
  }
);

export const hotQuestionsSlice = createSlice({
  name: "hot",
  initialState: {
    hotQuestions: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getHotQuestions.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getHotQuestions.fulfilled]: (state, action) => {
      state.hotQuestions = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getHotQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default hotQuestionsSlice.reducer;
