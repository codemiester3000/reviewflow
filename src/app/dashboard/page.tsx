"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalSent: number;
  totalReviewed: number;
  totalFeedback: number;
  responseRate: number;
  avgRating: string;
  chartData: Array<{ date: string; sent: number; reviewed: number; feedback: number }>;
  recentRequests: Array<{
    id: string;
    customer_name: string;
    status: string;
    rating: number | null;
    created_at: string;
    method: string;
  }>;
}

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  delivered: "bg-blue-100 text-blue-700",
  opened: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-green-100 text-green-700",
  feedback: "bg-orange-100 text-orange-700",
  failed: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to ReviewFlow!</h2>
        <p className="text-gray-600 mb-6">Set up your business in Settings, then start sending review requests.</p>
        <a href="/dashboard/settings" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          Set Up Your Business
        </a>
      </div>
    );
  }

  const statCards = [
    { label: "Requests Sent", value: stats.totalSent, color: "text-blue-600" },
    { label: "Reviews Received", value: stats.totalReviewed, color: "text-green-600" },
    { label: "Response Rate", value: `${stats.responseRate}%`, color: "text-yellow-600" },
    { label: "Avg Rating", value: stats.avgRating, color: "text-purple-600" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <a
          href="/dashboard/send"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          + Send Request
        </a>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart - simple bar visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Last 30 Days</h2>
        <div className="flex items-end gap-1 h-40">
          {stats.chartData.map((day) => {
            const maxVal = Math.max(...stats.chartData.map(d => d.sent + d.reviewed), 1);
            const totalHeight = ((day.sent + day.reviewed) / maxVal) * 100;
            const reviewHeight = (day.reviewed / maxVal) * 100;
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                  {day.date}: {day.sent} sent, {day.reviewed} reviews
                </div>
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-blue-200 rounded-t"
                    style={{ height: `${totalHeight}%`, minHeight: day.sent > 0 ? '2px' : '0' }}
                  >
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${totalHeight > 0 ? (reviewHeight / totalHeight) * 100 : 0}%`, minHeight: day.reviewed > 0 ? '2px' : '0' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-200 rounded" /> Sent</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded" /> Reviews</span>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
        </div>
        {stats.recentRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No review requests yet. Send your first one!
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats.recentRequests.map((req) => (
              <div key={req.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{req.customer_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(req.created_at).toLocaleDateString()} via {req.method.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {req.rating && (
                    <span className="text-sm font-medium text-yellow-600">
                      {"★".repeat(req.rating)}{"☆".repeat(5 - req.rating)}
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || "bg-gray-100 text-gray-700"}`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
