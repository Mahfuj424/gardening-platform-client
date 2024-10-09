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
    <div className="lg:flex gap-5 h-full">
      <div className="lg:w-[65%] w-full">
        {/* Apply fixed positioning with Tailwind classes */}
        <div className="lg:fixed top-[88px] w-full lg:w-[53%]">
          <BannerWithProfile user={user} userInfo={userInfo} />
        </div>
      </div>
      <div className="lg:w-[35%] lg:ml-[65%]">
        <SinglePost user={user} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SingleUserPage;
