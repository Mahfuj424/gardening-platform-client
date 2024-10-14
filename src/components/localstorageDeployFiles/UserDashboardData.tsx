/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useDeletePostMutation } from '@/redux/api/post';
import { useGetSingleProfileQuery } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/authServices';
import { toast } from 'sonner';

interface UserDashboardDataProps {
  render: (props: {
    posts: any[];
    isLoading: boolean;
    error: any;
    handleDeletePost: (id: string) => void;
    isModalOpen: boolean;
    confirmDeletePost: () => void;
    cancelDelete: () => void;
    postIdToDelete: string | null;
  }) => JSX.Element;
}

const UserDashboardData: React.FC<UserDashboardDataProps> = ({ render }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const userInfo = getUserInfo();

  // Fetch posts data
  const { data, isLoading, error } = useGetSingleProfileQuery(userInfo?._id);
  const [deletePost] = useDeletePostMutation();
  const posts = data?.data?.posts;

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
      toast.error(error?.message || 'Error deleting post.');
    } finally {
      setIsModalOpen(false);
      setPostIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPostIdToDelete(null);
  };

  return render({
    posts,
    isLoading,
    error,
    handleDeletePost,
    isModalOpen,
    confirmDeletePost,
    cancelDelete,
    postIdToDelete,
  });
};

export default UserDashboardData;
