/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useGetAllPostsQuery } from "@/redux/api/post";
import { getUserInfo } from "@/services/authServices";
import UserModal from "../modal/UserModal";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegComment, FaSmile, FaPaperclip } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiDotsThreeBold, PiShareFatLight } from "react-icons/pi";
import { MdGif } from "react-icons/md"; // For GIF and image icons
import DOMPurify from "dompurify"; // Add this library for sanitization
import { RiVerifiedBadgeFill } from "react-icons/ri";
import PostSkeleton from "../loading/PostSkeleton";

const PostCard = () => {
  const { data, isLoading } = useGetAllPostsQuery({});
  const userInfo = getUserInfo();
  const [hoveredUser, setHoveredUser] = useState<any>(null); // State to track the hovered user
  const [showUserModal, setShowUserModal] = useState(false); // State for modal visibility
  const [twoHoveredUser, setTwoHoveredUser] = useState<any>(null); // For comments
  const [twoShowUserModal, setTwoShowUserModal] = useState(false); // For comments

  const handleMouseEnter = (user: any) => {
    setHoveredUser(user);
    setShowUserModal(true);
  };

  const handleMouseLeave = () => {
    setShowUserModal(false);
  };

  const handleMouseEnterTwo = (user: any) => {
    setTwoHoveredUser(user);
    setTwoShowUserModal(true);
  };

  const handleMouseLeaveTwo = () => {
    setTwoShowUserModal(false);
  };

  const postData = data?.data;

  return (
    <div>
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        postData?.map((item: any) => (
          <div
            key={item?._id}
            className="dark:bg-darkCard w-[650px] bg-white shadow-md p-4 rounded-lg mt-4 relative"
          >
            {/* Post Header */}
            <div className="flex justify-between items-center ">
              <div
                className="relative flex items-center space-x-3"
                onMouseLeave={handleMouseLeave}
              >
                {/* User Image */}
                <img
                  onMouseEnter={() => handleMouseEnter(item?.author)}
                  src={item?.author?.profileImage}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div>
                  <p className="dark:text-white flex items-center gap-2 text-black font-semibold">
                    <span
                      onMouseEnter={() => handleMouseEnter(item?.author)}
                      className="cursor-pointer"
                    >
                      {item?.author?.name}
                    </span>
                    {item?.author?.isVerified && (
                      <RiVerifiedBadgeFill className="text-blue-500" />
                    )}
                    <span className="text-blue-500 ms-2 cursor-pointer">
                      Follow
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>

                {/* Show User Modal */}
                {showUserModal && hoveredUser && (
                  <div
                    className="absolute z-50"
                    style={{ top: "100%", left: "0" }}
                    onMouseEnter={() => setShowUserModal(true)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <UserModal user={hoveredUser} />
                  </div>
                )}
              </div>

              <div>
                <HiDotsHorizontal className="text-2xl dark:text-white" />
              </div>
            </div>

            {/* Post Content */}
            <div className="mt-2">
              <div
                className="mb-3 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item?.title),
                }}
              />
              <div
                className="dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item?.content),
                }}
              />
            </div>

            {/* Post Image */}
            <div>
              {item?.images?.length > 0 &&
                item?.images?.map((image: any) => (
                  <img
                    key={image}
                    src={image}
                    alt="Post"
                    className="w-full mt-3 rounded-lg"
                  />
                ))}
            </div>

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
                <PiShareFatLight className="text-2xl" />
                <span>Share</span>
              </div>
            </div>

            {/* Post Comments */}
            <div className="mt-3">
              {item?.comments?.length > 1 && (
                <h1 className="text-xs cursor-pointer dark:text-gray-100">
                  See All Comments
                </h1>
              )}
              {item?.comments?.length > 0 &&
                item?.comments?.slice(0, 1)?.map((comment: any) => (
                  <div
                    key={comment?._id}
                    className="flex items-center gap-3 ms-3 my-3 relative"
                  >
                    <img
                      onMouseEnter={() => handleMouseEnterTwo(comment?.author)}
                      onMouseLeave={handleMouseLeaveTwo}
                      src={comment?.author?.profileImage}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex gap-2 items-center">
                      <div className="dark:bg-darkModal bg-gray-100 p-3 rounded-xl text-gray-400 font-semibold dark:text-white">
                        <h1
                          onMouseEnter={() =>
                            handleMouseEnterTwo(comment?.author)
                          }
                          onMouseLeave={handleMouseLeaveTwo}
                          className="font-bold text-black dark:text-gray-100 cursor-pointer relative"
                        >
                          {comment?.author?.name}

                          {/* Show Comment Modal */}
                          {twoShowUserModal && twoHoveredUser && (
                            <div
                              className="absolute z-50 shadow-lg p-3 rounded-lg"
                              style={{
                                top: "30%", // Moves the modal above the hovered name
                                left: "-10%", // Aligns it to the center of the name
                                transform: "translateX(-50%)", // Centers it perfectly
                              }}
                              onMouseEnter={() => setTwoShowUserModal(true)}
                              onMouseLeave={handleMouseLeaveTwo}
                            >
                              <UserModal user={twoHoveredUser} />
                            </div>
                          )}
                        </h1>
                        <h1 className="text-black text-sm dark:text-gray-200">
                          {comment?.commentText}
                        </h1>
                      </div>
                      {userInfo?._id === comment?.author?._id && (
                        <div className=" dark:text-white cursor-pointer">
                          <PiDotsThreeBold />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Comment Input */}
            <div className="flex items-center mt-4 gap-3">
              <img
                src={userInfo?.profileImage}
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
                  <FaSmile className="cursor-pointer" title="Emoji" />
                  <MdGif className="cursor-pointer text-3xl" title="GIF" />
                  <FaPaperclip className="cursor-pointer" title="Attach File" />
                </div>
              </div>
              <button className="text-white font-semibold bg-custom-gradient px-4 py-1 rounded-full hover:bg-red-600">
                Send
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostCard;
