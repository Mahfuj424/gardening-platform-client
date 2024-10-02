import LeftSidebar from "@/components/leftSidebar/LeftSidebar";
import React, { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-between mt-[70px] dark:bg-darkBg bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/5 ps-5 fixed pt-5 top-[70px] left-0 h-full bg-gray-100 dark:bg-darkBg">
        <LeftSidebar />
      </div>

      {/* Main content */}
      <div className="w-4/5 ml-[20%]">{children}</div>
    </div>
  );
};

export default CommonLayout;
