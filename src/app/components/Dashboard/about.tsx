"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tv } from "lucide-react";
import axios from "axios";

const About = () => {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/about`);
        setAbout(res.data);
      } catch (err) {
        console.error("About fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!about) {
    return (
      <p className="text-center py-20 text-gray-500">
        No About data found.
      </p>
    );
  }

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background with overlay */}
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-[url('/your-bg.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 text-start py-20 px-4 md:py-32">
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-snug ml-6">
              About Us
            </h1>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={about.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-10"
            >
              {/* Image */}
              <div className="relative w-full max-w-lg mx-auto md:mx-0">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-lg bg-orange-100 shadow-lg"></div>
                <img
                  src={about.image || "/placeholder.jpg"}
                  alt={about.heading}
                  className="relative rounded-lg shadow-xl z-10 w-full h-auto object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <p className="uppercase text-[#fe8900] font-semibold tracking-wider mb-2 text-sm sm:text-base flex items-center gap-2">
                  <Tv className="w-5 h-5 text-[#fe8900]" />
                  About Foxcell
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  {about.heading}
                </h2>

                <p className="text-gray-600 mb-6 text-sm sm:text-base whitespace-pre-line leading-relaxed">
                  {about.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default About;
