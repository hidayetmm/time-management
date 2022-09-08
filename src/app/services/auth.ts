// import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";

export interface Task {
  id: number;
  name: string;
  fetched_at: string;
}

type TasksResponse = Task[];

export interface AuthResponse {
  id: string;
  username: string;
  accessToken: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, any>({
      query: (credentials: any) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: build.mutation<AuthResponse, any>({
      query: (credentials: any) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
