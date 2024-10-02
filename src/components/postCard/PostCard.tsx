import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiShareFatLight } from "react-icons/pi";
import { FaSmile, FaPaperclip } from "react-icons/fa";
import { MdGif } from "react-icons/md"; // For GIF and image icons

const PostCard = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <div
          key={index}
          className="dark:bg-darkCard w-[650px] bg-white shadow-md p-4 rounded-lg mt-4"
        >
          {/* Post Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co.com/xm54tqk/profile-Image.jpg" // Replace with actual avatar path
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="dark:text-white text-black font-semibold">
                  Monroe Parker{" "}
                  <span className="text-blue-500 ms-2 cursor-pointer">
                    Follow
                  </span>
                </p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div>
              <HiDotsHorizontal className="text-2xl dark:text-white" />
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-2">
            <h1 className="mb-3 dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              ullam.
            </h1>
            <h1 className="dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur dolorem nostrum ad possimus rem vitae repudiandae
              saepe assumenda similique commodi.
            </h1>
          </div>

          {/* Post Image */}
          <img
            src="https://i.ibb.co.com/PT5cFgz/img-2.jpg" // Replace with actual post image path
            alt="Post"
            className="w-full mt-3 rounded-lg"
          />

          {/* Post Actions */}
          <div className="flex justify-between px-3 mt-3 text-gray-400">
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
              <span>Dislike</span>
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
          <div className="mt-3 ms-1">
            {/* Comment by Monroe */}
            <div className="flex items-start gap-3 mt-2">
              <img
                src="https://i.ibb.co.com/xm54tqk/profile-Image.jpg" // Replace with actual avatar path
                alt="User Avatar"
                className="w-7 h-7 rounded-full"
              />
              {/* Initially hide the comment */}
              <div>
                <div className="bg-gray-100 dark:bg-darkModal p-2 rounded-xl">
                  <p className="text-sm font-semibold cursor-pointer hover:underline dark:text-white">
                    Monreo
                  </p>
                  <p className="dark:text-white">
                    Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem
                    ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <div className="flex gap-3">
                  <p className="text-sm cursor-pointer dark:text-white">10m</p>
                  <p className="text-sm cursor-pointer dark:text-white">Like</p>
                  <p className="text-sm cursor-pointer dark:text-white">
                    Reply
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area for Comments with Send Button */}
          <div className="flex items-center mt-4 gap-3">
            <img
              src="https://i.ibb.co.com/xm54tqk/profile-Image.jpg" // Replace with actual avatar path
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Write an answer..."
                className="w-full py-2 px-4 rounded-full border dark:text-white dark:bg-darkCard dark:border-gray-700 border-gray-300 focus:outline-none"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-gray-500">
                {/* Emoji, GIF, Sticker, Image Upload */}
                <FaSmile className="cursor-pointer" title="Emoji" />
                <MdGif className="cursor-pointer text-3xl" title="GIF" />
                <FaPaperclip className="cursor-pointer" title="Attach File" />
              </div>
            </div>
            <button className="text-white font-semibold bg-custom-gradient px-4 py-1 rounded-full hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
