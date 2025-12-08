'use client';
import { useState, useEffect } from 'react';
import api from 'src/api/apiClient';
import { Search } from 'lucide-react';

export default function SubscribedUsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerSubject, setOfferSubject] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [sending, setSending] = useState(false);

  const limit = 10;

  // debounce search text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // fetch data
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/user/newsletter-subscribers?q=${debouncedQuery}&page=${page}&limit=${limit}`
        );
        setUsers(data?.data || []);
        setTotal(data?.total || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [debouncedQuery, page]);

  const totalPages = Math.ceil(total / limit);

  const handleSendOffer = async () => {
    setSending(true);
    try {
      await api.post('/user/send-newsletter-offer', {
        subject: offerSubject,
        message: offerMessage,
      });

      alert('Offer sent to all subscribers!');
      setShowOfferModal(false);
      setOfferSubject('');
      setOfferMessage('');
    } catch (err) {
      console.error(err);
      alert('Failed to send offer. Try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Subscribed Users</h1>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search email..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Send offer button */}
          <button
            onClick={() => setShowOfferModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Send Offer
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="w-full h-[40vh] flex items-center justify-center text-gray-500 text-lg">
          Loading...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="border rounded-lg shadow-sm overflow-hidden">
            <div className="max-h-[60vh] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-center text-gray-400">
                        No results found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-gray-700">{u.email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Send Offer to Subscribers</h2>

            {/* Subject */}
            <div>
              <label className="text-sm text-gray-600">Subject</label>
              <input
                type="text"
                value={offerSubject}
                onChange={(e) => setOfferSubject(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                placeholder="e.g. Special Offer for You!"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm min-h-[140px]"
                placeholder="Write your promotional message..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowOfferModal(false)}
                disabled={sending}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSendOffer}
                disabled={sending || !offerSubject || !offerMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
