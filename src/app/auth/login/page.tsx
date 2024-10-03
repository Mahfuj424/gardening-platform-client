/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { loginUser } from '@/services/actions/loginUser';
import setAccessTokenToCookies from '@/services/actions/setAccessTokenToCookie';
import { storeUserInfo } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { toast } from 'sonner';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res?.success) {
        storeUserInfo(res?.token);
        setAccessTokenToCookies(res?.token, {
          redirect: "/",
        });
        toast.success("User login successfully");

        router.push("/");
      } else {
        toast(res?.message);
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/8PSG65N/612c7dfb420fe.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-70 px-8 py-5 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co.com/M5VKXRn/garden-Logo-removebg-preview.png"
            alt="Logo"
            className="w-32 h-14"
          />
        </div>


        <h1 className="text-2xl bg-custom-gradient font-bold bg-clip-text text-transparent text-center">Please Login</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">



          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
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
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
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
  className="w-full py-3 bg-custom-gradient text-white font-semibold rounded-md hover:bg-opacity-90 transition"
>
  Login
</button>

          {/* Social Login */}
          <div className="flex justify-center space-x-4 mt-4">
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
          </div>

          {/* Signup Link */}
          <p className="text-center text-white mt-4">
            Already have an account?{' '}
            <a
              href="/auth/register"
              className="bg-custom-gradient font-bold bg-clip-text text-transparent hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
