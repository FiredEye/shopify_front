import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./constant";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/userLogin",
        body: data,
        method: "post",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/userRegister",
        body: data,
        method: "post",
      }),
    }),
    userUpdate: builder.mutation({
      query: (query) => ({
        url: "/api/updateUserDetail",
        method: "PATCH",
        body: query.body,
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["User"],
    }),
    adminUpdate: builder.mutation({
      query: (query) => ({
        url: "/api/updateAdminDetail",
        method: "PATCH",
        body: query.body,
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserUpdateMutation,
  useAdminUpdateMutation,
} = authApi;
