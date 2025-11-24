"use client";

import { useEffect, useState } from "react";
import { getContacts } from "src/api/services/contactService";

export default function ContactList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getContacts();
    setData(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              <td className="border p-3">{row.name}</td>
              <td className="border p-3">{row.email}</td>
              <td className="border p-3">
                {new Date(row.created_at).toLocaleString()}
              </td>
              <td className="border p-3">
                {row.is_replied ? (
                  <span className="text-green-700 font-semibold">Replied</span>
                ) : (
                  <span className="text-red-600 font-semibold">Pending</span>
                )}
              </td>
              <td className="border p-3">
                <a
                  className="text-blue-600 underline"
                  href={`/admin/contact/${row.id}`}
                >
                  View / Reply
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
