'use client'
import React, { useState } from "react";
import { MdVideoCall } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import CreatePostModal from "../modal/CreatePostModal";

const WhatsOnYourMind = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* The input box and buttons */}
      <div className="dark:bg-darkCard bg-white shadow-md p-4 rounded-lg mt-4 flex items-center space-x-3">
        <input
          type="text"
          placeholder="What do you have in mind?"
          className="flex-grow dark:bg-darkModal cursor-pointer bg-gray-100 p-2 rounded-md dark:text-white text-black placeholder-gray-400 outline-none"
          onClick={openModal} // Open modal on click
        />
        <div className="flex space-x-3">
          <button className="bg-pink-500 p-1 rounded-full" onClick={openModal}>
            <RiImageAddFill className="text-xl text-white" />
          </button>
          <button className="bg-blue-500 p-1 rounded-full" onClick={openModal}>
            <MdVideoCall className="text-xl text-white" />
          </button>
        </div>
      </div>

      {/* The modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default WhatsOnYourMind;
