/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How fast is Foxcell?',
    a: 'Our plans start from 50 Mbps up to 500 Mbps depending on your package.',
  },
  {
    q: 'Is there a data limit?',
    a: 'No, all plans come with unlimited data usage.',
  },
  {
    q: 'Do you provide customer support?',
    a: 'Yes, our team is available 24/7 to assist you.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((f, i) => (
          <div key={i} className="mb-4 border rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 font-semibold text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {f.q}
              <span>{openIndex === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 text-gray-600"
                >
                  {f.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
