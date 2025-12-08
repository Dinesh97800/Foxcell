'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from 'src/api/apiClient';
import Preloader from '@/app/components/UI/Preloader';

export default function FaqsPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<
    Array<{ id: number; question: string; answer: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await api.get('/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);
  if (loading) return <Preloader />;
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">FAQs</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => router.push('/admin/faqs/create-or-edit')}
        >
          Add New FAQ
        </button>
      </div>
      {faqs.length === 0 ? (
        <p>No FAQs available.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Question
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Answer
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {faq.question}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {faq.answer}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        router.push(`/admin/faqs/create-or-edit?id=${faq.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={async () => {
                        if (
                          confirm('Are you sure you want to delete this FAQ?')
                        ) {
                          try {
                            await api.delete(`/faqs/${faq.id}`);
                            setFaqs(faqs.filter((f) => f.id !== faq.id));
                          } catch (error) {
                            console.error('Error deleting FAQ:', error);
                          }
                        }
                      }}
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
