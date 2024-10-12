import React from 'react';
import { FaNewspaper } from 'react-icons/fa';

const NewsCount = () => {
  return (
    <div className="bg-green-500 text-white p-6 rounded-sm flex items-center justify-between w-60">
      <div className="flex items-center space-x-4">
        <FaNewspaper size={40} />
        <span className="text-xl">Total Posts</span>
      </div>
      <div className="text-3xl font-bold">17</div>
    </div>
  );
};

export default NewsCount;
