/* RegisterPage.tsx */
import RegisterForm from "@/components/form/RegisterForm";
import React from "react";

const RegisterPage = () => {
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

        <h1 className="text-xxl bg-custom-gradient font-bold bg-clip-text text-transparent text-center">
          Please Register
        </h1>

        {/* Render RegisterForm component */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
