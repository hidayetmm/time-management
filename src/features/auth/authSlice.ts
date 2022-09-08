import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface User {
  id: string;
  username: string;
  role?: "USER" | "ADMIN";
  accessToken: string;
}

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        return;
      }
      state.user = null;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
