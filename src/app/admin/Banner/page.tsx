"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FancyButton from "@/app/components/UI/Button";
import HeroSlider from "@/app/components/HeroSlider";
import { AndroidMockup } from "react-device-mockup";

interface Slide {
  image: string;
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor?: string;
  price: string;
  priceColor?: string;
  buttons: { label: string; bgColor?: string; textColor?: string }[];
}

const initialSlides: Slide[] = [
  {
    image: "./banner1.png",
    title: "Get Fast Internet Solution",
    titleColor: "#ffffff",
    price: "$99 / Month",
    priceColor: "#ffffff",
    subtitle: "Ultra Fast internet",
    subtitleColor: "#ffffff",
    buttons: [
      { label: "Explore More →", bgColor: "#fe8900", textColor: "#ffffff" },
    ],
  },
];

export default function HeroSliderAdmin() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [desktopPreview, setDesktopPreview] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const handleInputChange = (
    field: keyof Slide,
    value: string,
    btnIdx?: number,
    colorField?: "bgColor" | "textColor"
  ) => {
    setSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx !== activeSlide) return slide;

        if (field === "buttons" && btnIdx !== undefined) {
          const updatedButtons = [...slide.buttons];
          if (colorField) updatedButtons[btnIdx][colorField] = value;
          else updatedButtons[btnIdx].label = value;
          return { ...slide, buttons: updatedButtons };
        }

        return { ...slide, [field]: value };
      })
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    handleInputChange("image", url);
  };

  const addButton = () => {
    setSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx !== activeSlide) return slide;
        if (slide.buttons.length >= 2) return slide;
        return {
          ...slide,
          buttons: [...slide.buttons, { label: "New Button" }],
        };
      })
    );
  };

  const removeButton = (btnIdx: number) => {
    setSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx !== activeSlide) return slide;
        const updatedButtons = slide.buttons.filter((_, i) => i !== btnIdx);
        return { ...slide, buttons: updatedButtons };
      })
    );
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">Edit Hero Slider</h2>

      <form className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">
        {/* Image */}
        <div>
          <label className="block font-semibold mb-1">Slide Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={slides[activeSlide].title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={slides[activeSlide].titleColor || "#ffffff"}
              onChange={(e) => handleInputChange("titleColor", e.target.value)}
            />
            <input
              type="text"
              value={slides[activeSlide].titleColor || "#ffffff"}
              onChange={(e) => handleInputChange("titleColor", e.target.value)}
              placeholder="#ffffff"
              className="border px-2 py-1 rounded w-24"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-semibold mb-1">Subtitle</label>
          <input
            type="text"
            value={slides[activeSlide].subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={slides[activeSlide].subtitleColor || "#ffffff"}
              onChange={(e) =>
                handleInputChange("subtitleColor", e.target.value)
              }
            />
            <input
              type="text"
              value={slides[activeSlide].subtitleColor || "#ffffff"}
              onChange={(e) =>
                handleInputChange("subtitleColor", e.target.value)
              }
              placeholder="#ffffff"
              className="border px-2 py-1 rounded w-24"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="text"
            value={slides[activeSlide].price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={slides[activeSlide].priceColor || "#ffffff"}
              onChange={(e) => handleInputChange("priceColor", e.target.value)}
            />
            <input
              type="text"
              value={slides[activeSlide].priceColor || "#ffffff"}
              onChange={(e) => handleInputChange("priceColor", e.target.value)}
              placeholder="#ffffff"
              className="border px-2 py-1 rounded w-24"
            />
          </div>
        </div>

        {/* Buttons */}
        <div>
          <label className="block font-semibold mb-2">Buttons</label>
          {slides[activeSlide].buttons.map((btn, idx) => (
            <div key={idx} className="flex flex-wrap gap-2 items-center mb-2">
              <input
                type="text"
                value={btn.label}
                onChange={(e) =>
                  handleInputChange("buttons", e.target.value, idx)
                }
                className="border px-3 py-2 rounded flex-1 min-w-[120px]"
              />

              {/* Button Background Color */}
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={btn.bgColor || "#fe8900"}
                  onChange={(e) =>
                    handleInputChange("buttons", e.target.value, idx, "bgColor")
                  }
                />
                <input
                  type="text"
                  value={btn.bgColor || "#fe8900"}
                  onChange={(e) =>
                    handleInputChange("buttons", e.target.value, idx, "bgColor")
                  }
                  placeholder="#fe8900"
                  className="border px-2 py-1 rounded w-24"
                />
              </div>

              {/* Button Text Color */}
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={btn.textColor || "#ffffff"}
                  onChange={(e) =>
                    handleInputChange(
                      "buttons",
                      e.target.value,
                      idx,
                      "textColor"
                    )
                  }
                />
                <input
                  type="text"
                  value={btn.textColor || "#ffffff"}
                  onChange={(e) =>
                    handleInputChange(
                      "buttons",
                      e.target.value,
                      idx,
                      "textColor"
                    )
                  }
                  placeholder="#ffffff"
                  className="border px-2 py-1 rounded w-24"
                />
              </div>

              <button
                type="button"
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => removeButton(idx)}
              >
                Remove
              </button>
            </div>
          ))}

          {slides[activeSlide].buttons.length < 2 && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={addButton}
            >
              Add Button
            </button>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setDesktopPreview(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show Desktop Preview
          </button>
          <button
            type="button"
            onClick={() => setMobilePreview(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Show Mobile Preview
          </button>
        </div>
      </form>

      {/* Desktop Modal */}
      {desktopPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-[1024px] w-full max-h-[90vh] overflow-auto p-4 relative">
            <button
              onClick={() => setDesktopPreview(false)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>

            <h2 className="text-xl font-semibold mb-4">Desktop Preview</h2>
            <div className="border shadow-md rounded-lg w-full h-[500px] overflow-hidden">
              <div className="bg-gray-200 h-6 flex items-center px-2 gap-1">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="ml-2 font-mono text-xs">Foxcell</span>
              </div>
              <div className="p-2 w-full h-[calc(100%-24px)] overflow-auto">
                <HeroSlider slides={slides} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {mobilePreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-[600px] w-full max-h-[90vh] overflow-auto p-4 relative">
            <button
              onClick={() => setMobilePreview(false)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>

            <h2 className="text-xl font-semibold mb-4">Mobile Preview</h2>
            <div className="overflow-hidden rounded-lg ">
              <AndroidMockup screenWidth={390}>
                <HeroSlider slides={slides} />
              </AndroidMockup>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
