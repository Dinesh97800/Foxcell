"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const ICON_OPTIONS = ["Wifi", "Server", "Satellite", "RadioTower"];

export default function BestNetworkForm() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "Wifi",
    link: "#",
  });

  useEffect(() => {
    if (isEdit) {
    //   getBestNetworkById(id).then((data) => setForm(data));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if (isEdit) await updateBestNetwork(id, form);
    // else await createBestNetwork(form);
    router.push("/admin/best-network");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Network" : "Create New Network"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="w-full border p-2 rounded"
        >
          {ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
