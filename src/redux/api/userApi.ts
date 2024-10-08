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
    changeUserRole: build.mutation({
      query: (data) => {
        return {
          url: `/user/change-role/${data?.userId}`,
          method: "PATCH",
          data: data?.body,
        };
      },
      invalidatesTags: [tagTypes.users],
    }),
    getMyProfile: build.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.users, tagTypes.profile],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.users, tagTypes.profile],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useFollowUserMutation,
  useChangeUserRoleMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = userApi;
