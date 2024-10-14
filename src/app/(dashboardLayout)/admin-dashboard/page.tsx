import CommentCount from "@/dashboardComponents/adminDashboard/CommentCount";
import NewsCount from "@/dashboardComponents/adminDashboard/NewsCount";
import ReactCount from "@/dashboardComponents/adminDashboard/LikeCount";
import UserCount from "@/dashboardComponents/adminDashboard/UserCount";
import React from "react";
import DisLikeCount from "@/dashboardComponents/adminDashboard/DislikeCount";

const AdminDashboardPage = () => {
  return (
    <div className="md:px-0 px-5 ">
      <div className="lg:flex gap-10 my-3 md:my-0 justify-center">
        <UserCount />
        <NewsCount />
        <CommentCount />
      </div>
      <div className="lg:flex gap-10  justify-center mt-10">
        <ReactCount />
        <DisLikeCount />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
