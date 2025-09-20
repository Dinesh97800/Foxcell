"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FancyButton from "./UI/Button";

const slides = [
  {
    image:
      "https://modinatheme.com/html/netband-html/assets/img/hero/hero-1.jpg",
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

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-full relative flex items-center">
              {/* Background with overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-[#030011] opacity-75"></div>
              </div>

              {/* Text above overlay */}
              <div className="relative container mx-auto px-6 md:px-12 z-10">
                <div className="text-left max-w-2xl">
                  <p className="text-brand font-semibold text-white text-lg">
                    Best Solution
                  </p>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {slide.price.split(" ")[0]}
                    </span>
                    <span className="text-white text-lg">
                      {slide.price.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-200">{slide.subtitle}</p>

                  {/* CTA Buttons */}
                  <div className="mt-8 flex items-center gap-6">
                    <FancyButton>Explore More →</FancyButton>
                    <button className="flex items-center gap-2 text-white hover:text-brand transition relative z-20">
                      <span className="w-12 h-12 rounded-full border-2 border-brand flex items-center justify-center">
                        ▶
                      </span>
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
