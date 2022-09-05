import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";

export interface Task {
  id: number;
  name: string;
  fetched_at: string;
}

type TasksResponse = Task[];

export const tasksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, void>({
      query: () => "tasks",
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Tasks", id } as const)),
        { type: "Tasks" as const, id: "LIST" },
      ],
    }),
    addTask: build.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    getTask: build.query<Task, number>({
      query: (id) => `tasks/${id}`,
      providesTags: (_post, _err, id) => [{ type: "Tasks", id }],
    }),
    updateTask: build.mutation<Task, Partial<Task>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `tasks/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (task) => [{ type: "Tasks", id: task?.id }],
    }),
    deleteTask: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (post) => [{ type: "Tasks", id: post?.id }],
    }),
    // getErrorProne: build.query<{ success: boolean }, void>({
    //   query: () => "error-prone",
    // }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
