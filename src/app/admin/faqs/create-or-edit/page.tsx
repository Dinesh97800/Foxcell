'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from 'src/api/apiClient';
import Preloader from '@/app/components/UI/Preloader';
export default function CreateOrEditFaqPage({}) {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const faqId = new URLSearchParams(window.location.search).get('id');
  useEffect(() => {
    if (faqId) {
      setIsEditMode(true);
      // Fetch existing FAQ data
      async function fetchFaq() {
        try {
          const response = await api.get(`/faqs/${faqId}`);
          setQuestion(response.data.question);
          setAnswer(response.data.answer);
        } catch (error) {
          console.error('Error fetching FAQ:', error);
        }
      }
      fetchFaq();
    }
  }, [faqId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        // Update existing FAQ
        await api.put(`/faqs/${faqId}`, { question, answer });
      } else {
        // Create new FAQ
        await api.post('/faqs', { question, answer });
      }
      router.push('/admin/faqs');
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
    setLoading(false);
  };
  if (loading) return <Preloader />;
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Edit FAQ' : 'Create New FAQ'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditMode ? 'Update FAQ' : 'Create FAQ'}
        </button>
      </form>
    </div>
  );
}
