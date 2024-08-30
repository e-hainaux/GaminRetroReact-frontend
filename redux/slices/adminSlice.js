import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  loading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  adminSlice.actions;
export default adminSlice.reducer;
