import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    followUser: build.mutation({
      query: ({followInfo}) => {
        return {
          url: `/user/follow`,
          method: "POST",
          body: followInfo,
        };
      },
      invalidatesTags: [tagTypes.users, tagTypes.posts],
    }),
    forgotPassowrd: build.mutation({
      query: (data) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.users],
    }),
    getSingleProfile: build.query({
      query: (id) => {
        console.log("Fetched user ID:", id); // Logs the ID before sending the request
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.users, tagTypes.posts, tagTypes.likes, tagTypes.dislikes, tagTypes.comments],
    }),
    
    updateProfile: build.mutation({
      query: ({ data, id }) => {
        // Console log the data and id
        console.log("ID:", id);
        console.log("Data:", data);
    
        return {
          url: `/user/user/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.users],
    }),
    
  }),
});

export const {
  useGetAllUserQuery,
  useFollowUserMutation,
  useForgotPassowrdMutation,
  useGetSingleProfileQuery,
  useUpdateProfileMutation,
} = userApi;
