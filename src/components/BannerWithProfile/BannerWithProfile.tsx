/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { SiMessenger } from "react-icons/si";
import { FiEdit } from "react-icons/fi"; // Import the edit icon
import { useFollowUserMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import UpdateProfileModal from "../modal/UpdateProfileModal";

const BannerWithProfile = ({ user, userInfo }: any) => {
  const [followUser] = useFollowUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal state

  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: userInfo?._id, followeeId };
      const res = await followUser({ followInfo }).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
    }
    };

  return (
    <div className="relative bg-custom-gradient text-white p-8 rounded-md">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-70"></div>

      {/* Edit Icon in the Top-Right Corner */}
      {userInfo?._id === user?._id && (
        <div className="absolute cursor-pointer top-4 right-4">
          <div className="relative group">
            <button
              onClick={() => setIsModalOpen(true)} // Open modal on click
              className="p-2 bg-white cursor-pointer text-green-500 rounded-full hover:bg-gray-200 transition"
              aria-label="Edit Profile"
            >
              <FiEdit className="cursor-pointer" size={20} />
            </button>
            {/* Tooltip */}
            <div className="absolute hidden group-hover:flex -top-8 right-0 transform translate-x-1/2 bg-white text-black text-xs rounded py-1 px-2">
              Edit Profile
            </div>
          </div>
        </div>
      )}

      {/* Banner Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* User Info */}
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="rounded-full border-4 border-white overflow-hidden w-32 h-32 mb-4">
            <img
              src={user?.profileImage}
              alt={`${user?.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name and Email */}
          <h1 className="text-4xl font-bold">{user?.name}</h1>
          <p className="text-gray-300 mt-2">{user?.email}</p>

          {/* Batch Info */}
          <div className="flex gap-5">
            <p className="text-white px-4 py-1 mt-4 rounded-full">
              <span className="font-semibold">Followers:</span> {user?.followers?.length}
            </p>
            <p className=" text-white px-4 py-1 mt-4 rounded-full">
              <span className="font-semibold">Following:</span> {user?.following?.length}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="flex gap-5">
            <div className="mt-4 px-4 py-2 flex items-center gap-1 hover:bg-gray-100 font-semibold bg-white  text-black rounded-md  transition">
              <SiMessenger className="text-green-500" />
              Message
            </div>
            <div className="mt-3.5">
              {user?._id !== userInfo?._id && (
                <div
                  onClick={() => handleFollowUser(user?._id)}
                  className="text-blue-500 cursor-pointer"
                >
                  {user?.followers?.includes(userInfo?._id) ? (
                    <button className="bg-white px-4 py-2 rounded-md text-black font-semibold">
                      Following
                    </button>
                  ) : (
                    <button className="bg-white px-4 py-2 rounded-md text-black font-semibold">
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <UpdateProfileModal
          user={user}
          userInfo={userInfo}
          onClose={() => setIsModalOpen(false)} // Close modal callback
        />
      )}
    </div>
  );
};

export default BannerWithProfile;
