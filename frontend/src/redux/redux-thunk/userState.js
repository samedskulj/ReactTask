import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromDatabase } from "../../utils/firebase-functions/firebase-functions";
import { getCurrentUser } from "../../utils/getCurrentUser";
import { authFirebase } from "../../utils/firebase-config";

export const getUser = createAsyncThunk("user/getUser", async (email) => {
  const response = await getUserFromDatabase(email);
  return response;
});

const currentUser = authFirebase.currentUser;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: currentUser,
    error: "",
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserTest } = userSlice.actions;
export default userSlice.reducer;
