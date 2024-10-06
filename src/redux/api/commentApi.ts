
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: ({ commentObject, postId }) => {
        console.log({ commentObject, postId });
        return {
          url: `/comments/${postId}`, // Use the postId in the URL
          method: "POST",
          body: commentObject, // Send the commentObject as the body of the request
        };
      },
      invalidatesTags: [tagTypes.comments, tagTypes.posts],
    }),
    
    updateComment: build.mutation({
      query: ({ commentObject, commentId }) => {
        // Log the commentObject and commentId
        console.log("Updating comment with ID:", commentId);
        console.log(commentObject);
    
        return {
          url: `/comments/${commentId}`,
          method: "PATCH",
          data: commentObject,
        };
      },
      invalidatesTags: [tagTypes.comments],
    }),
    
  }),
});

export const { useCreateCommentMutation, useUpdateCommentMutation } =
commentApi;
