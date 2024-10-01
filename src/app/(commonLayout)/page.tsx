'use client'
import { useState } from "react";
import HomePage from "@/components/HomePage/HomePage"; // Adjust path as necessary

const sidebarItem = [
  {
    title: "Profile",
    imageUrl: "https://i.ibb.co.com/xm54tqk/profile-Image.jpg",
  },
  { title: "/", imageUrl: "https://i.ibb.co/C8ryQGK/home.png" }, // This represents Feed
  { title: "Message", imageUrl: "https://i.ibb.co/qm0qrnj/message.png" },
  { title: "Video", imageUrl: "https://i.ibb.co/37cK4t8/video.png" },
  { title: "Event", imageUrl: "https://i.ibb.co/S774Y82/event-2.png" },
  { title: "Pages", imageUrl: "https://i.ibb.co/NmYLtgc/page.png" },
  { title: "Group", imageUrl: "https://i.ibb.co/XCQhKGQ/group.png" },
  { title: "Market", imageUrl: "https://i.ibb.co/SmmrTWp/market.png" },
  { title: "Blog", imageUrl: "https://i.ibb.co/jwq7dGD/blog.png" },
];

export default function Home() {
  // State to track which component is active
  const [activeComponent, setActiveComponent] = useState("Feed");

  // Function to handle rendering different components
  const renderComponent = () => {
    switch (activeComponent) {
      case "Feed":
        return <HomePage />;
      case "Profile":
        return <div className="h-screen">Profile Page Content</div>; // Replace with your Profile component
      case "Message":
        return <div>Message Page Content</div>; // Replace with your Message component
      case "Video":
        return <div>Video Page Content</div>; // Replace with your Video component
      case "Event":
        return <div>Event Page Content</div>; // Replace with your Event component
      case "Pages":
        return <div>Pages Content</div>; // Replace with your Pages component
      case "Group":
        return <div>Group Page Content</div>; // Replace with your Group component
      case "Market":
        return <div>Market Page Content</div>; // Replace with your Market component
      case "Blog":
        return <div>Blog Page Content</div>; // Replace with your Blog component
      default:
        return <HomePage />; // Default to Feed if no match
    }
  };

  return (
    <div className="mt-[70px]">
      <div className="flex justify-between px-5 bg-gray-100 dark:bg-darkBg relative">
        {/* Sidebar */}
        <section className="w-1/4 fixed lg:w-1/5 sm:w-[30%] w-[25%]">
          {sidebarItem.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setActiveComponent(item.title === "/" ? "Feed" : item.title)
              } // Set the active component
              className="hover:bg-gray-200 w-full dark:hover:bg-secondary dark:text-white hover:duration-300 flex justify-start items-center rounded-2xl p-4 gap-3"
            >
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-6 h-6 ${
                    item.title === "Profile" ? "w-8 h-8 rounded-full" : ""
                  }`}
                />
              </div>
              <div className="font-semibold">
                {item.title === "/" ? "Feed" : item?.title}
              </div>
            </button>
          ))}
        </section>

        {/* Main Content */}
        <main
          className={`${
            activeComponent === "Feed"
              ? "lg:w-3/4 sm:w-[70%] w-[75%]"
              : "lg:w-[55%] sm:w-[70%] w-[75%]"
          } mx-auto`}
        >
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}
