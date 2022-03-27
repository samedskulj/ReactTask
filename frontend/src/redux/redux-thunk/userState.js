import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserFromDatabase,
  changeProfileData,
  registerUser,
  loginUser,
} from "../../utils/firebase-functions/firebase-functions";
import { authFirebase } from "../../utils/firebase-config";

export const getUser = createAsyncThunk("user/getUser", async (email) => {
  const response = await getUserFromDatabase(email);
  return response;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData) => {
    const response = await changeProfileData(formData);
    return response;
  }
);

export const registerUserFirebase = createAsyncThunk(
  "user/registerUserFirebase",
  async (formData) => {
    const response = await registerUser(formData);
    return response;
  }
);

export const loginUserFirebase = createAsyncThunk(
  "user/loginUserFirbase",
  async (formData) => {
    const response = await loginUser(formData);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: false,
    loading: false,
    updated: false,
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
    [updateUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.updated = action.payload;
      state.error = null;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [registerUserFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [registerUserFirebase.fulfilled]: (state, action) => {
      if (
        typeof action.payload === "string" &&
        action.payload.includes("auth/email")
      ) {
        state.error = action.payload;
        state.user = null;
        state.loading = false;
      } else {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    },
    [registerUserFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loginUserFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loginUserFirebase.fulfilled]: (state, action) => {
      if (
        typeof action.payload === "string" &&
        action.payload.includes(
          "auth/email" || action.payload.includes("auth/password")
        )
      ) {
        state.error = action.payload;
        state.user = null;
        state.loading = false;
      } else {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    },
    [loginUserFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserTest } = userSlice.actions;
export default userSlice.reducer;
