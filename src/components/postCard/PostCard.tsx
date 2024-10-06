/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useGetAllPostsQuery } from "@/redux/api/post";
import UserModal from "../modal/UserModal";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiShareFatLight } from "react-icons/pi";
import DOMPurify from "dompurify"; // For sanitization
import { RiDeleteBin5Fill, RiVerifiedBadgeFill } from "react-icons/ri";
import PostSkeleton from "../loading/PostSkeleton";
import PostComment from "./PostComment";
import CreatePostModal from "../modal/CreatePostModal"; // Import CreatePostModal
import { BsBookmarkHeartFill } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import {
  useCreateLikeMutation,
  
} from "@/redux/api/likeApi";
import { getUserInfo } from "@/services/authServices";
import { toast } from "sonner";
import { useCreateDislikeMutation } from "@/redux/api/dislikeApi";

const PostCard = () => {
  const { data, isLoading } = useGetAllPostsQuery({});

  const [hoveredPost, setHoveredPost] = useState<string | null>(null); // For posts
  const [hoveredComment, setHoveredComment] = useState<string | null>(null); // For comments
  const [modalOpen, setModalOpen] = useState<string | null>(null); // Modal for options
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false); // For Edit Modal
  const [currentEditPost, setCurrentEditPost] = useState<any>(null); // Store post data to edit
  const userInfo = getUserInfo();

  const handleMouseEnter = (postId: string) => {
    setHoveredPost(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPost(null);
  };

  const handleMouseEnterComment = (commentId: string) => {
    setHoveredComment(commentId);
  };

  const handleMouseLeaveComment = () => {
    setHoveredComment(null);
  };

  // Function to toggle options modal
  const toggleModal = (postId: string) => {
    setModalOpen(modalOpen === postId ? null : postId);
  };

  // Function to handle Edit Post click
  const handleEditPost = (post: any) => {
    setCurrentEditPost(post); // Set the current post data to be edited
    setEditModalOpen(true); // Open the edit modal
  };

  const [createLikes] = useCreateLikeMutation();
  const [createDislikes]=useCreateDislikeMutation()

  const handleLikePost = async (postId: string) => {
    if (!userInfo?._id) {
      console.log("User not authenticated");
      return;
    }

    try {
      const likeObject = {
        userId: userInfo._id, // Ensure userId exists
        postId, // Pass postId
      };

      console.log("Sending like object:", likeObject);

      const res = await createLikes(likeObject).unwrap();
      toast.success(res.message); // Log the API response
    } catch (error: any) {
      console.error("Error liking the post:", error.message || error); // Improved error handling
    }
  };

  // dislike onclick
  const handleDislikePost = async (postId: string) => {
    if (!userInfo?._id) {
      console.log("User not authenticated");
      return;
    }

    try {
      const dislikeObject = {
        userId: userInfo._id, // Ensure userId exists
        postId, // Pass postId
      };

      console.log("Sending like object:", dislikeObject);

      const res = await createDislikes(dislikeObject).unwrap();
      toast.success(res.message); // Log the API response
    } catch (error: any) {
      console.error("Error liking the post:", error.message || error); // Improved error handling
    }
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
            <div className="flex justify-between items-center">
              <div
                className="relative flex items-center space-x-3"
                onMouseLeave={handleMouseLeave}
              >
                {/* User Image */}
                <img
                  onMouseEnter={() => handleMouseEnter(item?._id)}
                  src={item?.author?.profileImage}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div>
                  <p className="dark:text-white flex items-center gap-2 text-black font-semibold">
                    <span
                      onMouseEnter={() => handleMouseEnter(item?._id)}
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

                {/* Show User Modal for the specific post */}
                {hoveredPost === item?._id && (
                  <div
                    className="absolute z-50"
                    style={{ top: "100%", left: "0" }}
                    onMouseEnter={() => setHoveredPost(item?._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <UserModal user={item?.author} />
                  </div>
                )}
              </div>

              <div className="relative">
                <HiDotsHorizontal
                  className="text-2xl dark:text-white cursor-pointer"
                  onClick={() => toggleModal(item?._id)}
                />
                {modalOpen === item?._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkModal border dark:text-white dark:border-gray-600 rounded-md shadow-lg z-10">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1">
                        <BsBookmarkHeartFill /> Save Post
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1"
                        onClick={() => handleEditPost(item)} // Open edit modal with current post data
                      >
                        <MdEditSquare />
                        Edit Post
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1">
                        <RiDeleteBin5Fill /> Delete Post
                      </li>
                    </ul>
                  </div>
                )}
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
                <h1>{item?.likes?.length}</h1>
              </div>
              <div>
                <span>{item?.dislikes?.length}</span>
              </div>
              <div>
                <span>{item?.comments?.length}</span>
              </div>
              <div>
                <span>500</span>
              </div>
            </div>

            <div className="flex justify-between px-3 mt-3 text-gray-400 border-y py-2 border-gray-400 dark:border-secondary">
              <div
                onClick={() => handleLikePost(item?._id)}
                className={`flex items-center gap-0.5 cursor-pointer ${
                  item?.likes?.some(
                    (like: { [x: string]: any; _id: any }) =>
                      like?.user?._id === userInfo?._id
                  )
                    ? "text-green-600"
                    : "text-gray-400" // default color
                }`}
              >
                <BiLike className={`text-2xl`} />
                <span>Like</span>
              </div>

              <div onClick={()=> handleDislikePost(item?._id)} className={`flex items-center gap-0.5 cursor-pointer ${
                  item?.dislikes?.some(
                    (like: { [x: string]: any; _id: any }) =>
                      like?.user?._id === userInfo?._id
                  )
                    ? "text-green-600"
                    : "text-gray-400" // default color
                }`}>
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
            <PostComment
              item={item}
              hoveredComment={hoveredComment}
              setHoveredComment={setHoveredComment}
              handleMouseLeaveComment={handleMouseLeaveComment}
              handleMouseEnterComment={handleMouseEnterComment}
            />
          </div>
        ))
      )}

      {/* Edit Post Modal */}
      {editModalOpen && currentEditPost && (
        <CreatePostModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          defaultTitle={currentEditPost?.title}
          defaultContent={currentEditPost?.content}
          defaultImages={currentEditPost?.images}
        />
      )}
    </div>
  );
};

export default PostCard;
