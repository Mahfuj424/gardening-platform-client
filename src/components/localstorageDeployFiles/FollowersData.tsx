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

const FollowersData: React.FC = () => {
  const userInfo = getUserInfo();
  const { data, isLoading, error } = useGetSingleProfileQuery(userInfo?._id);
  const userData = data?.data;
  const posts = userData?.followers;

  if (error) return <p>Error loading posts.</p>;

  return (
    <tbody>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
        : posts?.map((post: any) => (
            <tr key={post?._id} className="border-b dark:text-white">
              <td className="px-4 py-2 flex gap-2 items-center">
                <img
                  src={post?.profileImage}
                  className="w-8 h-8 rounded-full"
                  alt="author profile"
                />
                {post?.name || 'Unknown Author'}
              </td>
              <td className="px-4 py-2">{post?.email}</td>
              <td className="px-4 py-2 text-blue-500">
                <Link href={`/dashboard/user/${post?._id}`}>
                  See User Info..
                </Link>
              </td>
            </tr>
          ))}
    </tbody>
  );
};

export default FollowersData;
