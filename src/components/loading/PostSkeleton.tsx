import React from "react";

const PostSkeleton = () => {
  return (
    <div className="dark:bg-darkCard md:rounded-md md:w-[650px] w-full bg-white shadow-md mt-4 relative animate-pulse">
      {/* Skeleton for the header (User info and dots menu) */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          {/* Skeleton for user image */}
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div>
            {/* Skeleton for user name */}
            <div className="h-4 bg-gray-300 dark:bg-gray-600 w-24 rounded-md mb-2" />
            {/* Skeleton for post time */}
            <div className="h-3 bg-gray-200 dark:bg-gray-500 w-16 rounded-md" />
          </div>
        </div>
        {/* Skeleton for dots icon */}
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>

      {/* Skeleton for the post content */}
      <div className="p-4">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 w-full rounded-md mb-2" />
        <div className="h-5 bg-gray-300 dark:bg-gray-600 w-3/4 rounded-md mb-2" />
        <div className="h-5 bg-gray-300 dark:bg-gray-600 w-2/4 rounded-md" />
      </div>

      {/* Skeleton for post image */}
      <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 mt-3" />

      {/* Skeleton for the actions (like, comment, share) */}
      <div className="flex justify-between py-3 px-3 mt-3 text-gray-400">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-20 rounded-md" />
        <div className="flex space-x-4">
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
