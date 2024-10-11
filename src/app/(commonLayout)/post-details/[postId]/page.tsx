/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PostDetailsCard from "@/components/postDetails/PostDetails";
import { useGetSinglePostQuery } from "@/redux/api/post";
import React from "react";

// Define the type for the params prop
interface PostDetailsProps {
  params: {
    postId: string; // Assuming postId is a string
  };
}


const PostDetails: React.FC<PostDetailsProps> = ({ params }) => {
  // Fetch single post using postId from params
  const { data, isLoading } = useGetSinglePostQuery(params?.postId);
  const singlePost = data?.data; // Use the defined Post type

  return (
    <div className="lg:flex justify-between px-5">
      <div className="h-[calc(100vh-80px)]">
        {/* Check if there are images and map over them */}
        {singlePost?.images?.length > 0 &&
          singlePost?.images?.map((image: string, index: number) => (
            <img
              key={index} // Add key to avoid React warning
              className="w-[700px] rounded-lg py-5"
              src={image}
              alt="post image"
            />
          ))}
      </div>
      <div>
        <PostDetailsCard item={singlePost} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PostDetails;
