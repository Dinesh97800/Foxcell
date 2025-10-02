"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FancyButton from "./UI/Button";

export default function HeroSlider({ slides }) {
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
                  <p
                    className="text-brand font-semibold text-lg"
                    style={{ color: slide.titleColor || "#ffffff" }}
                  >
                    Best Solution
                  </p>
                  <h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
                    style={{ color: slide.titleColor || "#ffffff" }}
                  >
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
                  <p
                    className="mt-2"
                    style={{ color: slide.subtitleColor || "#ffffff" }}
                  >
                    {slide.subtitle}
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-8 flex items-center gap-6">
                    <FancyButton>Explore More →</FancyButton>
                    <button
                      className="flex items-center gap-2 hover:text-brand transition relative z-20"
                      style={{
                        color:
                          slide?.buttons?.length > 1
                            ? slide.buttons[1].bgColor
                            : "#ffffff",
                      }}
                    >
                      Read more
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
