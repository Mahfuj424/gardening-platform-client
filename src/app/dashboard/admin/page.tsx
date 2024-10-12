import CommentCount from "@/dashboardComponents/adminDashboard/CommentCount";
import NewsCount from "@/dashboardComponents/adminDashboard/NewsCount";
import ReactCount from "@/dashboardComponents/adminDashboard/LikeCount";
import UserCount from "@/dashboardComponents/adminDashboard/UserCount";
import React from "react";
import DisLikeCount from "@/dashboardComponents/adminDashboard/DislikeCount";

const AdminDashboardPage = () => {
  return (
    <div className="">
      <div className="flex gap-10 justify-center">
        <UserCount />
        <NewsCount />
        <CommentCount />
      </div>
      <div className="flex gap-10 justify-center mt-10">
        <ReactCount />
        <DisLikeCount />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
