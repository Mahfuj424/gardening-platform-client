import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const dislikeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDislike: build.mutation({
      query: (disliikes) => {
        console.log("Sending like object to API:", disliikes);
        return {
          url: `/dislikes`, // Ensure the correct endpoint
          method: "POST",
          body: disliikes, // Send the likeObject as the body
        };
      },
      invalidatesTags: [tagTypes.posts, tagTypes.dislikes], // Cache invalidation
    }),
  }),
});

export const { useCreateDislikeMutation } = dislikeApi;
