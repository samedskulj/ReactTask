import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTopUsers } from "../../utils/firebase-functions/firebase-functions";

export const getTopUsersFirebase = createAsyncThunk(
  "topUsers/getTopUsersFirebase",
  async () => {
    const response = await getTopUsers();
    return response;
  }
);

export const singleQuestionSlice = createSlice({
  name: "topUsers",
  initialState: {
    topUsers: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getTopUsersFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getTopUsersFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.topUsers = action.payload;
    },
    [getTopUsersFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export default singleQuestionSlice.reducer;
