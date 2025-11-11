"use client";

import { useState } from "react";
import HeroSlider from "@/app/components/HeroSlider";
import { AndroidMockup } from "react-device-mockup";
import { createBanner } from "src/api/services/bannerService";
import FancyButton from "@/app/components/UI/Button";

interface Slide {
  image: string;
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor?: string;
  price: string;
  priceColor?: string;
  button: {
    label: string;
    bgColor?: string;
    textColor?: string;
    target_link?: string;
  };
  expiration_date?: string;
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
    button: {
      label: "Explore More →",
      bgColor: "#fe8900",
      textColor: "#ffffff",
    },
  },
];

export default function HeroSliderAdmin() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);

  // Handle Input Changes
  const handleInputChange = (
    field: keyof Slide,
    value: string,
    colorField?: "bgColor" | "textColor" | "target_link"
  ) => {
    setSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx !== activeSlide) return slide;

        if (field === "button" && colorField) {
          return { ...slide, button: { ...slide.button, [colorField]: value } };
        }

        if (field === "button") {
          return { ...slide, button: { ...slide.button, label: value } };
        }

        return { ...slide, [field]: value };
      })
    );
  };

  // ✅ Handle Image File Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }

    const img = new Image();
    img.onload = () => {
      if (img.width < 1920 || img.height < 1080) {
        alert("⚠️ Image is too small! Recommended: 1920x1080px");
      }
    };
    img.src = URL.createObjectURL(file);

    const url = URL.createObjectURL(file);
    handleInputChange("image", url);
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please upload a banner image!");
      return;
    }

    console.log({ selectedFile });

    const slide = slides[0];
    const formData = new FormData();
    formData.append("image_url", selectedFile);
    formData.append("title", slide.title);
    formData.append("subtitle", slide.subtitle);
    formData.append("title_color", slide.titleColor || "#ffffff");
    formData.append("subtitle_color", slide.subtitleColor || "#ffffff");
    formData.append("price", slide.price);
    formData.append("price_color", slide.priceColor || "#ffffff");
    formData.append("button_label", slide.button.label);
    formData.append("button_bg_color", slide.button.bgColor || "#fe8900");
    formData.append("button_text_color", slide.button.textColor || "#ffffff");
    formData.append("target_link", slide.button.target_link || "");
    formData.append("expiration_date", slide.expiration_date || "");
    formData.append("sequence", "1");
    formData.append("status", "active");

    try {
      const res = await createBanner(formData); // ✅ send FormData, not slide object
      console.log("✅ Banner created:", res);
      alert("Banner created successfully!");
    } catch (error) {
      console.error("❌ Banner creation failed:", error);
      alert("Banner creation failed! Check console.");
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">Create Hero Slider</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-6"
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Slide Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Recommended: 1920 × 1080 px (Landscape)
          </p>
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
              onChange={(e) => handleInputChange("subtitleColor", e.target.value)}
            />
            <input
              type="text"
              value={slides[activeSlide].subtitleColor || "#ffffff"}
              onChange={(e) => handleInputChange("subtitleColor", e.target.value)}
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

        {/* Button Settings */}
        <div>
          <label className="block font-semibold mb-1">Button Label</label>
          <input
            type="text"
            value={slides[activeSlide].button.label}
            onChange={(e) => handleInputChange("button", e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2"
          />

          <label className="block font-semibold mb-1">Target Link</label>
          <input
            type="text"
            value={slides[activeSlide].button.target_link || ""}
            onChange={(e) =>
              handleInputChange("button", e.target.value, "target_link")
            }
            placeholder="https://example.com"
            className="w-full border px-3 py-2 rounded"
          />

          <label className="block font-semibold mb-1 mt-3">
            Expiration Date
          </label>
          <input
            type="date"
            value={slides[activeSlide].expiration_date || ""}
            onChange={(e) =>
              handleInputChange("expiration_date", e.target.value)
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4">
          <FancyButton action="submit">Save Slide</FancyButton>
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

      {/* ✅ Preview Components unchanged */}
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
              <HeroSlider slides={slides} />
            </div>
          </div>
        </div>
      )}

      {mobilePreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-[600px] w-full max-h-[90vh] overflow-auto p-4 relative shadow-lg">
            <button
              onClick={() => setMobilePreview(false)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Mobile Preview
            </h2>
            <div className="flex-1 flex items-center justify-center overflow-auto py-4">
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
