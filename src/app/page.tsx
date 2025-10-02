"use client";

import BestNetwork from "@/app/components/BestNetwork";
import Brands from "@/app/components/Brands";
import BroadbandCta from "@/app/components/CtaSection";
import FaqSection from "@/app/components/Faq";
import FeatureTabs from "@/app/components/Features";
import Footer from "@/app/components/Footer";
import HeroSlider from "@/app/components/HeroSlider";
import LiveSports from "@/app/components/LiveSports";
import Navbar from "@/app/components/Navbar";
import PricingPlans from "@/app/components/Pricing";
import Image from "next/image";
import { useEffect, useState } from "react";
import Preloader from "./components/UI/Preloader";
import { usePathname } from "next/navigation";

const slides = [
  {
    image: "./banner1.png",
    title: "Get Fast Internet Solution",
    price: "$99 / Month",
    subtitle: "Ultra Fast internet",
  },
  {
    image:
      "https://modinatheme.com/html/netband-html/assets/img/hero/hero-2.jpg",
    title: "Unlimited Entertainment",
    price: "$79 / Month",
    subtitle: "Internet + TV + More",
  },
  {
    image:
      "https://modinatheme.com/html/netband-html/assets/img/hero/hero-3.jpg",
    title: "Stay Connected Everywhere",
    price: "$59 / Month",
    subtitle: "Reliable & Affordable",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // useEffect(() => {
  //   // Hide loader after 2 seconds
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    // Only show loader if NOT contact-us or about
    if (pathname !== "/contact-us" && pathname !== "/about") {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [pathname]);
  
  if (loading) return <Preloader />;

  return (
    <>
      {/* <Banner /> */}
      <Navbar />
      <HeroSlider slides={slides} />
      <FeatureTabs />
      {/* <About /> */}
      <BestNetwork />
      <LiveSports />
      <BroadbandCta />
      <Brands />
      <PricingPlans />
      <FaqSection />
      <Footer />
    </>
  );
}
