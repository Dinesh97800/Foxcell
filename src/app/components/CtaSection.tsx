import React from "react";
import { ArrowRight } from "lucide-react";

const BroadbandCta = () => {
  return (
    <section className="relative bg-[#030011] text-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

        {/* LEFT CONTENT */}
        <div>
          <h4 className="text-[#fe8900] font-semibold uppercase tracking-wide mb-3">
            Need Fast & Secure Broadband!
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Use <span className="text-[#fe8900]">Foxcell</span> & The Real
            Network
          </h2>
          <p className="text-gray-300 mb-8">
            Enjoy lightning-fast internet with unmatched stability and security.
            Connect multiple devices, stream in 4K, and experience smooth gaming
            without interruptions — all with Foxcell’s advanced broadband
            solutions.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#fe8900] hover:bg-[#e77a00] text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          
        </div>

        {/* RIGHT IMAGE WITH FRAME */}
        <div className="relative">
          {/* Frame Behind Image */}
          <div className="absolute -top-6 -left-6 w-full h-full border-4 border-[#fe8900] rounded-2xl -z-10"></div>

          {/* Main Image */}
          <img
            src="https://modinatheme.com/html/netband-html/assets/img/banner/02.jpg"
            alt="Broadband Network"
            className="rounded-2xl shadow-xl"
          />

          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#fe8900]/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#fe8900]/30 rounded-full animate-ping"></div>
        </div>
      </div>
    </section>
  );
};

export default BroadbandCta;
