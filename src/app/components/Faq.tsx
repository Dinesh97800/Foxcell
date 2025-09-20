"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What broadband packages are available?",
    answer:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
  {
    question: "How can I find the best broadband deals in my area?",
    answer:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
  {
    question: "Need help to choose the best broadband deal?",
    answer:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
  {
    question: "How to experience the magic of internet?",
    answer:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(1); // open 2nd by default like NetBand

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? 0 : index);
  };

  return (
    <section id="faq" className="relative bg-[#f5f5f8] py-20 overflow-hidden faq-section">
      {/* Floating Shape (Behind Image) */}
      <div className="faq-shape absolute bottom-0 top-80 right-10 hidden xl:block z-0 animate-bounce-slow h-full w-72">
        <img
          src="https://modinatheme.com/html/netband-html/assets/img/faq-shape-1.png"
          alt="Shape"
          className="w-72 opacity-80"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-2xl">
          {/* Section Title */}
          <span className="block text-[#fe8900] font-semibold mb-3">
            Our question & answer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-snug text-[#030011] mb-8">
            Have Any Questions About <br /> Our Foxcell Company
          </h2>

          {/* Accordion */}
          <div className="faq-content">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="accordion-item border border-gray-300 rounded-lg px-6 py-4 mb-4 bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="accordion-button w-full flex justify-between items-center text-left font-semibold text-lg text-[#030011] focus:outline-none"
                >
                  {faq.question}
                  <span
                    className={`ml-4 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                      openIndex === index
                        ? "bg-[#fe8900] text-white"
                        : "bg-[#fe8900] text-white rotate-0"
                    }`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`accordion-collapse transition-all duration-500 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <p className="accordion-body text-gray-600 pr-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
