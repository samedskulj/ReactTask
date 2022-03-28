import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserFromDatabase,
  changeProfileData,
  registerUser,
  loginUser,
  signOut,
  resetPassword,
} from "../../utils/firebase-functions/firebase-functions";

export const getUser = createAsyncThunk("user/getUser", async (email) => {
  const response = await getUserFromDatabase(email);
  return response;
});

export const updateUserFirebase = createAsyncThunk(
  "user/updateUserFirebase",
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

export const resetPasswordFirebase = createAsyncThunk(
  "user/resetPasswordFirebase",
  async (formData) => {
    const response = await resetPassword(formData);
    return response;
  }
);

export const signOutUserFirebase = createAsyncThunk(
  "user/signOutUserFirebase",
  async (formData) => {
    const response = await signOut(formData);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: false,
    loading: false,
    updated: false,
    signout: false,
    resetpassword: false,
  },
  reducers: {
    resetUserData: (state) => {
      state.user = null;
      state.error = false;
      state.loading = false;
      state.updated = false;
    },
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
    [signOutUserFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [signOutUserFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.signout = action.payload;
      state.error = null;
    },
    [signOutUserFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [resetPasswordFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [resetPasswordFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetpassword = action.payload;
      state.error = null;
    },
    [resetPasswordFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateUserFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateUserFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.updated = action.payload;
      state.error = null;
    },
    [updateUserFirebase.rejected]: (state, action) => {
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
        action.payload.includes("auth/user-not-found")
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
      state.error = null;
    },
  },
});

export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;
