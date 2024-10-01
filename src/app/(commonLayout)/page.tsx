// pages/index.tsx
import HomePage from "@/components/HomePage/HomePage"; // Adjust path as necessary
import Link from "next/link";

const sidebarItem = [
  { title: "Profile", imageUrl: "https://i.ibb.co.com/xm54tqk/profile-Image.jpg" },
  { title: "/", imageUrl: "https://i.ibb.co/C8ryQGK/home.png" },
  { title: "Message", imageUrl: "https://i.ibb.co/qm0qrnj/message.png" },
  { title: "Video", imageUrl: "https://i.ibb.co/37cK4t8/video.png" },
  { title: "Event", imageUrl: "https://i.ibb.co/S774Y82/event-2.png" },
  { title: "Pages", imageUrl: "https://i.ibb.co/NmYLtgc/page.png" },
  { title: "Group", imageUrl: "https://i.ibb.co/XCQhKGQ/group.png" },
  { title: "Market", imageUrl: "https://i.ibb.co/SmmrTWp/market.png" },
  { title: "Blog", imageUrl: "https://i.ibb.co/jwq7dGD/blog.png" },
];

export default function Home() {
  return (
    <div className="mt-[70px]">
      <div className="flex justify-between px-5 bg-gray-100 dark:bg-darkBg relative">
        {/* Sidebar */}
        <section className="w-1/5 fixed">
          {sidebarItem.map((item, index) => (
            <Link
              key={index}
              href={`/${item.title.toLowerCase()}`}
              className="hover:bg-gray-200 dark:hover:bg-secondary dark:text-white hover:duration-300 flex justify-start items-center rounded-2xl p-4 gap-3"
            >
              <div>
                <img src={item.imageUrl} alt={item.title} className={`w-6 h-6 ${item.title === 'Profile' ? 'w-8 h-8 rounded-full' : ''}`} />
              </div>
              <div className="font-semibold">{item.title === '/' ? "Feed" : item?.title}</div>
            </Link>
          ))}
        </section>
        {/* Main Content */}
        <main className="w-3/4 mx-auto">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
