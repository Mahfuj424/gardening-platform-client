/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BannerWithProfile from "@/components/BannerWithProfile/BannerWithProfile";
import SinglePost from "@/components/SinglePost/SinglePost";
import { useGetSingleProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/authServices";

const SingleUserPage = ({ params }: any) => {
  const userInfo = getUserInfo();
  const userId = params?.userId; // Ensure correct property name
  const { data, error, isLoading } = useGetSingleProfileQuery(userId); // Pass the userId into the query
  const user = data?.data;
  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  return (
    <div className="gap-5 h-full dark:bg-darkBg">
      <div className="pt-[88px] max-w-6xl mx-auto">
        {/* Apply fixed positioning with Tailwind classes */}
        <div className="w-full">
          <BannerWithProfile user={user} userInfo={userInfo} />
        </div>
        <div className="flex justify-between">
          <div>other text</div>
          <SinglePost user={user} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
