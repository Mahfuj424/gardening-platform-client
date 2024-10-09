/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/redux/api/userApi";

const UpdateProfileModal = ({ user, onClose }: any) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [imageFile, setImageFile] = useState<File | null>(null); // State to store the selected image file
  const [imagePreview, setImagePreview] = useState<string>(
    user?.profileImage || ""
  ); // State to store the image preview URL

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle image upload to imgbb
  const uploadImageToImgbb = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    // Replace with your actual imgbb API key
    const apiKey = "2167989ee53b7a504211edcff02ebe5b";
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const response = await fetch(imgbbUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data?.data?.url; // Return the image URL from imgbb
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrl = profileImage;

    // Upload image to imgbb if a new image is selected
    if (imageFile) {
      const imgbbUrl = await uploadImageToImgbb(imageFile);
      if (imgbbUrl) {
        uploadedImageUrl = imgbbUrl;
      }
    }

    const data = {
      name,
      email,
      profileImage: uploadedImageUrl, // Include the uploaded image URL
    };

    

    const res = await updateProfile({data, id:user?._id}).unwrap();
    console.log(res);
    toast.success("Profile updated successfully!");
    onClose(); // Close modal on submit
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose} // Close modal on click
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={imagePreview || user?.profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-300"
            />
            {/* Edit Icon to trigger file input */}
            <div
              className="absolute top-0 left-0 bg-green-500 p-2 rounded-full text-white cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input on click
            >
              <FiEdit size={16} />
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the file input
          />

          {/* Form */}
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-left font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-left font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-custom-gradient text-white py-2 rounded-lg transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
