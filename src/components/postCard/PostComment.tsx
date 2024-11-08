/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { FaPaperclip, FaSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { getUserInfo } from "@/services/authServices";
import axios from "axios";
import { TbDots } from "react-icons/tb";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/api/commentApi";
import UserModal from "../modal/UserModal";
import { toast } from "sonner";

interface PostCommentProps {
  item: any;
  hoveredComment: string | null;
  setHoveredComment: (id: string | null) => void;
  handleMouseEnterComment: (commentId: string) => void;
  handleMouseLeaveComment: () => void;
}

const PostComment: React.FC<PostCommentProps> = ({
  item,
  hoveredComment,
  setHoveredComment,
  handleMouseEnterComment,
  handleMouseLeaveComment,
}) => {
  const userInfo = getUserInfo();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentImage, setCommentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showOptionsModal, setShowOptionsModal] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentImage, setEditCommentImage] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false); // State to toggle between single and all comments
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiObject: any) => {
    setSelectedEmoji(emojiObject.emoji);
    setCommentText((prev) => prev + emojiObject.emoji);
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=2167989ee53b7a504211edcff02ebe5b`,
          formData
        );
        const imageUrl = response.data.data.url;
        setCommentImage(imageUrl);
      } catch (error) {
        console.error("Image upload failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateComment = async () => {
    if (!commentText && !commentImage) return;

    const commentObject = {
      author: userInfo?._id,
      commentText,
      commentImage,
    };

    const res = await createComment({
      commentObject,
      postId: item?._id,
    }).unwrap();
    if (res?.success) {
      toast.success("Comment added successfully");
    } else {
      toast.error("Something went wrong");
    }
    setCommentText("");
    setCommentImage(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowOptionsModal(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = (comment: any) => {
    setEditCommentId(comment?._id);
    setEditCommentText(comment?.commentText || "");
    setEditCommentImage(comment?.commentImage || null);
    setIsEditModalOpen(true);
  };

  const handleUpdateComment = async () => {
    if (!editCommentText && !editCommentImage) return;

    const updatedComment = {
      commentId: editCommentId,
      commentText: editCommentText,
      author: userInfo?._id,
      commentImage: editCommentImage,
    };

    try {
      const res = await updateComment(updatedComment).unwrap();

      if (res?.success) {
        toast.success("Comment updated successfully");
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("An error occurred while updating the comment.");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const commentInfo = {
        commentId,
        authorId: userInfo?._id,
      };
      const res = await deleteComment(commentInfo).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-3">
        {/* Conditionally render "See All Comments" */}
        <div className="ps-3">
          {item?.comments?.length > 1 && (
            <h1
              className="text-xs cursor-pointer dark:text-gray-100"
              onClick={() => setShowAllComments((prev) => !prev)}
            >
              {showAllComments ? "Hide Comments" : "view more Comments"}
            </h1>
          )}
        </div>

        {item?.comments?.length > 0 &&
          (showAllComments
            ? item?.comments?.map((comment: any) => (
                <div key={comment?._id}>
                  <div>
                    <div className="flex items-center gap-3 ms-3 my-3 px-4 relative">
                      <img
                        onMouseEnter={() =>
                          handleMouseEnterComment(comment?.author?._id)
                        }
                        onMouseLeave={handleMouseLeaveComment}
                        src={comment?.author?.profileImage}
                        alt="User Avatar"
                        className="md:w-8 w-6 h-6 md:h-8 rounded-full"
                      />
                      <div className="flex gap-2 items-center relative">
                        <div className="dark:bg-darkModal bg-gray-100 p-1 md:p-3 rounded-xl text-gray-400 md:font-semibold dark:text-white">
                          <h1
                            onMouseEnter={() =>
                              handleMouseEnterComment(comment?.author?._id)
                            }
                            onMouseLeave={handleMouseLeaveComment}
                            className="md:font-bold font-medium text-black dark:text-gray-100 cursor-pointer relative"
                          >
                            {comment?.author?.name}
                          </h1>

                          {hoveredComment === comment?.author?._id && (
                            <div
                              className="absolute z-50"
                              style={{ top: "40%", left: "0" }}
                              onMouseEnter={() =>
                                setHoveredComment(comment?.author?._id)
                              }
                              onMouseLeave={handleMouseLeaveComment}
                            >
                              <UserModal
                                user={comment?.author}
                                currentUser={userInfo?._id}
                              />
                            </div>
                          )}

                          <h1 className="text-black text-sm dark:text-gray-200">
                            {comment?.commentText}
                          </h1>
                        </div>
                        <div>
                          {comment?.author?._id === userInfo?._id && (
                            <>
                              <TbDots
                                className="cursor-pointer dark:text-white"
                                onClick={() =>
                                  setShowOptionsModal(
                                    showOptionsModal === comment?._id
                                      ? null
                                      : comment?._id
                                  )
                                }
                              />
                              {showOptionsModal === comment?._id && (
                                <div
                                  ref={modalRef}
                                  className="absolute top-10 right-0 z-10 bg-white border rounded-md shadow-md dark:bg-darkModal dark:border-gray-700"
                                >
                                  <ul className="p-2 text-sm text-gray-700 dark:text-white">
                                    <li
                                      className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      onClick={() => handleEdit(comment)}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      onClick={() => handleDelete(comment?._id)}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ms-20">
                      {comment?.commentImage && (
                        <img
                          src={comment?.commentImage}
                          alt="Comment Image"
                          className="w-32 h-32"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            : item?.comments?.slice(0, 1).map((comment: any) => (
                <div key={comment?._id}>
                  <div>
                    <div className="flex items-center gap-3 px-4 ms-3 my-3 relative">
                      <img
                        onMouseEnter={() =>
                          handleMouseEnterComment(comment?.author?._id)
                        }
                        onMouseLeave={handleMouseLeaveComment}
                        src={comment?.author?.profileImage}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex gap-2 items-center relative">
                        <div className="dark:bg-darkModal bg-gray-100 p-3 rounded-xl text-gray-400 font-semibold dark:text-white">
                          <h1
                            onMouseEnter={() =>
                              handleMouseEnterComment(comment?.author?._id)
                            }
                            onMouseLeave={handleMouseLeaveComment}
                            className="font-bold text-black dark:text-gray-200 cursor-pointer relative"
                          >
                            {comment?.author?.name}
                          </h1>

                          {hoveredComment === comment?.author?._id && (
                            <div
                              className="absolute z-50"
                              style={{ top: "40%", left: "0" }}
                              onMouseEnter={() =>
                                setHoveredComment(comment?.author?._id)
                              }
                              onMouseLeave={handleMouseLeaveComment}
                            >
                              <UserModal
                                user={comment?.author}
                                currentUser={userInfo?._id}
                              />
                            </div>
                          )}

                          <h1 className="text-black text-sm dark:text-gray-200">
                            {comment?.commentText}
                          </h1>
                        </div>
                        <div>
                          {comment?.author?._id === userInfo?._id && (
                            <>
                              <TbDots
                                className="cursor-pointer dark:text-white"
                                onClick={() =>
                                  setShowOptionsModal(
                                    showOptionsModal === comment?._id
                                      ? null
                                      : comment?._id
                                  )
                                }
                              />
                              {showOptionsModal === comment?._id && (
                                <div
                                  ref={modalRef}
                                  className="absolute top-10 right-0 z-10 bg-white border rounded-md shadow-md dark:bg-darkModal dark:border-gray-700"
                                >
                                  <ul className="p-2 text-sm text-gray-700 dark:text-white">
                                    <li
                                      className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      onClick={() => handleEdit(comment)}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      onClick={() => handleDelete(comment?._id)}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ms-20">
                      {comment?.commentImage && (
                        <img
                          src={comment?.commentImage}
                          alt="Comment Image"
                          className="w-32 h-32"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )))}

        <div className="flex items-center p-4 mt-4 gap-3 relative">
          <img
            src={userInfo?.profileImage}
            alt="User Avatar"
            className="md:w-10 w-8 md:h-10 w-8 rounded-full"
          />
          <div className="flex-grow relative">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write an answer..."
              className="w-full py-2 px-4 rounded-full border dark:text-white dark:bg-darkCard dark:border-gray-700 border-gray-300 focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <FaSmile
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />
              <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <FaPaperclip className="text-gray-400 cursor-pointer" />
              </label>
            </div>
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <button
            onClick={handleCreateComment}
            className="bg-custom-gradient p-2 rounded-full text-white"
          >
            <FiSend />
          </button>
        </div>
        {commentImage && (
          <div className="mt-2">
            <img
              src={commentImage}
              alt="Uploaded"
              className="w-24 h-24 rounded-md"
            />
          </div>
        )}
      </div>
      {/* Modal for editing comments */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Comment</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              placeholder="Update your comment..."
            />
            {editCommentImage && (
              <img
                src={editCommentImage}
                alt="Comment Image"
                className="mt-3 h-32"
              />
            )}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleUpdateComment}
                className="bg-blue-500 text-white py-1 px-3 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-400 text-white py-1 px-3 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComment;
