// // app/admin/layout.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";

// import api from "src/api/apiClient";
// import Sidebar from "../components/admin/Sidebar";
// import Topbar from "../components/admin/Topbar";
// import Preloader from "../components/UI/Preloader";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const isLoginPage = pathname === "/admin/login";

//   useEffect(() => {
//     async function checkAuth() {
//       if (isLoginPage) {
//         setLoading(false);
//         return;
//       }
//       try {
//         await api.get("/user/me");
//       } catch {
//         router.replace("/admin/login");
//       } finally {
//         setLoading(false);
//       }
//     }
//     checkAuth();
//   }, [pathname, router, isLoginPage]);

//   if (loading) return <Preloader />;

//   // If login page, just render children (login form)
//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <main className="flex-1 bg-gray-50 p-6 md:p-8 w-full">
//         <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         {children}
//       </main>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import api from "src/api/apiClient";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import Preloader from "../components/UI/Preloader";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // global styles

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setLoading(false);
        return;
      }
      try {
        await api.get("/user/me");
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, router, isLoginPage]);

  if (loading) return <Preloader />;

  // Login page: render only the login form
  if (isLoginPage) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  // Admin dashboard layout: Sidebar + Topbar
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 bg-gray-50 p-6 md:p-8 w-full">
            <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
