"use client";

import { useEffect, useState } from "react";
import type { Customer } from "@/lib/types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!business) { setLoading(false); return; }

      const { data } = await supabase
        .from("customers")
        .select("*")
        .eq("business_id", business.id)
        .order("created_at", { ascending: false });

      setCustomers(data || []);
      setLoading(false);
    }
    loadCustomers();
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-2">No customers yet.</p>
            <p className="text-sm">Customers are automatically added when you send review requests.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{customer.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{customer.phone || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{customer.email || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
