// components/admin/Sidebar.tsx
"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
  return (
    <>
      <aside
        className={`sticky top-0 h-screen w-64 bg-gray-900 text-white p-6 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Foxcell</h2>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="hover:text-red-400">Dashboard</a>
          <a href="/admin/users" className="hover:text-red-400">Users</a>
          <a href="/admin/plans" className="hover:text-red-400">Plans</a>
          <a href="/admin/settings" className="hover:text-red-400">Settings</a>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
