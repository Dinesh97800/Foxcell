"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function FeatureForm({ isEdit = false }: { isEdit?: boolean }) {
  const router = useRouter();
  const { id } = useParams();
  console.log(id)
  const [form, setForm] = useState({
    tab_id: "",
    title: "",
    icon: "",
    heading: "",
    description: "",
    stats: [{ value: "", label: "" }],
    list: [""],
  });
  const [image, setImage] = useState<File | null>(null);

  // Load existing data if editing

  useEffect(() => {
    fetch(`http://localhost:5000/feature-tabs/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);


  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...form.stats];
    newStats[index][field] = value;
    setForm({ ...form, stats: newStats });
  };

  const handleListChange = (index: number, value: string) => {
    const newList = [...form.list];
    newList[index] = value;
    setForm({ ...form, list: newList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "stats" || k === "list") data.append(k, JSON.stringify(v));
      else data.append(k, v as string);
    });
    if (image) data.append("image", image);

    const url = id
      ? `http://localhost:5000/feature-tabs/${id}`
      : "http://localhost:5000/feature-tabs";
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, { method, body: data });
    if (res.ok) router.push("/admin/Features");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        {id ? "Edit Feature" : "Create Feature"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="tab_id" placeholder="Tab ID (e.g. tv)" className="w-full border p-2 rounded"
          value={form.tab_id} onChange={(e) => setForm({ ...form, tab_id: e.target.value })} />
        <input name="title" placeholder="Title" className="w-full border p-2 rounded"
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input name="icon" placeholder="Icon (e.g. Tv, Wifi, Smartphone)" className="w-full border p-2 rounded"
          value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <input name="heading" placeholder="Heading" className="w-full border p-2 rounded"
          value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded"
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

        {/* Stats Section */}
        <div>
          <h3 className="font-semibold">Stats</h3>
          {form.stats.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Value (e.g. 88%)" className="border p-2 w-1/3"
                value={s.value} onChange={(e) => handleStatChange(i, "value", e.target.value)} />
              <input placeholder="Label" className="border p-2 w-2/3"
                value={s.label} onChange={(e) => handleStatChange(i, "label", e.target.value)} />
            </div>
          ))}
          <button type="button" className="text-blue-600" onClick={() =>
            setForm({ ...form, stats: [...form.stats, { value: "", label: "" }] })
          }>+ Add Stat</button>
        </div>

        {/* List Section */}
        <div>
          <h3 className="font-semibold">List</h3>
          {form.list.map((item, i) => (
            <input key={i} placeholder={`List item ${i + 1}`} className="w-full border p-2 mb-2"
              value={item} onChange={(e) => handleListChange(i, e.target.value)} />
          ))}
          <button type="button" className="text-blue-600" onClick={() =>
            setForm({ ...form, list: [...form.list, ""] })
          }>+ Add List Item</button>
        </div>

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
