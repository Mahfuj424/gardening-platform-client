/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for Quill editor
import { useCreatePostMutation, useUpdatePostMutation } from "@/redux/api/post"; // Import update mutation
import { toast } from "sonner";
import { getUserInfo } from "@/services/authServices";
import { MdWorkspacePremium } from "react-icons/md";

const CreatePostModal = ({
  isOpen,
  onClose,
  defaultTitle = "",
  defaultContent = "",
  defaultImages = [],
  postId = null,
}: any) => {
  const { register, handleSubmit, reset } = useForm();
  const [editorTitle, setEditorTitle] = useState(defaultTitle);
  const [editorContent, setEditorContent] = useState(defaultContent);
  const [imagePreviews, setImagePreviews] = useState<string[]>(defaultImages); // Store default image URLs
  const [newImages, setNewImages] = useState<File[]>([]); // Store newly added images as File objects
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation(); // New hook for updating posts
  const [isPremium, setIsPremium] = useState(false); // State for isPremium
  const userInfo = getUserInfo();
  const imgbbApiKey = "2167989ee53b7a504211edcff02ebe5b";

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleImageSelection = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    setNewImages((prev) => [...prev, ...files]);

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  };

  const handleRemoveImage = (index: number, isDefault: boolean) => {
    if (isDefault) {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewImages((prev) =>
        prev.filter((_, i) => i !== index - defaultImages.length)
      );
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const uploadImagesToImgbb = async (files: File[]) => {
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append("image", file);
      return axios
        .post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)
        .then((response) => response.data.data.url)
        .catch((error) => console.error("Error uploading image:", error));
    });
    const urls = await Promise.all(promises);
    return urls;
  };

  const handleTogglePremium = () => {
    setIsPremium((prev) => !prev); // Toggle between true and false
  };

  // Separate function for creating a post
  const handleCreatePost = async (data: any) => {
    const { category } = data;

    let uploadedImageUrls: string[] = [];
    if (newImages.length > 0) {
      try {
        uploadedImageUrls = await uploadImagesToImgbb(newImages);
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading images");
      }
    }

    const postData = {
      author: userInfo?._id,
      isPremium, // Add isPremium to post data
      title: editorTitle,
      content: editorContent,
      category,
      images: [
        ...imagePreviews.slice(0, defaultImages.length),
        ...uploadedImageUrls,
      ],
    };

    const res = await createPost(postData).unwrap();
    if (res?.success) {
      toast.success("Post added successfully");
    } else {
      toast.error("Something went wrong");
    }

    reset();
    onClose();
  };

  // Separate function for updating a post
  const handleUpdatePost = async (data: any) => {
    const { category } = data;

    let uploadedImageUrls: string[] = [];
    if (newImages.length > 0) {
      try {
        uploadedImageUrls = await uploadImagesToImgbb(newImages);
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading images");
      }
    }

    const updateData = {
      author: userInfo?._id,
      isPremium, // Add isPremium to update data
      title: editorTitle,
      content: editorContent,
      category,
      images: [
        ...imagePreviews.slice(0, defaultImages.length),
        ...uploadedImageUrls,
      ],
    };

    const res = await updatePost({ updateData, postId }).unwrap(); // Call the update mutation
    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.error("Something went wrong");
    }

    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-darkCard p-6 rounded-md w-full max-w-xl mx-auto relative z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {defaultTitle !== '' && defaultContent !== '' ? "Update Post" : "Create Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &#10005;
          </button>
        </div>
  
        <form
          onSubmit={handleSubmit(
            defaultTitle !== '' && defaultContent !== '' ? handleUpdatePost : handleCreatePost
          )}
        >
          {/* Title input */}
          <div className="mb-4 dark:text-white">
            <div className="flex justify-between">
              <label className="block mb-1 dark:text-white">Title:</label>
              <div
                className={`flex items-center cursor-pointer ${
                  isPremium ? "text-blue-500" : "text-gray-400"
                }`}
                onClick={handleTogglePremium} // Toggle on click
              >
                <MdWorkspacePremium className="" /> isPremium
              </div>
            </div>
            <ReactQuill
              value={editorTitle}
              onChange={setEditorTitle}
              placeholder="Enter your title here"
              className="dark:bg-darkBg dark:text-white"
            />
          </div>
  
          {/* Content input */}
          <div className="mb-4 dark:text-white">
            <label className="block mb-1">Content:</label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Write your content here..."
              className="dark:bg-darkBg dark:text-white"
            />
          </div>
  
          {/* Category selection */}
          <div className="mb-4 dark:text-white">
            <label htmlFor="category" className="block mb-1">
              Category:
            </label>
            <select
              id="category"
              {...register("category", { required: true })}
              className="w-full p-2 border rounded-md text-black  dark:bg-darkBg dark:text-white"
            >
              <option value="Gardening">Gardening</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Vegetable Gardens">Vegetable Gardens</option>
              <option value="Flower Gardens">Flower Gardens</option>
              <option value="Herb Gardens">Herb Gardens</option>
            </select>
          </div>
  
          {/* Image upload section */}
          <div className="border border-dashed border-black dark:border-gray-300 text-center mb-2 flex flex-wrap items-center justify-center relative w-full min-h-[150px] px-4">
            <div className="flex flex-wrap items-center justify-center">
              {imagePreviews.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover m-2"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() =>
                      handleRemoveImage(index, index < defaultImages.length)
                    }
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
  
            <input
              type="file"
              id="image-upload"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageSelection}
            />
            {imagePreviews.length === 0 && (
              <p className="dark:text-white">Click to upload images</p>
            )}
          </div>
  
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-custom-gradient w-full text-white px-4 py-2 rounded-md"
            >
              {defaultTitle !== '' && defaultContent !== '' ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
