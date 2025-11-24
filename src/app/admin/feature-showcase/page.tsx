"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { getShowcaseFeatures, updateShowcaseFeatures } from "src/api/services/featureService";

export default function FeatureForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    id: null,
    title: "",
    subtitle: "",
    description: "",
    stats: [],
    tabs: [],
    features: [],
    awards: [],
    progress_label: "",
    progress_value: "",
    image: null as File | null,
    image_url: "",
  });

  /** ===========================
   *  Load Data from API (on mount)
   *  ===========================
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getShowcaseFeatures();

      setForm({
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image_url: data.image_url,

        // If backend returns JSON strings, parse them safely
        stats: typeof data.stats === "string" ? JSON.parse(data.stats) : data.stats || [],
        tabs: typeof data.tabs === "string" ? JSON.parse(data.tabs) : data.tabs || [],
        features:
          typeof data.features === "string"
            ? JSON.parse(data.features)
            : data.features || [],
        awards:
          typeof data.awards === "string"
            ? JSON.parse(data.awards)
            : data.awards || [],

        progress_label: data.progress_label,
        progress_value: data.progress_value,
        image: null,
      });
    };

    fetchData();
  }, []);

  /** ===========================
   *  Helpers
   *  ===========================
   */
  const updateField = (key: string, val: any) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const updateArray = (
    key: string,
    index: number,
    field: string,
    value: string
  ) => {
    const arr = [...form[key]];
    arr[index][field] = value;
    updateField(key, arr);
  };

  const addArrayItem = (key: string, emptyValue: any) => {
    updateField(key, [...form[key], emptyValue]);
  };

  const removeArrayItem = (key: string, index: number) => {
    updateField(
      key,
      form[key].filter((_: any, i: number) => i !== index)
    );
  };

  /** ===========================
   *  Submit Handler
   *  ===========================
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(form).forEach(([key, val]: any) => {
      if (key === "image") {
        if (val) fd.append("image", val);
      } else if (Array.isArray(val)) {
        fd.append(key, JSON.stringify(val));
      } else {
        fd.append(key, val);
      }
    });

    try {
      await updateShowcaseFeatures(form.id, fd);
      alert("Feature Showcase Updated Successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  /** ===========================
   *  UI (same as your version)
   *  ===========================
   */

  return (
    <form
      className="space-y-6 mt-6 max-w-4xl mx-auto px-4 sm:px-6 md:px-8"
      onSubmit={handleSubmit}
    >
      {/* --- BASIC FIELDS --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          className="border p-2 w-full mt-1"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subtitle
        </label>
        <input
          className="border p-2 w-full mt-1"
          value={form.subtitle}
          onChange={(e) => updateField("subtitle", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="border p-2 w-full mt-1"
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      {/* --- IMAGE --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          className="mt-1"
          onChange={(e) => updateField("image", e.target.files?.[0] || null)}
        />

        {form.image_url && (
          <img
            src={form.image_url}
            className="w-40 mt-2 rounded"
            alt="Current Image"
          />
        )}
      </div>

      {/* --- STATS ARRAY --- */}
      <div className="border p-4 mt-6 rounded-lg shadow-sm">
        <h3 className="font-bold mb-2 text-lg">Stats</h3>

        {form.stats.map((item: any, i: number) => (
          <div key={i} className="flex gap-3 mb-4 flex-wrap">
            <input
              className="border p-2 w-full sm:w-1/2 lg:w-1/3"
              placeholder="Value"
              value={item.value}
              onChange={(e) => updateArray("stats", i, "value", e.target.value)}
            />
            <input
              className="border p-2 w-full sm:w-1/2 lg:w-1/3"
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateArray("stats", i, "label", e.target.value)}
            />

            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
              onClick={() => removeArrayItem("stats", i)}
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          onClick={() => addArrayItem("stats", { value: "", label: "" })}
        >
          + Add Stat
        </button>
      </div>

      {/* --- TABS --- */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Tabs (comma separated)
        </label>
        <input
          className="border p-2 w-full mt-1"
          value={form.tabs.join(",")}
          onChange={(e) => updateField("tabs", e.target.value.split(","))}
        />
      </div>

      {/* --- FEATURES --- */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Features (comma separated)
        </label>
        <input
          className="border p-2 w-full mt-1"
          value={form.features.join(",")}
          onChange={(e) => updateField("features", e.target.value.split(","))}
        />
      </div>

      {/* --- AWARDS --- */}
      <div className="border p-4 mt-6 rounded-lg shadow-sm">
        <h3 className="font-bold mb-2 text-lg">Awards</h3>

        {form.awards.map((award: any, i: number) => (
          <div key={i} className="flex gap-3 mb-4 flex-wrap">
            <select
              value={award.icon}
              onChange={(e) => updateArray("awards", i, "icon", e.target.value)}
              className="border p-2 w-full sm:w-1/2 lg:w-1/3"
            >
              <option value="award">Award</option>
              <option value="headphones">Headphones</option>
            </select>

            <input
              className="border p-2 w-full sm:w-1/2 lg:w-1/3"
              placeholder="Label"
              value={award.label}
              onChange={(e) => updateArray("awards", i, "label", e.target.value)}
            />

            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
              onClick={() => removeArrayItem("awards", i)}
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          onClick={() => addArrayItem("awards", { icon: "award", label: "" })}
        >
          + Add Award
        </button>
      </div>

      {/* --- PROGRESS --- */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Progress Label
        </label>
        <input
          className="border p-2 w-full mt-1"
          value={form.progress_label}
          onChange={(e) => updateField("progress_label", e.target.value)}
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Progress Value (%)
        </label>
        <input
          type="number"
          className="border p-2 w-full mt-1"
          value={form.progress_value}
          onChange={(e) => updateField("progress_value", e.target.value)}
        />
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-6 w-full sm:w-auto">
        Save
      </button>
    </form>
  );
}
