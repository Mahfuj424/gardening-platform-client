/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useDeletePostMutation, useGetAllPostsQuery } from '@/redux/api/post';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

// Skeleton component to display while loading
const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </td>
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-32"></div>
    </td>
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-48"></div>
    </td>
    <td className="px-4 py-2">
      <div className="h-8 bg-gray-300 rounded w-16"></div>
    </td>
    <td className="px-4 py-2">
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </td>
  </tr>
);

const DashboardPosts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  
  // Fetch posts data
  const { data, isLoading, error } = useGetAllPostsQuery({});
  const [deletePost] = useDeletePostMutation();
  const posts = data?.data;

  const handleDeletePost = (id: string) => {
    setPostIdToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDeletePost = async () => {
    if (!postIdToDelete) return;

    try {
      const res = await deletePost(postIdToDelete).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error?.message || "Error deleting post.");
    } finally {
      setIsModalOpen(false);
      setPostIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPostIdToDelete(null);
  };

  if (error) return <p>Error loading posts.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
            : posts?.map((post: any) => (
                <tr key={post?._id} className="border-b dark:text-white">
                  <td className="px-4 py-2">
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(post?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <img src={post?.author?.profileImage} className="w-8 h-8 rounded-full" alt="author profile" />
                    {post?.author?.name || 'Unknown Author'}
                  </td>
                  <td className="px-4 py-2 text-blue-500">
                    <Link href={`/post-details/${post?._id}`}>Learn More...</Link>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeletePost(post?._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this post?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDeletePost}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded"
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

export default DashboardPosts;
