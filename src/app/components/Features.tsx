"use client";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Wifi, Smartphone } from "lucide-react";
import FancyButton from "./UI/Button";

const tabs = [
  {
    id: "tv",
    title: "TV & Streaming",
    icon: <Tv className="w-6 h-6 text-[#fe8900]" />,
    heading: "Get TV Streaming With Your Internet Service",
    desc: "NetBand is the world’s leading broadband provider — enjoy seamless TV streaming along with ultrafast internet.",
    stats: [
      { value: "88%", label: "Free Installation Ultrafast Connect" },
      { value: "93%", label: "Real Technology Solutions" },
    ],
    list: [
      "Professional Team Member",
      "Awards Winning Internet Solutions Company",
      "Awards Winning Internet Solutions Company",
    ],
    image: "https://netband-react.vercel.app/assets/img/about/about.jpg",
  },
  {
    id: "internet",
    title: "Fast Internet",
    icon: <Wifi className="w-6 h-6 text-[#fe8900]" />,
    heading: "Blazing Fast Internet Anytime",
    desc: "Experience high-speed internet with no interruptions. Perfect for work, streaming, and gaming.",
    stats: [
      { value: "95%", label: "High-Speed Network Coverage" },
      { value: "90%", label: "Trusted by 1K+ Brands" },
    ],
    image: "https://netband-react.vercel.app/assets/img/about/about.jpg",
  },
  {
    id: "mobile",
    title: "All For Mobile",
    icon: <Smartphone className="w-6 h-6 text-[#fe8900]" />,
    heading: "Internet On The Go",
    desc: "Enjoy strong and secure mobile internet anywhere, anytime.",
    stats: [
      { value: "85%", label: "Mobile Device Optimization" },
      { value: "92%", label: "Global Roaming Ready" },
    ],
    image: "https://netband-react.vercel.app/assets/img/about/about.jpg",
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState("tv");
  const current: any = tabs.find((t) => t.id === active);

  return (
    <section id="features" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl shadow transition ${
                active === tab.id ? "bg-[#fe8900] text-white" : "bg-white"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  active === tab.id ? "bg-white" : "bg-gray-100"
                }`}
              >
                {tab.icon}
              </div>
              <p
                className={`font-semibold text-center ${
                  active === tab.id ? "text-white" : "text-gray-800"
                }`}
              >
                {tab.title}
              </p>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Image with frame effect */}
            <div className="relative w-full max-w-lg mx-auto md:mx-0">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-lg bg-red-100 shadow-lg"></div>
              <img
                src={current.image}
                alt={current.title}
                className="relative rounded-lg shadow-xl z-10 w-full h-auto"
              />
            </div>

            {/* Text */}
            <div>
              <p className="uppercase text-[#fe8900] font-semibold tracking-wider mb-2 text-sm sm:text-base">
                About Foxcell
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                {current.heading}
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {current.desc}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                {current.stats.map((s: any, i: number) => {
                  const radius = 40;
                  const stroke = 3;
                  const normalizedRadius = radius - stroke * 2;
                  const circumference = normalizedRadius * 2 * Math.PI;
                  const percent = parseInt(s.value);
                  const strokeDashoffset =
                    circumference - (percent / 100) * circumference;

                  return (
                    <div
                      key={i}
                      className="flex flex-row items-center gap-3 w-full sm:w-auto"
                    >
                      <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="mb-2"
                      >
                        <circle
                          stroke="#e5e7eb"
                          fill="transparent"
                          strokeWidth={stroke}
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                        <circle
                          stroke="#fe8900"
                          fill="transparent"
                          strokeWidth={stroke}
                          strokeLinecap="round"
                          strokeDasharray={`${circumference} ${circumference}`}
                          style={{
                            strokeDashoffset,
                            transition: "stroke-dashoffset 1s ease",
                          }}
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          className="text-lg font-bold fill-[#fe8900]"
                        >
                          {s.value}
                        </text>
                      </svg>
                      <p className="text-sm text-gray-700 max-w-[140px]">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* List Items */}
              <ul className="space-y-2 mb-6">
                {current?.list?.map((item: any, i: number) => (
                  <li key={i} className="flex items-center text-gray-700 text-sm sm:text-base">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#fe8900] text-white text-xs mr-3">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <FancyButton>Learn More</FancyButton>
                <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
