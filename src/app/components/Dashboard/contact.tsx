'use client';

import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FancyButton from '../UI/Button';
import {
  getmetaValues,
  submitContactForm,
} from 'src/api/services/contactService';

const iconMap: any = {
  'Nodal officer': (
    <FaMapMarkerAlt className="mt-1 text-xl" style={{ color: '#fe8900' }} />
  ),
  Location: (
    <FaMapMarkerAlt className="mt-1 text-xl" style={{ color: '#fe8900' }} />
  ),
  Phone: <FaPhoneAlt className="mt-1 text-xl" style={{ color: '#fe8900' }} />,
  Email: <FaEnvelope className="mt-1 text-xl" style={{ color: '#fe8900' }} />,
};

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm(form);
      setSuccess('Thank you! We will contact you soon.');

      // Reset form
      setForm({
        name: '',
        email: '',
        message: '',
        phone: '',
      });
    } catch (error) {
      alert('Something went wrong! Try again later.');
    } finally {
      setLoading(false);
    }
  };
  const [meta, setMeta] = useState<any>({});

  const fetch = async () => {
    const data = await getmetaValues({
      value: [1, 2, 3, 4],
    });
    setMeta(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const getSingleValue = (id: number) => {
    if (!meta[id]) return '';
    return meta[id].data[0]?.value || '';
  };

  const getMultipleValues = (id: number) => {
    if (!meta[id]) return [];
    return meta[id].data.map((d: any) => ({
      name: d.name,
      value: d.value,
    }));
  };

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
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
          </p>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <FaMapMarkerAlt
                className="mt-1 text-xl"
                style={{ color: "#fe8900" }}
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
                className="mt-1 text-xl"
                style={{ color: "#fe8900" }}
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
                className="mt-1 text-xl"
                style={{ color: "#fe8900" }}
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
                className="mt-1 text-xl"
                style={{ color: "#fe8900" }}
              />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>bishwesh@foxcell.net</p>
                <span>Support:</span>
                <p>support@foxcell.net</p>
              </div>
            </motion.div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            {Object.values(meta).map((item: any) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition"
              >
                {/* ICON */}
                {iconMap[item.type]}

                <div>
                  <h4 className="font-semibold">{item.type}</h4>

                  {item.data.map((entry: any, idx: number) => (
                    <div key={idx}>
                      {entry.name && (
                        <span className="font-semibold">{entry.name}: </span>
                      )}
                      <p>{entry.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
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

          {success && (
            <p className="text-green-600 font-semibold mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Your Name*</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your Name"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address*</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Email Address"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone*</label>
              <input
                type="phone"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Phone Number"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Enter Your Message*
              </label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Your Message"
                className="w-full border-b border-gray-300 focus:border-[#fe8900] outline-none py-2 resize-none transition"
                rows={4}
                required
              />
            </div>

            <FancyButton
              children={loading ? 'Submitting...' : 'Get In Touch'}
              disabled ={
                loading ? true: false
              }
              isFullWidth="w-full"
              action="submit"
            />
          </form>
        </motion.div>
      </section>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-[400px] md:h-[500px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </motion.div>
    </>
  );
};

export default Contact;
