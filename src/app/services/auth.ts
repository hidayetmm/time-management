import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";

export interface Task {
  id: number;
  name: string;
  fetched_at: string;
}

type TasksResponse = Task[];

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; user: User }, any>({
      query: (credentials: any) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: "error" });
        },
      },
    }),
    signup: build.mutation<{ token: string; user: User }, any>({
      query: (credentials: any) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: "error" });
        },
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
