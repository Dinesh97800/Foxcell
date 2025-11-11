"use client";

import { useState, useEffect } from "react";
import HeroSlider from "@/app/components/HeroSlider";
import { AndroidMockup } from "react-device-mockup";
import { createBanner, getBannerById, updateBanner } from "src/api/services/bannerService";
import FancyButton from "@/app/components/UI/Button";
import { log } from "console";
import { useParams } from "next/navigation";

interface Slide {
  id?: number;
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
  sequence?: number;
  status?: string;
}

interface HeroSliderAdminProps {
  slide?: Slide; // Pass the slide object from table list
}

export default function HeroSliderAdmin({ slide }: HeroSliderAdminProps) {
  const params = useParams(); // returns { id: '123' }
  const id = params.id;

  if(!id) {
    return <div className="p-6">Invalid Banner ID</div>;
  }

  const [slides, setSlides] = useState<Slide[]>([
    slide || {
      image: "",
      title: "",
      subtitle: "",
      price: "",
      button: { label: "" },
    },
  ]);

  useEffect (() => {
    if(id) {
      const fetchBanner = async () => {
        try {
          const res = await getBannerById(id);
          setSlides([{
            id: res.id,
            image: res.image_url,
            title: res.title,
            titleColor: res.title_color,
            subtitle:  res.subtitle,
            subtitleColor: res.subtitle_color,
            price: res.price,
            priceColor: res.price_color,
            button: {
              label: res.button_label,
              bgColor: res.button_bg_color,
              textColor: res.button_text_color,
              target_link: res.target_link,
            },
            expiration_date: res.expiration_date,
            sequence: res.sequence,
            status: res.status,
          }]);
        } catch (error) {
          console.error("Failed to fetch banner:", error);
        }
      };
      fetchBanner();
    }
  }, [id]);
  const [activeSlide] = useState(0);
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
      prev.map((s, idx) => {
        if (idx !== activeSlide) return s;

        if (field === "button" && colorField) {
          return { ...s, button: { ...s.button, [colorField]: value } };
        }

        if (field === "button") {
          return { ...s, button: { ...s.button, label: value } };
        }

        return { ...s, [field]: value };
      })
    );
  };

  // Handle Image File Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    handleInputChange("image", url);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentSlide = slides[0];

    if (!currentSlide.image && !selectedFile) {
      alert("Please upload a banner image!");
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("image_url", selectedFile);
    formData.append("title", currentSlide.title);
    formData.append("subtitle", currentSlide.subtitle);
    formData.append("title_color", currentSlide.titleColor || "#ffffff");
    formData.append("subtitle_color", currentSlide.subtitleColor || "#ffffff");
    formData.append("price", currentSlide.price);
    formData.append("price_color", currentSlide.priceColor || "#ffffff");
    formData.append("button_label", currentSlide.button.label);
    formData.append("button_bg_color", currentSlide.button.bgColor || "#fe8900");
    formData.append("button_text_color", currentSlide.button.textColor || "#ffffff");
    formData.append("target_link", currentSlide.button.target_link || "");
    formData.append("expiration_date", currentSlide.expiration_date || "");
    formData.append("sequence", (currentSlide.sequence || 1).toString());
    formData.append("status", currentSlide.status || "active");

    try {
      if (currentSlide.id) {
        await updateBanner(currentSlide.id, formData);
        alert("Slide updated successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Operation failed. Check console.");
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">
        {slides[0].id ? "Edit Slide" : "Create Slide"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-6"
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Slide Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {slides[0].image && (
            <img
              src={`/uploads/banners/${slides[0].image}`}
              alt="preview"
              className="w-64 h-32 object-cover mt-2"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={slides[0].title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={slides[0].titleColor || "#ffffff"}
              onChange={(e) => handleInputChange("titleColor", e.target.value)}
            />
            <input
              type="text"
              value={slides[0].titleColor || "#ffffff"}
              onChange={(e) => handleInputChange("titleColor", e.target.value)}
              className="border px-2 py-1 rounded w-24"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-semibold mb-1">Subtitle</label>
          <input
            type="text"
            value={slides[0].subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={slides[0].subtitleColor || "#ffffff"}
              onChange={(e) => handleInputChange("subtitleColor", e.target.value)}
            />
            <input
              type="text"
              value={slides[0].subtitleColor || "#ffffff"}
              onChange={(e) => handleInputChange("subtitleColor", e.target.value)}
              className="border px-2 py-1 rounded w-24"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="text"
            value={slides[0].price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={slides[0].priceColor || "#ffffff"}
              onChange={(e) => handleInputChange("priceColor", e.target.value)}
            />
            <input
              type="text"
              value={slides[0].priceColor || "#ffffff"}
              onChange={(e) => handleInputChange("priceColor", e.target.value)}
              className="border px-2 py-1 rounded w-24"
            />
          </div>
        </div>

        {/* Button Settings */}
        <div>
          <label className="block font-semibold mb-1">Button Label</label>
          <input
            type="text"
            value={slides[0].button.label}
            onChange={(e) => handleInputChange("button", e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2"
          />

          <label className="block font-semibold mb-1">Target Link</label>
          <input
            type="text"
            value={slides[0].button.target_link || ""}
            onChange={(e) => handleInputChange("button", e.target.value, "target_link")}
            className="w-full border px-3 py-2 rounded"
          />

          <label className="block font-semibold mb-1 mt-3">Expiration Date</label>
          <input
            type="date"
            value={slides[0].expiration_date || ""}
            onChange={(e) => handleInputChange("expiration_date", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4">
          <FancyButton action="submit">{slides[0].id ? "Update Slide" : "Create Slide"}</FancyButton>
          <button
            type="button"
            onClick={() => setDesktopPreview(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Desktop Preview
          </button>
          <button
            type="button"
            onClick={() => setMobilePreview(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Mobile Preview
          </button>
        </div>
      </form>

      {/* Preview Modals */}
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
            <h2 className="text-xl font-semibold mb-4 text-center">Mobile Preview</h2>
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
