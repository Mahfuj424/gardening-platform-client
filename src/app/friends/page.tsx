"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FriendsCard } from "@/components/friends/FriendsCard";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import React from "react";

const FriendsPage = () => {
  const { data } = useGetAllUserQuery(undefined);
  const allUser = data?.data;

  return (
    <div className="pt-20 dark:bg-darkBg bg-gray-100 px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {allUser?.map((user: any) => (
          <FriendsCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
