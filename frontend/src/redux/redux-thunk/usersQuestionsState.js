import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersQuestions } from "../../utils/firebase-functions/firebase-functions";

export const getUsersQuestionsFirebase = createAsyncThunk(
  "usersQuestions/getUsersQuestionsFirebase",
  async (userID) => {
    const response = await getUsersQuestions(userID);
    return response;
  }
);

export const usersQuestionsSlice = createSlice({
  name: "usersQuestions",
  initialState: {
    usersQuestions: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getUsersQuestionsFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUsersQuestionsFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.usersQuestions = action.payload;
    },
    [getUsersQuestionsFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default usersQuestionsSlice.reducer;
