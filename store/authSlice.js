import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, setRefreshToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
