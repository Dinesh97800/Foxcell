"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FeatureTab {
  id: number;
  title: string;
  heading: string;
  image_url: string;
}

export default function FeatureList() {
  const [features, setFeatures] = useState<FeatureTab[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/feature-tabs")
      .then((res) => res.json())
      .then(setFeatures)
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;
    const res = await fetch(`http://localhost:5000/feature-tabs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setFeatures(features.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Feature Tabs</h1>
        <button
          onClick={() => router.push("/admin/Features/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Heading</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{feature.id}</td>
              <td className="p-3">{feature.title}</td>
              <td className="p-3">{feature.heading}</td>
              <td className="p-3">
                <img
                  src={`http://localhost:5000${feature.image_url}`}
                  alt={feature.title}
                  className="w-20 h-12 object-cover rounded"
                />
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/Features/${feature.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
