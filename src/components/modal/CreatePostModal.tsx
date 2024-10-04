/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for Quill editor
import { useCreatePostMutation } from "@/redux/api/post";
import { toast } from "sonner";
import { getUserInfo } from "@/services/authServices";

const CreatePostModal = ({ isOpen, onClose }: any) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store image previews (local URLs)
  const [editorTitle, setEditorTitle] = useState(""); // State for title
  const [editorContent, setEditorContent] = useState(""); // State for content
  const [createPost]=useCreatePostMutation()
  const userInfo = getUserInfo()
  const imgbbApiKey = "2167989ee53b7a504211edcff02ebe5b"

  // Watch for file changes in the input field
  const selectedFiles = watch("images");

  // Close the modal if clicked outside
  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup scroll behavior on close
    };
  }, [isOpen]);

  // Preview selected images
  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      const previews = Array.from(selectedFiles).map((file: any) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);

      // Clean up object URLs after the component unmounts to prevent memory leaks
      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [selectedFiles]);

  // Upload images to imgbb and return the URLs
  const uploadImagesToImgbb = async (files: File[]) => {
    const promises = Array.from(files).map((file) => {
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

  // Handle form submission
  const onSubmit = async (data: any) => {
    const { category, images } = data;

    // Upload selected images
    if (images && images.length > 0) {
      try {
        const uploadedImageUrls = await uploadImagesToImgbb(images);
        // You can now submit the data along with image URLs
        const postData = {
          author:userInfo?._id,
          title: editorTitle, // Use the state value for title
          content: editorContent, // Use the state value for content
          category,
          images: uploadedImageUrls, // The URLs of uploaded images
        };
        const res = await createPost(postData).unwrap();
        console.log(res);
        if (res?.success) {
          toast.success("post added successfully");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }

    // Reset the form after submission
    reset();
    onClose(); // Close modal after submission
  };

  // Remove image from preview
  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-darkCard p-6 rounded-md w-full max-w-xl mx-auto relative z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &#10005;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title input field using ReactQuill */}
          <div className="mb-4 dark:text-white">
            <label className="block mb-1 dark:text-white">Title:</label>
            <ReactQuill
              value={editorTitle}
              onChange={setEditorTitle}
              placeholder="Enter your title here"
              className="dark:bg-darkBg dark:text-white"
            />
          </div>

          {/* Content textarea using ReactQuill */}
          <div className="mb-4 dark:text-white">
            <label className="block mb-1">Content:</label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Write your content here..."
              className="dark:bg-darkBg dark:text-white"
            />
          </div>

          {/* Category dropdown */}
          <div className="mb-4 dark:text-white">
            <label htmlFor="category" className="block mb-1">
              Category:
            </label>
            <select
              id="category"
              {...register("category", { required: true })}
              className="w-full p-2 border rounded-md text-black dark:bg-darkBg dark:text-white"
            >
              <option value="Gardening">Gardening</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Vegetable Gardens">Vegetable Gardens</option>
              <option value="Flower Gardens">Flower Gardens</option>
              <option value="Herb Gardens">Herb Gardens</option>
            </select>
          </div>

          {/* Multiple Image Upload */}
          <div className="border border-dashed border-black dark:border-gray-300 text-center mb-2 flex flex-wrap items-center justify-center relative w-full min-h-[208px]">
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
            {!imagePreviews.length ? (
              <p className="text-gray-300">
                Add photos/videos or drag and drop
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 justify-start w-full">
                {imagePreviews.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 md:w-24 md:h-24"
                  >
                    <img
                      src={url}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add to post button */}
          <div>
            <button
              type="submit"
              className="bg-custom-gradient text-black dark:text-white font-semibold p-2 rounded-md w-full"
            >
              Add to your post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
