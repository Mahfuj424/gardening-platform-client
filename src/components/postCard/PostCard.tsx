// components/PostCard.tsx
import React from "react";

const PostCard = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <div key={index} className="dark:bg-darkCard bg-white shadow-md p-4 rounded-lg mt-4">
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

          {/* Post Image */}
          <img
            src="https://i.ibb.co.com/PT5cFgz/img-2.jpg" // Replace with actual post image path
            alt="Post"
            className="w-full mt-3 rounded-lg"
          />

          {/* Post Actions */}
          <div className="flex justify-between mt-3 text-gray-400">
            <div className="flex items-center space-x-2">
              <i className="fas fa-heart text-red-500"></i>
              <span>1,300</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-comment"></i>
              <span>260</span>
            </div>
            <i className="fas fa-share"></i>
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
