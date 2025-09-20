import React from "react";
import { Quote } from "lucide-react";
import FancyButton from "./UI/Button";

const BroadbandCta = () => {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background with overlay */}
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-[url('/your-bg.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 text-center py-20 px-4 md:py-32">
            <h1 className="text-white text-2xl md:text-4xl font-bold leading-snug">
              Need Fast & Secure Broadband! <br className="hidden md:block" />
              Use Netband & The Real Network
            </h1>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
              <FancyButton>View Our Plans</FancyButton>
              <button className="bg-white text-black px-6 py-3 rounded-md">
                +1718-904-4450
              </button>
            </div>
          </div>
        </div>

        {/* Red Info Bar (overlapping) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] z-20 bg-[#fe8900] w-[95%] sm:w-11/12 md:w-10/12 grid grid-cols-2 md:grid-cols-4 text-center text-white py-6 rounded-md shadow-lg">
          <div className="px-2">
            <h2 className="text-xl md:text-2xl font-bold">20+</h2>
            <p className="text-xs md:text-sm uppercase">Years of Experience</p>
          </div>
          <div className="px-2">
            <h2 className="text-xl md:text-2xl font-bold">220k</h2>
            <p className="text-xs md:text-sm uppercase">Clients in the World</p>
          </div>
          <div className="px-2">
            <h2 className="text-xl md:text-2xl font-bold">25k</h2>
            <p className="text-xs md:text-sm uppercase">Kilometers of Fibers</p>
          </div>
          <div className="px-2">
            <h2 className="text-xl md:text-2xl font-bold">991</h2>
            <p className="text-xs md:text-sm uppercase">Satellite Channels</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white text-black pt-28 md:pt-32 pb-16 px-4 md:px-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#fe8900] font-semibold uppercase text-xs md:text-sm tracking-wider">
            Trusted Clients Feedback
          </p>
          <h2 className="text-xl md:text-3xl font-bold mt-2 leading-snug">
            Why People Say About Our Business Services
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white shadow-md p-6 border rounded-md relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-5 h-5 md:w-6 md:h-6 text-[#fe8900]" />

              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://randomuser.me/api/portraits/men/${
                    item + 30
                  }.jpg`}
                  alt="Client"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm md:text-base">
                    Leslie Alexander
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Graphics Design
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <p className="text-gray-600 text-xs md:text-sm mb-6 leading-relaxed">
                Creative agency, we believe in the Eid and innovation. We are
                constantly melt of what is possible, and strive to cat only be
                useful and effective.
              </p>

              {/* Date */}
              <div className="bg-[#fe8900] text-white text-center py-2 text-xs md:text-sm font-semibold">
                January 23, 2024
              </div>
            </div>
          ))}
        </div>

        {/* Dots for Carousel */}
        <div className="flex justify-center mt-10 gap-2">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-600 rounded-full"></span>
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-300 rounded-full"></span>
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </section>
  );
};

export default BroadbandCta;
