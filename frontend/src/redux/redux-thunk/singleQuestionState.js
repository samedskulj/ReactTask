import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment } from "../../utils/firebase-functions/firebase-functions";

export const addAnswerFirebase = createAsyncThunk(
  "singleQuestion/addAnswerFirebase",
  async (formData) => {
    const response = await addComment(formData);
    return response;
  }
);

export const singleQuestionSlice = createSlice({
  name: "singleQuestion",
  initialState: {
    singleQuestion: [],
    answers: [],
    loading: false,
    error: null,
  },
  reducers: {
    getSingleQuestionFetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleQuestionSuccess: (state, action) => {
      state.singleQuestion = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSingleQuestionRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addQuestionFinished: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    getSingleQuestionAnswersFetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleQuestionAnswersSuccess: (state, action) => {
      state.answers = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSingleQuestionAnswersRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [addAnswerFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addAnswerFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.added = action.payload;
    },
    [addAnswerFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getSingleQuestionFetch,
  getSingleQuestionRejected,
  getSingleQuestionSuccess,
  getSingleQuestionAnswersFetch,
  getSingleQuestionAnswersSuccess,
  getSingleQuestionAnswersRejected,
} = singleQuestionSlice.actions;

export default singleQuestionSlice.reducer;
