'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from 'src/api/apiClient';

export type Testimonial = {
  id: number;
  name: string;
  content: string;
  image: string | null;
  created_at: Date | null;
};

export default function TestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTestimonials() {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Error fetching testimonials', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => router.push('/admin/testimonials/edit')}
        >
          Add New
        </button>
      </div>

      {testimonials.length === 0 ? (
        <p>No testimonials found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Content</th>
              <th className="border px-4 py-2 text-left">Image</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td className="border px-4 py-2">{t.name}</td>
                <td className="border px-4 py-2 max-w-xs">
                  <p className="line-clamp-2 text-sm text-gray-700">
                    {t.content}
                  </p>
                </td>

                <td className="border px-4 py-2">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="bg-blue-500 px-3 py-1 text-white rounded"
                      onClick={() =>
                        router.push(`/admin/testimonials/edit?id=${t.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 text-white rounded"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
