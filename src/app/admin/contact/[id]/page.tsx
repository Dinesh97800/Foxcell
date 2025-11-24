"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getContact, replyContact } from "src/api/services/contactService";


export default function ContactView({ params }: any) {
  const { id } = useParams();                         // ✅ FIX: get route param
  const [msg, setMsg] = useState<any>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    if(!id) return
    const res = await getContact(id as string);
    setMsg(res.data);
  };

  const sendReply = async () => {
    if (!reply.trim() && !id) return alert("Reply cannot be empty!");

    await replyContact(id as string, reply);
    alert("Reply sent successfully!");
    window.location.reload();
  };

  if (!msg) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">View Contact Message</h1>

      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <p><strong>Name:</strong> {msg.name}</p>
        <p><strong>Email:</strong> {msg.email}</p>
        <p><strong>Phone:</strong> {msg.phone}</p>
        <p><strong>Subject:</strong> {msg.subject || "-"}</p>

        <p className="mt-4">
          <strong>Message:</strong><br />
          {msg.message}
        </p>

        {msg.admin_reply && (
          <p className="mt-4 p-3 bg-green-50 border border-green-300 rounded">
            <strong>Admin Reply:</strong><br />
            {msg.admin_reply}
          </p>
        )}
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Reply to User</h2>

        <textarea
          className="w-full border p-3 rounded mb-4"
          rows={5}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        ></textarea>

        <button
          onClick={sendReply}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send Reply
        </button>
      </div>
    </div>
  );
}
