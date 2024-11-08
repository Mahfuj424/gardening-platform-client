/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaUserFriends, FaEdit } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { useFollowUserMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import UpdateProfileModal from "../modal/UpdateProfileModal";

interface ComponentProps {
  user: any;
  userInfo: any;
}

export default function ProfileComponent({ user, userInfo }: ComponentProps) {
  const [followUser] = useFollowUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: userInfo?._id, followeeId };
      const res = await followUser({ followInfo }).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to follow user");
    }
  };

  return (
    <div className="relative min-h-[500px] text-white">
      <CoverImage user={user} />

      <div className="relative mx-auto max-w-5xl px-4 -mt-5 z-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:gap-6 rounded-lg shadow-lg p-6">
          <ProfileImage user={user} />

          <UserInfo user={user} />

          <ActionButtons
            user={user}
            userInfo={userInfo}
            onFollow={() => handleFollowUser(user?._id)}
            onEdit={() => setIsModalOpen(true)}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </div>

        {isModalOpen && (
          <UpdateProfileModal
            user={user}
            userInfo={userInfo}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

function CoverImage({ user }: { user: any }) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <img
        src={
          user?.coverImage ||
          "https://i.ibb.co/4RvYqZk/flat-gardening-twitter-header-23-2149356117.jpg"
        }
        alt="Cover"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function ProfileImage({ user }: { user: any }) {
  return (
    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-gray-900 -mt-16 md:-mt-20">
      <img
        src={user?.profileImage || "/placeholder.svg?height=128&width=128"}
        alt={user?.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function UserInfo({ user }: { user: any }) {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-black dark:text-white">
        {user?.name}
      </h1>
      <p className="text-sm text-black dark:text-white">{user?.email}</p>
      <div className="mt-2 flex items-center gap-4 text-sm text-black dark:text-white">
        <span>{user?.followers?.length} followers</span>
        <span>•</span>
        <span>{user?.following?.length} following</span>
      </div>
    </div>
  );
}

interface ActionButtonsProps {
  user: any;
  userInfo: any;
  onFollow: () => void;
  onEdit: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ActionButtons({
  user,
  userInfo,
  onFollow,
  onEdit,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      {userInfo?._id === user?._id ? (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-md bg-custom-gradient px-4 py-2 text-sm font-medium text-white"
        >
          <FaEdit className="h-4 w-4" />
          Edit Profile
        </button>
      ) : (
        <>
          <button
            onClick={onFollow}
            className="flex items-center gap-2 rounded-md bg-custom-gradient px-4 py-2 text-sm font-medium text-white "
          >
            <FaUserFriends className="h-4 w-4" />
            {user?.followers?.some(
              (follower: any) => follower?._id === userInfo?._id
            )
              ? "Following"
              : "Follow"}
          </button>
          <button className="flex items-center gap-2 rounded-md bg-custom-gradient px-4 py-2 text-sm font-medium text-white ">
            <RiMessage3Fill className="h-4 w-4" />
            Message
          </button>
        </>
      )}
    </div>
  );
}
