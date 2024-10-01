/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

const CreatePostModal = ({ isOpen, onClose }: any) => {
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

  // State for the form data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("Gardening");


  // Dropdown options for gardening categories
  const categories = [
    "Gardening",
    "Indoor Plants",
    "Landscaping",
    "Vegetable Gardens",
    "Flower Gardens",
    "Herb Gardens",
  ];

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-darkCard p-6 rounded-md w-full max-w-xl mx-auto relative z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &#10005;
          </button>
        </div>

        {/* Title input field */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md dark:bg-darkBg dark:text-white"
        />

        {/* Content textarea */}
        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md dark:bg-darkBg dark:text-white"
        ></textarea>

        {/* Category dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-1">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md text-black dark:bg-darkBg dark:text-white"
          >
            {categories.map((category, index) => (
              <option
                className="bg-custom-gradient"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image preview section */}
        <div className="border cursor-pointer border-dashed border-black dark:border-gray-300 h-52 text-center mb-2 flex justify-center items-center">
          <p className="text-gray-300">Add photos/videos or drag and drop</p>
        </div>

        {/* Add to post button */}
        <div>
          <button className="bg-custom-gradient text-black font-semibold p-2 rounded-md w-full">
            Add to your post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
