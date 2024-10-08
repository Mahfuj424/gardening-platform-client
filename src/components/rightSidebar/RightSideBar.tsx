/* eslint-disable @typescript-eslint/no-explicit-any */
// components/RightSidebar.tsx
"use client";
import { useFollowUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/authServices";
import { toast } from "sonner";

const RightSidebar = () => {
  const { data } = useGetAllUserQuery(undefined);
  const people = data?.data; // Access user data from the API response
  const userInfo = getUserInfo();
  
  const [followUser, { isLoading }] = useFollowUserMutation(); // Destructuring to include isLoading

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
    <div className="dark:bg-darkCard w-[400px] bg-white shadow-md p-4 rounded-lg space-y-4 mt-4">
      {/* People You May Know */}
      <div>
        <h2 className="dark:text-white font-semibold mb-3">
          People you may know
        </h2>
        {people
          ?.filter((person: any) => person?._id !== userInfo?._id) // Filter out the current user
          .map((person: any) => (
            <div
              key={person?._id}
              className="flex justify-between items-center mb-3"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={
                    person.profileImage
                  } // Use person's actual profile image or fallback
                  alt={person.name} // Provide alt text using person's name
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="dark:text-white text-secondary">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {person.followers?.length} Followers
                  </p>{" "}
                  {/* Check for null/undefined */}
                </div>
              </div>
              <div>
                <div
                  onClick={() => handleFollowUser(person?._id)}
                  className="text-blue-500 ms-2 cursor-pointer"
                >
                  {person?.followers?.some(
                    (follower: any) => follower?._id === userInfo?._id
                  ) ? (
                    <button className="bg-custom-gradient px-4 py-2 rounded-md text-white font-semibold">
                      Following
                    </button>
                  ) : (
                    <button
                      className="bg-custom-gradient px-4 py-2 rounded-md text-white font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Following..." : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightSidebar;
