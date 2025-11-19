'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  createBestNetwork,
  getBestNetworkById,
  updateBestNetwork,
} from 'src/api/services/bestNetworks';

const ICON_OPTIONS = ['Wifi', 'Server', 'Satellite', 'RadioTower'];

export default function BestNetworkForm() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'Wifi',
    link: '#',
  });

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  // 🔹 Load existing record when editing
  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          setLoading(true);
          const data = await getBestNetworkById(id);
          setForm({
            title: data.title || '',
            description: data.description || '',
            icon: data.icon || 'Wifi',
            link: data.link || '#',
          });
        } catch {
          alert('Failed to load network');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isEdit]);

  // 🔹 Handle submit CREATE or UPDATE
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEdit) {
        await updateBestNetwork(id, form);
        alert('Updated successfully!');
      } else {
        await createBestNetwork(form);
        alert('Created successfully!');
      }

      router.push('/admin/best-network');
    } catch (error) {
      alert('Something went wrong!');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-lg font-semibold">Loading...</p>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Network' : 'Create New Network'}
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
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
