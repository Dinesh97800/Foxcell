"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FancyButton from "./UI/Button";

interface Slide {
  image: string;
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor?: string;
  price: string;
  priceColor?: string;
  button?: {
    label: string;
    bgColor?: string;
    textColor?: string;
    target_link?: string;
  };
}

interface HeroSliderProps {
  slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  return (
    <section className="relative w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
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

              {/* Text content */}
              <div className="relative container mx-auto px-6 md:px-12 z-10">
                <div className="text-left max-w-2xl">
                  <h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
                    style={{ color: slide.titleColor || "#ffffff" }}
                  >
                    {slide.title}
                  </h1>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: slide.priceColor || "#ffffff" }}
                    >
                      {slide.price.split(" ")[0]}
                    </span>
                    <span
                      className="text-lg"
                      style={{ color: slide.priceColor || "#ffffff" }}
                    >
                      {slide.price.split(" ").slice(1).join(" ")}
                    </span>
                  </div>

                  <p
                    className="mt-2"
                    style={{ color: slide.subtitleColor || "#ffffff" }}
                  >
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  {slide?.button && (
                    <div className="mt-8">
                      <FancyButton
                        color={slide.button.bgColor || "#fe8900"}
                        textColor={slide.button.textColor || "#ffffff"}
                        action={slide?.button?.target_link ?? ""}
                      >
                        {slide.button.label}
                      </FancyButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
