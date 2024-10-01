// components/PostCard.tsx
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

const PostCard = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <div
          key={index}
          className="dark:bg-darkCard bg-white shadow-md p-4 rounded-lg mt-4"
        >
          {/* Post Header */}
          <div className="flex items-center space-x-3">
            <img
              src="https://i.ibb.co.com/xm54tqk/profile-Image.jpg" // Replace with actual avatar path
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="dark:text-white text-black font-semibold">
                Monroe Parker
              </p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos a rem nihil eum illum, dicta iste consectetur vitae, iure dolores odio autem minima libero doloribus. Sunt asperiores quae pariatur accusantium?
          </div>

          {/* Post Image */}
          <img
            src="https://i.ibb.co.com/PT5cFgz/img-2.jpg" // Replace with actual post image path
            alt="Post"
            className="w-full mt-3 rounded-lg"
          />

          {/* Post Actions */}
          <div className="flex justify-between px-3 mt-3 text-gray-400 ">
            <div>
              <h1>12k</h1>
            </div>
            <div>
              <span>5k</span>
            </div>
            <div>
              <span>1k</span>
            </div>
            <div>
              <span>500</span>
            </div>
          </div>

          <div className="flex justify-between px-3 mt-3 text-gray-400 border-y py-2 border-gray-400 dark:border-secondary">
            <div className="flex items-center gap-0.5 cursor-pointer">
              <BiLike className="text-2xl" />
              <span>Like</span>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer">
              <BiDislike className="text-2xl" />
              <span>DisLike</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaRegComment className="text-2xl" />
              <span>Comment</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <PiShareFatLight className="text-2xl " />
              <span>Share</span>
            </div>
          </div>

          {/* Post Comments */}
          <div className="mt-3">
            <p className="text-gray-400 text-sm">
              <span className="font-semibold dark:text-white text-black">
                Steeve:
              </span>{" "}
              What a beautiful photo! I love it.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              <span className="font-semibold dark:text-white text-black">
                Monroe:
              </span>{" "}
              You captured the moment.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
