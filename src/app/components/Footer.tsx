"use client";
import { useState } from "react";
import { FaFacebookF, FaTwitter, FaVimeoV, FaPinterestP } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Join Our Newsletter</h2>
        <p className="text-gray-400 text-sm mt-2">
          We Provide Best Pricing package to grow your lead capture
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none w-full sm:w-80 text-black outline-none"
          />
          <button className="bg-[#fe8900] px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none font-semibold hover:bg-black hover:border hover:border-[#fe8900] transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-6 md:px-20 py-12 border-t border-gray-800">
        {/* Logo and Info */}
        <div>
          <h3 className="text-xl font-bold">Foxcell</h3>
          <p className="mt-4 text-sm text-gray-400">
            We believe it has the power to do amazing things.
          </p>
          <p className="mt-2 text-[#fe8900] text-sm">info@example.com</p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-[#fe8900] text-sm"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-[#fe8900] text-sm"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-[#fe8900] text-sm"
            >
              <FaVimeoV />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-[#fe8900] text-sm"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Services</li>
            <li>About Company</li>
            <li>Latest News</li>
            <li>Team Member</li>
            <li>Testimonials</li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-semibold mb-4">My Account</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Forum Support</li>
            <li>Help & FAQ</li>
            <li>Contact Us</li>
            <li>Pricing And Plans</li>
            <li>Cookies Policy</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-semibold mb-4">Address:</h4>
          <p className="text-gray-400 text-sm">
            570 8th Ave, New York, NY 10018 United States
          </p>
          <h4 className="mt-4 font-semibold mb-1">Hours:</h4>
          <p className="text-gray-400 text-sm">
            9.30am – 6.30pm <br /> Monday to Friday
          </p>
        </div>

        {/* Install App */}
        <div>
          <h4 className="font-semibold mb-4">Install App</h4>
          <p className="text-gray-400 text-sm">From App Store or Google Play</p>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
              alt="App Store"
              className="h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
          </div>
          <p className="mt-4 text-gray-400 text-sm">24/7 Support center</p>
          <p className="text-red-500 font-semibold">+1718-904-4450</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#fe8900] py-3 text-center text-sm relative">
        <p>
          Copyright © {new Date().getFullYear()} Foxcell. All Rights Reserved.
        </p>
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-5">
          <button className="bg-black p-2 rounded-full shadow-lg border border-[#fe8900] hover:bg-[#fe8900] transition">
            <IoIosArrowUp size={22} />
          </button>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 py-4 text-xs md:text-sm text-gray-300 px-4">
        <a href="#">Company</a>
        <a href="#">Support</a>
        <a href="#">Privacy</a>
        <a href="#">Faqs</a>
      </div>
    </div>
  );
}
