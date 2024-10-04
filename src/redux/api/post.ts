/* eslint-disable @typescript-eslint/no-explicit-any */

import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    CreatePost: build.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.posts],
    }),
    getAllPosts: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/post/posts",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TResponseSuccess) => {
      //   return response?.data;
      // },
      providesTags: [tagTypes.posts],
    }),
    getSingleFlat: build.query({
      query: (flatId) => ({
        url: `/flat/${flatId}`,
        method: "GET",
      }),
      // transformResponse: (response: TResponseSuccess) => {
      //   return response?.data;
      // },
      providesTags: [tagTypes.posts],
    }),
    updateFlat: build.mutation({
      query: (data) => ({
        url: `/flat/${data?.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.posts],
    }),
    deleteFlat: build.mutation({
      query: (id) => ({
        url: `/flat/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.posts],
    }),
    getMyFlats: build.query({
      query: () => ({
        url: "/flat/my-flats",
        method: "GET",
      }),
      providesTags: [tagTypes.posts],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetSingleFlatQuery,
  useUpdateFlatMutation,
  useDeleteFlatMutation,
  useGetMyFlatsQuery,
} = postsApi;
