"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "src/api/apiClient";
import FancyButton from "../UI/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/user/login", { email, password });
      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between items-center text-sm">
        <div>
          <input id="remember" type="checkbox" className="mr-2" />
          <label htmlFor="remember" className="text-gray-700">
            Remember me
          </label>
        </div>
        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>
      <FancyButton children={"Sign In"} isFullWidth="w-full" action="submit" />
    </form>
  );
}
