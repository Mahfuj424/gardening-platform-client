'use client'
import { useGetAllUserQuery } from '@/redux/api/userApi';
import React from 'react';
import { FaUsers } from 'react-icons/fa';

const UserCount = () => {
  const {data}= useGetAllUserQuery(undefined)

  return (
    <div className="bg-blue-500 text-white p-6 rounded-sm flex items-center justify-between w-60">
      <div className="flex items-center space-x-4">
        <FaUsers size={40} />
        <span className="text-xl">Total Users</span>
      </div>
      <div className="text-3xl font-bold">{data?.data?.length}</div>
    </div>
  );
};

export default UserCount;
