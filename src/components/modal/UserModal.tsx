/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFollowUserMutation } from "@/redux/api/userApi";
import Link from "next/link";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { SiMessenger } from "react-icons/si";
import { toast } from "sonner";

// Define proper types for followers and the user object
interface User {
  following: any;
  followers: string[];  // Assuming followers is an array of strings (IDs)
  _id: string;
  name: string;
  isVerified: boolean;
  profileImage: string;
  email?: string;
  followersCount?: number;
  followingCount?: number;
}

interface UserModalProps {
  user: User;
  currentUser: string;
}

const UserModal: React.FC<UserModalProps> = ({ user, currentUser }) => {
  const [followUser] = useFollowUserMutation(); // Destructuring to include isLoading

  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: currentUser, followeeId };
      const res = await followUser({ followInfo }).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to follow the user"); // Add an error toast for failure
    }
  };

  return (
    <div className="absolute bg-white dark:bg-darkModal shadow-xl dark:border-none border p-4 rounded-lg w-[350px] z-10">
      <div className="flex items-center space-x-3">
        <img
          src={user?.profileImage || "/default-avatar.png"} // Provide a fallback image
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="dark:text-white flex gap-1 items-center text-black font-semibold">
            {user?.name}
            {user?.isVerified && <RiVerifiedBadgeFill className="text-blue-500" />}
          </p>
          {user?.email && (
            <p className="text-sm text-gray-400">{user?.email}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="bg-custom-gradient cursor-pointer py-1 rounded-md px-3 flex gap-1 items-center">
          <SiMessenger className="text-white" />
          <h1 className="font-semibold text-white">Message</h1>
        </div>
        <div>
          {user?._id !== currentUser && (
            <div
              onClick={() => handleFollowUser(user?._id)}
              className="text-blue-500 ms-2 cursor-pointer"
            >
              {user?.followers?.includes(currentUser) ? (
                <button className="bg-custom-gradient px-4 py-2 rounded-md text-white font-semibold">
                  Following
                </button>
              ) : (
                <button className="bg-custom-gradient px-4 py-2 rounded-md text-white font-semibold" >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between text-gray-600 dark:text-gray-300">
        <div className="text-center">
          <p className="font-semibold">{user?.followers.length || 0}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{user?.following.length || 0}</p>
          <p className="text-sm">Following</p>
        </div>
      </div>
      <div>
        <Link href={`/user/${user?._id}`} className="text-blue-500 cursor-pointer text-sm mt-2">See All Posts</Link>
      </div>
    </div>
  );
};

export default UserModal;
