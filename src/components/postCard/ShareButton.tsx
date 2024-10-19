/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { PiShareFatLight } from "react-icons/pi"; // Ensure this is the correct import for your icon
import { toast } from "sonner";

const ShareButton = ({ postTitle, postDescription }: any) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleShareOption = (platform: any) => {
    const url = window.location.href; // Current post URL

    if (platform === "copy") {
      toast.success("copied clipboard");
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${postTitle}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${postTitle}: ${postDescription}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${postDescription}`,
        "_blank"
      );
    }
    // Add more platforms as needed
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={toggleOptions}
      >
        <PiShareFatLight className="text-xl md:text-2xl" />
        <span className="md:font-bold">Share</span>
      </div>

      {/* Dropdown for sharing options */}
      {showOptions && (
        <div className="absolute left-[-210px] flex bg-white dark:bg-gray-200 border rounded-md shadow-md mt-2 p-2 z-10">
          {/* Adjust `left-[-150px]` as necessary to move further left */}
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => handleShareOption("copy")}
          >
            <MdContentCopy className="text-xl" />
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => handleShareOption("facebook")}
          >
            <FaFacebookSquare className="text-xl text-blue-500" />
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => handleShareOption("instagram")}
          >
            <FaSquareInstagram className="text-xl text-pink-500" />
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => handleShareOption("twitter")}
          >
            <FaTwitterSquare className="text-xl text-blue-500" />
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => handleShareOption("linkedin")}
          >
            <BsLinkedin className="text-xl text-blue-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
