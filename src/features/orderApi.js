import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./constant";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ token, page }) => ({
        url: "/api/getOrders",
        params: { page },
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["order"],
    }),

    getOrderByUser: builder.query({
      query: ({ token, page }) => ({
        url: "/api/getUserOrder",
        params: { page },
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["order"],
    }),

    getOrderById: builder.query({
      query: (query) => ({
        url: `/api/getOrderById/${query.id}`,
        headers: {
          Authorization: query.token,
        },
      }),
      providesTags: ["order"],
    }),
    getOrderByIdForAdmin: builder.query({
      query: (query) => ({
        url: `/api/getOrderByIdForAdmin/${query.id}`,
        headers: {
          Authorization: query.token,
        },
      }),
      providesTags: ["order"],
    }),

    addOrder: builder.mutation({
      query: (query) => ({
        url: "/api/createOrder",
        body: query.body,
        method: "POST",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (query) => ({
        url: `/api/updateOrderStatus/${query.id}`,
        body: query.body,
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useGetOrderByIdForAdminQuery,
  useGetAllOrdersQuery,
  useGetOrderByUserQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
