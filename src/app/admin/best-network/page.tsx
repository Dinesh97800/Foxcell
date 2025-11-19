'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  deleteBestNetworkById,
  getBestNetworks,
} from 'src/api/services/bestNetworks';

export default function BestNetworkList() {
  const router = useRouter();
  const [networks, setNetworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNetworks = async () => {
    try {
      const res = await getBestNetworks();

      setNetworks(res);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNetworks();
  }, []);
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this?')) return;

    try {
      await deleteBestNetworkById(id);
      alert('Deleted successfully!');
      fetchNetworks();
    } catch (error) {
      alert('Delete failed!');
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white mt-5 rounded shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Best Networks</h1>
        <button
          onClick={() => router.push('/admin/best-network/create-or-edit')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Network
        </button>
      </div>

      {networks.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-12">#</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Icon</th>
              <th className="border p-2">Link</th>
              <th className="border p-2 w-40">Actions</th>
            </tr>
          </thead>

          <tbody>
            {networks.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.icon}</td>
                <td className="border p-2">
                  <a
                    href={item.link}
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    {item.link}
                  </a>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/best-network/create-or-edit?id=${item.id}`
                      )
                    }
                    className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
