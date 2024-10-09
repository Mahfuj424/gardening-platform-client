'use client'
import { getUserInfo } from "@/services/authServices";
import Link from "next/link";

interface SidebarItem {
  title: string;
  imageUrl: string;
  route: string;
}

export default function LeftSidebar() {

  const sidebarItem: SidebarItem[] = [
    {
      title: "Home",
      imageUrl: "https://i.ibb.co/C8ryQGK/home.png",
      route: "/",
    },
    {
      title: "Message",
      imageUrl: "https://i.ibb.co/qm0qrnj/message.png",
      route: "message",
    },
    {
      title: "Video",
      imageUrl: "https://i.ibb.co/37cK4t8/video.png",
      route: "video",
    },
    {
      title: "Event",
      imageUrl: "https://i.ibb.co/S774Y82/event-2.png",
      route: "event",
    },
    {
      title: "Pages",
      imageUrl: "https://i.ibb.co/NmYLtgc/page.png",
      route: "pages",
    },
    {
      title: "About Us",
      imageUrl: "https://i.ibb.co/XCQhKGQ/group.png",
      route: "about",
    },
    {
      title: "Market",
      imageUrl: "https://i.ibb.co/SmmrTWp/market.png",
      route: "market",
    },
    {
      title: "Blog",
      imageUrl: "https://i.ibb.co/jwq7dGD/blog.png",
      route: "blog",
    },
  ];


  const userInfo= getUserInfo()



  return (
    <div>
      <Link href={`/user/${userInfo?._id}`} className="flex items-center gap-3 mb-5">
          <img
            className="w-10 h-10 rounded-full ms-2"
            src={userInfo?.profileImage}
            alt="profile"
          />
          <h1 className="text-lg font-semibold dark:text-white">Profile</h1>
        </Link>
        {sidebarItem.map((item, index) => (
          <Link
            href={`/${item?.route}`}
            key={index}
            className="flex items-center gap-4 my-2 rounded-md hover:duration-300 hover:bg-gray-200 dark:hover:bg-secondary p-3"
          >
            <div>
              <img className="w-6 h-6" src={item.imageUrl} alt={item.title} />
            </div>
            <div className=" font-semibold dark:text-white">{item.title}</div>
          </Link>
        ))}
    </div>
  );
}
