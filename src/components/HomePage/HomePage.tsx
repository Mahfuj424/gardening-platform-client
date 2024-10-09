import WhatsOnYourMind from "../post/WhatsOnYourMind";
import PostCard from "../postCard/PostCard";
import RightSidebar from "../rightSidebar/RightSideBar";

const HomePage = () => {
  return (
    <div className="flex justify-around w-full px-5">
      {/* Left content area */}
      <div>
        <div>
          <WhatsOnYourMind />
        </div>
        <PostCard />
      </div>

      {/* Fixed Right Sidebar */}
      <div className="w-72">
        <div className="fixed top-16 pt-2 right-3 h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
