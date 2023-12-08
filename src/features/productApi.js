import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./constant";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, page }) => ({
        url: `/api/products/${category}`,
        params: { page },
      }),
      providesTags: ["Product"],
    }),
    getSearchProducts: builder.query({
      query: (search) => ({
        url: `/api/searchProducts/${search}`,
      }),
      providesTags: ["Product"],
    }),
    getSimilarProducts: builder.query({
      query: (id) => ({
        url: `/api/similarProducts/${id}`,
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
      }),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: ({ body, token }) => ({
        url: "/api/addProduct",
        body,
        headers: {
          Authorization: token,
        },
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ body, token, id }) => ({
        url: `/api/updateProduct/${id}`,
        body,
        headers: {
          Authorization: token,
        },
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ body, token, id }) => ({
        url: `/api/deleteProduct/${id}`,
        body,
        headers: {
          Authorization: token,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    reviewProduct: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/api/reviewProduct/${id}`,
        body: body,
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSearchProductsQuery,
  useGetSimilarProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useReviewProductMutation,
} = productApi;
