/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useGetAllUserQuery, useUpdateUserRoleMutation } from "@/redux/api/userApi";
import React, { useState } from "react";

const UserTable: React.FC = () => {
  const [isPremium, setIsPremium] = useState<boolean | undefined>(undefined); // undefined by default
  const { data, isLoading, error } = useGetAllUserQuery(isPremium);
  const [updateUserRole] = useUpdateUserRoleMutation()
  const users = data?.data;

  const handleUserRoleUpdate=async(role:string, id:string)=>{
    try{
      const res = await updateUserRole({role, id})
    }catch(error){

    }
  }

  // Loading skeleton
  const loadingSkeleton = (
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b text-center animate-pulse">
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  if (isLoading)
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-300">
            <tr className="text-center">
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          {loadingSkeleton}
        </table>
      </div>
    );

  if (error) return <p>Error loading users.</p>;

  return (
    <div>
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setIsPremium(undefined)}
          className={`px-4 py-1 rounded-sm dark:text-white border ${
            isPremium === undefined ? "bg-custom-gradient border-none text-white" : ""
          }`}
        >
          All User
        </button>
        <button
          onClick={() => setIsPremium(true)}
          className={`px-4 py-1 rounded-sm dark:text-white border ${
            isPremium === true ? "bg-custom-gradient border-none text-white" : ""
          }`}
        >
          Premium User
        </button>
        <button
          onClick={() => setIsPremium(false)}
          className={`px-4 py-1 rounded-sm dark:text-white border ${
            isPremium === false ? "bg-custom-gradient border-none text-white" : ""
          }`}
        >
          Non Premium
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-300">
            <tr className="text-center">
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user?._id} className="border-b text-center">
                <td className="px-4 py-2 text-gray-700 dark:text-white">
                  {user?.name}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-white">
                  {user?.email}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-white">
                  {user?.role}
                </td>
                <td className="px-4 py-2">
                  {user?.role === "user" ? (
                    <button
                      onClick={() => handleUserRoleUpdate("admin", user?._id)}
                      className="px-3 py-1 bg-custom-gradient rounded-md text-white"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserRoleUpdate("user", user?._id)}
                      className="px-3 py-1 bg-custom-gradient rounded-md text-white"
                    >
                      Make User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
