/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useDeletePostMutation, useSavePostMutation } from "@/redux/api/post";
import { jsPDF } from "jspdf";
import UserModal from "../modal/UserModal";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaFilePdf, FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import DOMPurify from "dompurify"; // For sanitization
import { RiDeleteBin5Fill, RiVerifiedBadgeFill } from "react-icons/ri";
import PostSkeleton from "../loading/PostSkeleton";
import PostComment from "./PostComment";
import CreatePostModal from "../modal/CreatePostModal"; // Import CreatePostModal
import { BsBookmarkHeartFill } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import { useCreateLikeMutation } from "@/redux/api/likeApi";
import { getUserInfo } from "@/services/authServices";
import { toast } from "sonner";
import { useCreateDislikeMutation } from "@/redux/api/dislikeApi";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useFollowUserMutation } from "@/redux/api/userApi";
import Link from "next/link";
import TruncatedContent from "../TruncatedContent/TruncatedContent";
import ShareButton from "./ShareButton";

const PostCard = ({ postData, isLoading }: any) => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null); // For posts
  const [hoveredComment, setHoveredComment] = useState<string | null>(null); // For comments
  const [modalOpen, setModalOpen] = useState<string | null>(null); // Modal for options
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false); // For Edit Modal
  const [currentEditPost, setCurrentEditPost] = useState<any>(null); // Store post data to edit
  const userInfo = getUserInfo();

  // time format
  const formatPostDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return formatDistanceToNowStrict(date, { addSuffix: true })
      .replace("about ", "") // Removes "about" for a more concise format
      .replace(" ago", ""); // Removes "ago" for a clean Facebook-like appearance
  };

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
  const [createDislikes] = useCreateDislikeMutation();
  const [deletePost] = useDeletePostMutation();
  const [savePost] = useSavePostMutation();
  const [followUser] = useFollowUserMutation();

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  // delete post
  const handleDeletePost = async (id: string) => {
    setPostIdToDelete(id);
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDeletePost = async () => {
    if (!postIdToDelete) return;

    try {
      const res = await deletePost(postIdToDelete).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsModalOpen(false);
      setPostIdToDelete(null); // Reset the post ID after deletion
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPostIdToDelete(null); // Reset the post ID on cancel
  };

  // add favorite post
  const handleSavePost = async (post: any) => {
    try {
      // Create the saveData object with post and user ID
      const saveData = { post: post?._id, user: userInfo?._id };
      const res = await savePost({ saveData }).unwrap(); // Pass saveData to savePost
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  // download pdf
  const downloadPostAsPDF = (post: any) => {
    const pdf = new jsPDF();

    // Alternatively, just add text content
    pdf.text(`Title: ${post.title}`, 10, 10);
    pdf.text(`Content: ${post.content}`, 10, 20);
    pdf.save(`${post.title}.pdf`);
  };

  // follow user
  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: userInfo?._id, followeeId };
      const res = await followUser({ followInfo }).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
    }
  };

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
            className="dark:bg-darkCard md:rounded-md md:w-[620px] w-full bg-white shadow-md mt-4 relative"
          >
            {/* Post Header */}
            <div className="flex justify-between items-center p-4">
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
                    <Link
                      href={`/userDetails/${item?.author?._id}`}
                      onMouseEnter={() => handleMouseEnter(item?._id)}
                      className="cursor-pointer hover:underline"
                    >
                      {item?.author?.name}
                    </Link>
                    {item?.author?.isVerified && (
                      <RiVerifiedBadgeFill className="text-blue-500" />
                    )}
                    <div>
                      {item?.author?._id !== userInfo?._id && (
                        <div
                          onClick={() => handleFollowUser(item?.author?._id)}
                          className="text-blue-500 ms-2 cursor-pointer"
                        >
                          {item?.author?.followers?.some(
                            (follower: any) => follower === userInfo?._id
                          )
                            ? "Following"
                            : "Follow"}
                        </div>
                      )}
                    </div>
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatPostDate(item?.createdAt)} ago
                  </p>
                </div>

                {/* Show User Modal for the specific post */}
                {hoveredPost === item?._id && (
                  <div
                    className="absolute z-50"
                    style={{ top: "100%", left: "0" }}
                    onMouseEnter={() => setHoveredPost(item?._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <UserModal
                      user={item?.author}
                      currentUser={userInfo?._id}
                    />
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
                      <li
                        onClick={() => handleSavePost(item)}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1"
                      >
                        <BsBookmarkHeartFill /> Save Post
                      </li>
                      {item?.author?._id === userInfo?._id && (
                        <>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1"
                            onClick={() => handleEditPost(item)} // Open edit modal with current post data
                          >
                            <MdEditSquare />
                            Edit Post
                          </li>
                          <li
                            onClick={() => handleDeletePost(item?._id)}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1"
                          >
                            <RiDeleteBin5Fill /> Delete Post
                          </li>
                        </>
                      )}
                      <li
                        onClick={() => downloadPostAsPDF(item)}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkCard cursor-pointer flex items-center gap-1"
                      >
                        <FaFilePdf /> Download
                      </li>
                    </ul>
                    <ConfirmationModal
                      isOpen={isModalOpen}
                      message="Are you sure you want to delete this post?"
                      onConfirm={confirmDeletePost}
                      onCancel={cancelDelete}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="mt-2 p-4">
              <div
                className="mb-3 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item?.title),
                }}
              />
              <TruncatedContent item={item} />
            </div>

            {/* Post Image */}
            <div>
              {item?.images?.length > 0 &&
                item?.images?.map((image: any) => (
                  <Link
                    key={image}
                    href={
                      userInfo?.isVerified ? `/post-details/${item?._id}` : "/"
                    }
                  >
                    <img
                      src={image}
                      alt="Post"
                      className="w-full mt-3 h-64 md:h-[330px]"
                    />
                  </Link>
                ))}
            </div>

            {/* Post Actions */}
            <div className="flex justify-between px-3 mt-3 text-gray-400">
              <div>
                <h1 className="text-green-600 font-medium text-sm">
                  {item?.likes?.length} others
                </h1>
              </div>
              <div>
                <h1 className="text-green-600 font-medium text-sm">
                  {item?.dislikes?.length} others
                </h1>
              </div>
              <div>
                <h1 className="text-green-600 font-medium text-sm">
                  {item?.comments?.length} others
                </h1>
              </div>
              <div>
                <h1 className="text-green-600 font-medium text-sm">4 others</h1>
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
                {item?.likes?.some(
                  (like: any) => like?.user?._id === userInfo?._id
                ) ? (
                  <BiSolidLike className={`text-xl md:text-2xl`} />
                ) : (
                  <BiLike className={`text-xl md:text-2xl`} />
                )}

                <span className="md:font-bold">Like</span>
              </div>

              <div
                onClick={() => handleDislikePost(item?._id)}
                className={`flex items-center gap-0.5 cursor-pointer ${
                  item?.dislikes?.some(
                    (like: { [x: string]: any; _id: any }) =>
                      like?.user?._id === userInfo?._id
                  )
                    ? "text-green-600"
                    : "text-gray-400" // default color
                }`}
              >
                {item?.dislikes?.some(
                  (like: any) => like?.user?._id === userInfo?._id
                ) ? (
                  <BiSolidDislike className={`text-xl md:text-2xl`} />
                ) : (
                  <BiDislike className="text-xl md:text-2xl" />
                )}

                <span className="md:font-bold">Dislike</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <FaRegComment className="text-xl md:text-2xl" />
                <span className="md:font-bold">Comment</span>
              </div>
              <ShareButton
                postTitle={item?.title}
                postDescription={item?.content}
              />
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
          postId={currentEditPost?._id}
        />
      )}
    </div>
  );
};

export default PostCard;
