import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';

const DisLikeCount = () => {
  return (
    <div className="bg-pink-500 text-white p-6 rounded-sm flex items-center justify-between w-60">
      <div className="flex items-center space-x-4">
        <FaThumbsUp size={40} />
        <span className="text-xl">Total Dislike</span>
      </div>
      <div className="text-3xl font-bold">64</div>
    </div>
  );
};

export default DisLikeCount;
