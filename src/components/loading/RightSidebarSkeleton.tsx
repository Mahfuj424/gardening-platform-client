import React from "react";

const RightSidebarSkeleton = () => {
  return (
    <div className="dark:bg-darkCard w-[400px] bg-white shadow-md p-4 rounded-lg space-y-4 mt-4 animate-pulse">
      {/* Skeleton for the title */}
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-40 mb-4" />

      {/* Loop to mimic user suggestions */}
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              {/* Skeleton for profile image */}
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />

              <div>
                {/* Skeleton for the name */}
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-24 mb-2" />
                {/* Skeleton for followers */}
                <div className="h-3 bg-gray-200 dark:bg-gray-500 w-20 rounded-md" />
              </div>
            </div>

            {/* Skeleton for follow button */}
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-20" />
          </div>
        ))}
    </div>
  );
};

export default RightSidebarSkeleton;
