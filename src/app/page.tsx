"use client";

import BestNetwork from "@/app/components/BestNetwork";
import Brands from "@/app/components/Brands";
import BroadbandCta from "@/app/components/CtaSection";
import FaqSection from "@/app/components/Faq";
import FeatureTabs from "@/app/components/Features";
import Footer from "@/app/components/Footer";
import HeroSlider from "@/app/components/HeroSlider";
import FeatureShowcaseSection from "@/app/components/FeatureShowcaseSection";
import Navbar from "@/app/components/Navbar";
import PricingPlans from "@/app/components/Pricing";
import { useEffect, useState } from "react";
import Preloader from "./components/UI/Preloader";
import { usePathname } from "next/navigation";
import { getBanners } from "src/api/services/bannerService";

// const slides = [
//   {
//     image: "./banner1.png",
//     title: "Get Fast Internet Solution",
//     price: "$99 / Month",
//     subtitle: "Ultra Fast internet",
//     button: {
//       label: "Explore More →",
//       bgColor: "#fe8900",
//       textColor: "#ffffff",
//     },
//   },
//   {
//     image:
//       "https://modinatheme.com/html/netband-html/assets/img/hero/hero-2.jpg",
//     title: "Unlimited Entertainment",
//     price: "$79 / Month",
//     subtitle: "Internet + TV + More",
//   },
//   {
//     image:
//       "https://modinatheme.com/html/netband-html/assets/img/hero/hero-3.jpg",
//     title: "Stay Connected Everywhere",
//     price: "$59 / Month",
//     subtitle: "Reliable & Affordable",
//   },
// ];

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // useEffect(() => {
  //   // Hide loader after 2 seconds
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const [slides, setSlides] = useState<any[]>([]);

  const fetch = async () => {
    const banner = await getBanners();
    const bannerSlides = banner.map((item: any) => ({
      image: `${BASE_URL}/uploads/banners/${item.image_url}`,
      title: item.title,
      titleColor: item.title_color,
      subtitle: item.subtitle,
      subtitleColor: item.subtitle_color,
      price: item.price,
      priceColor: item.price_color,
      button: {
        label: item.button_label,
        bgColor: item.button_bg_color,
        textColor: item.button_text_color,
        target_link: item.target_link,
      },
    }));
    setSlides(bannerSlides);
  };

  useEffect(() => {
    fetch();
  }, []);

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
      <FeatureShowcaseSection/>
      <BroadbandCta />
      <Brands />
      <PricingPlans />
      <FaqSection />
      <Footer />
    </>
  );
}
