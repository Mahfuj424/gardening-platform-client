// import CommentCount from "@/dashboardComponents/adminDashboard/CommentCount";
// import NewsCount from "@/dashboardComponents/adminDashboard/NewsCount";
// import ReactCount from "@/dashboardComponents/adminDashboard/LikeCount";
// import UserCount from "@/dashboardComponents/adminDashboard/UserCount";
import React from "react";
// import DisLikeCount from "@/dashboardComponents/adminDashboard/DislikeCount";
import { UserVerificationChart } from "@/dashboardComponents/adminDashboard/chart/UserVerificationChart";
import { PostTypesChart } from "@/dashboardComponents/adminDashboard/chart/PostTypesChart";
import { PaymentStatusChart } from "@/dashboardComponents/adminDashboard/chart/PaymentStatusChart";
import { UserActivityChart } from "@/dashboardComponents/adminDashboard/chart/UserActivityChart";
import { TopPostsChart } from "@/dashboardComponents/adminDashboard/chart/TopPostsChart";
import { RevenueChart } from "@/dashboardComponents/adminDashboard/chart/RevenueChart";

const AdminDashboardPage = () => {
  return (
    <div className="md:px-0 px-5 h-screen overflow-y-auto">
      {/* <div className="lg:flex gap-10 my-3 md:my-0 justify-center">
        <UserCount />
        <NewsCount />
        <CommentCount />
      </div>
      <div className="lg:flex gap-10  justify-center mt-10">
        <ReactCount />
        <DisLikeCount />
      </div> */}

      <div className="p-6 space-y-6 dark:bg-darkBg bg-gray-100 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dark:bg-darkModal bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">User Verification</h2>
            <UserVerificationChart />
          </div>
          <div className="dark:bg-darkModal bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Post Types</h2>
            <PostTypesChart />
          </div>
          <div className="dark:bg-darkModal bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Payment Status</h2>
            <PaymentStatusChart />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="dark:bg-darkModal bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">User Activity</h2>
            <UserActivityChart />
          </div>
          <div className="dark:bg-darkModal bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Top 5 Engaging Posts</h2>
            <TopPostsChart />
          </div>
        </div>
        <div className="dark:bg-darkModal bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
