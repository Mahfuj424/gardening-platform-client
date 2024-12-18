/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginUser } from "@/services/actions/loginUser";
import setAccessTokenToCookies from "@/services/actions/setAccessTokenToCookie";
import { storeUserInfo } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useForgotPassowrdMutation } from "@/redux/api/userApi";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalEmail, setModalEmail] = useState(""); // State to capture email in modal
  const {
    register,
    handleSubmit,
    setValue, // Add setValue for setting form values
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Handle forgot password submission
  const [forgotPassowrd] = useForgotPassowrdMutation();

  const handleForgotPassword = async () => {
    if (!modalEmail) {
      toast.error("Please enter a valid email.");
      return;
    }

    const res = await forgotPassowrd({ email: modalEmail }).unwrap();
    console.log(res);
    toast.success(
      "Password reset link sent to your email.!!  reset password into 10 min"
    );
    toggleModal(); // Close modal after submitting
  };

  // Predefined credentials
  const userCredentials = {
    email: "mahfujahmad44@gmail.com",
    password: "123456",
  };
  const adminCredentials = {
    email: "mahfujahmad424@gmail.com",
    password: "12345678",
  };

  // Populate form with credentials
  const handleCredentialClick = (type: "user" | "admin") => {
    const credentials = type === "user" ? userCredentials : adminCredentials;
    setValue("email", credentials.email);
    setValue("password", credentials.password);
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

        <h1 className="text-2xl bg-custom-gradient font-bold bg-clip-text text-transparent text-center">
          Please Login
        </h1>

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

          {/* Forgot Password Link */}
          <p
            className="bg-custom-gradient font-bold text-end bg-clip-text text-transparent cursor-pointer hover:underline"
            onClick={toggleModal}
          >
            Forgot Password
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-custom-gradient text-white font-semibold rounded-md hover:bg-opacity-90 transition"
          >
            Login
          </button>

          {/* Social Login */}
          <div className="text-white text-center">Credentials</div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => handleCredentialClick("user")}
              className="px-5 py-1 bg-custom-gradient rounded-full text-white"
            >
              user
            </button>
            <button
              type="button"
              onClick={() => handleCredentialClick("admin")}
              className="px-5 py-1 bg-custom-gradient rounded-full text-white"
            >
              admin
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-white mt-4">
            Are you new here?{" "}
            <a
              href="/auth/register"
              className="bg-custom-gradient font-bold bg-clip-text text-transparent hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Modal for Forgot Password */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Forgot Password
            </h2>
            <input
              type="email"
              placeholder="Please enter your valid email"
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)} // Set modal email state
              className="w-full p-3 border outline-none border-green-500 focus:ring-2 focus:ring-[#00984b] rounded-md"
            />
            <div className="flex flex-row-reverse gap-10 mt-5 ">
              <button
                onClick={handleForgotPassword} // Correctly handle email submission
                className="w-full py-3 bg-custom-gradient text-white font-semibold rounded-md hover:bg-red-600 transition"
              >
                Submit
              </button>
              <button
                onClick={toggleModal}
                className="w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
