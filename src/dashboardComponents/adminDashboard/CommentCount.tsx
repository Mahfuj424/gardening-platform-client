import React from 'react';
import { FaComment } from 'react-icons/fa';

const CommentCount = () => {
  return (
    <div className="bg-gray-400 text-white p-6 rounded-sm flex items-center justify-between w-60">
      <div className="flex items-center space-x-4">
        <FaComment size={40} />
        <span className="text-xl">Total Comments</span>
      </div>
      <div className="text-3xl font-bold">64</div>
    </div>
  );
};

export default CommentCount;
