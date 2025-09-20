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

export default function Home() {
  return (
    <>
     <Navbar />
      {/* <Banner /> */}
      <HeroSlider/>
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
