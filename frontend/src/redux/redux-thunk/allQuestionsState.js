import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addQuestion } from "../../utils/firebase-functions/firebase-functions";

export const addQuestionFirebase = createAsyncThunk(
  "allQuestions/addQuestion",
  async (formData) => {
    const response = await addQuestion(formData);
    return response;
  }
);

export const allQuestionsSlice = createSlice({
  name: "allQuestions",
  initialState: {
    allQuestions: [],
    loading: false,
    error: null,
    added: false,
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
    addQuestionFinished: (state, action) => {
      state.loading = false;
      state.error = null;
      state.added = false;
    },
  },
  extraReducers: {
    [addQuestionFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addQuestionFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.added = action.payload;
    },
    [addQuestionFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getAllQuestionsFetch,
  getAllQuestionsRejected,
  getAllQuestionsSuccess,
  addQuestionFinished,
} = allQuestionsSlice.actions;

export default allQuestionsSlice.reducer;
