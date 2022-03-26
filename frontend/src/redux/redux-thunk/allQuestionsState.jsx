import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions } from "../../utils/firebase-functions/firebase-functions";

export const getAllQuestions = createAsyncThunk(
  "allQuestions/getAllQuestions",
  async () => {
    const response = await getQuestions();
    return response;
  }
);

export const allQuestionsSlice = createSlice({
  name: "allQuestions",
  initialState: {
    allQuestions: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllQuestions.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllQuestions.fulfilled]: (state, action) => {
      state.allQuestions = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getAllQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default allQuestionsSlice.reducer;
