"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteBannerById, getBanners } from "src/api/services/bannerService";
import { useRouter } from "next/navigation";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  title_color?: string;
  subtitle_color?: string;
  price: string;
  price_color?: string;
  image_url: string;
  button_label?: string;
  button_bg_color?: string;
  button_text_color?: string;
  target_link?: string;
  sequence: number;
  status: string;
}

export default function AdminSlidersPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await getBanners(); // Replace with your API
      setSlides(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      await deleteBannerById(id);
      await fetchSlides();
    } catch (err) {
      console.error(err);
    }
  };
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Sliders</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => router.push("/admin/Banner/create")}
      >
        Create Slide
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Subtitle</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr key={slide.id} className="text-center">
                  <td className="p-2 border">{slide.id}</td>
                  <td className="p-2 border">{slide.title}</td>
                  <td className="p-2 border">{slide.subtitle}</td>
                  <td className="p-2 border">{slide.price}</td>
                  <td className="p-2 border">
                    <img
                      src={`/uploads/banners/${slide.image_url}`}
                      alt={slide.title}
                      className="w-24 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="p-2 border">{slide.status}</td>
                  <td className="p-2 border flex justify-center gap-2">
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => router.push(`/admin/Banner/${slide.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleDelete(slide.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {slides.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    No slides found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
