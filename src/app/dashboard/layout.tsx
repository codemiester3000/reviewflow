"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/send", label: "Send Request", icon: "📨" },
  { href: "/dashboard/requests", label: "Requests", icon: "📋" },
  { href: "/dashboard/customers", label: "Customers", icon: "👥" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                ReviewFlow
              </Link>
              <nav className="hidden md:flex gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign Out
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600"
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
