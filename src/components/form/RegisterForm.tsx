/* eslint-disable @typescript-eslint/no-unused-vars */
/* RegisterForm.tsx */
"use client"; // Keep this directive for the client component

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { registerUser } from "@/services/actions/registerUser";
import { toast } from "sonner";
import setAccessTokenToCookies from "@/services/actions/setAccessTokenToCookie";
import { authKey } from "@/constants/auth";
import { loginUser } from "@/services/actions/loginUser";

interface FormData {
  image: FileList;
  name: string;
  email: string;
  password: string;
  gander: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to upload image to ImgBB
  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const apiKey = "2167989ee53b7a504211edcff02ebe5b";

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return response.data.data.url; // Get the image URL from ImgBB response
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setImageUploading(true);

    // Check if the image is provided
    let uploadedImageUrl = null;
    if (data.image && data.image.length > 0) {
      uploadedImageUrl = await uploadImage(data.image[0]);
    }

    // If image upload failed or no image is provided, proceed with form submission
    if (uploadedImageUrl || !data.image || data.image.length === 0) {
      const { image, ...restOfData } = data;
      const formDataWithImage = {
        ...restOfData,
        ...(uploadedImageUrl && { profileImage: uploadedImageUrl }), // Add image URL only if it exists
      };

      const res = await registerUser(formDataWithImage);

      if (res?.success) {
        const result = await loginUser({
          email: data?.email,
          password: data?.password,
        });
        if (result?.success) {
          toast.success("User login successfully");
          if (typeof window !== "undefined") {
            localStorage.setItem(authKey, result?.token);
            setAccessTokenToCookies(result?.token, {
              redirect: "/",
            });
          }
        }
      } else {
        toast.error(res.message);
        setImageUploading(false);
      }
    } else {
      console.error("Image upload failed.");
      setImageUploading(false);
    }

    setImageUploading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Image Upload */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-white"
          >
            Upload Profile
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:border-custom-green focus:ring-custom-green"
          />
        </div>

        {/* Gender Dropdown */}
        <div className="w-full md:w-1/2">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gander", { required: true })}
            className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:border-custom-green focus:ring-custom-green"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option className="text-black hover:text-white" value="male">
              Male
            </option>
            <option className="text-black hover:text-white" value="female">
              Female
            </option>
          </select>
          {errors.gander && (
            <p className="text-red-500 text-sm mt-1">Gender is required</p>
          )}
        </div>
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
          className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:border-custom-green focus:ring-custom-green"
          placeholder="Enter Your Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Name is required</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:border-custom-green focus:ring-custom-green"
          placeholder="Enter Your Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">Email is required</p>
        )}
      </div>

      {/* Password Input */}
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: true })}
          className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:border-custom-green focus:ring-custom-green"
          placeholder="Enter Your Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">Password is required</p>
        )}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-11 right-3 text-white"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={imageUploading}
        className={`w-full py-3 bg-custom-gradient text-white font-semibold rounded-md hover:bg-opacity-90 transition ${
          imageUploading ? "opacity-50" : ""
        }`}
      >
        {imageUploading ? "Uploading..." : "Sign Up"}
      </button>

      {/* Social Login */}
      {/* <div className="flex justify-center space-x-4 mt-4">
        <button
          type="button"
          className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <FaFacebookF className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          <FaGoogle className="w-5 h-5" />
        </button>
      </div> */}

      {/* Signup Link */}
      <p className="text-center text-white mt-4">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="bg-custom-gradient font-bold bg-clip-text text-transparent hover:underline"
        >
          Login
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
