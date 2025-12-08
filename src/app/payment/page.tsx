// "use client";

// import { useState } from "react";

// export default function DonationForm() {
//   const [formData, setFormData] = useState({
//     name: "Dinesh Kumar",
//     email: "sharmasabb728@gmail.com",
//     phone: "9780066947",
//     amount: "10.99",
//     UserId: "1",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const form = document.createElement("form");
//     form.method = "POST";
//     form.action = "https://hypercatalectic-heather-mostly.ngrok-free.dev/initiate";

//     Object.entries(formData).forEach(([key, value]) => {
//       const input = document.createElement("input");
//       input.name = key;
//       input.value = value as string;
//       input.type = "hidden";
//       form.appendChild(input);
//     });

//     document.body.appendChild(form);
//     form.submit();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Pay Now
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2 font-medium">Name</label>
//           <input
//             name="name"
//             onChange={handleChange}
//             placeholder="Your Name"
//             required
//             value={formData.name}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2 font-medium">Email</label>
//           <input
//             name="email"
//             type="email"
//             onChange={handleChange}
//             placeholder="you@example.com"
//             required
//             value={formData.email}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2 font-medium">Phone</label>
//           <input
//             name="phone"
//             type="tel"
//             onChange={handleChange}
//             placeholder="9876543210"
//             required
//             value={formData.phone}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2 font-medium">UserId</label>
//           <input
//             name="UserId"
//             type="text"
//             onChange={handleChange}
//             placeholder="UserId"
//             required
//             value={formData.UserId}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2 font-medium">Amount</label>
//           <input
//             name="amount"
//             type="number"
//             step="0.01"
//             onChange={handleChange}
//             placeholder="10.99"
//             required
//             value={formData.amount}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
//         >
//           Donate Now
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FoxcellPaymentForm() {
    const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    UserId: '',
    amount: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = document.createElement('form');
    form.method = 'POST';
    form.action =
      'https://hypercatalectic-heather-mostly.ngrok-free.dev/initiate';

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.name = key;
      input.value = value as string;
      input.type = 'hidden';
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#fe8900] hover:text-orange-600 font-medium mb-6 transition"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>
      {/* Heading Section */}
      <div className="text-center mb-12">
        <p className="uppercase text-[#fe8900] font-semibold tracking-widest text-sm">
          Secure Payment
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Pay Your Bill Safely & Instantly
        </h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Fast, secure, and encrypted payment processing — powered by Foxcell.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Payment Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe8900]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe8900]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe8900]"
            />
          </div>

          {/* User ID */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              User ID
            </label>
            <input
              name="UserId"
              required
              value={formData.UserId}
              onChange={handleChange}
              placeholder="Enter your User ID"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe8900]"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Amount
            </label>
            <input
              name="amount"
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe8900]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#fe8900] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
}
