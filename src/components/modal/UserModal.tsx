import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { SiMessenger } from "react-icons/si";

interface UserModalProps {
  user: {
    name: string;
    isVerified: boolean;
    profileImage: string;
    email?: string;
    followersCount?: number;
    followingCount?: number;
  };
}

const UserModal: React.FC<UserModalProps> = ({ user }) => {
  return (
    <div className="absolute bg-white dark:bg-darkModal shadow-xl dark:border-none border  p-4 rounded-lg w-[350px] z-10">
      <div className="flex items-center space-x-3">
        <img
          src={user?.profileImage} // Replace with actual avatar path
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="dark:text-white flex gap-1 items-center text-black font-semibold">
            {user?.name}
            <span>
              {user?.isVerified === true && (
                <RiVerifiedBadgeFill className="text-blue-500" />
              )}
            </span>
          </p>
          {user?.email && (
            <p className="text-sm text-gray-400">{user?.email}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="bg-custom-gradient cursor-pointer disabled:hover py-1 rounded-md px-3 flex gap-1 items-center">
          <SiMessenger className="text-white"/>
          <h1 className="font-semibold text-white">Message</h1>
        </div>
        <div>
          <button className="bg-custom-gradient px-4 py-2 rounded-md text-white font-semibold">
            Follow
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-gray-600 dark:text-gray-300">
        <div className="text-center">
          <p className="font-semibold">{user?.followersCount || 1}k</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{user?.followingCount || 200}</p>
          <p className="text-sm">Following</p>
        </div>
      </div>
      <div>
        <h1 className="text-blue-500 cursor-pointer text-sm mt-2">See All Posts</h1>
      </div>
    </div>
  );
};

export default UserModal;
