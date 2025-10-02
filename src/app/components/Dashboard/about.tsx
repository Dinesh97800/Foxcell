import React from "react";
import { Quote, Tv } from "lucide-react";
import FancyButton from "../UI/Button";
import { motion, AnimatePresence } from "framer-motion";

const current = {
  id: "tv",
  title: "TV & Streaming",
  icon: <Tv className="w-6 h-6 text-[#fe8900]" />,
  heading: "Get TV Streaming With Your Internet Service",
  desc: "Foxcell is an upcoming small scale Internet Service Provider in the City of Chandigarh , Panchkula and Mohali. Committed to deliver our Customers High Speed Internet Broadband Services at Cheaper Price. \n Foxcell will be building a comprehensive services framework that can deliver leading edge voice, video, IT applications and multimedia content services over any broadband or IP-centric network. We have engaged the best-in-class technology partners to build the required capability frameworks. \n Innovation is our driving force and we create environment for the young talent in our company to conceive and incubate new ideas in order to develop and deliver useful services and solutions for our customers, thereby sustaining our competitive advantages.",
  stats: [
    { value: "88%", label: "Free Installation Ultrafast Connect" },
    { value: "93%", label: "Real Technology Solutions" },
  ],
  list: [
    "Professional Team Member",
    "Awards Winning Internet Solutions Company",
    "Awards Winning Internet Solutions Company",
  ],
  image: "about.jpg",
};

const About = () => {
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
      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 items-center"
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
                <p className="text-gray-600 mb-6 text-sm sm:text-base whitespace-pre-line">
                  {current.desc}
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
