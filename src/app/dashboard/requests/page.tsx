"use client";

import { useEffect, useState } from "react";
import type { ReviewRequest } from "@/lib/types";

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  delivered: "bg-blue-100 text-blue-700",
  opened: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-green-100 text-green-700",
  feedback: "bg-orange-100 text-orange-700",
  failed: "bg-red-100 text-red-700",
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.recentRequests || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Review Requests</h1>
        <a
          href="/dashboard/send"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          + New Request
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-2">No review requests yet.</p>
            <a href="/dashboard/send" className="text-blue-600 hover:underline font-medium">
              Send your first request
            </a>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Method</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{req.customer_name}</p>
                    <p className="text-sm text-gray-500">{req.customer_phone || req.customer_email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{req.method.toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {req.rating ? (
                      <span className="text-yellow-600">{"★".repeat(req.rating)}{"☆".repeat(5 - req.rating)}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(req.created_at).toLocaleDateString()}
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
