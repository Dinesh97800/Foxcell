"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import About from "../components/Dashboard/about";
import HowWeWork from "../components/Dashboard/HowWeWork";
import { useEffect, useState } from "react";
import Preloader from "../components/UI/Preloader";
import Contact from "../components/Dashboard/contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2 seconds
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
}
