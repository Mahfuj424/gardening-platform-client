// pages/index.tsx

import WhatsOnYourMind from "../post/WhatsOnYourMind";
import PostCard from "../postCard/PostCard";
import RightSidebar from "../rightSidebar/RightSideBar";
import Stories from "../stories/Stories";

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-darkBg text-white bg-gray-100 p-4 ms-48">
      <div className="container mx-auto lg:flex lg:justify-between gap-8">
        {/* Main Content */}
        <div className="lg:w-[70%] lg:pr-8">
          {/* Stories */}
          <Stories />
          {/* What's on Your Mind */}
          <WhatsOnYourMind />
          {/* Post Feed */}
          <PostCard />
        </div>
        {/* Right Sidebar */}
        <div className="lg:w-1/4 fixed right-5 top-22 rounded-lg overflow-y-auto dark:bg-darkBg lg:block">
          {/* Use 1/3 width for the sidebar */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
