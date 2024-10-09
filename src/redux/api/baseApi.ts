/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes, tagTypeList } from "../tagTypes"; // Adjust the path as necessary

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/v1` }),
  tagTypes: tagTypeList,
  endpoints: (builder) => ({
    // Renamed the endpoint to avoid conflicts
    fetchAllPosts: builder.query({
      query: (arg: { search?: string; filter?: string }) => ({
        url: "/post/posts",
        method: "GET",
        params: {
          ...(arg.search && { q: arg.search }), // Search query
          ...(arg.filter && { filter: arg.filter }), // Filter option
        },
      }),
      transformResponse: (response: any) => response.posts, // Extract posts
      providesTags: (result) =>
        result && Array.isArray(result) // Ensure result is an array
          ? [
              ...result.map(({ id }: any) => ({ type: tagTypes.posts, id } as const)),
              { type: tagTypes.posts, id: "LIST" },
            ]
          : [{ type: tagTypes.posts, id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchAllPostsQuery } = baseApi; // Updated hook name
