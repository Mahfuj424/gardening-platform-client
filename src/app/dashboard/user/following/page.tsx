/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetSingleProfileQuery } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/authServices';
import Link from 'next/link';

// Skeleton component to display while loading
const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </td>
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-32"></div>
    </td>
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-32"></div>
    </td>
  </tr>
);

const FollowingPage: React.FC = () => {
  const userInfo = getUserInfo()
  
  // Fetch posts data
  const { data, isLoading, error } = useGetSingleProfileQuery(userInfo?._id);

  const userData = data?.data;
  const posts = userData?.following

 
  if (error) return <p>Error loading posts.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-3/4 border-collapse table-auto">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
            : posts?.map((post: any) => (
                <tr key={post?._id} className="border-b dark:text-white">
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <img src={post?.profileImage} className="w-8 h-8 rounded-full" alt="author profile" />
                    {post?.name || 'Unknown Author'}
                  </td>
                  <td className="px-4 py-2">
                    {post?.email}
                  </td>
                  <td className="px-4 py-2 text-blue-500">
                    <Link href={`/user/${post?._id}`}>See user Info..</Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>


    </div>
  );
};

export default FollowingPage;
