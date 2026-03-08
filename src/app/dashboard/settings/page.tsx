"use client";

import { useEffect, useState } from "react";

interface BusinessForm {
  name: string;
  phone: string;
  email: string;
  google_review_url: string;
  yelp_review_url: string;
}

export default function SettingsPage() {
  const [form, setForm] = useState<BusinessForm>({
    name: "",
    phone: "",
    email: "",
    google_review_url: "",
    yelp_review_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/business")
      .then((res) => res.json())
      .then((data) => {
        if (data.business) {
          setForm({
            name: data.business.name || "",
            phone: data.business.phone || "",
            email: data.business.email || "",
            google_review_url: data.business.google_review_url || "",
            yelp_review_url: data.business.yelp_review_url || "",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await fetch("/api/business", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Business Settings</h1>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Business Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Business Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <hr className="border-gray-200" />

        <div>
          <label htmlFor="google" className="block text-sm font-medium text-gray-700 mb-1">
            Google Review URL
          </label>
          <input
            id="google"
            type="url"
            value={form.google_review_url}
            onChange={(e) => setForm({ ...form, google_review_url: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://g.page/r/your-business/review"
          />
          <p className="mt-1 text-xs text-gray-500">
            Find this in your Google Business Profile under &quot;Get more reviews&quot;
          </p>
        </div>

        <div>
          <label htmlFor="yelp" className="block text-sm font-medium text-gray-700 mb-1">
            Yelp Review URL (optional)
          </label>
          <input
            id="yelp"
            type="url"
            value={form.yelp_review_url}
            onChange={(e) => setForm({ ...form, yelp_review_url: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.yelp.com/writeareview/biz/your-business"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
