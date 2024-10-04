

const PostSkeleton = () => {
  return (
    <div className="dark:bg-darkCard w-[650px] bg-white shadow-md p-4 rounded-lg mt-4 animate-pulse">
      {/* Skeleton Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Skeleton User Image */}
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="w-16 h-3 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Skeleton Post Content */}
      <div className="mt-4 space-y-2">
        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
      </div>

      {/* Skeleton Actions */}
      <div className="flex justify-between px-3 mt-4 text-gray-400">
        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Skeleton Comment Input */}
      <div className="flex items-center mt-4 gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
