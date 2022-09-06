import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface User {
  full_name: string;
  email: string;
  role: "USER" | "ADMIN";
  token: string;
}

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      if (action.payload.user) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        return;
      }
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
