// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <motion.section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-[#d6111e] to-[#4f46e5] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Fast & Secure Broadband
      </motion.h1>

      <motion.p
        className="mb-6 max-w-xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Experience lightning-fast internet with Foxcell. Stay connected, stream
        endlessly, and enjoy real network speed.
      </motion.p>
      <motion.button
        className="bg-white text-[#2563eb] px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Plans
      </motion.button>
    </motion.section>
  );
}
