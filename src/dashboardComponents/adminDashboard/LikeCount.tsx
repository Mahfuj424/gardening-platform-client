
'use client'
import { useGetAllLikesQuery } from '@/redux/api/likeApi';
import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';

const LikeCount = () => {
  const {data}= useGetAllLikesQuery(undefined)
  return (
    <div className="bg-custom-gradient text-white p-6 rounded-sm flex items-center justify-between w-60">
      <div className="flex items-center space-x-4">
        <FaThumbsUp size={40} />
        <span className="text-xl">Total Like</span>
      </div>
      <div className="text-3xl font-bold">{data?.data?.length}</div>
    </div>
  );
};

export default LikeCount;
