import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import FancyButton from './UI/Button';
import api from 'src/api/apiClient';
import { Testimonial } from '../admin/testimonials/page';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import CountUp from 'src/utils/CountUp';

const BroadbandCta = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const [shouldStartCounter, setShouldStartCounter] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStartCounter(true);
          observer.disconnect(); // Only run once
        }
      },
      { threshold: 0.4 } // 40% visible
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const [slidesPerPage, setSlidesPerPage] = useState(1);
  const pageCount = Math.ceil(testimonials.length / slidesPerPage);
  const activePage = Math.floor(activeIndex / slidesPerPage);

  useEffect(() => {
    const updateSlidesPerPage = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;

      if (width >= 1024) setSlidesPerPage(3); // lg: 3 cards
      else if (width >= 768) setSlidesPerPage(2); // md: 2 cards
      else setSlidesPerPage(1); // mobile: 1 card
    };

    updateSlidesPerPage();
    window.addEventListener('resize', updateSlidesPerPage);
    return () => window.removeEventListener('resize', updateSlidesPerPage);
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Error fetching testimonials', err);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background with overlay */}
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-[url('/your-bg.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 text-center py-20 px-4 md:py-32">
            <h1 className="text-white text-2xl md:text-4xl font-bold leading-snug">
              Need Fast & Secure Broadband! <br className="hidden md:block" />
              Use Netband & The Real Network
            </h1>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
              <FancyButton disabled={false}>View Our Plans</FancyButton>
              <button className="bg-white text-black px-6 py-3 rounded-md">
                +1718-904-4450
              </button>
            </div>
          </div>
        </div>

        {/* Red Info Bar (overlapping) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] z-20 bg-[#fe8900] w-[95%] sm:w-11/12 md:w-10/12 grid grid-cols-2 md:grid-cols-4 text-center text-white py-6 rounded-md shadow-lg">
          <div className="px-2">
            <CountUp end={20} suffix="+"  />
            <p className="text-xs md:text-sm uppercase">Years of Experience</p>
          </div>
          <div className="px-2">
            <CountUp end={220} suffix="k" />
            <p className="text-xs md:text-sm uppercase">Clients in the World</p>
          </div>
          <div className="px-2">
            <CountUp end={25} suffix="k" />

            <p className="text-xs md:text-sm uppercase">Kilometers of Fibers</p>
          </div>
          <div className="px-2">
            <CountUp end={991} suffix="+" />
            <p className="text-xs md:text-sm uppercase">Satellite Channels</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white text-black pt-28 md:pt-32 pb-16 px-4 md:px-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#fe8900] font-semibold uppercase text-xs md:text-sm tracking-wider">
            Trusted Clients Feedback
          </p>
          <h2 className="text-xl md:text-3xl font-bold mt-2 leading-snug">
            Why People Say About Our Business Services
          </h2>
        </div>

        {/* Testimonials Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"> */}
        <Swiper
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          onSwiper={(s) => setSwiper(s)}
          modules={[Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white shadow-md p-6 border rounded-md relative">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-6 h-6 text-[#fe8900]" />

                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image || '/default-user.jpg'}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {item.content}
                </p>

                {/* Date */}
                <div className="bg-[#fe8900] text-white text-center py-2 text-xs font-semibold">
                  {item.created_at &&
                    new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dots for Carousel */}
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: pageCount }).map((_, pageIndex) => (
            <span
              key={pageIndex}
              onClick={() => swiper?.slideToLoop(pageIndex * slidesPerPage)}
              className={`w-3 h-3 rounded-full cursor-pointer transition 
        ${activePage === pageIndex ? 'bg-red-600' : 'bg-gray-300'}
      `}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BroadbandCta;
