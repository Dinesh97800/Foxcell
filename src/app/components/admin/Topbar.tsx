// components/admin/Topbar.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, Settings, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "src/api/apiClient";

export default function Topbar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between mb-6">
      <button className="md:hidden text-gray-800" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu className="w-6 h-6" />
      </button>

      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center space-x-2 focus:outline-none">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <a href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Settings className="w-4 h-4" /> Settings
            </a>
            <button
              onClick={async () => {
                await api.post("/logout");
                router.replace("/admin/login");
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
