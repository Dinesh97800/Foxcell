"use client";

import { useState } from "react";

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: "Dinesh Kumar",
    email: "sharmasabb728@gmail.com",
    phone: "9780066947",
    amount: "10.99",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://hypercatalectic-heather-mostly.ngrok-free.dev/initiate";

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.name = key;
      input.value = value as string;
      input.type = "hidden";
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Pay Now
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Name</label>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Your Name"
            required
            value={formData.name}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="you@example.com"
            required
            value={formData.email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Phone</label>
          <input
            name="phone"
            type="tel"
            onChange={handleChange}
            placeholder="9876543210"
            required
            value={formData.phone}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            onChange={handleChange}
            placeholder="10.99"
            required
            value={formData.amount}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
}
