import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const allQuestionsSlice = createSlice({
  name: "allQuestions",
  initialState: {
    allQuestions: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllQuestionsFetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllQuestionsSuccess: (state, action) => {
      state.allQuestions = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllQuestionsRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllQuestionsFetch,
  getAllQuestionsRejected,
  getAllQuestionsSuccess,
} = allQuestionsSlice.actions;

export default allQuestionsSlice.reducer;
