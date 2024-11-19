import { useFollowUserMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/authServices";
import Link from "next/link";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const FriendsCard = ({ user }: any) => {
  const userInfo = getUserInfo();

  const [followUser] = useFollowUserMutation();

  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: userInfo?._id, followeeId };
      const res = await followUser({ followInfo }).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to follow the user"); // Add an error toast for failure
    }
  };
  return (
    <div className="w-[280px] dark:bg-darkModal bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
      <div className="relative h-[240px]">
        <img
          src={user?.profileImage}
          alt="Profile background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <Link
          href={`/userDetails/${user?._id}`}
          className="text-black dark:text-white text-lg font-semibold"
        >
          {user?.name}
        </Link>
      </div>
      <div className="px-4 pb-4 space-y-2">
        <div
          onClick={() => handleFollowUser(user?._id)}
          className="text-blue-500 ms-2 cursor-pointer"
        >
          {user?.followers?.some(
            (follower: any) => follower?._id === userInfo?._id
          ) ? (
            <button className="bg-custom-gradient px-4 py-2 rounded-md w-full text-white font-semibold">
              Following
            </button>
          ) : (
            <button className="bg-custom-gradient px-4 py-2 rounded-md w-full text-white font-semibold">
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
