"use client";
import LeftSidebar from "@/components/leftSidebar/LeftSidebar";
import { getUserInfo } from "@/services/authServices";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  const router = useRouter();
  const userInfo = getUserInfo();

  useEffect(() => {
    if (!userInfo) {
      router.push("/auth/login");
    }
  }, [userInfo, router]);

  return (
    <div className="md:flex justify-between mt-[70px] dark:bg-darkBg bg-gray-100">
      {/* Left Sidebar */}
      <div className="md:w-1/5 w-full ps-5 hidden md:block fixed pt-5 top-[70px] left-0 h-full bg-gray-100 dark:bg-darkBg">
        <LeftSidebar />
      </div>

      {/* Main content */}
      <div className="md:w-4/5 w-full md:ml-[20%] bg-gray-100 dark:bg-darkBg">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
