/* eslint-disable @typescript-eslint/no-explicit-any */

import { AiOutlineClose } from "react-icons/ai"; // Close icon
import React from "react";

interface PostDetailsProps {
  post: any; // Post data passed as props
  isOpen: boolean; // Modal visibility
  onClose: () => void; // Function to close the modal
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null; // Do not render the modal if not open or post data is missing

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-full max-w-5xl h-screen bg-white rounded-lg shadow-lg overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black"
          onClick={onClose}
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        
        {/* Post Details */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          <p className="mt-4">{post?.content}</p>
          
          {/* Render comments */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Comments</h2>
            {post?.comments?.length > 0 ? (
              post.comments.map((comment: any, index: number) => (
                <div key={index} className="mt-2 p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">{comment?.author?.name}</p>
                  <p>{comment?.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
