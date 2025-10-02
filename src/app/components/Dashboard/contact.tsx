import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaVimeoV,
  FaPinterestP,
} from "react-icons/fa";
import { motion } from "framer-motion";
import FancyButton from "../UI/Button";

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="bg-[url('/your-bg.jpg')] bg-cover bg-center relative h-[50vh] md:h-[70vh]">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 flex items-center justify-start h-full px-6 md:px-20">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold leading-snug"
            >
              Contact Us
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-red-600 font-semibold uppercase text-sm">
            Get in Touch
          </p>
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-gray-600">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque
            inventore.
          </p>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <FaMapMarkerAlt
                className="mt-1 text-red-600 text-xl"
                style={{
                  color: "#fe8900",
                }}
              />
              <div>
                <h4 className="font-semibold">Nodal officer</h4>
                <p>Mr. Bishwesh Kumar Singh</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <FaMapMarkerAlt
                className="mt-1 text-red-600 text-xl"
                style={{
                  color: "#fe8900",
                }}
              />
              <div>
                <h4 className="font-semibold">Location</h4>
                <p>55 Main street, 2nd block, Melbourne, Australia</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <FaPhoneAlt
                className="mt-1 text-red-600 text-xl"
                style={{
                  color: "#fe8900",
                }}
              />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+91 80549 85716</p>
                <span>Support:</span>
                <p>0172-4600089</p>
                <p>+98175-98174</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <FaEnvelope
                className="mt-1 text-red-600 text-xl"
                style={{
                  color: "#fe8900",
                }}
              />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>bishwesh@foxcell.net</p>
                <span>Support:</span>
                <p>support@foxcell.net</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 p-8 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-semibold mb-2">Fill Up The Form</h3>
          <p className="text-gray-600 mb-6">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Your Name*</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address*</label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Enter Your Message
              </label>
              <textarea
                placeholder="Your Message"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 resize-none transition"
                rows={4}
              />
            </div>

            {/* <button
              type="submit"
              className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center transition"
            >
              Get In Touch
            </button> */}
            <FancyButton
              children="Get In Touch"
              isFullWidth="w-full"
              action="submit"
            ></FancyButton>
          </form>
        </motion.div>
      </section>

      {/* Full-width Map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-[400px] md:h-[500px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109754.92953572572!2d76.7176625689453!3d30.722854622147878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1443448820352"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </>
  );
};

export default Contact;
