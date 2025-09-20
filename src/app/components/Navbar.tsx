"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["home", "features", "pricing", "faq"];
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow" : "bg-white shadow"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#fe8900] to-[#4f46e5] bg-clip-text text-transparent">
          Foxcell
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`transition-colors ${
                  activeSection === link.id
                    ? "text-[#fe8900] font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:text-[#fe8900]"
                    : "text-gray hover:text-[#fe8900]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex space-x-8 font-medium">
          <button className="text-gray-700 hover:text-[#fe8900] transition-colors border border-[#fe8900] px-4 py-2 rounded-md">
            Login
          </button>
          <button className="bg-[#fe8900] hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <X size={28} className={scrolled ? "text-gray" : "text-gray"} />
          ) : (
            <Menu
              size={28}
              className={scrolled ? "text-gray-700" : "text-white"}
            />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col items-center space-y-4 py-6 ${
            scrolled ? "bg-white shadow" : "bg-[#2563eb]"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className={`text-lg ${
                activeSection === link.id
                  ? "text-[#2563eb] font-semibold"
                  : scrolled
                  ? "text-gray-700"
                  : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
