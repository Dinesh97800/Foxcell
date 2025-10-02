// src/app/login/page.tsx

import LoginForm from "@/app/components/admin/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d6111e] to-[#4f46e5]">
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full mx-4">
        {/* Left side: Image + Quote, only visible on large screens */}
        <div className="relative lg:w-1/2 hidden lg:block md:bg-gradient-to-r from-[#d6111e] to-[#4f46e5]">
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-8">
            <div className="text-white text-center space-y-4">
              <h2 className="text-4xl font-bold">Get Everything You Want</h2>
              <p className="text-lg">
                You can get everything you want if you work hard, trust the
                process, and stick to the plan.
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:px-16 bg-white lg:bg-transparent rounded-3xl lg:rounded-none">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and password to access your account
            </p>
          </div>
          <LoginForm />

          <div className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
