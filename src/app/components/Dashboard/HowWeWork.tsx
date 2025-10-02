"use client";

import { Briefcase, Rocket, Users, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

const steps = [
  {
    icon: Briefcase,
    title: "Business Planning",
    desc: "We create structured strategies tailored to your startup.",
  },
  {
    icon: Rocket,
    title: "Launch Support",
    desc: "Get the right guidance and tools to kickstart your venture.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "We connect you with experts to accelerate growth.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Growth",
    desc: "Helping you scale and sustain your startup for success.",
  },
];

// ✅ FIXED variants
const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2, // only stagger here
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }, // timing for each child
  },
};

export default function HowWeWork() {
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          How do we work to help you in <br />
          <span className="text-[#fe8900]">Startup Business</span>
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover="hover"
              className="relative group bg-white shadow-lg rounded-2xl p-6 overflow-hidden cursor-pointer"
            >
              {/* Curtain Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#fe8900] to-[#4f46e5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon with flip effect */}
                <motion.div
                  variants={{
                    hover: { rotateY: 180 },
                    initial: { rotateY: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-[#fe8900] group-hover:bg-white"
                >
                  <step.icon size={32} />
                </motion.div>

                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white transition">
                  {step.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 transition">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
